import { Button } from "@rneui/themed";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import configDB from "../../database/database";
import { StatusBar } from "expo-status-bar";

function Profil({ navigation }) {
  const { userInfo } = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="white" />
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Paramètres et Confidentialité")}
          style={{
            position: "absolute",
            right: 20,
            top: 30,
            zIndex: 1000,
            backgroundColor: "#000",
            padding: 10,
            borderRadius: 50,
          }}
        >
          <Feather name="settings" size={24} color="white" />
        </TouchableOpacity>

        <Image
          source={{
            uri:
              userInfo.avatar !==
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                ? `${configDB.defaults.baseURL}/${userInfo.avatar}`
                : userInfo.avatar,
          }}
          style={{
            width: "100%",
            height: 250,
            resizeMode: "contain",
            backgroundColor: "black",
          }}
        />
        <View style={{ margin: 15 }}>
          {userInfo.name ? (
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              {userInfo.name}
            </Text>
          ) : null}
          <Text style={{ color: "black", fontWeight: "700", fontSize: 15 }}>
            @{userInfo.username}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5 name="basketball-ball" size={18} color="black" />
            <Text style={{ color: "#C2C2C2", paddingLeft: 8 }}>
              {userInfo.position}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="human-male-height"
              size={18}
              color="black"
            />
            <Text style={{ color: "#C2C2C2", paddingLeft: 8 }}>
              {userInfo.height}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo name="location-pin" size={18} color="black" />
            <Text style={{ color: "#C2C2C2", paddingLeft: 8 }}>
              Saint-Gilles les Bains
            </Text>
          </View>
        </View>
        <View style={{ margin: 10 }}>
          <Text style={{ color: "#C2C2C2" }}>{userInfo.biography}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 15,
          }}
        >
          <Button
            onPress={() => navigation.navigate("Compte")}
            titleStyle={{
              color: "#000",
              fontSize: 15,
            }}
            buttonStyle={{
              paddingTop: 3,
              paddingBottom: 3,
              borderRadius: 20,
              paddingLeft: 25,
              paddingRight: 25,
              backgroundColor: "#D9D9D9",
            }}
          >
            Modifier mon profil
          </Button>
          <Button
            onPress={() => console.log("ok partage profil btn")}
            titleStyle={{
              color: "#000",
              fontSize: 15,
            }}
            buttonStyle={{
              paddingTop: 3,
              paddingBottom: 3,
              borderRadius: 20,
              paddingLeft: 25,
              paddingRight: 25,
              backgroundColor: "#D9D9D9",
            }}
          >
            Partager mon profil
          </Button>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: "rgba(0, 0, 0, 0.1)",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
          }}
        ></View>

        <View>
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>
            {" "}
            Statistiques
          </Text>
        </View>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <View
            style={{
              margin: 20,
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              borderColor: "#D9D9D9",
              width: 150,
            }}
          >
            {/* Rectangle */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* ICON + NUMBER */}

              <MaterialCommunityIcons
                name="basketball-hoop"
                size={19}
                color="#EF6C32"
              />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  paddingLeft: 10,
                }}
              >
                00
              </Text>
            </View>
            {/* TEXT */}
            <Text style={{ color: "#9F9F9F", fontWeight: "bold" }}>
              Match(s) créer
            </Text>
          </View>
          <View
            style={{
              margin: 20,
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              borderColor: "#D9D9D9",
              width: 150,
            }}
          >
            {/* Rectangle */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* ICON + NUMBER */}
              <MaterialIcons name="event" size={18} color="#EF6C32" />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  paddingLeft: 10,
                }}
              >
                00
              </Text>
            </View>
            {/* TEXT */}
            <Text style={{ color: "#9F9F9F", fontWeight: "bold" }}>
              Évènement(s) créer
            </Text>
          </View>
          <View
            style={{
              margin: 20,
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              borderColor: "#D9D9D9",
              width: 150,
            }}
          >
            {/* Rectangle */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* ICON + NUMBER */}
              <FontAwesome5 name="basketball-ball" size={15} color="#EF6C32" />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  paddingLeft: 10,
                }}
              >
                00
              </Text>
            </View>
            {/* TEXT */}
            <Text style={{ color: "#9F9F9F", fontWeight: "bold" }}>
              Match(s) jouer
            </Text>
          </View>
          <View
            style={{
              margin: 20,
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              borderColor: "#D9D9D9",
              width: 150,
            }}
          >
            {/* Rectangle */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* ICON + NUMBER */}
              <MaterialIcons name="emoji-events" size={18} color="#EF6C32" />

              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  paddingLeft: 10,
                }}
              >
                00
              </Text>
            </View>
            {/* TEXT */}
            <Text style={{ color: "#9F9F9F", fontWeight: "bold" }}>
              Évènement(s) jouer
            </Text>
          </View>
          <View
            style={{
              margin: 20,
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
              borderColor: "#D9D9D9",
              width: 150,
            }}
          >
            {/* Rectangle */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* ICON + NUMBER */}
              <AntDesign name="infocirlce" size={18} color="#EF6C32" />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  paddingLeft: 10,
                }}
              >
                00
              </Text>
            </View>
            {/* TEXT */}
            <Text style={{ color: "#9F9F9F", fontWeight: "bold" }}>
              Terrain(s) créer
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default Profil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
