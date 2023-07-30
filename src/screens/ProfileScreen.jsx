import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import PhotoBG from "../../assets/PhotoBG.jpg";
import UserPhoto from "../../assets/UserPhoto.jpg";
import Comments from "../../assets/icons/message-circle.jpg";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../config";
import { collection, onSnapshot } from "firebase/firestore";
import { getCurrentUserPosts } from "../redux/posts/operations";
import { selectUserId, selectUserNickname } from "../redux/auth/selectors";
import { selectUserPosts } from "../redux/posts/selectors";
import { Image } from "react-native";
import uuid from "react-native-uuid";
import { TouchableOpacity } from "react-native";
import { logOut } from "../redux/auth/operations";
import ListEmptyComponent from "../components/ListEmptyComponent/ListEmptyComponent";
import PostItem from "../components/PostItem/PostItem";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const userPosts = useSelector(selectUserPosts);
  const userNickname = useSelector(selectUserNickname);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), () => {
      dispatch(getCurrentUserPosts({ userId }));
    });

    return () => unsubscribe();
  }, []);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={PhotoBG}
        style={styles.imageBG}
      ></ImageBackground>
      <View style={styles.containerScreen}>
        <View style={styles.containerUserPhoto}>
          <Image source={UserPhoto} style={styles.userPhoto} />
          <View style={styles.containerIcon}>
            <EvilIcons name="close" size={25} color="rgba(232, 232, 232, 1)" />
          </View>
        </View>
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
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    resizeMode: "contain",
  },
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
