import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, User, Phone, Apple } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  onAuth: (user: any) => void;
}

export default function AuthModal({ visible, onClose, onAuth }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register' | 'phone'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleAuth = () => {
    if (mode === 'login') {
      if (!email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      // Mock login
      onAuth({
        id: '1',
        name: 'John Doe',
        email,
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        isVip: false,
        level: 1,
      });
    } else if (mode === 'register') {
      if (!name || !email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      // Mock register
      onAuth({
        id: '1',
        name,
        email,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        isVip: false,
        level: 1,
      });
    } else {
      if (!phone) {
        Alert.alert('Error', 'Please enter your phone number');
        return;
      }
      // Mock phone login
      onAuth({
        id: '1',
        name: 'User',
        phone,
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        isVip: false,
        level: 1,
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Mock social login
    onAuth({
      id: '1',
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      isVip: false,
      level: 1,
    });
  };

  if (mode === 'login') {
    return (
      <Modal
        visible={visible}
        animationType="fade"
        presentationStyle="overFullScreen"
      >
        <LinearGradient
          colors={['#8B5CF6', '#A855F7', '#C084FC', '#DDD6FE']}
          style={styles.container}
        >
          {/* Floating Bubbles */}
          <View style={styles.floatingElements}>
            <View style={[styles.floatingBubble, styles.bubble1]} />
            <View style={[styles.floatingBubble, styles.bubble2]} />
            <View style={[styles.floatingBubble, styles.bubble3]} />
            <View style={[styles.floatingBubble, styles.bubble4]} />
            <View style={[styles.floatingBubble, styles.bubble5]} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Can't login?</Text>
            </TouchableOpacity>
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Text style={styles.logo}>Binmo</Text>
              <View style={styles.logoUnderline} />
            </View>
          </View>

          {/* Login Buttons */}
          <View style={styles.buttonContainer}>
            {/* Google Login */}
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Google')}
            >
              <View style={styles.googleButton}>
                <View style={styles.googleIcon}>
                  <Text style={styles.googleG}>G</Text>
                </View>
                <Text style={styles.socialButtonText}>Google</Text>
              </View>
            </TouchableOpacity>

            {/* Apple Login */}
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Apple')}
            >
              <View style={styles.appleButton}>
                <Apple size={20} color="#fff" style={styles.appleIcon} />
                <Text style={styles.appleButtonText}>Apple ID</Text>
              </View>
            </TouchableOpacity>

            {/* Facebook Login */}
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Facebook')}
            >
              <View style={styles.facebookButton}>
                <Text style={styles.facebookIcon}>f</Text>
                <Text style={styles.facebookButtonText}>Facebook</Text>
              </View>
            </TouchableOpacity>

            {/* Phone Login */}
            <TouchableOpacity 
              style={styles.phoneButtonContainer}
              onPress={() => setMode('phone')}
            >
              <View style={styles.phoneButton}>
                <Phone size={20} color="#4CAF50" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <View style={styles.termsContainer}>
            <View style={styles.checkbox} />
            <Text style={styles.termsText}>
              By continuing, you agree to Binmo{'\n'}
              <Text style={styles.linkText}>Terms of service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Version */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>P.S. 24</Text>
          </View>
        </LinearGradient>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <LinearGradient
        colors={['#8B5CF6', '#A855F7']}
        style={styles.modalContainer}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setMode('login')}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>
            {mode === 'phone' ? 'Phone Login' : 'Register'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.modalContent}>
          {mode === 'phone' ? (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Phone size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>

              <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
                <Text style={styles.authButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <User size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <Mail size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Lock size={20} color="#fff" />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
                <Text style={styles.authButtonText}>Create Account</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setMode('login')}>
                <Text style={styles.switchText}>
                  Already have an account? <Text style={styles.switchLink}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingBubble: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  bubble1: {
    width: 80,
    height: 80,
    top: '15%',
    right: '15%',
  },
  bubble2: {
    width: 120,
    height: 120,
    bottom: '25%',
    left: '10%',
  },
  bubble3: {
    width: 60,
    height: 60,
    top: '35%',
    left: '25%',
  },
  bubble4: {
    width: 100,
    height: 100,
    bottom: '40%',
    right: '25%',
  },
  bubble5: {
    width: 90,
    height: 90,
    top: '60%',
    right: '10%',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 10,
  },
  closeText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '500',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -80,
  },
  logoBackground: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    fontStyle: 'italic',
  },
  logoUnderline: {
    width: 120,
    height: 4,
    backgroundColor: '#fff',
    borderRadius: 2,
    marginTop: 8,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    paddingBottom: 80,
    gap: 15,
  },
  socialButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  googleButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  googleIcon: {
    marginRight: 15,
  },
  googleG: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  appleButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  appleIcon: {
    marginRight: 15,
  },
  appleButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  facebookIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 15,
  },
  facebookButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  phoneButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  phoneButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 40,
    paddingBottom: 30,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 15,
    marginTop: 2,
  },
  termsText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  versionContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  // Modal styles for phone/register
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 50,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  form: {
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#fff',
  },
  authButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  authButtonText: {
    color: '#8B5CF6',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  switchLink: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});