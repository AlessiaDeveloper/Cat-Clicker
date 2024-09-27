import { Image, View } from "react-native";
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
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#5D2E8C",
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="gattohome"
          options={{
            tabBarLabel: () => null,
            headerShown: false,
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
          name="Upgrade"
          options={{
            tabBarLabel: () => null,
            headerShown: false,

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
          name="Rinascita"
          options={{
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
