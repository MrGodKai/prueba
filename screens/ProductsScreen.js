import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';

const products = [
  { image: 'https://media.licdn.com/dms/image/v2/D4E12AQEvvrAa5mKR8Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696884157654?e=2147483647&v=beta&t=VyBL87EHcITjND3nYflH9Q1pnQyC2jV1TiH3JQf-2bI', title: 'Aceite para Motor', desc: 'Aceite sintético de alta calidad para mejorar el rendimiento del motor.', price: '$15 - $25', badge: 'Nuevo' },
  { image: 'https://media.licdn.com/dms/image/v2/D4E12AQEvvrAa5mKR8Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696884157654?e=2147483647&v=beta&t=VyBL87EHcITjND3nYflH9Q1pnQyC2jV1TiH3JQf-2bI', title: 'Filtro de Aire', desc: 'Filtro de aire para mantener el motor limpio.', price: '$10 - $20', badge: 'Disponible' },
  { image: 'https://media.licdn.com/dms/image/v2/D4E12AQEvvrAa5mKR8Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696884157654?e=2147483647&v=beta&t=VyBL87EHcITjND3nYflH9Q1pnQyC2jV1TiH3JQf-2bI', title: 'Batería', desc: 'Batería de larga duración para tu auto.', price: '$80 - $150', badge: 'Agotado' }
];

export default function ProductsScreen({ navigation }) {
  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      {item.badge && <Text style={styles.badge}>{item.badge}</Text>}
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDesc}>{item.desc}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Volver al Menú</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Nuestros <Text style={styles.span}>Productos</Text></Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        style={styles.productsGrid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  sectionTitle: { fontSize: 24, color: '#fff', textAlign: 'center', marginVertical: 20 },
  span: { color: '#ff4500' },
  productsGrid: { flex: 1 },
  productCard: { backgroundColor: '#111', padding: 20, margin: 10, borderRadius: 10, alignItems: 'center', position: 'relative' },
  badge: { position: 'absolute', top: 10, right: 10, backgroundColor: '#ff4500', color: '#fff', padding: 5, borderRadius: 5, fontSize: 10 },
  productImage: { width: 150, height: 100, borderRadius: 5, marginBottom: 10 },
  productTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  productDesc: { color: '#aaa', fontSize: 14, textAlign: 'center', marginVertical: 5 },
  productPrice: { color: '#ff4500', fontSize: 16, fontWeight: 'bold' },
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