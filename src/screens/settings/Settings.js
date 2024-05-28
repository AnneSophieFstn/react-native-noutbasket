import { Text } from "@rneui/themed";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Fontisto,
} from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import ModalComponent from "../../components/modal/ModalComponent";

export default function Settings({ navigation }) {
  const { userInfo, logout, deleteAccount } = useContext(AuthContext);

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleOpenModal = () => {
    setVisible(true);
  };
  return (
    <View style={styles.container}>
      {/* MON COMPTE */}
      <View style={{}}>
        <Text style={styles.titleSettings}>Mon compte</Text>
        <TouchableHighlight
          onPress={() => console.log("test")}
          underlayColor="rgba(217, 217, 217, 0.24)"
        >
          <View style={styles.row}>
            <MaterialIcons name="notifications-on" size={18} color="#EF6C32" />
            <Text style={styles.subtext}>Notifications</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => navigation.navigate("Mes matchs")}
          underlayColor="rgba(217, 217, 217, 0.24)"
        >
          <View style={styles.row}>
            <Ionicons name="basketball-outline" size={20} color="#EF6C32" />
            <Text style={styles.subtext}>Mes matchs</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => navigation.navigate("Mes evenements")}
          underlayColor="rgba(217, 217, 217, 0.24)"
        >
          <View style={styles.row}>
            <MaterialIcons name="event-available" size={19} color="#EF6C32" />
            <Text style={styles.subtext}>Mes évènements</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => navigation.navigate("Mes terrains")}
          underlayColor="rgba(217, 217, 217, 0.24)"
        >
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="basketball-hoop-outline"
              size={18}
              color="#EF6C32"
            />
            <Text style={styles.subtext}>Mes terrains</Text>
          </View>
        </TouchableHighlight>
      </View>
      {/* PLUS D'INFORMATIONS ET SUPPORT */}
      <View>
        <Text style={styles.titleSettings}>Plus d’informations et support</Text>
        <TouchableHighlight
          onPress={() => console.log("test")}
          underlayColor="rgba(217, 217, 217, 0.24)"
        >
          <View style={styles.row}>
            <Fontisto name="email" size={19} color="#EF6C32" />
            <Text style={styles.subtext}>Nous contacter</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => console.log("test")}
          underlayColor="rgba(217, 217, 217, 0.24)"
        >
          <View style={styles.row}>
            <FontAwesome name="file-text-o" size={18} color="#EF6C32" />
            <Text style={styles.subtext}>Politique de confidentialité</Text>
          </View>
        </TouchableHighlight>
      </View>
      {/* MON COMPTE */}
      <View>
        <Text style={styles.titleSettings}>Connexion</Text>
        <TouchableHighlight
          onPress={() => logout()}
          underlayColor="rgba(217, 217, 217, 0.24)"
        >
          <View style={styles.row}>
            <MaterialIcons name="logout" size={18} color="#EF6C32" />
            <Text style={styles.subtext}>Déconnexion</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleOpenModal()}
          underlayColor="rgba(217, 217, 217, 0.24)"
        >
          <View style={styles.row}>
            <MaterialIcons name="delete-forever" size={18} color="red" />
            <Text style={styles.subtextRed}>
              Fermer le compte définitivement
            </Text>
          </View>
        </TouchableHighlight>

        <ModalComponent
          visible={visible}
          toggleOverlay={toggleOverlay}
          text={
            "Vous êtes sur le point de supprimer votre compte définitivement !"
          }
          titleBtn={"OUI"}
          action={() => deleteAccount(userInfo.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 15,
    backgroundColor: "#fff",
  },

  titleSettings: {
    color: "#8E8E8E",
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 20,
    paddingLeft: 15,
  },

  subtext: {
    paddingLeft: 10,
    fontWeight: "bold",
  },
  subtextRed: {
    paddingLeft: 10,
    fontWeight: "bold",
    color: "red",
  },
});
