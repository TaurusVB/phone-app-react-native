import { Text, View, FlatList, Image } from "react-native";
import { useState, useEffect, useMemo } from "react";
import UserPhoto from "../../../assets/UserPhoto.jpg";
import Comments from "../../../assets/icons/message-circle.jpg";
import uuid from "react-native-uuid";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromFirestore } from "../../redux/posts/operations";
import { selectAllPosts } from "../../redux/posts/selectors";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../config";

const DefaultPostsScreen = ({ navigation }) => {
  const [lengthPosts, setLengthPosts] = useState(0);

  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), () => {
      dispatch(getDataFromFirestore());
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLengthPosts(allPosts.length - 1);
  }, [allPosts]);

  const handlePostComments = (postId, photoUrl) => {
    navigation.navigate("CommentsPost", { postId, photoUrl });
  };

  const renderItem = (obj) => {
    const { item } = obj;
    const { data } = item;
    return (
      <View
        style={{
          marginTop: 32,
          flex: 1,
          marginHorizontal: 16,
          marginBottom: lengthPosts === obj.index ? 32 : 0,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={UserPhoto} />
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 13 }}>{data.userName}</Text>
            <Text style={{ fontSize: 11, color: "rgba(33, 33, 33, 0.8)" }}>
              {data.email}
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.6}>
          <Image
            src={data.photoUrl}
            style={{
              width: "100%",
              height: 240,
              borderRadius: 8,
              marginTop: 32,
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
    <View
      style={{
        justifyContent: "center",
        width: "100%",
        height: "95%",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "rgba(33, 33, 33, 0.8)",
        flex: 1,
      }}
    >
      <FlatList
        data={allPosts}
        keyExtractor={() => uuid.v4()}
        renderItem={renderItem}
        style={{}}
      />
    </View>
  );
};

export default DefaultPostsScreen;
