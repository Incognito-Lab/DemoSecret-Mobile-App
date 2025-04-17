import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import * as CryptoJS from 'crypto-js';
// Import icons (if you don't have these, install: npm install @expo/vector-icons)
import { Ionicons } from '@expo/vector-icons';

// Hardcoded hash of the password "SuperVerySecureP@ssw0rd~"
// Using SHA-256 hashing algorithm
const CORRECT_PASSWORD_HASH = 
  "886f155acaa2d9a4c981aef4d45335ae5b4034e78b033182d989708afa4be2b5";

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validatePassword = () => {
    // Hash the entered password using SHA-256
    const hashedInput = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    console.log(hashedInput);
    
    // Compare with the hardcoded hash
    if (hashedInput === CORRECT_PASSWORD_HASH) {
      // Navigate to secret screen on success
      router.replace('./showFlagSecret');
    } else {
      Alert.alert('Authentication Failed', 'The password you entered is incorrect. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Hermes RE Demo</Text>
        <Text style={styles.subtitle}>
          Enter the correct password to reveal the secret flag
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity 
            style={styles.visibilityBtn}
            onPress={togglePasswordVisibility}
          >
            <Ionicons 
              name={passwordVisible ? 'eye-off' : 'eye'} 
              size={24} 
              color="#666"
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={validatePassword}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        
        <Text style={styles.hint}>
          Hint: This app uses SHA-256 password hashing
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    color: '#666',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    position: 'relative',
  },
  input: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingRight: 50, // Space for the visibility icon
    backgroundColor: '#fff',
    fontSize: 16,
  },
  visibilityBtn: {
    position: 'absolute',
    right: 12,
    height: 55,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hint: {
    marginTop: 30,
    color: '#888',
    fontSize: 14,
  }
});
