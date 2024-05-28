import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import configDB from "../../database/database";
import CardComponent from "../../components/card/CardComponent";
import ButtonAddComponent from "../../components/button/ButtonAddComponent";

export default function Matchs({ navigation }) {
  const [matchs, setMatchs] = useState([]);

  useEffect(() => {
    configDB.get("/matchs").then((response) => {
      setMatchs(response.data);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ButtonAddComponent
        navigateTo={() => navigation.navigate("Ajouter un match")}
        titleBtn={"Ajouter un match"}
      />

      <ScrollView>
        <View>
          {matchs.map((match) => (
            <CardComponent
              navigation={navigation}
              key={match.id}
              id={match.id}
              image={match.terrain.image}
              name={match.name}
              adresse={match.terrain.adresse}
              type={match.type}
              date={match.date}
              heure={match.heure}
              description={match.description}
              nbrInscrits={match.nbrInscrits}
              nbrParticipants={match.nbrParticipants}
              terrain_id={match.terrain_id}
              terrain_name={match.terrain.name}
              user_id={match.user_id}
              routeApi="matchs"
              routeName="VueCard"
              title="Match"
              titleBtn="PARTICIPER AU MATCH"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
