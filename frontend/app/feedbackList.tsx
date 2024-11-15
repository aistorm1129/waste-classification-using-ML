import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';

// Define a interface Feedback que descreve a estrutura dos dados de feedback recebidos do backend
interface Feedback {
  user_name: string;
  rating: number;
  comment: string;
  class_predicted: string;
  created_at: string;
}

const FeedbackList = () => {
  // Estado para armazenar a lista de feedbacks
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  // Estado para controlar o estado de carregamento
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect para buscar os feedbacks ao carregar o componente
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('https://brazrecicla-back-end-production.up.railway.app/feedbacks/');
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert('Erro', 'Houve um erro ao buscar os feedbacks.');
      }
    };

    fetchFeedbacks();
  }, []);

  // Função para renderizar cada feedback individualmente
  const renderFeedback = ({ item }: { item: Feedback }) => (
    <View style={styles.feedbackContainer}>
      <Text style={styles.name}> {item.user_name}</Text>

      <View style={styles.ratingContainer}>
        <AirbnbRating
          count={5}
          defaultRating={item.rating}
          size={20}
          isDisabled
          showRating={false}
        />
        <Text style={styles.ratingText}>{item.rating}/5 estrelas</Text>
      </View>

      <Text style={styles.comment}>{item.comment || 'Nenhum comentário'}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#4CAF50" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedbacks dos Usuários</Text>

      {feedbacks.length === 0 ? (
        <Text>Nenhum feedback encontrado</Text>
      ) : (
        <FlatList
          data={feedbacks}
          renderItem={renderFeedback}
          keyExtractor={(item) => item.user_name + item.created_at}
        />
      )}
    </View>
  );
};

// Estilos para os componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  feedbackContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#555',
  },
  comment: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeedbackList;
