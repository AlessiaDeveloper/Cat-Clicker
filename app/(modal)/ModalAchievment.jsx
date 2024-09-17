import React, { useState, useContext } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import GameContext from "../store/GameProvider";
import Achievment from "../data/Achievment"; // Importa l'elenco di achievement

export default function ModalAchievment() {
  const [modalVisible, setModalVisible] = useState(false);
  const { specialCurrency, setSpecialCurrency } = useContext(GameContext);

  // Stato per gestire se l'achievement è stato riscattato
  const [achievements, setAchievements] = useState(
    Achievment.map((achievement) => ({
      ...achievement,
      claimed: false, // Aggiunge una proprietà claimed
    }))
  );

  const incrementCurrency = (id, amount) => {
    // Incrementa la valuta speciale
    setSpecialCurrency(specialCurrency + amount);

    // Aggiorna l'achievement per settare "claimed" a true e spostarlo in fondo
    setAchievements((prevAchievements) => {
      const updatedAchievements = prevAchievements.map((achievement) => {
        if (achievement.id === id) {
          return { ...achievement, claimed: true }; // Imposta claimed a true
        }
        return achievement;
      });

      // Sposta gli achievement già riscattati in fondo
      const claimedAchievements = updatedAchievements.filter(
        (achievement) => achievement.claimed
      );
      const unclaimedAchievements = updatedAchievements.filter(
        (achievement) => !achievement.claimed
      );

      return [...unclaimedAchievements, ...claimedAchievements]; // Unisci prima gli unclaimed e poi i claimed
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View className="flex flex-row border-2 border-primary p-4 bg-secondary items-center justify-between">
        <View className="flex-row flex-wrap w-full justify-between items-center">
          <Text className="font-pregular w-3/6 text-primary text-xs">
            {item.name}
          </Text>

          <Pressable
            className="flex-row flex-wrap justify-between items-center"
            style={[
              styles.button,
              item.claimed ? styles.buttonDisabled : styles.buttonClose,
            ]}
            onPress={() => {
              if (!item.claimed) {
                incrementCurrency(item.id, 8); // Incrementa solo se non è già stato riscattato
              }
            }}
            disabled={item.claimed} // Disabilita il bottone se claimed è true
          >
            <Text className="text-md font-pregular text-secondary">
              {item.claimed ? "Riscattato" : "8 "}
              <Image
                style={styles.image}
                source={require("../../assets/images/scatoletta.png")}
              />
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Modal
        style={styles.centeredView}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text className="text-2xl my-5 font-pregular text-primary">
              List of Achievements
            </Text>

            <FlatList
              data={achievements} // Usa lo stato achievements aggiornato
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-xl font-pregular text-secondary">
                Chiudi
              </Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require("./../../assets/images/achievment.png")}
          style={styles.icona}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    width: 300,
    height: "70%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    alignItems: "center",
  },
  buttonOpen: {},
  buttonClose: {
    backgroundColor: "#5D2E8C",
    borderColor: "yellow",
    borderWidth: 2,
  },
  buttonDisabled: {
    backgroundColor: "#B0B0B0", // Colore diverso per il bottone disabilitato
    borderColor: "gray",
    borderWidth: 2,
  },
  icona: {
    width: 60,
    height: 60,
    top: -7,
  },
  image: {
    marginTop: 5,
    width: 15,
    height: 15,
  },
});
