import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import logo from "./assets/logo.png"
import { FontAwesome6 } from '@expo/vector-icons'
import Home from './src/pages/Home.js'
import Faq from './src/pages/Faq.js'
import ProfileScreen from './src/pages/Profile.js';

const DropdownMenu = ({ onClose, onLogout, onNavigate }) => (

  <View style={styles.dropdownMenu}>

    <TouchableOpacity style={styles.dropdownItem} onPress={() => { onClose(); onNavigate('FAQ'); }}>
      <FontAwesome6 name="circle-info" size={16} color="#02356c" style={styles.dropdownIcon} />
      <Text style={styles.dropdownText}>FAQ</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.dropdownItem} onPress={() => { onClose(); onNavigate('Perfil'); }}>
      <FontAwesome6 name="user" size={16} color="#02356c" style={styles.dropdownIcon} />
      <Text style={styles.dropdownText}>Perfil</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.dropdownItem, styles.logoutItem]} onPress={() => { onClose(); onLogout(); }}>
      <FontAwesome6 name="right-from-bracket" size={16} color="#ED6665" style={styles.dropdownIcon} />
      <Text style={[styles.dropdownText, { color: '#ED6665', fontWeight: 'bold' }]}>Sair</Text>
    </TouchableOpacity>

  </View>
)

export default function App() {
  const [activeTab, setActiveTab] = useState('Home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    alert("Usuário Desconectado com sucesso!")
  }

  const renderScreen = () => {
    if (activeTab === 'Home') {
      return <Home />;
    } else if (activeTab === 'FAQ') {
      return <Faq />;

    } else if (activeTab === 'Perfil') {
      return <ProfileScreen />;
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setActiveTab('Home')}>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesome6 name="bars" size={24} color="#02356c" />
        </TouchableOpacity>

        {isMenuOpen && (
          <DropdownMenu
            onClose={() => setIsMenuOpen(false)}
            onLogout={handleLogout}
            onNavigate={setActiveTab}
          />
        )}
      </View>

      <View style={styles.boxMainContent}>
        <View style={styles.mainContent}>
          {renderScreen()}
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxMainContent: {
    flex: 1,
    backgroundColor: '#222222',
    padding: 15,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#ffffffff',
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    marginTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height: 60,
    position: 'relative',
    zIndex: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 50,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 55,
    right: 10,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownText: {
    fontSize: 16,
    color: '#02356c',
    marginLeft: 10,
  },
  dropdownIcon: {
    width: 20,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  }
});
