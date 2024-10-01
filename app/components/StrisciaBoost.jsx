import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";

const StrisciaBoost = () => {
  //qui ci sarà la funzione che prende il counter e lo moltlipica
  const handleCounterEdificiMoltl = {};
  return (
    <View className="flex flex-row  justify-start items-center border-t-2 border-secondary bg-primary w-full p-2 px-2">
      {/* //boost autogenerazione click 60 sec */}
      <Pressable className="flex flex-col mr-2 border-2 rounded-md border-secondary  justify-center">
        <Image
          style={styles.imageBoost}
          source={require("../../assets/images/zampa.png")}
        />
        <Text className="font-pregular text-secondary border-t-1 border-secondary items-center px-1 justify-center text-xs">
          01:00
        </Text>
      </Pressable>
      {/* //boost autogenerazione click 60 sec */}
      <Pressable
        onPress={handleCounterEdificiMoltl}
        className="flex flex-col mr-2 border-2 rounded-md border-secondary  justify-center"
      >
        <Image
          style={styles.imageBoost}
          source={require("../../assets/images/stella.png")}
        />
        <Text className="font-pregular text-secondary justify-center px-1  text-xs">
          12:00
        </Text>
      </Pressable>
      <Pressable className="flex flex-col border-2 rounded-md border-secondary  justify-center">
        <Image
          style={styles.imageBoost}
          source={require("../../assets/images/clessidra.png")}
        />
        <Text className="font-pregular text-secondary justify-center px-1 text-xs">
          12:00
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  imageBoost: {
    width: 37,
    height: 37,
  },
});
export default StrisciaBoost;
