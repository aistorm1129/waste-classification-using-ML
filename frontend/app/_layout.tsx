import { Stack } from "expo-router";

// Define o layout principal da aplicação utilizando o Expo Router
export default function RootLayout() {
  return (
    // Componente Stack que organiza as telas de forma empilhada, permitindo a navegação entre elas
    // headerShown: false, faz com que o cabeçalho padrão fique oculto
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="uploadPics" options={{headerShown: false}}/>
      <Stack.Screen name="materialClass" options={{headerShown: false}}/>
      <Stack.Screen name="home" options={{headerShown: false}}/>
      <Stack.Screen name="result" options={{headerShown: false}}/>
      <Stack.Screen name="feedback" options={{headerShown: false}}/>
      <Stack.Screen name="feedbackList" options={{headerShown: false}}/>
    </Stack>
  );
}
