import React, { useContext, useState } from "react";
import { Dimensions, ScrollView, Text, View, Image, Alert } from "react-native";
import configDB from "../../../database/database";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Input, Button } from "@rneui/base";
import ButtonComponent from "../../button/ButtonComponent";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../../context/AuthContext";
import { errorToast, successToast } from "../../Toast/ToastMessage";

function AddTerrain({ navigation }) {
  const apiKeyMaps = process.env.REACT_APP_API_KEY_MAPS;

  const { userInfo, userToken } = useContext(AuthContext);
  const [region, setRegion] = useState({
    latitude: -21.1088145,
    longitude: 55.5380413,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0521,
  });

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false); // État pour suivre le chargement de l'image
  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [nbrTerrains, setNbrTerrains] = useState("");
  const [nbrPaniers, setNbrPaniers] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission refusée",
        "Désolé, nous avons besoin d'accéder à votre galerie pour que cela fonctionne.",
        [{ text: "OK" }]
      );
      return;
    }

    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (response.canceled) {
      return;
    }

    setImage(response.assets[0].uri);
  };

  const canceledImage = () => {
    setImage(null);
    //setState(true);
  };

  const AddTerrain = async () => {
    if (image && !uploading) {
      setUploading(true);

      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];

      const formData = new FormData();
      formData.append("image", {
        uri: image,
        type: `image/${fileType}`,
        name: `image.${fileType}`,
      });

      formData.append("name", name);
      formData.append("adresse", adresse.adresse);
      formData.append("nbrTerrains", nbrTerrains);
      formData.append("nbrPaniers", nbrPaniers);
      formData.append("latitude", latitude.latitude);
      formData.append("longitude", longitude.longitude);
      formData.append("user_id", userInfo.id);

      try {
        const response = await configDB.post("/terrains", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        });

        successToast(response.data.message);
        setUploading(false);
        setImage("");
        setName("");
        setAdresse("");
        setNbrTerrains("");
        setNbrPaniers("");
        setLatitude("");
        setLongitude("");
        navigation.push("Accueil", { screen: "Terrains" });
      } catch (error) {
        errorToast(error.response.data.message);
      }
    } else {
      Alert.alert(
        "Aucune image sélectionnée",
        "Veuillez d'abord sélectionner une image.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      horizontal={false}
      style={{ flex: 1, marginBottom: 10 }}
    >
      <View
        style={{
          flexGrow: 1,
          margin: 10,
        }}
      >
        <View>
          <Text style={{ marginLeft: 5, marginBottom: 5, fontWeight: "bold" }}>
            Informations sur le terrain
          </Text>
          <Text style={{ marginLeft: 10, marginBottom: 5 }}>
            Donnez des infos sur ce terrain. S'il est ajouté à la carte, il sera
            visible par tout le monde.
          </Text>
        </View>
        <View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            horizontal={true}
            contentContainerStyle={{ flex: 1, width: "100%", height: "100%" }}
          >
            <GooglePlacesAutocomplete
              placeholder="Entrer l'adresse du terrain"
              fetchDetails={true}
              onFail={(error) => console.log(error)}
              GooglePlacesSearchQuery={{
                rankby: "distance",
              }}
              onNotFound={(test) => console.log(test)}
              onTimeout={(test) => console.log(test)}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                setRegion({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0521,
                });
                setAdresse({ adresse: details.formatted_address });
                setLatitude({ latitude: details.geometry.location.lat });
                setLongitude({ longitude: details.geometry.location.lng });
              }}
              textInputProps={{
                leftIcon: { type: "font-awesome", name: "chevron-left" },
                errorStyle: { color: "red" },
              }}
              query={{
                key: apiKeyMaps,
                language: "fr",
                components: "country:re",
                location: `${region.latitude}, ${region.longitude}`,
              }}
              styles={{
                //container: { flex: 0, position: "absolute", width: "100%", zIndex: 1, padding: 20 },
                listView: { backgroundColor: "white" },
              }}
            />
          </ScrollView>
        </View>
        <View style={{ height: 250, margin: 10, paddingBottom: 20 }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={region}
            showsUserLocation={true}
            /* ref = {ref => this.map = ref} */
          >
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              draggable={true}
            >
              <Callout>
                <Text>Je suis ici</Text>
              </Callout>
            </Marker>
          </MapView>
        </View>

        <View style={{ paddingBottom: 25 }}>
          <Text style={{ paddingBottom: 10, fontWeight: "bold" }}>
            Ajouter l'image du terrain
          </Text>
          {image ? (
            <>
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: 250 }}
              />

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  type="solid"
                  onPress={pickImage}
                  buttonStyle={{
                    backgroundColor: "#FF9A62",
                    marginTop: 8,
                    borderRadius: 10,
                  }}
                  disabled={uploading}
                >
                  <Ionicons name="images-outline" size={24} color="white" />
                  {"  "}Choisir une autre image
                </Button>
                <Button
                  type="outline"
                  onPress={canceledImage}
                  buttonStyle={{
                    marginTop: 8,
                    borderRadius: 10,
                    borderColor: "red",
                  }}
                  titleStyle={{
                    color: "red",
                  }}
                  disabled={uploading}
                >
                  <Ionicons name="close" size={24} color="red" />
                  {"  "}Annuler
                </Button>
              </View>
            </>
          ) : (
            <>
              <Image
                source={{
                  uri: "https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg",
                }}
                style={{ width: "100%", height: 250 }}
              />
              <Button
                type="solid"
                onPress={pickImage}
                buttonStyle={{
                  backgroundColor: "#FF9A62",
                  marginTop: 8,
                  borderRadius: 10,
                }}
                disabled={uploading}
              >
                <Ionicons name="images-outline" size={24} color="white" />
                {"  "}Choisir l'image depuis ma galerie
              </Button>
            </>
          )}

          {/* <ButtonComponent
            titleBtn="AJOUTER"
            action={AddTerrain}
            disabled={uploading || !image}
          /> */}
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Nom du terrain</Text>
          <Input
            placeholder="Nom du terrain"
            onChangeText={(name) => setName(name)}
            value={name}
            leftIcon={<Ionicons name="basketball" size={18} color="black" />}
            containerStyle={{
              padding: 0,
              margin: 5,
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "rgba(217, 217, 217, 0.24)",
              borderRadius: 25,
              paddingLeft: 15,
              paddingRight: 15,
            }}
          />
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Nombre de terrain(s)</Text>
          <Input
            keyboardType="number-pad"
            placeholder="0"
            onChangeText={(nbrTerrains) => setNbrTerrains(nbrTerrains)}
            underlineColorAndroid="transparent"
            value={nbrTerrains}
            leftIcon={
              <MaterialCommunityIcons name="numeric" size={18} color="black" />
            }
            containerStyle={{
              padding: 0,
              margin: 5,
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "rgba(217, 217, 217, 0.24)",
              borderRadius: 25,
              paddingLeft: 15,
              paddingRight: 15,
            }}
          />
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>Nombre de panier(s)</Text>
          <Input
            keyboardType="number-pad"
            placeholder="0"
            onChangeText={(nbrPaniers) => setNbrPaniers(nbrPaniers)}
            underlineColorAndroid="transparent"
            value={nbrPaniers}
            leftIcon={
              <MaterialCommunityIcons name="numeric" size={18} color="black" />
            }
            containerStyle={{
              padding: 0,
              margin: 5,
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              backgroundColor: "rgba(217, 217, 217, 0.24)",
              borderRadius: 25,
              paddingLeft: 15,
              paddingRight: 15,
            }}
          />
        </View>
        <ButtonComponent titleBtn="AJOUTER" action={AddTerrain} />
      </View>
    </ScrollView>
  );
}

export default AddTerrain;
