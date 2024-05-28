import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Input, Text } from "@rneui/themed";
import {
  MaterialIcons,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import ButtonComponent from "../../button/ButtonComponent";
import { AuthContext } from "../../../context/AuthContext";
import configDB from "../../../database/database";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalComponent from "../../modal/ModalComponent";
import { SelectList } from "react-native-dropdown-select-list";
import { errorToast, successToast } from "../../Toast/ToastMessage";

export default function EditProfil({ navigation }) {
  const { userInfo, setUserInfo } = useContext(AuthContext);

  const [imageDownload, setImageDownload] = useState(false);

  //const [position, setPosition] = useState(false);

  const [infoUser, setUser] = useState({
    id: userInfo.id,
    avatar: userInfo.avatar,
    name: userInfo.name,
    username: userInfo.username,
    email: userInfo.email,
    password: userInfo.password,
    position: userInfo.position,
    height: userInfo.height,
    biography: userInfo.biography,
  });

  const listPosition = [
    { key: "Meneur", value: "Meneur" },
    { key: "Arriere", value: "Arriere" },
    { key: "Ailier", value: "Ailier" },
    { key: "Ailier fort", value: "Ailier fort" },
    { key: "Pivot", value: "Pivot" },
  ];

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false); // État pour suivre le chargement de l'image

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const pickImage = async () => {
    setVisible(false);
    // Si l'utilisateur a cliqué sur "OUI" dans le modal, alors continue avec pickImage
    await ImagePicker.requestMediaLibraryPermissionsAsync();

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
    onChangeImage(response.assets[0].uri);
    setImageDownload(true);
  };

  const canceledImage = () => {
    setImage(null);
    //setState(true);
  };

  const UpdateImg = async () => {
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

      try {
        const response = await configDB.put(
          `/users/${userInfo.id}/images`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const updatedUserAvatar = { ...userInfo, avatar: response.data.avatar };

        await AsyncStorage.setItem(
          "UserInfo",
          JSON.stringify(updatedUserAvatar)
        );

        setUserInfo(updatedUserAvatar);

        setUploading(false);

        successToast(response.data.message);
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

  const onChangeImage = (value) => {
    setUser({ ...infoUser, avatar: value });
  };

  const onChangeName = (value) => {
    setUser({ ...infoUser, name: value });
  };
  const onChangeUsername = (value) => {
    setUser({ ...infoUser, username: value });
  };
  const onChangeEmail = (value) => {
    setUser({ ...infoUser, email: value });
  };
  const onChangeHeight = (value) => {
    setUser({ ...infoUser, height: value });
  };
  const onChangeBiography = (value) => {
    setUser({ ...infoUser, biography: value });
  };

  const editUser = async () => {
    const data = {
      name: infoUser.name,
      username: infoUser.username,
      email: infoUser.email,
      position: infoUser.position,
      height: infoUser.height,
      biography: infoUser.biography,
    };

    try {
      const response = await configDB.put(`/users/${userInfo.id}`, data);

      const updatedUserInfo = {
        ...userInfo,
        id: userInfo.id,
        avatar: userInfo.avatar,
        name: data.name,
        username: data.username,
        email: data.email,
        password: userInfo.password,
        position: data.position,
        height: data.height,
        biography: data.biography,
      };

      await AsyncStorage.setItem("UserInfo", JSON.stringify(updatedUserInfo));

      setUserInfo(updatedUserInfo);
      successToast(response.data.message);
      navigation.navigate("Profil");
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View>
          {image ? (
            <>
              <Image source={{ uri: image }} style={styles.img} />
              <TouchableOpacity
                onPress={handleOpenModal}
                style={styles.btnCamera}
              >
                <Entypo name="camera" size={24} color="black" />
              </TouchableOpacity>

              <ModalComponent
                visible={visible}
                toggleOverlay={toggleOverlay}
                text={"Vous êtes sur le point de remplacer l'image actuelle !"}
                titleBtn={"OUI"}
                action={() => pickImage()}
              />
            </>
          ) : (
            <>
              <Image
                source={{
                  uri:
                    userInfo.avatar !==
                    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                      ? `${configDB.defaults.baseURL}/${userInfo.avatar}`
                      : userInfo.avatar,
                }}
                style={styles.img}
              />
              <TouchableOpacity
                onPress={handleOpenModal}
                style={styles.btnCamera}
              >
                <Entypo name="camera" size={24} color="black" />
              </TouchableOpacity>

              <ModalComponent
                visible={visible}
                toggleOverlay={toggleOverlay}
                text={"Vous êtes sur le point de remplacer l'image actuelle !"}
                titleBtn={"OUI"}
                action={() => pickImage()}
              />
            </>
          )}
        </View>
        {imageDownload ? (
          <TouchableOpacity onPress={UpdateImg}>
            <Text style={styles.titleEdit}>
              ENREGISTRER VOTRE PHOTO DE PROFIL
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View>
        <Text>Nom</Text>
        <Input
          placeholder="Entrer votre nom/prenom"
          onChangeText={(value) => onChangeName(value)}
          value={infoUser.name}
          leftIcon={<FontAwesome name="user" size={18} color="black" />}
          containerStyle={styles.inputSpacing}
          inputContainerStyle={styles.inputContainer}
        />
      </View>
      <View>
        <Text>Pseudo</Text>
        <Input
          placeholder="Entrer votre pseudo"
          onChangeText={(value) => onChangeUsername(value)}
          value={infoUser.username}
          leftIcon={<FontAwesome name="user" size={18} color="black" />}
          containerStyle={styles.inputSpacing}
          inputContainerStyle={styles.inputContainer}
        />
      </View>
      <View>
        <Text>Adresse email</Text>
        <Input
          placeholder="Entrer votre adresse email"
          onChangeText={(value) => onChangeEmail(value)}
          value={infoUser.email}
          leftIcon={<MaterialIcons name="email" size={18} color="black" />}
          containerStyle={styles.inputSpacing}
          inputContainerStyle={styles.inputContainer}
        />
      </View>
      <View>
        <Text>Mot de passe</Text>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("Mot de passe", {
              data: { id: userInfo.id },
            })
          }
          activeOpacity={0}
        >
          <View>
            <Input
              disabled
              placeholder="*****************"
              leftIcon={<FontAwesome6 name="key" size={18} color="black" />}
              containerStyle={styles.inputSpacing}
              inputContainerStyle={styles.inputContainer}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View>
        <Text>Poste</Text>
        <SelectList
          setSelected={(valType) => setUser({ ...infoUser, position: valType })}
          search={false}
          data={listPosition}
          save="value"
          defaultOption={{ key: "Meneur", value: "Meneur" }}
          inputStyles={{ color: "gray" }}
          boxStyles={{
            borderRadius: 30,
            backgroundColor: "rgba(217, 217, 217, 0.24)",
            borderColor: "rgba(217, 217, 217, 0.24)",
            margin: 5,
          }}
        />
      </View>
      <View>
        <Text>Taille</Text>
        <Input
          keyboardType="number-pad"
          placeholder="Entrer votre taille en cm"
          onChangeText={(value) => onChangeHeight(value)}
          value={infoUser.height}
          leftIcon={<MaterialIcons name="height" size={18} color="black" />}
          containerStyle={styles.inputSpacing}
          inputContainerStyle={styles.inputContainer}
        />
      </View>
      <View>
        <Text>Biographie</Text>
        <Input
          multiline
          textAlignVertical="top"
          style={{ fontSize: 16, height: 100 }}
          placeholder="Parlez-nous un peu de vous..."
          onChangeText={(value) => onChangeBiography(value)}
          value={infoUser.biography}
          leftIcon={<MaterialIcons name="book" size={18} color="black" />}
          containerStyle={styles.inputSpacing}
          inputContainerStyle={styles.inputContainer}
        />
      </View>

      <ButtonComponent titleBtn="MODIFIER" action={editUser} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  img: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    backgroundColor: "black",
    borderRadius: 200,
    borderColor: "#fff",
    borderWidth: 2,
  },

  btnCamera: {
    position: "absolute",
    right: 5,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: "#C2C2C2",
    padding: 10,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 2,
  },

  titleEdit: {
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.5,
    color: "#EF6C32",
    marginTop: 15,
  },

  inputSpacing: {
    padding: 0,
    margin: 5,
  },

  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: "rgba(217, 217, 217, 0.24)",
    borderRadius: 25,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
