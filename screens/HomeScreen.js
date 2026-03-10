import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';

const features = [
  { icon: 'fas fa-tools', text: 'Herramientas Avanzadas' },
  { icon: 'fas fa-clock', text: 'Servicio Rápido' },
  { icon: 'fas fa-shield-alt', text: 'Garantía de Calidad' }
];

const gallerySlides = [
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', caption: 'Cambio de aceite' },
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', caption: 'Revisión de frenos' },
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', caption: 'Diagnóstico de motor' },
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', caption: 'Sistema eléctrico' },
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', caption: 'Suspensión' },
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', caption: 'Llantas' }
];

const processSteps = [
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', title: 'Recepción del Vehículo' },
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', title: 'Inspección Inicial' },
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', title: 'Diagnóstico' },
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', title: 'Cotización' },
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', title: 'Reparación' },
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', title: 'Pruebas Finales' },
  { image: 'https://gmaocloud.es/wp-content/uploads/2022/07/Software-GMAO-mecanico.jpg', title: 'Entrega' }
];

const services = [
  { icon: 'fas fa-tools', title: 'Mantenimiento general', description: 'Revisión completa del vehículo, incluyendo fluidos, filtros y componentes esenciales.', price: 'Desde $50' },
  { icon: 'fas fa-bolt', title: 'Sistema eléctrico', description: 'Reparación de fallas eléctricas, batería, alternador y luces.', price: 'Desde $30' },
  { icon: 'fas fa-car-crash', title: 'Suspensión', description: 'Revisión y reparación de amortiguadores y dirección asistida.', price: 'Desde $40' },
  { icon: 'fas fa-shield-alt', title: 'Frenos', description: 'Cambio de pastillas, discos y revisión completa del sistema de frenado.', price: 'Desde $35' },
  { icon: 'fas fa-sync-alt', title: 'Transmisión', description: 'Mantenimiento y reparación de caja de cambios manual o automática.', price: 'Desde $60' },
  { icon: 'fas fa-snowflake', title: 'Climatización', description: 'Recarga y reparación de a/c y calefacción.', price: 'Desde $45' }
];

const products = [
  { image: 'https://media.licdn.com/dms/image/v2/D4E12AQEvvrAa5mKR8Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696884157654?e=2147483647&v=beta&t=VyBL87EHcITjND3nYflH9Q1pnQyC2jV1TiH3JQf-2bI', title: 'Aceite para Motor', description: 'Aceite sintético de alta calidad para mejorar el rendimiento del motor.', price: '$15 - $25' },
  { image: 'https://media.licdn.com/dms/image/v2/D4E12AQEvvrAa5mKR8Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696884157654?e=2147483647&v=beta&t=VyBL87EHcITjND3nYflH9Q1pnQyC2jV1TiH3JQf-2bI', title: 'Filtro de Aire', description: 'Filtro de aire para mantener el motor limpio.', price: '$10 - $20' },
  { image: 'https://media.licdn.com/dms/image/v2/D4E12AQEvvrAa5mKR8Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696884157654?e=2147483647&v=beta&t=VyBL87EHcITjND3nYflH9Q1pnQyC2jV1TiH3JQf-2bI', title: 'Batería', description: 'Batería de larga duración para tu auto.', price: '$80 - $150' }
];

const testimonials = [
  { quote: '"Excelente servicio, mi auto quedó como nuevo. Muy profesionales y puntuales."', name: '- Juan Pérez' },
  { quote: '"Recomiendo este taller a todos. Precios justos y trabajo de calidad."', name: '- María González' },
  { quote: '"El diagnóstico fue preciso y la reparación rápida. ¡Gracias!"', name: '- Carlos Rodríguez' }
];

