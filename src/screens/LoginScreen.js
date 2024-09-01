import {View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <SafeAreaView>
        <View style={{height: 80}} />
        <Entypo
          name="spotify"
          color={'white'}
          size={80}
          style={{textAlign: 'center'}}
        />
        <Text style={styles.loginTitle}>
          Millions of Songs Free on Spofify!
        </Text>

        <View style={{height: 80}} />

        <Pressable
          style={styles.loginButton}
          onPress={() => navigation.navigate('Main')}>
          <Text>Sign In with Spotify</Text>
        </Pressable>

        <Pressable style={styles.phoneButton}>
          <MaterialIcons name="phone-android" color="white" size={24} />
          <Text style={styles.phoneButtonText}>Continue with phone number</Text>
        </Pressable>

        <Pressable style={styles.phoneButton}>
          <AntDesign name="google" size={24} color="white" />
          <Text style={styles.phoneButtonText}>Continue with Google</Text>
        </Pressable>

        <Pressable style={styles.phoneButton}>
          <Entypo name="facebook" size={24} color="white" />
          <Text style={styles.phoneButtonText}>Continue with Facebook</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loginTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  loginButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 25,
  },
  phoneButton: {
    backgroundColor: '#131624',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    marginVertical: 10,
    borderWidth: 0.8,
    borderColor: '#C0C0C0',
    width: 300,
    borderRadius: 25,
    alignItems: 'center',
  },
  phoneButtonText: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
});