import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Logo from '../assets/images/BrazRecicla.svg'
import VidroIcon from '../assets/images/vidro-icon (1).svg';
import PlasticoIcon from '../assets/images/plastico-icon (1).svg';
import PapelIcon from '../assets/images/papel-icone (1).svg';
import MetalIcon from '../assets/images/metal-icon (1).svg';

export default function materialClass() {
  return (
    <View style={styles.container}>
    <Logo style={styles.logo} />

      <Text style={styles.title}>
        Vamos ajudar você a identificar o material e como descartá-lo corretamente.
      </Text>
      
      {/* Grid com os ícones dos materiais recicláveis */}
      <View style={styles.grid}>
        <View style={[styles.item, { backgroundColor: '#FCFF91' }]}>
          <MetalIcon/>
          <Text style={styles.class}>METAL</Text>
        </View>

        <View style={[styles.item, { backgroundColor: '#FFB4BF' }]}>
            <PlasticoIcon/>
          <Text style={styles.class}>PLÁSTICO</Text>
        </View>

        <View style={[styles.item, { backgroundColor: '#BFE4EC' }]}>
          <PapelIcon/>
          <Text style={styles.class}>PAPEL</Text>
        </View>

        <View style={[styles.item, { backgroundColor: '#95CE97' }]}>
          <VidroIcon/>
          <Text style={styles.class}>VIDRO</Text>
        </View>

      </View>

    {/* Botão para avançar à próxima etapa */}
      <View>
      <Link href="./home" asChild>
      <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Começar ›</Text>
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
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '45%',
    padding: 30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  class: {
    fontWeight: '500',
    marginTop: 10,
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
