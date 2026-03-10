import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';

const timelineEvents = [
  { year: '2005', title: 'Fundación', desc: 'Nuestro taller automotriz nació con la visión de dos amigos apasionados por la mecánica...' },
  { year: '2008', title: 'Innovación Tecnológica', desc: 'Incorporamos el primer scanner de diagnóstico avanzado...' },
  { year: '2013', title: 'Primera Sucursal', desc: 'Abrimos nuestra primera sucursal...' },
  { year: '2019', title: 'Certificación y Expansión', desc: 'Obtuvimos la certificación nacional...' },
  { year: '2026', title: 'Sostenibilidad y Futuro', desc: 'Continuamos renovando nuestras instalaciones...' }
];

const galleryImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80'
];

export default function AboutScreen({ navigation }) {
  const renderEvent = ({ item }) => (
    <View style={styles.timelineItem}>
      <View style={styles.marker}></View>
      <View style={styles.content}>
        <Text style={styles.year}>{item.year}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
    </View>
  );

  const renderImage = ({ item }) => (
    <Image source={{ uri: item }} style={styles.galleryImage} />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Volver al Menú</Text>
      </TouchableOpacity>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Nuestra <Text style={styles.span}>Historia</Text></Text>
      </View>
      <View style={styles.timeline}>
        <FlatList
          data={timelineEvents}
          renderItem={renderEvent}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Text style={styles.galleryTitle}>Galería</Text>
      <FlatList
        data={galleryImages}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        style={styles.gallery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  hero: { alignItems: 'center', padding: 40, backgroundColor: '#111' },
  heroTitle: { fontSize: 32, color: '#fff' },
  span: { color: '#ff4500' },
  timeline: { padding: 20 },
  timelineItem: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
  marker: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#ff4500', marginRight: 20 },
  content: { flex: 1 },
  year: { fontSize: 18, color: '#ff4500', fontWeight: 'bold' },
  title: { fontSize: 16, color: '#fff', fontWeight: 'bold', marginVertical: 5 },
  desc: { fontSize: 14, color: '#aaa' },
  galleryTitle: { fontSize: 24, color: '#fff', textAlign: 'center', margin: 20 },
  gallery: { padding: 10 },
  galleryImage: { width: 100, height: 80, margin: 5, borderRadius: 5 },
  backBtn: { 
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#ff4500', 
    padding: 10, 
    borderRadius: 5, 
    zIndex: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  backText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  }
});