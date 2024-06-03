import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Input } from "@rneui/themed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";
import ButtonComponent from "../../button/ButtonComponent";
import configDB from "../../../database/database";
import { AuthContext } from "../../../context/AuthContext";
import { errorToast, successToast } from "../../Toast/ToastMessage";

function EditMatch({ route, navigation }) {
  const { data } = route.params;

  const { userInfo, getConfig } = React.useContext(AuthContext);

  const [match, setMatch] = React.useState({
    id: data["id"],
    name: data["name"],
    type: data["type"],
    date: data["date"],
    heure: data["heure"],
    terrain_id: data["terrain_id"],
    terrain_name: data["terrain_name"],
    nbrParticipants: data["nbrParticipants"],
    description: data["description"],
  });

  const [date, setDate] = React.useState(new Date());
  const [originalfullDate, setOriginalfullDate] = React.useState("");
  const [fullDate, setfullDate] = React.useState("");
  const [heure, setHeure] = React.useState("");
  const [time, setTime] = React.useState(new Date());

  const [test, setTest] = React.useState(data.terrain_name);

  const [dataListTerrains, setDataListTerrains] = React.useState([]);
  const [selected, setSelected] = React.useState("");

  const [show, setShow] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);

  /* ON CHANGE */
  const onChangeName = (value) => {
    setMatch({ ...match, name: value });
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getDate();

    setDate(currentDate);
    setfullDate(fDate);
    setOriginalfullDate(fDate);
    setMatch({ ...match, date: fDate });
    setShow(false);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;

    let tempTime = new Date(currentTime);
    let fTime =
      tempTime.getHours() +
      ":" +
      tempTime.getMinutes() +
      ":" +
      tempTime.getSeconds();

    setTime(selectedTime);
    setHeure(fTime);
    setMatch({ ...match, heure: fTime });
    setShowTime(false);
  };

  const listTypeMatch = [
    { key: "1v1", value: "1v1" },
    { key: "2v2", value: "2v2" },
    { key: "3v3", value: "3v3" },
    { key: "4v4", value: "4v4" },
    { key: "5v5", value: "5v5" },
  ];

  const onChangeNbrPlaces = (value) => {
    setMatch({ ...match, nbrParticipants: value });
  };

  const onChangeDescription = (value) => {
    setMatch({ ...match, description: value });
  };

  const editDataMatch = async () => {
    const data = {
      id: match.id,
      name: match.name,
      date: match.date,
      heure: match.heure,
      description: match.description,
      nbrParticipants: match.nbrParticipants,
      type: match.type,
      terrain_id: match.terrain_id,
      user_id: userInfo.id,
    };

    const config = await getConfig();

    try {
      const response = await configDB.put(`/matchs/${data.id}`, data, config);
      successToast(response.data.message);
      navigation.push("Mes matchs");
    } catch (error) {
      console.log(error);
      //errorToast(error.response.data.message);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await configDB.get("/terrains");
        let listTerrains = response.data.map((item) => {
          return { key: item.id, value: item.name };
        });
        setDataListTerrains(listTerrains);
      } catch (error) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={{ margin: 10 }}>
      <View>
        <View>
          <Text>Localisation du terrain</Text>
          <SelectList
            searchPlaceholder="Rechercher le nom du terrain"
            placeholder="Rechercher le nom du terrain"
            setSelected={(valType) => {
              console.log(valType);
              setMatch({
                ...match,
                terrain_id: valType,
              });
            }}
            data={dataListTerrains}
            defaultOption={{
              key: match.terrain_name,
              value: match.terrain_name || data.adresse,
            }}
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
          <Text>Nom de l'évènement</Text>
          <Input
            placeholder="Entrer le nom de votre évènement"
            onChangeText={(value) => onChangeName(value)}
            value={match.name}
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
          <Text>Date</Text>
          <TouchableOpacity activeOpaticy={1} onPress={() => setShow(true)}>
            <Input
              placeholder="Selectionner la Date"
              value={match.date}
              editable={false}
              leftIcon={<Ionicons name="calendar" size={18} color="black" />}
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
          </TouchableOpacity>
          {show && (
            <DateTimePicker mode="date" value={date} onChange={onChangeDate} />
          )}
        </View>
        <View>
          <Text>Heure</Text>
          <TouchableOpacity activeOpaticy={1} onPress={() => setShowTime(true)}>
            <Input
              placeholder="Choisisser votre heure"
              value={match.heure}
              editable={false}
              leftIcon={<Ionicons name="time" size={18} color="black" />}
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
          </TouchableOpacity>
          {showTime && (
            <DateTimePicker mode="time" value={time} onChange={onChangeTime} />
          )}
        </View>
        <View>
          <Text>Nombre de places</Text>
          <Input
            placeholder="0"
            keyboardType="number-pad"
            onChangeText={(value) => onChangeNbrPlaces(value)}
            value={match.nbrParticipants.toString()}
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
          <Text>Type d'évènement</Text>
          <SelectList
            setSelected={(valType) => setMatch({ ...match, type: valType })}
            search={false}
            data={listTypeMatch}
            save="value"
            defaultOption={{
              key: match.type,
              value: match.type,
            }}
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
          <Text>Description</Text>
          <Input
            multiline
            textAlignVertical="top"
            style={{ fontSize: 16, height: 120 }}
            placeholder="Dites nous quelques mots à propos de votre évènement..."
            onChangeText={(value) => onChangeDescription(value)}
            value={match.description}
            leftIcon={<Ionicons name="text" size={18} color="black" />}
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
        <ButtonComponent titleBtn="MODIFIER" action={editDataMatch} />
      </View>
    </ScrollView>
  );
}

export default EditMatch;
