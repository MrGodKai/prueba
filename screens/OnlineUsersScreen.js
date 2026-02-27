import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { ref, set, onValue } from 'firebase/database';

// Para depuración
const log = (...args) => { try { console.log(...args); } catch {} };

export default function OnlineUsersScreen({ currentUser, goToChat, goBack }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Marcar usuario como online
    const userRef = ref(db, `onlineUsers/${currentUser}`);
    set(userRef, { username: currentUser, online: true, timestamp: Date.now() })
      .then(() => log('Usuario online registrado:', currentUser))
      .catch(e => log('Error registrando usuario online:', e));
    // Escuchar usuarios online
    const onlineRef = ref(db, 'onlineUsers');
    onValue(onlineRef, snapshot => {
      const data = snapshot.val() || {};
      log('Usuarios online recibidos:', data);
      const userArr = Object.entries(data)
        .filter(([key, u]) => u.username !== currentUser && u.online)
        .map(([key, u]) => ({ ...u, key }));
      setUsers(userArr);
    });
    // Al salir, marcar offline (opcional)
    return () => set(userRef, { username: currentUser, online: false, timestamp: Date.now() })
      .then(() => log('Usuario offline:', currentUser))
      .catch(e => log('Error marcando offline:', e));
  }, [currentUser]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios conectados</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userBtn} onPress={() => goToChat(item.username)}>
            <Text style={styles.userText}>{item.username}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.key}
        style={styles.list}
      />
      <TouchableOpacity style={styles.backBtn} onPress={goBack}>
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, alignSelf: 'center' },
  list: { flex: 1, marginBottom: 10 },
  userBtn: { backgroundColor: '#e6f7ff', padding: 10, borderRadius: 8, marginVertical: 4 },
  userText: { color: '#333', fontWeight: 'bold' },
  backBtn: { backgroundColor: '#ccc', padding: 10, borderRadius: 8, alignSelf: 'center' },
  backText: { color: '#333' }
});
