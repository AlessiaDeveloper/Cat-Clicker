import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  View,
  Image,
  Text,
  SafeAreaView,
} from "react-native";

export default function ModalAchievment() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
        style={styles.centeredView}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text className="text-2xl font-pregular text-primary">
              LIst of Achievment
            </Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-sm font-pregular text-white">
                Compra il primo cat bistrot
              </Text>
              <Text className="text-lg font-pregular text-secondary">
                8{" "}
                <Image
                  style={styles.image}
                  source={require("../../assets/images/scatoletta.png")}
                />
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-md font-pregular text-white">
                Compra la prima red dot gym
              </Text>
              <Text className="text-lg font-pregular text-secondary">
                8{" "}
                <Image
                  style={styles.image}
                  source={require("../../assets/images/scatoletta.png")}
                />
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-md font-pregular text-white">
                Porta il bistrot a livello 5
              </Text>
              <Text className="text-lg font-pregular flex justify-end text-secondary">
                8{" "}
                <Image
                  style={styles.image}
                  source={require("../../assets/images/scatoletta.png")}
                />
              </Text>
            </Pressable>
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
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    width: 300,
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
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    alignItems: "center",
  },
  buttonOpen: {},
  buttonClose: {
    backgroundColor: "#5D2E8C",
    borderColor: "yellow",
    borderWidth: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  icona: { width: 60, height: 60, top: -7 },
  image: {
    marginTop: 5,
    width: 20,
    height: 20,
  },
});
