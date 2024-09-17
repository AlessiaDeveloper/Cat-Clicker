import React, { useState, useContext } from "react";
import {
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
import Achievment from "../data/Achievment";
import EdificiData from "../data/EdificiData"; // Importa i dati degli edifici

export default function ModalAchievment() {
  const [modalVisible, setModalVisible] = useState(false);
  const { specialCurrency, setSpecialCurrency, levels } =
    useContext(GameContext);

  // Stato per gestire se l'achievement è stato riscattato
  const [achievements, setAchievements] = useState(
    Achievment.map((achievement) => ({
      ...achievement,
      claimed: false, // Aggiunge una proprietà claimed
    }))
  );

  const incrementCurrency = (id, amount) => {
    setSpecialCurrency(specialCurrency + amount); // Incrementa la valuta speciale

    // Imposta l'achievement come "claimed"
    setAchievements((prevAchievements) => {
      const updatedAchievements = prevAchievements.map((achievement) =>
        achievement.id === id ? { ...achievement, claimed: true } : achievement
      );

      return sortAchievements(updatedAchievements); // Ordina gli achievement dopo il riscatto
    });
  };

  // Funzione per controllare se il livello richiesto è soddisfatto
  const canClaim = (achievement) => {
    const building = EdificiData.find(
      (b) => b.levelKey === achievement.requiredBuildingKey
    );
    if (!building) return false; // Se non trova l'edificio, non è possibile claimmare
    const currentLevel = levels[building.levelKey] || 0; // Livello attuale dell'edificio
    return currentLevel >= achievement.requiredLevel;
  };

  // Funzione per ordinare gli achievement, mettendo quelli claimabili in cima
  const sortAchievements = (achievementsList) => {
    const claimable = [];
    const notClaimable = [];
    const claimed = [];

    achievementsList.forEach((achievement) => {
      if (achievement.claimed) {
        claimed.push(achievement);
      } else if (canClaim(achievement)) {
        claimable.push(achievement);
      } else {
        notClaimable.push(achievement);
      }
    });

    // Gli achievement claimabili sono messi in cima, seguiti da quelli non claimabili e infine da quelli già riscattati
    return [...claimable, ...notClaimable, ...claimed];
  };

  const renderItem = ({ item }) => {
    const isClaimable = canClaim(item); // Controlla se è possibile claimmare
    return (
      <View className="flex flex-row border-2 border-secondary p-4 bg-primary items-center justify-between">
        <View className="flex-row flex-wrap w-full justify-between items-center">
          <Text className="font-pregular w-3/6 text-secondary text-xs">
            {item.name}
          </Text>

          <Pressable
            className="flex-row flex-wrap justify-between items-center"
            style={[
              styles.button,
              item.claimed || !isClaimable
                ? styles.buttonDisabled
                : styles.buttonClose,
            ]}
            onPress={() => {
              if (!item.claimed && isClaimable) {
                incrementCurrency(item.id, 8); // Incrementa solo se non è stato riscattato
              }
            }}
            disabled={item.claimed || !isClaimable} // Disabilita se già riscattato o se il livello richiesto non è soddisfatto
          >
            <Text className="text-lg font-pregular text-primary">
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
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text className="text-2xl my-5 font-pregular text-primary">
              List of Achievements
            </Text>

            <FlatList
              data={sortAchievements(achievements)} // Ordina gli achievement
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
  buttonClose: {
    backgroundColor: "#5D2E8C",
    borderColor: "yellow",
    borderWidth: 2,
  },
  buttonDisabled: {
    backgroundColor: "#B0B0B0",
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
