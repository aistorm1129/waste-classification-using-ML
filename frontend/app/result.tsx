import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import VidroIcon from '../assets/images/vidro-icon (1).svg';
import PlasticoIcon from '../assets/images/plastico-icon (1).svg';
import PapelIcon from '../assets/images/papel-icone (1).svg';
import MetalIcon from '../assets/images/metal-icon (1).svg';
import Logo from '../assets/images/BrazRecicla.svg'

// Mapeia o estilo e o ícone de cada material
const materialStyleMap: Record<string, { color: string, icon: JSX.Element }> = {
  VIDRO: { color: '#95CE97', icon: <VidroIcon width={40} height={40}/> },
  PLASTICO: { color: '#FFB4BF', icon: <PlasticoIcon width={40} height={40} /> },
  PAPEL: { color: '#BFE4EC', icon: <PapelIcon width={40} height={40} /> },
  METAL: { color: '#FCFF91', icon: <MetalIcon width={40} height={40} /> }, 
};
// Mapeia as instruções de descarte para cada material
  const instructionMap: { [key: string]: string } = {
    VIDRO: 'Descarte o vidro em um recipiente separado e limpo. Se estiver quebrado, embrulhe em papel ou jornal para evitar acidentes.',
    PLASTICO: 'Lave bem os plásticos antes de descartá-los em recipientes de reciclagem apropriados.',
    PAPEL: 'O papel deve ser descartado em locais de reciclagem, de preferência seco e limpo.',
    METAL: 'Descarte metais em coletores de reciclagem. Limpe bem latas e objetos antes de reciclar.',
  };

  const Result = () => {
    // Obtém a imagem e a classificação passadas pela tela anterior
    const { image, classification } = useLocalSearchParams();
    const router = useRouter();  // Hook para navegação
  
    // Converte a classificação recebida para letras maiúsculas
    const classificationKey = typeof classification === 'string' ? classification.toUpperCase() : '';
  
    // Obtém o estilo (cor e ícone) e instrução de acordo com o material identificado
    const materialStyle = materialStyleMap[classificationKey] || {};
    const instruction = instructionMap[classificationKey] || 'Instrução não disponível para este material.';
  
    // Função para navegar para a tela de feedback, passando a classificação do material
    const handleFeedback = () => {
      router.push({
        pathname: './feedback',
        params: {
          predictedClass: classificationKey,  // Passa a classificação para a tela de feedback
        },
      });
    };

  return (
    <View style={styles.container}>
      <Logo style={styles.logo}/>
      <Text style={styles.title}>Resultado da Classificação</Text>

      <View style={styles.imageBox}>
      {image && <Image source={{ uri: image as string }} style={styles.resultImage} />}
      </View>

      {/* Exibe o resultado da classificação com estilo apropriado */}
      <View>
        <Text style={styles.resultLabel}>Material identificado como:</Text>
        <View style={[styles.resultBox, { backgroundColor: materialStyle.color || '#fff' }]}>
        {materialStyle.icon}
        <Text style={styles.resultText}>{classification}</Text>
      </View>
      </View>

      {/* Exibe as instruções de descarte */}
      <View style={styles.instructionBox}>
        <Text style={styles.instruction}>{instruction}</Text>
      </View>
      
      {/* Botão para enviar feedback */}
      <TouchableOpacity style={styles.feedbackButton} onPress={handleFeedback}>
        <Text style={styles.feedbackText}>Enviar Feedback</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>ou</Text>

      <TouchableOpacity style={styles.otherButton} onPress={() => router.back()}>
        <Text style={styles.otherText}>Classificar Outro Resíduo</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos para os componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  materialLabel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10, 
  },
  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 120,
    backgroundColor: '#F8F8FF',
    borderWidth: 2,
    borderColor: '#B2BCED',
    borderStyle: 'dashed',
    marginBottom: 20,
    borderRadius: 10,

  },
  resultImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  resultLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  resultMaterial: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  resultText: {
    flexDirection: 'row',
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  instructionBox: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, 
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  feedbackButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 16,
    color: '#333',
  },
  orText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
  },
  otherButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  otherText: {
    fontSize: 16,
    color: '#333',
  },
  icon: {
   marginRight: 10,
  }
});

export default Result;
