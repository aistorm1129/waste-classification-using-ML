import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TipsModal from '../components/TipsModal';
import { useRouter } from 'expo-router';
import Logo from '../assets/images/BrazRecicla.svg';
import axios from 'axios';

const Home = () => {
    // Estados dos componentes
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  // Função para selecionar uma imagem da galeria
  const pickImage = async () => {
    // Solicita permissão para acessar a galeria
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'Precisamos da sua permissão para acessar as fotos.');
      return;
    }

    // Abre a galeria e permite o usuário escolher uma imagem
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Se o usuário não cancelar, armazena a URI da imagem selecionada
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Função para converter a URI da imagem para Blob (necessário para upload)
  const createBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

    // Função para enviar a imagem para o servidor
  const handleSubmit = async () => {
    if (!selectedImage) {
      Alert.alert('Erro', 'Por favor, selecione uma imagem.');
      return;
    }

    setLoading(true);
    
    try {
      const imageBlob = await createBlob(selectedImage);

      const formData = new FormData();
      formData.append('file', imageBlob, 'image.jpg');

      // Envia a imagem para o servidor utilizando uma requisição POST
      const response = await axios.post('https://brazrecicla-back-end-production.up.railway.app/classify/', formData, {
          method: 'POST'
      });

      setLoading(false);

      if (response.status === 200) {
        // Navega para a tela de resultados, passando a imagem e a classificação retornada pelo servidor
        router.push({ pathname: '/result', params: { image: selectedImage, classification: response.data.class } });
      } else {
        Alert.alert('Erro', 'Falha ao classificar a imagem.');
        console.log("Erro do backend:", response.data);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Erro ao enviar a imagem. Tente novamente.');
      console.error("Erro ao enviar a imagem:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Logo style={styles.logo}/>

      <Text style={styles.subTitle}>Envie sua imagem</Text>
      
      <Text style={styles.description}>
        Selecione uma imagem da galeria para classificar o resíduo.
      </Text>
      
      {/* Botão para selecionar a imagem */}
      <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.uploadText}>Carregar foto</Text>
            <Text style={styles.supportedFormats}>
              Formatos suportados: JPEG, PNG
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Botão para exibir o modal de dicas */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
         <Text style={styles.tipText}>Dicas para uma boa classificação</Text>
       </TouchableOpacity>

        {/* Botão para enviar a imagem */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar</Text>}
      </TouchableOpacity>

      {/* Modal de dicas */}
      <TipsModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

// Estilos para os componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadContainer: {
    width: 350,
    height: 200,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholder: {
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 16,
    color: '#666',
  },
  supportedFormats: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Home;
