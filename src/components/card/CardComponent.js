import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import configDB from "../../database/database";

export default function CardComponent({
  navigation,
  id,
  name,
  image,
  type,
  payant,
  date,
  heure,
  adresse,
  latitude,
  longitude,
  description,
  nbrTerrains,
  nbrPaniers,
  nbrPlaces,
  nbrInscrits,
  nbrParticipants,
  terrain_id,
  terrain_name,
  user_id,
  routeApi,
  routeName,
  title,
  titleBtn,
}) {
  const handleShowDetails = () => {
    const data = {
      id,
      name,
      image,
      type,
      payant,
      date,
      heure,
      adresse,
      latitude,
      longitude,
      description,
      nbrTerrains,
      nbrPaniers,
      nbrPlaces,
      nbrInscrits,
      nbrParticipants,
      terrain_id,
      terrain_name,
      user_id,
      title,
      titleBtn,
      routeApi,
      routeName,
    };

    navigation.navigate(routeName, { data });
  };

  return (
    <TouchableOpacity onPress={handleShowDetails} style={{ marginBottom: 5 }}>
      <View style={styles.card}>
        {image && (
          <Image
            source={{
              uri: `${configDB.defaults.baseURL}/${image}`,
            }}
            style={{ width: "100%", height: 150, resizeMode: "stretch" }}
            onError={(error) =>
              console.error("Erreur de chargement de l'image : ", error)
            }
          />
        )}

        {/* <View style={styles.infos}> */}
        <View style={styles.infos}>
          <Text style={{ fontSize: 23, paddingTop: 8, paddingBottom: 10 }}>
            {name}
          </Text>
          {type && date && heure && (
            <Text>
              <Text style={{ color: "#FF9A62" }}>{type}</Text>
              <Text> le </Text>
              <Text style={{ color: "#FF9A62" }}>{date}</Text>
              <Text> à </Text>
              <Text style={{ color: "#FF9A62" }}>{heure}</Text>
            </Text>
          )}
          <Text style={{ fontSize: 13, color: "#595959" }}>{adresse}</Text>
        </View>

        {/* <View style={{ alignItems: "center" }}>
            {nbrParticipants && (
              <View style={{ margin: 8 }}>
                <Text style={{ fontSize: 12, color: "#FF9A62" }}>
                  {nbrParticipants} places
                </Text>
                <Text style={{ fontSize: 12 }}>restantes!</Text>
              </View>
            )}
            <Button
              radius={"sm"}
              type="outline"
              buttonStyle={{
                backgroundColor: "rgba(220, 88, 25, 0.05)",
                borderColor: "#FF9A62",
                borderWidth: 2,
                height: 30,
                padding: 0,
              }}
              titleStyle={{ color: "#FF9A62", fontSize: 12 }}
              onPress={handleShowDetails}
            >
              <Ionicons
                name="basketball"
                size={15}
                color="#FF9A62"
                style={{ marginRight: 5 }}
              />
              Voir plus
            </Button>
          </View> 
        </View>*/}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 260,
    margin: 5,
    borderRadius: 15,
    backgroundColor: "#EDEDED",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: { width: 0, height: 2 }, // Décalage horizontal et vertical de l'ombre
    shadowOpacity: 3,
    shadowRadius: 4,
    elevation: 5,
  },

  infos: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
