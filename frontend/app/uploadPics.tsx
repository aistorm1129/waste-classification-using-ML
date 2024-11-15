import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Logo from '../assets/images/BrazRecicla.svg'

export default function UploadPics() {
  return (
    <View style={styles.container}>
      {/* Logotipo no topo */}
      <Logo style={styles.logo} />

      {/* Texto que descreve o processo de tirar uma foto */}
      <Text style={styles.title}>
        Tire uma foto do resíduo que deseja classificar e envie para o BrazRecicla.
      </Text>

      {/* Subtítulo indicando o exemplo */}
      <Text style={styles.subtitle}>
        Exemplo:
      </Text>

      {/* Caixa de upload simulada para ilustrar a ação de carregar uma foto */}
      <View style={styles.uploadBox}>
        <Text>Carregar foto</Text>
        <Text style={styles.supportedFormats}>
          Formatos suportados: JPEG, PNG, JPG.
        </Text>
      </View>

      {/* Exemplo de uma foto carregada com um preview da imagem */}
      <View style={styles.uploadBox}>
        <Text style={styles.uploaded}>Foto carregada</Text>
        <Image
          source={require('../assets/images/image 15.png')}  // Exemplo de imagem carregada
          style={styles.img}
        />
      </View>

      {/* Botão para avançar à próxima etapa (classificação de materiais) */}
      <Link href="./materialClass" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Próximo ›</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

// Estilos para os componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  uploadBox: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  supportedFormats: {
    marginTop: 10,
    color: '#888',
  },
  uploaded: {
    color: '#888',
    padding: 4,
    borderRadius: 4,
  },
  img: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 2,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '500',
  },
});
