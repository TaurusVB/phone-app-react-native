import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import addPhoto from "../assets/addPhotoBtn.jpg";

const RegistrationScreen = () => {
  return (
    <>
      <View style={styles.userPhoto}>
        <Image style={styles.addPhotoImg} source={addPhoto}></Image>
      </View>
      <Text style={styles.titleForm}>Реєстрація</Text>
      <View>
        <TextInput style={styles.input} placeholder={"Логін"} />
        <TextInput
          style={styles.input}
          placeholder={"Адреса електронної пошти"}
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder={"Пароль"}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.passwordShowBtn}>
            <Text style={styles.passwordShowText}>Показати</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.btnRegistration}>
        <Text style={styles.textRegistration}>Зареєстуватися</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogIn}>
        <Text style={styles.textLogIn}>Вже є акаунт? Увійти</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
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
  textRegistration: { fontSize: 16, color: "#fff" },
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
