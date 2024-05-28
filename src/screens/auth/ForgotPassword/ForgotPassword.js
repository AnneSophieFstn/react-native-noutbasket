import React, { useEffect, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import ButtonComponent from "../../../components/button/ButtonComponent";
import { Input } from "@rneui/themed";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Playground from "../../../../assets/playground.jpg";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: Dimensions.get("window").width - 40,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={Playground}
            style={{
              height: 200,
              width: 200,
              marginBottom: 30,
              borderRadius: 200,
              borderColor: "green",
              overflow: "hidden",
            }}
            resizeMode="contain"
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}> MOT DE PASSE OUBLIÉ</Text>
          <Text>
            {" "}
            Veuillez entrer votre adresse email, un lien pour la
            réinitialisation de votre mot de passe va vous être envoyé !
          </Text>
        </View>

        <View style={{ marginTop: 15 }}>
          <Input
            placeholder="Adresse email"
            onChangeText={(email) => setEmail(email)}
            value={email}
            leftIcon={
              <MaterialIcons name="alternate-email" size={18} color="black" />
            }
            containerStyle={{
              padding: 0,
              margin: 5,
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "rgba(217, 217, 217, 0.24)",
              borderRadius: 25,
              paddingLeft: 15,
              paddingRight: 15,
            }}
          />
        </View>

        <ButtonComponent
          titleBtn="ENVOYER"
          action={() => console.log("OK MAIL")}
        />
      </View>
    </View>
  );
}
