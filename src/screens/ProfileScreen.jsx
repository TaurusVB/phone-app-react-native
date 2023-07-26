import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import PhotoBG from "../../assets/PhotoBG.jpg";
import UserPhoto from "../../assets/UserPhoto.jpg";
import Comments from "../../assets/icons/message-circle.jpg";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../../config";
import { Dimensions } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { getCurrentUserPosts } from "../redux/posts/operations";
import { selectUserId, selectUserNickname } from "../redux/auth/selectors";
import { selectUserPosts } from "../redux/posts/selectors";
import { Image } from "react-native";
import uuid from "react-native-uuid";
import { TouchableOpacity } from "react-native";
import { logOut } from "../redux/auth/operations";

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

  const handlePostComments = (postId, photoUrl) => {
    navigation.navigate("CommentsPost", { postId, photoUrl });
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  const renderItem = ({ item }) => {
    const { data } = item;
    return (
      <View style={{ marginTop: 32, flex: 1, marginHorizontal: 16 }}>
        <TouchableOpacity activeOpacity={0.6}>
          <Image
            src={data.photoUrl}
            style={{
              width: "100%",
              height: 240,
              borderRadius: 8,
            }}
          />
          <Text style={{ fontSize: 16, marginTop: 8 }}>{data.postName}</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => {
              handlePostComments(item.id, data.photoUrl);
            }}
          >
            <Image style={{ width: 24, height: 24 }} source={Comments} />
            <Text
              style={{
                fontSize: 16,
                color: "rgba(189, 189, 189, 1)",
                marginLeft: 6,
              }}
            >
              comments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("MapPost", {
                locationParams: data.location.coords,
              });
            }}
          >
            <Feather
              name="map-pin"
              size={24}
              color="rgba(189, 189, 189, 1)"
              style={{}}
            />
            <Text style={{ fontSize: 16, marginLeft: 4 }}>
              {data.postLocation}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={PhotoBG} style={styles.image}>
        <View style={styles.containerScreen}>
          <FlatList
            ListHeaderComponent={
              <View style={styles.formContainer}>
                <TouchableOpacity
                  onPress={handleLogOut}
                  style={{
                    padding: 10,
                    position: "absolute",
                    right: 16,
                    top: 22,
                  }}
                >
                  <Feather name="log-out" size={24} color="#BDBDBD" />
                </TouchableOpacity>
                <View style={styles.containerUserPhoto}>
                  <Image source={UserPhoto} style={styles.userPhoto} />
                  <View style={styles.containerIcon}>
                    <EvilIcons
                      name="close"
                      size={25}
                      color="rgba(232, 232, 232, 1)"
                    />
                  </View>
                </View>
                <Text style={styles.displayName}>{userNickname}</Text>
              </View>
            }
            style={{}}
            data={userPosts}
            keyExtractor={() => uuid.v4()}
            renderItem={renderItem}
          />
        </View>
      </ImageBackground>
    </View>
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
    marginTop: 103,
    minHeight: Dimensions.get("window").height - 186,
    flex: 1,
  },
  formContainer: {
    alignItems: "center",
    width: "100%",
  },
  containerUserPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
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
});

export default ProfileScreen;
