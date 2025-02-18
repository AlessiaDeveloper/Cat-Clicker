import { View, Text, Image } from "react-native";
import GameContext from "../store/GameProvider";

import { useContext } from "react";

const StrisciaValute = () => {
  const { scatolette, counterRinascita } = useContext(GameContext);
  return (
    <View className="flex flex-row justify-between border-b-2 bg-white border-primary w-full p-1">
      <Text className="text-lg font-pregular ml-2 text-primary">
        <Image
          className="w-6 h-5 mx-2"
          source={require("../../assets/images/scatoletta.png")}
        />
        <Text> {"  "}</Text>
        {scatolette}
      </Text>
      <Text className="text-lg font-pregular mr-2 text-primary">
        <Image
          className="w-6 h-5 mx-2"
          source={require("../../assets/images/rebirth.png")}
        />
        <Text> {"  "}</Text>
        {counterRinascita}
      </Text>
    </View>
  );
};

export default StrisciaValute;
