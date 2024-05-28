import React, { useCallback, useRef, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { Input } from "@rneui/themed";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import configDB from "../../database/database";

function SearchTerrains() {
  const [loading, setLoading] = useState(false);
  const [terrainsList, setTerrainsList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownController = useRef(null);

  const searchRef = useRef(null);

  console.log("terrainsList: ", terrainsList);

  const getData = useCallback(async (q) => {
    const filterToken = q.toLowerCase();
    console.log("getSuggestions", q);
    if (typeof q !== "string" || q.length < 3) {
      setTerrainsList(null);
      return;
    }

    setLoading(true);

    const response = await configDB.get("/matchs");
    const terrains = await response.json();
    const lists = terrains
      .filter((terrain) => terrain.adresse.toLowerCase().includes(filterToken))
      .map((terrain) => ({
        id: terrain.id,
        title: terrain.adresse,
      }));
    setTerrainsList(lists);
    setLoading(false);
  }, []);

  const onClearPress = useCallback(() => {
    setTerrainsList(null);
  }, []);

  const onOpenSuggestionsList = useCallback((isOpened) => {}, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ paddingLeft: 10 }}>
        <Ionicons name="add-circle-outline" size={24} color="#FF9A62" />
      </View>
      <View
        style={{
          paddingTop: 20,
          width: Dimensions.get("window").width - 30,
        }}
      >
        {/* <Input
          placeholder="Rechercher votre terrain"
          onChangeText={(search) => setSearch(search)}
          underlineColorAndroid="transparent"
          value={search}
          rightIcon={<Ionicons name="search" size={18} color="black" />}
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: "rgba(217, 217, 217, 0.24)",
            borderRadius: 25,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        /> */}
        <AutocompleteDropdown
          ref={searchRef}
          controller={(controller) => {
            dropdownController.current = controller;
          }}
          clearOnFocus={false}
          closeOnBlur={true}
          closeOnSubmit={false}
          initialValue={{ id: "1" }} // or just '2'
          onSelectItem={(item) => {
            item && setSelectedItem(item.id);
          }}
          dataSet={terrainsList}
          onChangeText={getData}
          onClear={onClearPress}
          onOpenSuggestionsList={onOpenSuggestionsList}
          useFilter={false}
          loading={loading}
        />
        <Text style={{ color: "#668", fontSize: 13 }}>
          Selected item id: {JSON.stringify(selectedItem)}
        </Text>
      </View>
    </View>
  );
}

export default SearchTerrains;
