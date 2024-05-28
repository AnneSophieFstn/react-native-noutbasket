import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import configDB from "../../database/database";
import CardComponent from "../../components/card/CardComponent";
import ButtonAddComponent from "../../components/button/ButtonAddComponent";
import { Button } from "@rneui/themed";
import { errorToast, successToast } from "../../components/Toast/ToastMessage";

export default function MesTerrains({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  let userLogId = userInfo.id;

  const [mesTerrains, setMesTerrains] = useState([]);

  const getMesTerrains = async () => {
    try {
      await configDB.get(`/terrains/${userLogId}`).then((response) => {
        setMesTerrains(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMesTerrains();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ButtonAddComponent
        navigateTo={() => navigation.navigate("Ajouter un terrain")}
        titleBtn={"Ajouter un terrain"}
      />
      <ScrollView>
        <View>
          <Button
            title="Toast success"
            onPress={() => successToast("Test success message")}
          />
          <Button
            title="Toast error"
            onPress={() => errorToast("Test error message")}
          />
          {mesTerrains.map((monTerrain) => (
            <CardComponent
              navigation={navigation}
              key={monTerrain.id}
              id={monTerrain.id}
              image={monTerrain.image}
              name={monTerrain.name}
              adresse={monTerrain.adresse}
              latitude={monTerrain.latitude}
              longitude={monTerrain.longitude}
              nbrTerrains={monTerrain.nbrTerrains}
              nbrPaniers={monTerrain.nbrPaniers}
              user_id={monTerrain.user_id}
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
