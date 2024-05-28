// In App.js in a new project

import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeTabNavigation from "./HomeTabNavigation.js";
import VueCard from "../components/card/VueCard.js";
import AddMatch from "../components/form/matchs/AddMatch.js";
import EditMatch from "../components/form/matchs/EditMatch.js";
import AddEvenement from "../components/form/evenements/AddEvenement.js";
import EditEvenement from "../components/form/evenements/EditEvenement.js";
import AddTerrain from "../components/form/terrains/AddTerrain.js";
import EditTerrain from "../components/form/terrains/EditTerrain.js";
import Inscription from "../screens/auth/Inscription.js";
import Connexion from "../screens/auth/Connexion.js";
import ForgotPassword from "../screens/auth/ForgotPassword/ForgotPassword.js";
import EditProfil from "../components/form/profil/EditProfil.js";
import EditPassword from "../components/form/profil/EditPassword.js";
import Settings from "../screens/settings/Settings.js";
import { AuthContext } from "../context/AuthContext.js";
import { ActivityIndicator, View } from "react-native";
import MesMatchs from "../screens/matchs/MesMatchs.js";
import MesEvenements from "../screens/evenements/MesEvenements.js";
import MesTerrains from "../screens/terrains/MesTerrains.js";

const Stack = createNativeStackNavigator();

function Router() {
  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          <>
            <Stack.Screen
              name="Accueil"
              component={HomeTabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VueCard"
              component={VueCard}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />
            {/* MATCH */}
            <Stack.Screen
              name="Mes matchs"
              component={MesMatchs}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Ajouter un match"
              component={AddMatch}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Modifier un match"
              component={EditMatch}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />
            {/* EVENEMENT */}
            <Stack.Screen
              name="Mes evenements"
              component={MesEvenements}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />

            <Stack.Screen
              name="Ajouter un evenement"
              component={AddEvenement}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Modifier un evenement"
              component={EditEvenement}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />
            {/* TERRAINS */}
            <Stack.Screen
              name="Mes terrains"
              component={MesTerrains}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />

            <Stack.Screen
              name="Ajouter un terrain"
              component={AddTerrain}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Modifier un terrain"
              component={EditTerrain}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Compte"
              component={EditProfil}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Mot de passe"
              component={EditPassword}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />
            <Stack.Screen
              name="Paramètres et Confidentialité"
              component={Settings}
              options={{ headerShown: true, headerTitleAlign: "center" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Connexion"
              component={Connexion}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Inscription"
              component={Inscription}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ title: "" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
