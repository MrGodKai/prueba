import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MechanicScreen({ setRole, goToChat }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido, Mecánico</Text>
      <TouchableOpacity style={styles.chatBtn} onPress={goToChat}>
        <Text style={styles.chatText}>Ir al chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => setRole(null)}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  chatBtn: { backgroundColor: '#007bff', padding: 10, borderRadius: 8, marginBottom: 10 },
  chatText: { color: '#fff', fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#ccc', padding: 10, borderRadius: 8 },
  logoutText: { color: '#333', fontWeight: 'bold' }
});
