import React from "react";
import { Overlay, Button } from "@rneui/themed";
import { Text } from "@rneui/themed";

import { Dimensions, StyleSheet, View } from "react-native";
import ButtonComponent from "../button/ButtonComponent";

export default function ModalComponent({
  visible,
  toggleOverlay,
  data,
  text,
  titleBtn,
  action,
  inscrit,
}) {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={{ borderRadius: 30 }}
    >
      <View style={styles.boxScreenModal}>
        <Text h3 style={{ marginBottom: 15 }}>
          ATTENTION
        </Text>
        <View
          style={{
            alignItems: "center",
            lineHeight: 20,
          }}
        >
          {text || data?.title ? (
            <Text
              style={{
                lineHeight: 25,
                textAlign: "center",
              }}
            >
              {text} {data?.title}
            </Text>
          ) : null}
          {data?.name ? (
            <Text
              style={{
                color: "#FF9A62",
                lineHeight: 40,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {data?.name}
            </Text>
          ) : null}

          {
            (inscrit = null ? (
              <Text
                style={{
                  lineHeight: 40,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Cette action est irréversible !
              </Text>
            ) : null)
          }
          <Text>Êtes vous sûr de votre choix ?</Text>
        </View>
        <View style={styles.align}>
          <View style={{ marginRight: 20 }}>
            <ButtonComponent
              titleBtn={titleBtn}
              action={() => {
                action();
              }}
            />
          </View>
          <View>
            <Button
              type="solid"
              titleStyle={{ color: "#FF9A62" }}
              onPress={() => {
                toggleOverlay();
              }}
              buttonStyle={styles.btnStyle}
            >
              Annuler
            </Button>
          </View>
        </View>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  boxScreenModal: {
    height: Dimensions.get("window").width - 60,
    width: Dimensions.get("window").width - 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btnStyle: {
    borderRadius: 30,
    backgroundColor: "rgba(240, 240, 240, 0.47)",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10,
  },

  align: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
});
