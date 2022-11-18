import Toast from "react-native-tiny-toast";
import images from "../constants/images";

export const loadingOptions = {
  textStyle: { fontFamily: "eroded2", marginTop: 10 },
  containerStyle: {
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "white",
  },
};
export const successOptions = {
  textStyle: { fontFamily: "eroded2", marginTop: 10 },
  imgStyle: { tintColor: "#2d8d66" },
  containerStyle: {
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "white",
  },
};
export const errorOptions = {
  textStyle: { fontFamily: "eroded2", marginTop: 10 },
  imgStyle: { tintColor: "#994c40", width: 45, height: 45 },
  imgSource: images.closeIcon,
  position: Toast.position.CENTER,
  containerStyle: {
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "white",
    maxWidth: 300,
  },
  duration: 3 * 1000,
};

export const warningOptions = {
  textStyle: { fontFamily: "eroded2", marginTop: 10 },
  imgStyle: { tintColor: "#aba865", width: 45, height: 45 },
  imgSource: images.exclamation,
  position: Toast.position.CENTER,
  containerStyle: {
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "white",
  },
};

export const deleteOptions = {
  textStyle: { fontFamily: "header", marginTop: 10 },
  imgStyle: { tintColor: "#2d8d66", width: 45, height: 45 },
  imgSource: images.deleteForever,
  position: Toast.position.CENTER,
  containerStyle: { backgroundColor: "#202020" },
};
