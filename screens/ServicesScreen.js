import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';

const services = [
  { icon: 'fas fa-oil-can', title: 'Mantenimiento General', description: 'Cambio de aceite y filtros, Revisión de motor y fluidos, Chequeo preventivo completo', price: 'Desde $50', badge: 'Más pedido' },
  { icon: 'fas fa-car-crash', title: 'Frenos y Suspensión', description: 'Inspección y cambio de pastillas/discos, Alineación y balanceo, Reparación de amortiguadores', price: 'Desde $35', badge: 'Popular' },
  { icon: 'fas fa-bolt', title: 'Sistema Eléctrico', description: 'Diagnóstico de batería y alternador, Reparación de cableado y luces, Instalación de accesorios eléctricos', price: 'Desde $30', badge: 'Nuevo' },
  { icon: 'fas fa-tools', title: 'Diagnóstico Computarizado', description: 'Escaneo de errores y sensores, Consultas de ECU, Informe detallado al cliente', price: 'Desde $25', badge: 'Rápido' },
  { icon: 'fas fa-sync-alt', title: 'Transmisión', description: 'Mantenimiento de caja, Cambio de aceite de transmisión, Reparación de embrague', price: 'Desde $60', badge: 'Confiable' },
  { icon: 'fas fa-snowflake', title: 'Climatización', description: 'Recarga de A/C, Reparación de compresores, Limpieza de ductos', price: 'Desde $50', badge: 'Garantizado' },
  { icon: 'fas fa-car', title: 'Alineación y Balanceo', description: 'Alineación de ruedas (4 puntos), Balanceo dinámico y estático, Inspección de suspensión', price: 'Desde $45', badge: 'Premium' },
  { icon: 'fas fa-tint', title: 'Cambio de Fluidos', description: 'Cambio de aceite motor, Cambio de líquido de frenos, Cambio de refrigerante', price: 'Desde $40', badge: 'Rápido' },
  { icon: 'fas fa-cogs', title: 'Reparación de Motor', description: 'Reparación de fugas, Revisión de válvulas, Cambio de correas', price: 'Desde $80', badge: 'Especialidad' }
];

export default function ServicesScreen({ navigation }) {
  const renderService = ({ item }) => (
    <View style={styles.serviceCard}>
      {item.badge && <Text style={styles.badge}>{item.badge}</Text>}
      <Text style={styles.serviceIcon}>{item.icon}</Text>
      <Text style={styles.serviceTitle}>{item.title}</Text>
      <Text style={styles.serviceDesc}>{item.description}</Text>
      <Text style={styles.servicePrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Volver al Menú</Text>
      </TouchableOpacity>
      <Text style={styles.heroTitle}>Servicios <Text style={styles.span}>Profesionales</Text></Text>
      <Text style={styles.heroDesc}>Reparación y mantenimiento automotriz con garantía de calidad</Text>
      <TouchableOpacity style={styles.ctaBtn} onPress={() => navigation.navigate('Appointment')}>
        <Text style={styles.ctaText}>Agendar Cita</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Nuestros <Text style={styles.span}>Servicios</Text></Text>
      <Text style={styles.intro}>Ofrecemos una amplia gama de servicios automotrices con calidad garantizada y precios competitivos. Cada trabajo se realiza con atención al detalle por profesionales certificados.</Text>
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        style={styles.servicesGrid}
      />
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>¿Necesitas un Servicio?</Text>
        <Text style={styles.ctaDesc}>Contacta con nosotros hoy y obtén un diagnóstico gratuito</Text>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Appointment')}>
          <Text style={styles.primaryText}>Agendar Cita</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('Contact')}>
          <Text style={styles.secondaryText}>Contactar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  heroTitle: { fontSize: 32, color: '#fff', textAlign: 'center', marginTop: 20 },
  span: { color: '#ff4500' },
  heroDesc: { fontSize: 16, color: '#aaa', textAlign: 'center', marginVertical: 10 },
  ctaBtn: { backgroundColor: '#ff4500', padding: 15, borderRadius: 5, alignSelf: 'center', marginBottom: 20 },
  ctaText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 24, color: '#fff', textAlign: 'center', marginVertical: 20 },
  intro: { fontSize: 14, color: '#aaa', textAlign: 'center', marginBottom: 20 },
  servicesGrid: { flex: 1 },
  serviceCard: { backgroundColor: '#111', padding: 20, margin: 10, borderRadius: 10, alignItems: 'center', position: 'relative' },
  badge: { position: 'absolute', top: 10, right: 10, backgroundColor: '#ff4500', color: '#fff', padding: 5, borderRadius: 5, fontSize: 10 },
  serviceIcon: { fontSize: 40, color: '#ff4500', marginBottom: 10 },
  serviceTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  serviceDesc: { color: '#aaa', fontSize: 14, textAlign: 'center', marginVertical: 10 },
  servicePrice: { color: '#ff4500', fontSize: 16, fontWeight: 'bold' },
  ctaSection: { alignItems: 'center', marginTop: 20, paddingBottom: 40 },
  ctaTitle: { fontSize: 24, color: '#fff', textAlign: 'center' },
  ctaDesc: { fontSize: 16, color: '#aaa', textAlign: 'center', marginVertical: 10 },
  primaryBtn: { backgroundColor: '#ff4500', padding: 15, borderRadius: 5, width: 200, alignItems: 'center', margin: 10 },
  primaryText: { color: '#fff', fontWeight: 'bold' },
  secondaryBtn: { backgroundColor: '#333', padding: 15, borderRadius: 5, width: 200, alignItems: 'center', margin: 10 },
  secondaryText: { color: '#fff', fontWeight: 'bold' },
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