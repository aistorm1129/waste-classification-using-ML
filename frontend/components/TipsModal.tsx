import React from 'react';
import {View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

interface TipsModalProps {
  visible: boolean;
  onClose: () => void;
}

const TipsModal: React.FC<TipsModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Dicas para uma boa classificação:</Text>
          <Text style={styles.modalText}>🚫 Evite imagens escuras ou com baixa iluminação.</Text>
          <Text style={styles.modalText}>🚫 Certifique-se de que o resíduo esteja bem focado e visível.</Text>
          <Text style={styles.modalText}>🚫 Use um fundo neutro, sempre que possível.</Text>

          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TipsModal;
