import { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import configDB from "../../database/database";
import CardComponent from "../../components/card/CardComponent";
import ButtonAddComponent from "../../components/button/ButtonAddComponent";

export default function MesEvenements({ navigation }) {
  const { userInfo, setIsLoading } = useContext(AuthContext);
  let userLogId = userInfo.id;

  const [mesEvenements, setMesEvenements] = useState([]);

  const getMesEvenements = async () => {
    try {
      await configDB.get(`/evenements/${userLogId}`).then((response) => {
        setMesEvenements(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMesEvenements();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ButtonAddComponent
        navigateTo={() => navigation.navigate("Ajouter un evenement")}
        titleBtn={"Ajouter un évènement"}
      />
      <ScrollView>
        <View>
          {mesEvenements.map((monEvenement) => (
            <CardComponent
              navigation={navigation}
              key={monEvenement.id}
              id={monEvenement.id}
              image={monEvenement.terrain.image}
              name={monEvenement.name}
              adresse={monEvenement.terrain.adresse}
              type={monEvenement.type}
              date={monEvenement.date}
              heure={monEvenement.heure}
              payant={monEvenement.payant}
              description={monEvenement.description}
              nbrInscrits={monEvenement.nbrInscrits}
              nbrPlaces={monEvenement.nbrPlaces}
              terrain_id={monEvenement.terrain_id}
              user_id={monEvenement.user_id}
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
