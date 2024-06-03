import React, { useContext, useState } from "react";
import { Input, Text } from "@rneui/themed";
import { ScrollView, StyleSheet, View } from "react-native";
import ButtonComponent from "../../button/ButtonComponent";
import { Ionicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import configDB from "../../../database/database";
import { errorToast, successToast } from "../../Toast/ToastMessage";
import { AuthContext } from "../../../context/AuthContext";

export default function EditPassword({ route, navigation }) {
  const { id } = route.params.data;
  const { getConfig } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isNewPasswordSecure, setIsNewPasswordSecure] = useState(true);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

  const editPassword = async () => {
    const data = {
      oldPassword: password, // Utilisez le mot de passe actuel
      newPassword: newPassword,
    };
    const config = await getConfig();
    try {
      const response = await configDB.put(
        `/users/${id}/password`,
        data,
        config
      );
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      successToast(response.data.message);
      navigation.navigate("Compte");
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };

  /*
   * Data Password
   * Why ?
   * User write old password
   * old passsword MATCH with password
   * */

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heightDimensions}>
        <View>
          <Text>Ancien mot de passe</Text>
          <Input
            placeholder="Entrer ancien mot de passe"
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
            containerStyle={styles.inputSpacing}
            inputContainerStyle={styles.inputContainer}
          />
        </View>
        <View>
          <Text>Nouveau mot de passe</Text>
          <Input
            placeholder="Entrer nouveau mot de passe"
            secureTextEntry={isNewPasswordSecure}
            onChangeText={(newPassword) => setNewPassword(newPassword)}
            value={newPassword}
            leftIcon={<Ionicons name="key-outline" size={18} color="black" />}
            rightIcon={
              isNewPasswordSecure ? (
                <Ionicons
                  name="eye-outline"
                  size={24}
                  color="black"
                  onPress={() => {
                    isNewPasswordSecure
                      ? setIsNewPasswordSecure(false)
                      : setIsNewPasswordSecure(true);
                  }}
                />
              ) : (
                <Ionicons
                  name="eye-off-outline"
                  size={24}
                  color="black"
                  onPress={() => {
                    setIsNewPasswordSecure(true);
                  }}
                />
              )
            }
            containerStyle={styles.inputSpacing}
            inputContainerStyle={styles.inputContainer}
          />
        </View>
        <View>
          <Text>Confirmer le mot de passe</Text>
          <Input
            placeholder="Confirmer nouveau mot de passe"
            secureTextEntry={isConfirmPasswordSecure}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
            value={confirmPassword}
            leftIcon={<Ionicons name="key-outline" size={18} color="black" />}
            rightIcon={
              isConfirmPasswordSecure ? (
                <Ionicons
                  name="eye-outline"
                  size={24}
                  color="black"
                  onPress={() => {
                    isConfirmPasswordSecure
                      ? setIsConfirmPasswordSecure(false)
                      : setIsConfirmPasswordSecure(true);
                  }}
                />
              ) : (
                <Ionicons
                  name="eye-off-outline"
                  size={24}
                  color="black"
                  onPress={() => {
                    setIsConfirmPasswordSecure(true);
                  }}
                />
              )
            }
            containerStyle={styles.inputSpacing}
            inputContainerStyle={styles.inputContainer}
          />
        </View>

        <ButtonComponent
          titleBtn={"MODIFIER"}
          action={editPassword}
        ></ButtonComponent>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
  },

  heightDimensions: {
    height: 500,
    justifyContent: "space-around",
  },
});