export default function HomeScreen({ navigation }) {
  const sections = [
    { type: 'header', data: [{}] },
    { type: 'gallery', data: gallerySlides },
    { type: 'steps', data: processSteps },
    { type: 'services', data: services },
    { type: 'products', data: products },
    { type: 'testimonials', data: testimonials }
  ];

  const getSectionStyle = (type) => {
    switch (type) {
      case 'gallery': return styles.carousel;
      case 'steps': return styles.steps;
      case 'services': return styles.servicesGrid;
      case 'products': return styles.productsGrid;
      case 'testimonials': return styles.testimonials;
      default: return {};
    }
  };

  const renderFeature = ({ item }) => (
    <View style={styles.feature}>
      <Text style={styles.featureIcon}>{item.icon}</Text>
      <Text style={styles.featureText}>{item.text}</Text>
    </View>
  );

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Image source={{ uri: item.image }} style={styles.slideImage} />
      <Text style={styles.slideCaption}>{item.caption}</Text>
    </View>
  );

  const renderStep = ({ item }) => (
    <View style={styles.stepBox}>
      <Image source={{ uri: item.image }} style={styles.stepImage} />
      <Text style={styles.stepTitle}>{item.title}</Text>
    </View>
  );

  const renderService = ({ item }) => (
    <View style={styles.serviceCard}>
      <Text style={styles.serviceIcon}>{item.icon}</Text>
      <Text style={styles.serviceTitle}>{item.title}</Text>
      <Text style={styles.serviceDesc}>{item.description}</Text>
      <Text style={styles.servicePrice}>{item.price}</Text>
    </View>
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDesc}>{item.description}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
  );

  const renderTestimonial = ({ item }) => (
    <View style={styles.testimonialBox}>
      <Text style={styles.quoteIcon}>fas fa-quote-left</Text>
      <Text style={styles.quote}>{item.quote}</Text>
      <Text style={styles.testimonialName}>{item.name}</Text>
    </View>
  );

  const renderItem = ({ item, section }) => {
    if (section.type === 'header') {
      return (
        <View style={styles.home}>
          <Text style={styles.homeTitle}>Mantenimiento <Text style={styles.span}>Profesional</Text></Text>
          <Text style={styles.homeDesc}>Expertos en reparación y mantenimiento automotriz. Confía en nosotros para cuidar tu vehículo con la mejor tecnología y atención personalizada.</Text>
          <FlatList
            data={features}
            renderItem={renderFeature}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            style={styles.features}
            scrollEnabled={false}
          />
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Services')}>
            <Text style={styles.btnText}>Nuestros Servicios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.secondary]} onPress={() => navigation.navigate('Appointment')}>
            <Text style={styles.btnText}>Agendar Cita</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (section.type === 'gallery') {
      return renderSlide({ item });
    } else if (section.type === 'steps') {
      return renderStep({ item });
    } else if (section.type === 'services') {
      return renderService({ item });
    } else if (section.type === 'products') {
      return renderProduct({ item });
    } else if (section.type === 'testimonials') {
      return renderTestimonial({ item });
    }
  };

  const renderSectionHeader = ({ section }) => {
    if (section.type === 'gallery') {
      return <Text style={styles.sectionTitle}>Lo que <Text style={styles.span}>hacemos</Text></Text>;
    } else if (section.type === 'steps') {
      return <Text style={styles.sectionTitle}>Nuestro <Text style={styles.span}>Proceso</Text></Text>;
    } else if (section.type === 'services') {
      return <Text style={styles.sectionTitle}>Nuestros <Text style={styles.span}>Servicios</Text></Text>;
    } else if (section.type === 'products') {
      return <Text style={styles.sectionTitle}>Nuestros <Text style={styles.span}>Productos</Text></Text>;
    } else if (section.type === 'testimonials') {
      return <Text style={styles.sectionTitle}>Opiniones de <Text style={styles.span}>Clientes</Text></Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Volver al Menú</Text>
      </TouchableOpacity>
      <FlatList
        data={sections}
        renderItem={({ item, index }) => {
          const section = sections[index];
          return (
            <View>
              {renderSectionHeader({ section })}
              {section.type === 'header' ? renderItem({ item, section }) : (
                <FlatList
                  data={section.data}
                  renderItem={(itemData) => renderItem({ item: itemData.item, section })}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={section.type === 'gallery' || section.type === 'steps' || section.type === 'testimonials'}
                  numColumns={section.type === 'services' ? 2 : 1}
                  showsHorizontalScrollIndicator={false}
                  scrollEnabled={false}
                  style={getSectionStyle(section.type)}
                />
              )}
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  flatList: { flex: 1 },
  home: { alignItems: 'center', padding: 20, backgroundColor: '#111', minHeight: 400 },
  homeTitle: { fontSize: 28, color: '#fff', textAlign: 'center', marginBottom: 10 },
  span: { color: '#ff4500' },
  homeDesc: { fontSize: 16, color: '#aaa', textAlign: 'center', marginBottom: 20 },
  features: { marginBottom: 20 },
  feature: { alignItems: 'center', margin: 10 },
  featureIcon: { fontSize: 24, color: '#fff' },
  featureText: { fontSize: 14, color: '#fff', textAlign: 'center' },
  btn: { backgroundColor: '#ff4500', padding: 15, borderRadius: 5, margin: 10, width: 200, alignItems: 'center' },
  secondary: { backgroundColor: '#333' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 24, color: '#fff', textAlign: 'center', margin: 20 },
  carousel: { maxHeight: 200 },
  slide: { width: 200, margin: 10 },
  slideImage: { width: 200, height: 150, borderRadius: 10 },
  slideCaption: { color: '#fff', textAlign: 'center', marginTop: 5 },
  steps: { maxHeight: 150 },
  stepBox: { width: 120, alignItems: 'center', margin: 10 },
  stepImage: { width: 100, height: 80, borderRadius: 5 },
  stepTitle: { color: '#fff', fontSize: 12, textAlign: 'center' },
  servicesGrid: { padding: 10 },
  serviceCard: { backgroundColor: '#111', padding: 15, margin: 10, borderRadius: 10, alignItems: 'center', flex: 1 },
  serviceIcon: { fontSize: 30, color: '#ff4500', marginBottom: 10 },
  serviceTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  serviceDesc: { color: '#aaa', fontSize: 12, textAlign: 'center', marginVertical: 5 },
  servicePrice: { color: '#ff4500', fontSize: 14 },
  productsGrid: { padding: 10 },
  productCard: { backgroundColor: '#111', padding: 15, margin: 10, borderRadius: 10, alignItems: 'center' },
  productImage: { width: 100, height: 100, borderRadius: 5, marginBottom: 10 },
  productTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  productDesc: { color: '#aaa', fontSize: 12, textAlign: 'center', marginVertical: 5 },
  productPrice: { color: '#ff4500', fontSize: 14 },
  testimonials: { maxHeight: 150 },
  testimonialBox: { width: 250, backgroundColor: '#111', padding: 15, margin: 10, borderRadius: 10, alignItems: 'center' },
  quoteIcon: { fontSize: 20, color: '#ff4500', marginBottom: 10 },
  quote: { color: '#fff', fontSize: 14, textAlign: 'center', fontStyle: 'italic' },
  testimonialName: { color: '#aaa', fontSize: 12, marginTop: 10 },
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