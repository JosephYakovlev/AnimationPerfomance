import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StackNavigator from './navigate';
import { Provider as AuthProvider } from './context/AuthContext';

export default function App() {



    

  const [happy, setHappy] = useState(false)

  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
