import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView, StatusBar } from "react-native";
import Home from "./pages/Home";
import Menu from "./pages/Menu";        
import { MenuManage } from "./pages/MenuManage";

const Stack = createNativeStackNavigator();
export default function App() {
  interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: string;
    course: "starters" | "mains" | "desserts";
  }

  const [menu, setMenu] = useState<MenuItem[]>([]);

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Menu">
          {(props) => <Menu {...props} menu={menu} />}
        </Stack.Screen>
        <Stack.Screen name="Manage">
          {(props) => <MenuManage {...props} menu={menu} setMenu={setMenu} />}
        </Stack.Screen>
      </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
