import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import configDB from "../../database/database";
import CardComponent from "../../components/card/CardComponent";
import ButtonAddComponent from "../../components/button/ButtonAddComponent";

export default function Evenements({ navigation }) {
  const [evenements, setEvenements] = useState([]);

  useEffect(() => {
    configDB.get("/evenements").then((response) => {
      setEvenements(response.data);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ButtonAddComponent
        navigateTo={() => navigation.navigate("Ajouter un evenement")}
        titleBtn={"Ajouter un évènement"}
      />

      <ScrollView>
        <View>
          {evenements.map((evenement) => (
            <CardComponent
              navigation={navigation}
              key={evenement.id}
              id={evenement.id}
              image={evenement.terrain.image}
              name={evenement.name}
              adresse={evenement.terrain.adresse}
              type={evenement.type}
              date={evenement.date}
              heure={evenement.heure}
              payant={evenement.payant}
              description={evenement.description}
              nbrInscrits={evenement.nbrInscrits}
              nbrPlaces={evenement.nbrPlaces}
              terrain_id={evenement.terrain_id}
              user_id={evenement.user_id}
              routeApi="evenements"
              routeName="VueCard"
              title="Evenement"
              titleBtn="PARTICIPER À L'ÉVÈNEMENT"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
