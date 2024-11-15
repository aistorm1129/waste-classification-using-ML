import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { AirbnbRating } from 'react-native-ratings';


const Feedback = () => {
// Obtém os parâmetros da tela anterior (neste caso, a classe prevista)
    const { predictedClass = '' } = useLocalSearchParams();
// Define os estados do componente
    const [userName, setUserName] = useState('');
    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState('');
    const [feedbackSent, setFeedbackSent] = useState(false);  // Estado para controlar o envio do feedback
    const router = useRouter();

// Função para enviar o feedback ao back-end
    const submitFeedback = async () => {
// Verifica se o nome do usuário foi preenchido
        if (!userName) {
            Alert.alert("Erro", "Por favor, insira seu nome antes de enviar o feedback.");
            return;
        }

// Verifica se o usuário deu uma avaliação (rating)
        if (rating === 0) {
            Alert.alert("Erro", "Por favor, forneça uma avaliação.");
            return;
        }
        
        try {
            // Envia o feedback para o servidor via requisição POST
            await axios.post('https://brazrecicla-back-end-production.up.railway.app/feedbacks/', {
                user_name: userName,
                rating: rating,
                comment: comment,
                class_predicted: predictedClass
            });

            // Atualiza o estado para indicar que o feedback foi enviado
            setFeedbackSent(true);
        } catch (error) {
        // Exibe um alerta caso ocorra algum erro no envio do feedback
            Alert.alert("Erro", "Houve um erro ao enviar o feedback.");
            console.error(error);
        }
    };
    
    // Exibe a tela de sucesso após o envio do feedback
    if (feedbackSent) {
        return (
            <View style={styles.container}>
                <Text style={styles.successMessage}>Feedback enviado com sucesso!</Text>
                <Text style={styles.question}>O que você deseja fazer agora?</Text>

                <TouchableOpacity
                    style={styles.greenButton}
                    onPress={() => router.push('./home')}
                >
                    <Text style={styles.buttonText}>Classificar Outro Resíduo</Text>
                </TouchableOpacity>

                <Text style={styles.orText}>ou</Text>

                <TouchableOpacity
                    style={styles.outlineButton}
                    onPress={() => router.push('/feedbackList')}
                >
                    <Text style={styles.outlineButtonText}>Ver Outros Feedbacks</Text>
                </TouchableOpacity>
            </View>
        );
    }

// Exibe o formulário de feedback se o feedback ainda não foi enviado
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Avalie a Classificação</Text>
            <Text style={styles.subtitle}>Como você avalia a precisão da classificação?</Text>
            
            {/* Componente de avaliação com estrelas */}
            <AirbnbRating
                count={5}
                defaultRating={rating}
                size={30}
                showRating
                onFinishRating={setRating}
                reviews={['Péssima', 'Ruim', 'Ok', 'Bom', 'Excelente']}
            />

            <Text style={styles.stars}>Sua avaliação: {rating}/5 estrelas</Text>

            <TextInput
                style={styles.textArea}
                placeholder="Deixe seu comentário aqui (opcional)..."
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
            />

            <TextInput
                style={styles.input}
                placeholder="Seu nome"
                value={userName}
                onChangeText={setUserName}
            />

            <Button title="Enviar Feedback" color="#4CAF50" onPress={submitFeedback} />
        </View>
    );
};

// Estilos para os componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    stars: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    textArea: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        height: 100,
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
    successMessage: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    greenButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    outlineButton: {
        borderWidth: 2,
        borderColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    outlineButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    orText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
    },
    feedbackButton: {
        marginTop: 10,
    },
});

export default Feedback;
