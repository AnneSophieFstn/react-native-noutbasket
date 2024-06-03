import { useContext, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, Image, ScrollView, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import ButtonComponent from "../../button/ButtonComponent";
import { Input, Button } from "@rneui/base";
import configDB from "../../../database/database";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../../context/AuthContext";
import { errorToast, successToast } from "../../Toast/ToastMessage";

function EditTerrain({ route, navigation }) {
  const apiKeyMaps = process.env.REACT_APP_API_KEY_MAPS;

  const { userInfo, userToken } = useContext(AuthContext);

  const { data } = route.params;
  const ref = useRef();
  const [uploading, setUploading] = useState(false); // État pour suivre le chargement de l'image
  const [imageUri, setImageUri] = useState(null);
  const [region, setRegion] = useState({
    latitude: data.latitude,
    longitude: data.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [terrain, setTerrain] = useState({
    id: data["id"],
    image: data["image"],
    name: data["name"],
    nbrPaniers: data["nbrPaniers"],
    adresse: data["adresse"],
    nbrTerrains: data["nbrTerrains"],
    latitude: data["latitude"],
    longitude: data["longitude"],
    user_id: userInfo.id,
  });
  const [newImageSelected, setNewImageSelected] = useState(false);

  const pickImage = async () => {
    const showConfirmationAlert = () => {
      Alert.alert(
        "ATTENTION",
        "Vous êtes sur le point de remplacer l'image actuelle, TOUTE ACTION EST IRRÉVERSIBLE ! En êtes-vous sûr ?",
        [
          {
            text: "Oui",
            onPress: async () => {
              // Si l'utilisateur clique sur "Oui", continuez avec la demande de permission
              const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
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
              });

              if (response.canceled) {
                return;
              }

              setImageUri(response.assets[0].uri);
              onChangeImage(response.assets[0].uri);
              setNewImageSelected(true);
            },
          },
          {
            text: "Non",
            onPress: () => {
              // Si l'utilisateur clique sur "Non", ne faites rien
            },
            style: "cancel",
          },
        ]
      );
    };

    // Affichez l'alerte de confirmation
    showConfirmationAlert();
  };

  const canceledImage = () => {
    Alert.alert(
      "ATTENTION",
      "Vous êtes sur le point de supprimer l'image, en êtes vous sur ?",
      [{ text: "OK" }]
    );
    onChangeImage(data.image);
    //setState(true);
  };

  const onChangeImage = (value) => {
    setTerrain({ ...terrain, image: value });
  };
  const onChangeName = (value) => {
    setTerrain({ ...terrain, name: value });
  };
  const onChangeNbrPaniers = (value) => {
    setTerrain({ ...terrain, nbrPaniers: value });
  };
  const onChangeAdresse = (value) => {
    setTerrain({ ...terrain, adresse: value });
  };
  const onChangeNbrTerrains = (value) => {
    setTerrain({ ...terrain, nbrTerrains: value });
  };
  const onChangeLatitude = (value) => {
    setTerrain({ ...terrain, latitude: value });
  };
  const onChangeLongitude = (value) => {
    setTerrain({ ...terrain, longitude: value });
  };

  const editDataTerrain = async () => {
    const formData = new FormData();
    if (newImageSelected) {
      const uriParts = terrain.image.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("image", {
        uri: terrain.image,
        type: `image/${fileType}`,
        name: `image.${fileType}`,
      });
    }

    formData.append("id", terrain.id);
    formData.append("image", terrain.image);
    formData.append("name", terrain.name);
    formData.append("adresse", ref.current?.getAddressText());
    formData.append("nbrTerrains", terrain.nbrTerrains);
    formData.append("nbrPaniers", terrain.nbrPaniers);
    formData.append("latitude", terrain.latitude);
    formData.append("longitude", terrain.longitude);
    formData.append("user_id", terrain.user_id);

    try {
      const response = await configDB.put(`/terrains/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      });
      successToast(response.data.message);
      navigation.push("Mes terrains");
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };

  useEffect(() => {
    ref.current?.setAddressText(terrain.adresse);
  }, []);

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
            Modifier les informations à propos de ce terrain. Attention, votre
            demande va être envoyé à notre administrateur pour confirmer les
            modifications.
          </Text>
        </View>

        <View>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            horizontal={true}
            contentContainerStyle={{ flex: 1, width: "100%", height: "100%" }}
          >
            <GooglePlacesAutocomplete
              ref={ref}
              placeholder="Modifier l'adresse du terrain"
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
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                });
                onChangeAdresse({ adresse: details.formatted_address });
                onChangeLatitude({ latitude: details.geometry.location.lat });
                onChangeLongitude({ longitude: details.geometry.location.lng });
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
            style={{
              flex: 1,
            }}
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
            Changer l'image du terrain
          </Text>
          {/* {terrain.image ? (
            <> */}
          <Image
            source={{
              uri: imageUri || `${configDB.defaults.baseURL}/${data.image}`,
            }}
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
                backgroundColor: "orange",
              }}
              disabled={uploading}
            >
              <Ionicons name="images-outline" size={24} color="white" />
              {"  "}Choisir une autre image
            </Button>
            <Button
              type="solid"
              onPress={canceledImage}
              buttonStyle={{
                backgroundColor: "red",
              }}
              disabled={uploading}
            >
              <Ionicons name="images-outline" size={24} color="white" />
              {"  "}Annuler
            </Button>
          </View>
          {/* </>
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
                  backgroundColor: "orange",
                }}
                disabled={uploading}
              >
                <Ionicons name="images-outline" size={24} color="white" />
                {"  "}Choisir l'image depuis ma galerie
              </Button>
            </>
          )} */}
        </View>

        <View>
          <Text>Nom du terrain</Text>
          <Input
            placeholder="Nom du terrain"
            onChangeText={(value) => onChangeName(value)}
            value={terrain.name}
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
          <Text>Nombre de terrain(s)</Text>
          <Input
            keyboardType="number-pad"
            placeholder="0"
            onChangeText={(value) => onChangeNbrTerrains(value)}
            underlineColorAndroid="transparent"
            value={terrain.nbrTerrains.toString()}
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
          <Text>Nombre de panier(s)</Text>
          <Input
            keyboardType="number-pad"
            placeholder="0"
            onChangeText={(value) => onChangeNbrPaniers(value)}
            underlineColorAndroid="transparent"
            value={terrain.nbrPaniers.toString()}
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
        <ButtonComponent titleBtn="MODIFIER" action={editDataTerrain} />
      </View>
    </ScrollView>
  );
}

export default EditTerrain;
