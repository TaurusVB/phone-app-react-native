import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import PhotoBG from "../../assets/PhotoBG.jpg";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../config";
import { collection, onSnapshot } from "firebase/firestore";
import { getCurrentUserPosts } from "../redux/posts/operations";
import {
  selectUserAvatar,
  selectUserId,
  selectUserNickname,
} from "../redux/auth/selectors";
import * as ImagePicker from "expo-image-picker";
import { selectUserPosts } from "../redux/posts/selectors";
import { Image } from "react-native";
import uuid from "react-native-uuid";
import { TouchableOpacity } from "react-native";
import {
  logOut,
  updateAvatar,
  uploadPhotoToStorage,
} from "../redux/auth/operations";
import ListEmptyComponent from "../components/ListEmptyComponent/ListEmptyComponent";
import PostItem from "../components/PostItem/PostItem";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const userPosts = useSelector(selectUserPosts);
  const userNickname = useSelector(selectUserNickname);

  const userAvatarFromState = useSelector(selectUserAvatar);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), () => {
      dispatch(getCurrentUserPosts({ userId }));
    });

    return () => unsubscribe();
  }, []);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const changeUserAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const downloadUrl = await dispatch(
        uploadPhotoToStorage(result.assets[0].uri)
      ).unwrap();
      dispatch(updateAvatar({ photoURL: downloadUrl, posts: userPosts }));
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={PhotoBG}
        style={styles.imageBG}
      ></ImageBackground>
      <View style={styles.containerScreen}>
        <TouchableOpacity
          style={styles.containerUserPhoto}
          onPress={changeUserAvatar}
          activeOpacity={0.8}
        >
          <Image
            style={styles.userPhoto}
            source={{ uri: userAvatarFromState }}
          />
          {!userAvatarFromState ? (
            <View style={styles.containerIcon}>
              <AntDesign
                name="pluscircleo"
                size={24}
                color="rgba(255, 108, 0, 1)"
                style={styles.addPhotoImg}
              />
            </View>
          ) : (
            <View style={styles.containerIcon}>
              <AntDesign
                name="closecircleo"
                size={24}
                color="rgba(232, 232, 232, 1)"
                style={styles.addPhotoImg}
              />
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogOut} style={styles.logOutBtn}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>

        <Text style={styles.displayName}>{userNickname}</Text>
      </View>
      <FlatList
        ListEmptyComponent={
          <ListEmptyComponent
            navigation={navigation}
            text="Тут ще немає твоїх публікацій, але ти можеш створити їх, натиснувши на:"
          />
        }
        ListHeaderComponentStyle={{}}
        data={userPosts}
        style={{ backgroundColor: "#fff" }}
        keyExtractor={() => uuid.v4()}
        renderItem={(obj) => (
          <PostItem obj={obj} navigation={navigation} isProfileScreen />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
  imageBG: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
  containerScreen: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    marginTop: 103,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
  },
  containerUserPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -60 }, { translateY: -60 }],
  },
  userPhoto: { height: "100%", width: "100%", borderRadius: 16 },
  containerIcon: {
    position: "absolute",
    right: -12.5,
    bottom: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(232, 232, 232, 1)",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  displayName: {
    marginTop: 92,
    fontSize: 30,
    color: "rgba(33, 33, 33, 1)",
    fontWeight: "500",
  },
  logOutBtn: {
    padding: 10,
    position: "absolute",
    right: 16,
    top: 22,
  },
});

export default ProfileScreen;
