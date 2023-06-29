import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PhotoBG from "../assets/PhotoBG.jpg";
import addPhoto from "../assets/addPhotoBtn.jpg";
import { useState } from "react";

const RegistrationScreen = () => {
  const [isShowKeyboard, setShowKeyboard] = useState(false);
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
    console.log(login, email, password);
    setEmail("");
    setLogin("");
    setPassword("");
  };

  const keyboardHide = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground source={PhotoBG} style={styles.image}>
          <View style={styles.containerScreen}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  ...styles.formContainer,
                  marginBottom: isShowKeyboard ? 20 : 78,
                }}
              >
                <View style={styles.userPhoto}>
                  <Image style={styles.addPhotoImg} source={addPhoto}></Image>
                </View>
                <Text style={styles.titleForm}>Реєстрація</Text>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder={"Логін"}
                    onFocus={() => {
                      setShowKeyboard(true);
                    }}
                    onChangeText={(value) => setLogin(value)}
                    value={login}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={"Адреса електронної пошти"}
                    onFocus={() => {
                      setShowKeyboard(true);
                    }}
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                  />
                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder={"Пароль"}
                      secureTextEntry={true}
                      onFocus={() => {
                        setShowKeyboard(true);
                      }}
                      onChangeText={(value) => setPassword(value)}
                      value={password}
                    />
                    <TouchableOpacity
                      style={styles.passwordShowBtn}
                      onPress={handleSignIn}
                    >
                      <Text style={styles.passwordShowText}>Показати</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.btnRegistration}
                  onPress={handleSignIn}
                >
                  <Text style={styles.textRegistration}>Зареєстуватися</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogIn}>
                  <Text style={styles.textLogIn}>Вже є акаунт? Увійти</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },
  containerScreen: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  formContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 78,
  },
  userPhoto: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
  },
  addPhotoImg: {
    position: "absolute",
    right: -12.5,
    bottom: 20,
    borderRadius: 25,
  },
  titleForm: {
    fontSize: 30,
    letterSpacing: 0.3,
    marginTop: 92,
    marginBottom: 17,
  },
  input: {
    padding: 15,
    width: 343,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    marginTop: 16,
    fontSize: 16,
  },
  btnRegistration: {
    width: 343,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginTop: 43,
  },
  textRegistration: {
    fontSize: 16,
    fontFamily: "Roboto-Italic",
    color: "#fff",
  },
  btnLogIn: { borderColor: "#FF6C00", marginTop: 16 },
  textLogIn: { color: "#1B4371", fontSize: 16 },
  passwordShowBtn: {
    position: "absolute",
    top: "45%",
    right: 16,
    color: "#1B4371",
  },
  passwordShowText: { color: "#1B4371", fontSize: 16 },
});

export default RegistrationScreen;
