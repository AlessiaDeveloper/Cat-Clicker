import { Image, View, Text } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import icons from "../../constants/icons";

const TabIcon = ({ focusedIcon, unfocusedIcon, focused }) => {
  return (
    <View>
      <Image
        source={focused ? focusedIcon : unfocusedIcon}
        resizeMode="contain"
        className="w-12 h-12"
      />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#5D2E8C",
            height: 70,
          },
        }}
      >
        <Tabs.Screen
          name="gattohome"
          options={{
            title: "GattoHome",
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focusedIcon={icons.gattoIconSp}
                unfocusedIcon={icons.gattoIcon}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Potenziamenti"
          options={{
            title: "Potenziamenti",
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focusedIcon={icons.fulmineSp}
                unfocusedIcon={icons.fulmine}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Shop"
          options={{
            title: "Shop",
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focusedIcon={icons.crocSp}
                unfocusedIcon={icons.croc}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="rinascita"
          options={{
            title: "rinascita",
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focusedIcon={icons.rinascitaSp}
                unfocusedIcon={icons.rinascita}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
