import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import configDB from "../../database/database";
import CardComponent from "../../components/card/CardComponent";
import ButtonAddComponent from "../../components/button/ButtonAddComponent";

export default function MesMatchs({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  let userLogId = userInfo.id;

  const [mesMatchs, setMesMatchs] = useState([]);

  const getMesMatchs = async () => {
    try {
      await configDB.get(`/matchs/test/${userLogId}`).then((response) => {
        setMesMatchs(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMesMatchs();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ButtonAddComponent
        navigateTo={() => navigation.navigate("Ajouter un match")}
        titleBtn={"Ajouter un match"}
      />
      <ScrollView>
        <View>
          {mesMatchs.map((monMatch) => (
            <CardComponent
              navigation={navigation}
              key={monMatch.id}
              id={monMatch.id}
              image={monMatch.terrain.image}
              name={monMatch.name}
              adresse={monMatch.terrain.adresse}
              type={monMatch.type}
              date={monMatch.date}
              heure={monMatch.heure}
              payant={monMatch.payant}
              description={monMatch.description}
              nbrInscrits={monMatch.nbrInscrits}
              nbrParticipants={monMatch.nbrParticipants}
              terrain_id={monMatch.terrain_id}
              user_id={monMatch.user_id}
              routeApi="matchs"
              routeName="VueCard"
              title="Match"
              titleBtn="PARTICIPER À L'ÉVÈNEMENT"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
