import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import configDB from "../../database/database";
import CardComponent from "../../components/card/CardComponent";
import ButtonAddComponent from "../../components/button/ButtonAddComponent";

export default function Terrains({ navigation }) {
  const [terrains, setTerrains] = useState([]);

  useEffect(() => {
    configDB.get("/terrains").then((response) => {
      setTerrains(response.data);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ButtonAddComponent
        navigateTo={() => navigation.navigate("Ajouter un terrain")}
        titleBtn={"Ajouter un terrain"}
      />
      <ScrollView>
        <View>
          {terrains.map((terrain) => (
            <CardComponent
              navigation={navigation}
              key={terrain.id}
              id={terrain.id}
              image={terrain.image}
              name={terrain.name}
              adresse={terrain.adresse}
              latitude={terrain.latitude}
              longitude={terrain.longitude}
              nbrTerrains={terrain.nbrTerrains}
              nbrPaniers={terrain.nbrPaniers}
              user_id={terrain.user_id}
              routeApi="terrains"
              routeName="VueCard"
              title="Terrain"
              titleBtn="SIGNALER MA PRÉSENCE"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
