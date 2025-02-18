import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import Search from "../page/search";
import Dashboard from "../page/dashboard";
import List from "../page/list";
import Info from "../page/info";
import User from "../page/user";

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};
// 第一层路由 -- 堆栈导航器
const Stack = createNativeStackNavigator();

const RootStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

const BootmTab = createBottomTabNavigator();
const BottomTabNavigator = () => (
  <BootmTab.Navigator>
    <BootmTab.Screen
      name="Dashboard"
      component={Dashboard}
      options={({ navigation }) => ({
        title: "首页",
        tabBarIcon: ({ color }) => (
          <AntDesign name="dashboard" size={24} color={color} />
        ),
      })}
    />
    <BootmTab.Screen
      name="List"
      component={List}
      options={({ navigation }) => ({
        title: "新闻",
        headerTitle: "搜索",
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate("Search")}>
            <AntDesign name="search1" size={18} style={styles.right_btn} />
          </Pressable>
        ),
        tabBarIcon: ({ color }) => (
          <AntDesign name="chrome" size={24} color={color} />
        ),
      })}
    />
    <BootmTab.Screen
      name="Info"
      component={Info}
      options={({ navigation }) => ({
        title: "信息",
        tabBarIcon: ({ color }) => (
          <AntDesign name="copy1" size={24} color={color} />
        ),
      })}
    />
    <BootmTab.Screen
      name="User"
      component={User}
      options={({ navigation }) => ({
        title: "我的",
        tabBarIcon: ({ color }) => (
          <AntDesign name="user" size={24} color={color} />
        ),
      })}
    />
  </BootmTab.Navigator>
);

const styles = StyleSheet.create({
  right_btn: {
    marginRight: 16,
  },
});

export default Navigation;
