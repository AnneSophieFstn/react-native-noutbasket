import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import Home from "../screens/Home";
import Matchs from "../screens/matchs/Matchs.js";
import Maps from "../screens/carte/Maps.js";
import Evenements from "../screens/evenements/Evenements.js";
import Terrains from "../screens/terrains/Terrains";
import Profil from "../screens/profile/Profil";

const Tab = createBottomTabNavigator();

function HomeTabNavigation({ color }) {
  return (
    <Tab.Navigator
      initialRouteName="Carte"
      screenOptions={{
        tabBarActiveTintColor: "#FF9A62",
      }}
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="Terrains"
        component={Terrains}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Terrains",
          tabBarIcon: ({ color }) => (
            <Ionicons name="basketball" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Matchs"
        component={Matchs}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Matchs",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="basketball-hoop"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Carte"
        component={Maps}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="google-maps"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Evenements"
        component={Evenements}
        options={{
          headerTitleAlign: "center",
          tabBarLabel: "Evenements",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeTabNavigation;
