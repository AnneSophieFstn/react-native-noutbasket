import { Button } from "@rneui/themed";

export default function ButtonComponent({ titleBtn, action }) {
  return (
    <Button
      type="solid"
      titleStyle={{ color: "white" }}
      onPress={action}
      buttonStyle={{
        borderRadius: 30,
        backgroundColor: "#EF6C32",
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        paddingTop: 10,
      }}
    >
      {titleBtn}
    </Button>
  );
}
