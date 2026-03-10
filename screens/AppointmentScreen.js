import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AppointmentScreen({ navigation, currentUsername }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [vehicle, setVehicle] = useState('');
  const [plate, setPlate] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const apps = await AsyncStorage.getItem('appointments');
      if (apps) {
        setAppointments(JSON.parse(apps));
      } else {
        // Sample data
        const sample = [
          { id: 1, name: 'Juan Pérez', email: 'juan@example.com', phone: '8888-1111', vehicle: 'Civic 2020', plate: 'ABC-123', date: '2026-03-10', time: '09:00', status: 'Pendiente' },
          { id: 2, name: 'María Gómez', email: 'maria@example.com', phone: '8888-2222', vehicle: 'Corolla 2018', plate: 'XYZ-789', date: '2026-03-08', time: '14:30', status: 'En revisión' },
          { id: 3, name: 'Carlos Ruiz', email: 'carlos@example.com', phone: '8888-3333', vehicle: 'Mustang 2019', plate: 'QWE-456', date: '2026-03-05', time: '11:15', status: 'Listo' }
        ];
        setAppointments(sample);
        await AsyncStorage.setItem('appointments', JSON.stringify(sample));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveAppointment = async (appointment) => {
    try {
      const apps = await AsyncStorage.getItem('appointments');
      const allApps = apps ? JSON.parse(apps) : [];
      allApps.push(appointment);
      await AsyncStorage.setItem('appointments', JSON.stringify(allApps));
      loadAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = (data) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(data.date);
    if (selectedDate < today) {
      Alert.alert('Error', 'La fecha no puede ser en el pasado.');
      return false;
    }
    const selectedTime = new Date(data.time);
    const hours = selectedTime.getHours();
    if (hours < 8 || hours > 17) {
      Alert.alert('Error', 'La hora debe estar entre 08:00 y 17:00.');
      return false;
    }
    // Check for duplicate date/time
    const exists = appointments.some(app => app.date === data.date && app.time === data.time);
    if (exists) {
      Alert.alert('Error', 'Ya hay una cita programada para esa fecha y hora.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const appointment = {
      id: Date.now(),
      name,
      email,
      phone,
      date: date.toISOString().split('T')[0],
      time: time.toTimeString().slice(0, 5),
      vehicle,
      plate,
      status: 'Pendiente'
    };
    if (validateForm(appointment)) {
      saveAppointment(appointment);
      Alert.alert('Éxito', 'Cita agendada exitosamente.');
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setDate(new Date());
      setTime(new Date());
      setVehicle('');
      setPlate('');
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pendiente': return styles.pending;
      case 'En revisión': return styles.inReview;
      case 'Listo': return styles.ready;
      default: return styles.pending;
    }
  };

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentRow}>
      <Text style={styles.appCell}>{item.name}</Text>
      <Text style={styles.appCell}>{item.email}</Text>
      <Text style={styles.appCell}>{item.phone}</Text>
      <Text style={styles.appCell}>{item.vehicle}</Text>
      <Text style={styles.appCell}>{item.plate}</Text>
      <Text style={styles.appCell}>{item.date}</Text>
      <Text style={styles.appCell}>{item.time}</Text>
      <Text style={[styles.appCell, getStatusStyle(item.status)]}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Cita</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>Fecha: {date.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showDatePicker && <DateTimePicker value={date} mode="date" onChange={onDateChange} />}
      <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
        <Text>Hora: {time.toTimeString().slice(0, 5)}</Text>
      </TouchableOpacity>
      {showTimePicker && <DateTimePicker value={time} mode="time" onChange={onTimeChange} />}
      <TextInput style={styles.input} placeholder="Vehículo" value={vehicle} onChangeText={setVehicle} />
      <TextInput style={styles.input} placeholder="Placa" value={plate} onChangeText={setPlate} />
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Enviar Solicitud</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Mis Citas</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Nombre</Text>
        <Text style={styles.headerCell}>Email</Text>
        <Text style={styles.headerCell}>Teléfono</Text>
        <Text style={styles.headerCell}>Vehículo</Text>
        <Text style={styles.headerCell}>Placa</Text>
        <Text style={styles.headerCell}>Fecha</Text>
        <Text style={styles.headerCell}>Hora</Text>
        <Text style={styles.headerCell}>Estado</Text>
      </View>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id.toString()}
        style={styles.table}
      />
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  input: { height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, marginBottom: 15, paddingHorizontal: 15, backgroundColor: '#fff', justifyContent: 'center' },
  submitBtn: { backgroundColor: '#3498db', paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#ddd', padding: 10 },
  headerCell: { flex: 1, fontWeight: 'bold', textAlign: 'center', fontSize: 12 },
  table: { flex: 1 },
  appointmentRow: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  appCell: { flex: 1, textAlign: 'center', fontSize: 12 },
  pending: { color: '#f39c12' },
  inReview: { color: '#e67e22' },
  ready: { color: '#27ae60' },
  backBtn: { backgroundColor: '#95a5a6', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  backText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});