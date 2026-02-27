// Solicitar permisos para acceder a la galería
const requestPermission = async () => {
  console.log('Solicitando permiso para galería...');
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  console.log('Permiso:', status);
  if (status !== 'granted') {
    alert('Se requiere permiso para acceder a la galería');
    return false;
  }
  return true;
};
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import bgImage from '../assets/Imagen de fondo de chat.png';
import { db } from '../firebaseConfig';
import { ref, push, onValue } from 'firebase/database';

export default function ChatScreen({ user, mechanic, goBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Genera un ID único para el chat entre usuario y mecánico
  const chatId = [user, mechanic].sort().join('_');

  useEffect(() => {
    const chatRef = ref(db, `chats/${chatId}`);
    onValue(chatRef, snapshot => {
      const data = snapshot.val() || {};
      const msgArr = Object.values(data);
      setMessages(msgArr);
    });
  }, [chatId]);

  const handleSend = () => {
    if (input.trim()) {
      const chatRef = ref(db, `chats/${chatId}`);
      push(chatRef, { sender: user, text: input, timestamp: Date.now() });
      setInput('');
    }
  };

  const handleSendImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        const data = new FormData();
        data.append('file', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'upload.jpg'
        });
        data.append('upload_preset', 'powercar_chat');
        const res = await fetch('https://api.cloudinary.com/v1_1/dunbqlyaz/image/upload', {
          method: 'POST',
          body: data
        });
        const json = await res.json();
        if (json.secure_url) {
          const chatRefDb = ref(db, `chats/${chatId}`);
          push(chatRefDb, { sender: user, image: json.secure_url, timestamp: Date.now() });
        }
      }
    } catch (e) {
      console.log('Error al seleccionar o subir imagen:', e);
    }
  };

  // Mostrar el nombre del otro usuario en el título
  const chatWith = user === mechanic ? mechanic : mechanic;
  let otherUser = user;
  if (user === mechanic) {
    otherUser = user;
  } else {
    otherUser = mechanic;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
      >
        <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover">
          <View style={[styles.container, { backgroundColor: 'rgba(255,255,255,0.85)' }]}> 
            <View style={{ marginTop: Platform.OS === 'ios' ? 40 : 10 }}>
              <Text style={styles.title}>Chat con {otherUser}</Text>
            </View>
            <FlatList
              data={messages}
              renderItem={({ item }) => (
                <View style={[styles.message, item.sender === user ? styles.userMsg : styles.mechanicMsg]}>
                  {item.text && <Text style={styles.msgText}>{item.text}</Text>}
                  {item.image && typeof item.image === 'string' && item.image.startsWith('http') && (
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: 140, height: 140, borderRadius: 12, marginTop: 8, borderWidth: 2, borderColor: '#007bff', backgroundColor: '#eee' }}
                      resizeMode="cover"
                    />
                  )}
                </View>
              )}
              keyExtractor={(_, idx) => idx.toString()}
              style={styles.chat}
              contentContainerStyle={{ paddingBottom: 10 }}
              inverted={false}
            />
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Escribe tu mensaje..."
                value={input}
                onChangeText={setInput}
                returnKeyType="send"
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                <Text style={styles.sendText}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageBtn} onPress={handleSendImage}>
                <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Foto</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: Platform.OS === 'ios' ? 30 : 10 }}>
              <TouchableOpacity style={styles.backBtn} onPress={goBack}>
                <Text style={styles.backText}>Volver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, alignSelf: 'center' },
  chat: { flex: 1, marginBottom: 10 },
  message: { padding: 10, borderRadius: 8, marginVertical: 4, maxWidth: '80%' },
  userMsg: { backgroundColor: '#e6f7ff', alignSelf: 'flex-end' },
  mechanicMsg: { backgroundColor: '#f0f0f0', alignSelf: 'flex-start' },
  msgText: { color: '#333' },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  imageBtn: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#007bff', marginLeft: 8, backgroundColor: '#fff' },
  input: { flex: 1, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10 },
  sendBtn: { backgroundColor: '#007bff', padding: 10, borderRadius: 8, marginLeft: 8 },
  sendText: { color: '#fff', fontWeight: 'bold' },
  backBtn: { backgroundColor: '#ccc', padding: 10, borderRadius: 8, alignSelf: 'center' },
  backText: { color: '#333' }
});
