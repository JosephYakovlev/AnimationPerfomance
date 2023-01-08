import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {Context as AuthContext} from './../context/AuthContext';

export default function FirstPage() {

  const {state} = useContext(AuthContext)
  const [happy, setHappy] = useState(false)

  return (
    <View style={styles.container}>
        <Text>
          {state.user?.user?.picture}
        </Text>
    </View>
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