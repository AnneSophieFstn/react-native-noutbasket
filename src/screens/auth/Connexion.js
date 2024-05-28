import React, { useContext, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import ButtonComponent from "../../components/button/ButtonComponent";
import { Input } from "@rneui/themed";
import LogoApp from "../../../assets/logo-app.png";
import { AuthContext } from "../../context/AuthContext";

function Connexion({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(false);

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
          <Image source={LogoApp} style={styles.img} resizeMode="contain" />
        </View>
        <View style={{}}>
          <Input
            placeholder="Entrer votre adresse email"
            onChangeText={(email) => setEmail(email)}
            value={email}
            leftIcon={
              <MaterialIcons name="alternate-email" size={18} color="black" />
            }
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainer}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Input
            placeholder="Entrer votre mot de passe"
            secureTextEntry={isPasswordSecure}
            onChangeText={(password) => setPassword(password)}
            value={password}
            leftIcon={<Ionicons name="key-outline" size={18} color="black" />}
            rightIcon={
              isPasswordSecure ? (
                <Ionicons
                  name="eye-outline"
                  size={24}
                  color="black"
                  onPress={() => {
                    isPasswordSecure
                      ? setIsPasswordSecure(false)
                      : setIsPasswordSecure(true);
                  }}
                />
              ) : (
                <Ionicons
                  name="eye-off-outline"
                  size={24}
                  color="black"
                  onPress={() => {
                    setIsPasswordSecure(true);
                  }}
                />
              )
            }
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainer}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <ButtonComponent
            titleBtn="Connexion"
            action={() => login(email, password)}
          />
          <View style={{ alignItems: "center" }}>
            <View style={{ margin: 15 }}>
              <Text>
                Vous n'avez pas de compte ?{" "}
                <Text
                  style={{ fontWeight: "bold" }}
                  onPress={() => navigation.push("Inscription")}
                >
                  S'inscrire
                </Text>
              </Text>
            </View>
            <View>
              <Text>
                Mot de passe oublié ?{" "}
                <Text
                  style={{ fontWeight: "bold" }}
                  onPress={() => navigation.push("ForgotPassword")}
                >
                  Cliquez-ici
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Connexion;

const styles = StyleSheet.create({
  img: {
    height: 300,
    width: 300,
    marginBottom: 30,
    borderRadius: 200,
    borderColor: "green",
    overflow: "hidden",
  },

  containerStyle: {
    padding: 0,
    margin: 5,
  },

  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: "rgba(217, 217, 217, 0.24)",
    borderRadius: 25,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
