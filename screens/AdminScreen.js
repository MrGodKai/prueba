import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function AdminScreen({ setRole }) {
  const [appointments, setAppointments] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const apps = await AsyncStorage.getItem('appointments');
      if (apps) setAppointments(JSON.parse(apps));
      const prods = await AsyncStorage.getItem('products');
      if (prods) {
        setProducts(JSON.parse(prods));
      } else {
        // Default products
        const defaultProducts = [
          { id: 1, name: 'Aceite para Motor', status: 'Disponible' },
          { id: 2, name: 'Filtro de Aire', status: 'Nuevo' },
          { id: 3, name: 'Batería de Auto', status: 'Agotado' },
          { id: 4, name: 'Pastillas de Freno', status: 'Disponible' },
          { id: 5, name: 'Llantas', status: 'Disponible' }
        ];
        setProducts(defaultProducts);
        await AsyncStorage.setItem('products', JSON.stringify(defaultProducts));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveAppointments = async (apps) => {
    setAppointments(apps);
    await AsyncStorage.setItem('appointments', JSON.stringify(apps));
  };

  const saveProducts = async (prods) => {
    setProducts(prods);
    await AsyncStorage.setItem('products', JSON.stringify(prods));
  };

  const changeAppointmentStatus = (index, newStatus) => {
    const newApps = [...appointments];
    newApps[index].status = newStatus;
    saveAppointments(newApps);
  };

  const deleteAppointment = (index) => {
    Alert.alert('Eliminar', '¿Estás seguro de eliminar esta cita?', [
      { text: 'Cancelar' },
      { text: 'Eliminar', onPress: () => {
        const newApps = appointments.filter((_, i) => i !== index);
        saveAppointments(newApps);
      }}
    ]);
  };

  const changeProductStatus = (index, newStatus) => {
    const newProds = [...products];
    newProds[index].status = newStatus;
    saveProducts(newProds);
  };

  const renderAppointment = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.time}</Text>
      <Picker
        selectedValue={item.status}
        style={styles.picker}
        onValueChange={(value) => changeAppointmentStatus(index, value)}
      >
        <Picker.Item label="Pendiente" value="Pendiente" />
        <Picker.Item label="En revisión" value="En revisión" />
        <Picker.Item label="Listo" value="Listo" />
      </Picker>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteAppointment(index)}>
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProduct = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Picker
        selectedValue={item.status}
        style={styles.picker}
        onValueChange={(value) => changeProductStatus(index, value)}
      >
        <Picker.Item label="Disponible" value="Disponible" />
        <Picker.Item label="Nuevo" value="Nuevo" />
        <Picker.Item label="Agotado" value="Agotado" />
      </Picker>
      <TouchableOpacity style={styles.updateBtn} onPress={() => Alert.alert('Actualizar', 'Producto actualizado')}>
        <Text style={styles.updateText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel Administrativo</Text>
      <TouchableOpacity style={styles.logoutBtn} onPress={() => setRole(null)}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Gestión de Citas</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Nombre</Text>
        <Text style={styles.headerCell}>Email</Text>
        <Text style={styles.headerCell}>Fecha</Text>
        <Text style={styles.headerCell}>Hora</Text>
        <Text style={styles.headerCell}>Estado</Text>
        <Text style={styles.headerCell}>Acciones</Text>
      </View>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item, index) => index.toString()}
        style={styles.table}
      />
      <Text style={styles.sectionTitle}>Gestión de Productos</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Producto</Text>
        <Text style={styles.headerCell}>Estado</Text>
        <Text style={styles.headerCell}>Acciones</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        style={styles.table}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  logoutBtn: { backgroundColor: '#e74c3c', padding: 10, borderRadius: 8, alignSelf: 'center', marginBottom: 20 },
  logoutText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#ddd', padding: 10 },
  headerCell: { flex: 1, fontWeight: 'bold', textAlign: 'center' },
  table: { maxHeight: 200 },
  row: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center' },
  cell: { flex: 1, textAlign: 'center' },
  picker: { flex: 1, height: 40 },
  deleteBtn: { backgroundColor: '#e74c3c', padding: 5, borderRadius: 5 },
  deleteText: { color: '#fff', fontSize: 12 },
  updateBtn: { backgroundColor: '#3498db', padding: 5, borderRadius: 5 },
  updateText: { color: '#fff', fontSize: 12 }
});
