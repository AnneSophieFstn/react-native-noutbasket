import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import configDB from "../../database/database.js";
import SearchTerrains from "../../components/search/searchTerrains.js";
import { errorToast } from "../../components/Toast/ToastMessage.js";
import { AuthContext } from "../../context/AuthContext.js";

export default function Maps() {
  const { setIsLoading } = useContext(AuthContext);

  let initialState = {
    latitude: -21.1088145,
    longitude: 55.5380413,
    latitudeDelta: 0.7,
    longitudeDelta: 0.7,
  };

  const [terrains, setTerrains] = useState([]);
  const [isInit, setIsInit] = useState(true);

  const getAllTerrains = async () => {
    try {
      //setIsLoading(true);
      const response = await configDB.get("/terrains");
      //console.log(response);

      if (response && response.data) {
        setTerrains(response.data);
      } else {
        errorToast("Erreur lors de la récupération des terrains");
      }
      //setIsLoading(false);
    } catch (error) {
      console.error(error);
      //errorToast("Erreur");
    }
  };

  useEffect(() => {
    getAllTerrains();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={initialState}
        showsUserLocation={true}
      >
        {terrains.map((marker) => {
          return (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.name}
            >
              <Image
                source={require("../../../assets/pin-basketball.png")}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </Marker>
          );
        })}
      </MapView>

      <View
        style={{
          bottom: "90%",
        }}
      >
        {/* <SearchTerrains /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
