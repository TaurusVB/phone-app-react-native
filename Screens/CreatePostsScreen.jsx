import {
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View } from "react-native";
import CameraIcon from "../assets/icons/camera.jpg";
import { Feather } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { Keyboard } from "react-native";
import { useEffect, useState } from "react";

const CreatePostsScreen = () => {
  const [isShowKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
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
    };
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss(), setShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "rgba(33, 33, 33, 0.8)",
        }}
      >
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 32,
          }}
        >
          <TouchableOpacity activeOpacity={0.6}>
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
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "#fff",
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image source={CameraIcon} />
              </View>
            </View>
            <Text style={{ color: "rgba(189, 189, 189, 1)", fontSize: 16 }}>
              Завантажте фото
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Назва..."
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
          <View>
            <Feather
              name="map-pin"
              size={24}
              color="rgba(189, 189, 189, 1)"
              style={{ position: "absolute", top: 30 }}
            />

            <TextInput
              placeholder="Місцевість..."
              style={{
                height: 50,
                marginTop: 16,
                fontSize: 16,
                borderBottomColor: "rgba(232, 232, 232, 1)",
                borderBottomWidth: 1,
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 28,
              }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: 343,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              backgroundColor: "#F6F6F6",
              marginTop: 32,
            }}
          >
            <Text style={{ fontSize: 16, color: "#BDBDBD" }}>Опублікувати</Text>
          </TouchableOpacity>
          <TouchableOpacity
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
            <Feather name="trash-2" size={24} color="rgba(189, 189, 189, 1)" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
