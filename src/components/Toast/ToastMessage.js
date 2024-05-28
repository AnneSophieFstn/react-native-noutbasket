import Toast from "react-native-simple-toast";

const successToast = (message) => {
  Toast.show(message, Toast.SHORT, Toast.BOTTOM, {
    backgroundColor: "green",
  });
};

const errorToast = (message) => {
  Toast.show(message, Toast.SHORT, Toast.BOTTOM, {
    backgroundColor: "red",
  });
};

export { successToast, errorToast };
