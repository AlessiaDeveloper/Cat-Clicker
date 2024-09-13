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
  FlatList,
  StatusBar,
} from "react-native";
import Achievment from "../data/Achievment";

export default function ModalAchievment() {
  const [modalVisible, setModalVisible] = useState(false);
  const renderItem = ({ item }) => {
    return (
      <View className="flex flex-row border-2 border-primary p-4 bg-secondary items-center justify-between ">
        <View className="flex-row flex-wrap w-full  justify-between items-center">
          <Text className="font-pregular w-3/6 text-primary text-xs">
            {item.name}
          </Text>
          <Pressable
            className="flex-row flex-wrap justify-between items-center"
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text className="text-md font-pregular text-secondary">
              8{" "}
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
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text className="text-2xl  my-5 font-pregular text-primary">
              LIst of Achievment
            </Text>

            <FlatList
              data={Achievment}
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
    width: 15,
    height: 15,
  },
});
