import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'; 

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Título de boas-vindas */}
      <Text style={styles.welcomeText}>
        Bem-vindo ao <Text style={styles.corTitutlo}>BrazRecicla</Text>!
      </Text>

      {/* Imagem ilustrativa */}
      <Image source={require('../assets/images/img-reciclagem.png')} style={styles.img} />

      {/* Descrição da aplicação */}
      <Text style={styles.description}>
        Nosso objetivo é ajudar você a identificar corretamente resíduos recicláveis por meio de imagens.
      </Text>

      <View style={styles.containerButton}>
        {/* Botão "Pular", que leva o usuário para a tela "home" */}
        <Link href="./home" asChild>
          <TouchableOpacity style={styles.buttonP}>
            <Text style={styles.buttonText}>‹ Pular</Text>
          </TouchableOpacity>
        </Link>

        {/* Botão "Próximo", que leva o usuário para a tela "uploadPics" */}
        <Link href="./uploadPics" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Próximo ›</Text>
          </TouchableOpacity>
        </Link>
      </View>

    </View>
  );
}

// Estilos para os componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  welcomeText: {
    fontSize: 40,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  corTitutlo: {
    color: '#70BF73',
  },
  img: {
    width: 300,
    height: 300,
  },
  description: {
    fontSize: 19,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  buttonP: {
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
});
