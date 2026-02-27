import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AdminScreen({ setRole }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido, Administrador</Text>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => setRole(null)}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  logoutBtn: { backgroundColor: '#ccc', padding: 10, borderRadius: 8 },
  logoutText: { color: '#333', fontWeight: 'bold' }
});
