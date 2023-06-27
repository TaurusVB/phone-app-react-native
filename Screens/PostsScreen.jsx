import { ImageBackground, StyleSheet, View } from "react-native";
import PhotoBG from "../assets/PhotoBG.jpg";
import RegistrationScreen from "./RegistrationScreen";
import LoginScreen from "./LoginScreen";

const PostScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={PhotoBG} style={styles.image}>
        <View style={styles.formContainer}>
          <LoginScreen />
          {/* <RegistrationScreen/> */}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    resizeMode: "cover",
  },
  formContainer: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    height: 549,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
});

export default PostScreen;
