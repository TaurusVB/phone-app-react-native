import {
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View } from "react-native";
import CameraIcon from "../../assets/icons/camera.jpg";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { Keyboard } from "react-native";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import uuid from "react-native-uuid";
import { auth, db, storage } from "../../config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { writeDataToFirestore } from "../redux/posts/operations";
import { selectUser } from "../redux/auth/selectors";
import { useIsFocused } from "@react-navigation/native";

const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [postName, setPostName] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationParams, setLocationParams] = useState({});
  const [isDoPhoto, setIsDoPhoto] = useState(isFocused);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isFocused = useIsFocused();

  useEffect(() => {
    requestLocationPermission();

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShowKeyboard(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setShowKeyboard(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      setPhoto(null);
    };
  }, []);

  useEffect(() => {
    // Виконується, коли екран стає активним (отримує фокус)
    if (isFocused) {
      setIsDoPhoto(!isFocused);
    }
  }, [isFocused]);

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    } else {
      // Permission granted, get current location
      try {
        const location = await Location.getCurrentPositionAsync({});
        await setLocationParams(location);
      } catch (error) {
        console.log("Error getting current location:", error);
      }
    }
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setIsDoPhoto(true);
    setPhoto(photo.uri);
  };

  const sendPost = () => {
    if (postLocation.trim() === "" || postName.trim() === "") {
      alert("Всі поля повинні бути заповнені!");
      return;
    }
    uploadPostToServer();
    navigation.navigate("DefaultPosts");

    resetCreatePost();
  };

  const uploadPhotoToserver = async () => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const uniqId = uuid.v4();

    const response = await fetch(photo);
    const blob = await response.blob();

    const storageRef = ref(storage, "images/" + uniqId);
    const uploadTask = await uploadBytesResumable(storageRef, blob, metadata);

    return await getDownloadURL(storageRef);
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToserver();

    dispatch(
      writeDataToFirestore({
        userId: user.userId,
        userName: auth.currentUser.displayName,
        postName,
        postLocation,
        photoUrl: photo,
        location: locationParams,
        email: auth.currentUser.email,
      })
    );
  };

  const resetCreatePost = () => {
    setPhoto(null);
    setPostLocation("");
    setPostName("");
  };

  const updatePhoto = () => {
    setIsDoPhoto(false);
  };

  return (
    <>
      <View style={{ flex: 1, display: isDoPhoto ? "none" : "flex" }}>
        <Camera
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
          ref={setCamera}
        >
          <TouchableOpacity
            style={{
              borderColor: "#fff",
              borderRadius: 35,
              width: 70,
              height: 70,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 40,
            }}
            activeOpacity={0.7}
            onPress={takePhoto}
          >
            <Ionicons name="camera-outline" size={30} color="white" />
          </TouchableOpacity>
        </Camera>
      </View>

      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#fff",
              borderTopWidth: 1,
              borderTopColor: "rgba(33, 33, 33, 0.8)",
              display: isDoPhoto ? "flex" : "none",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                marginHorizontal: 16,
                marginTop: 32,
                marginBottom: isShowKeyboard ? -55 : 22,
              }}
            >
              <TouchableOpacity activeOpacity={0.6} onPress={updatePhoto}>
                <View
                  style={{
                    width: "100%",
                    height: 240,
                    borderRadius: 8,
                    backgroundColor: "rgba(246, 246, 246, 1)",
                    borderWidth: 1,
                    borderColor: "rgba(232, 232, 232, 1)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {photo && (
                    <View
                      style={{
                        flex: 1,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        source={{ uri: photo }}
                        style={{
                          flex: 1,
                          width: "100%",
                          height: "100%",
                          borderRadius: 8,
                        }}
                      />
                    </View>
                  )}
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      backgroundColor: "#fff",
                      borderRadius: 30,
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: photo ? 0.3 : 0.8,
                    }}
                  >
                    <FontAwesome
                      name="camera"
                      size={24}
                      color={photo ? "white" : "grey"}
                      iconStyle={{ opacity: photo ? 0.3 : 0.8 }}
                    />
                  </View>
                </View>
                <Text style={{ color: "rgba(189, 189, 189, 1)", fontSize: 16 }}>
                  {photo ? "Редагувати фото" : "Завантажте фото"}
                </Text>
              </TouchableOpacity>
              <TextInput
                onFocus={() => {
                  setShowKeyboard(true);
                }}
                placeholder="Назва..."
                onChangeText={(value) => setPostName(value)}
                value={postName}
                style={{
                  height: 50,
                  marginTop: 32,
                  fontSize: 16,
                  borderBottomColor: "rgba(232, 232, 232, 1)",
                  borderBottomWidth: 1,
                  paddingTop: 15,
                  paddingBottom: 15,
                }}
              />
              <View style={{ paddingLeft: 30 }}>
                <Feather
                  name="map-pin"
                  size={24}
                  color="rgba(189, 189, 189, 1)"
                  style={{ position: "absolute", top: 30, width: 24 }}
                />

                <TextInput
                  onFocus={() => {
                    setShowKeyboard(true);
                  }}
                  placeholder="Місцевість..."
                  onChangeText={(value) => setPostLocation(value)}
                  value={postLocation}
                  style={{
                    height: 50,
                    marginTop: 16,
                    fontSize: 16,
                    borderBottomColor: "rgba(232, 232, 232, 1)",
                    borderBottomWidth: 1,
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 30,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={sendPost}
                activeOpacity={1}
                style={{
                  width: 343,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 100,
                  backgroundColor:
                    photo && postLocation && postName
                      ? "rgba(255, 108, 0, 1)"
                      : "#F6F6F6",
                  marginTop: 32,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color:
                      photo && postLocation && postName
                        ? "rgba(255, 255, 255, 1)"
                        : "#BDBDBD",
                  }}
                >
                  Опублікувати
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={resetCreatePost}
                style={{
                  width: 70,
                  height: 40,
                  borderRadius: 20,
                  marginTop: 120,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F6F6F6",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
              >
                <Feather
                  name="trash-2"
                  size={24}
                  color="rgba(189, 189, 189, 1)"
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CreatePostsScreen;
