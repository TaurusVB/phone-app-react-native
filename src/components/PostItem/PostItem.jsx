import { Image, View } from "react-native";
import UserPhoto from "../../../assets/UserPhoto.jpg";
import Comments from "../../../assets/icons/message-circle.jpg";
import Comments__orange from "../../../assets/icons/message-circle-orange.jpg";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../../redux/posts/selectors";
import { getCurrentAvatarOfUser } from "../../redux/posts/operations";

const PostItem = ({ obj, navigation, userDetails, isProfileScreen }) => {
  const [lengthPosts, setLengthPosts] = useState(0);

  const dispatch = useDispatch();

  const allPosts = useSelector(selectAllPosts);

  useEffect(() => {
    // dispatch(getCurrentAvatarOfUser(obj.item.userId));
  }, []);

  useEffect(() => {
    setLengthPosts(allPosts.length - 1);
  }, [allPosts]);

  const handlePostComments = (postId, photoUrl) => {
    navigation.navigate("CommentsPost", { postId, photoUrl });
  };
  const { item } = obj;
  const { data } = item;
  return (
    <View
      style={{
        ...styles.itemContainer,
        paddingBottom: lengthPosts === obj.index ? 32 : 0,
      }}
    >
      {userDetails && (
        <View style={styles.userDetailsContainer}>
          <Image style={styles.avatarImg} source={{ uri: data.avatarUser }} />
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 13 }}>{data.userName}</Text>
            <Text style={{ fontSize: 11, color: "rgba(33, 33, 33, 0.8)" }}>
              {data.email}
            </Text>
          </View>
        </View>
      )}
      <Image src={data.photoUrl} style={styles.photoImg} />
      <Text style={styles.nameOfPost}>{data.postName}</Text>
      <View style={styles.commentsAndLocationContainer}>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => {
            handlePostComments(item.id, data.photoUrl);
          }}
        >
          {isProfileScreen ? (
            <Image style={styles.commentIcon} source={Comments__orange} />
          ) : (
            <Image style={styles.commentIcon} source={Comments} />
          )}
          <Text style={styles.textComment}>comments</Text>
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
          <Text style={styles.textLocation}>{data.postLocation}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 32,
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  userDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  photoImg: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  commentsAndLocationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  nameOfPost: { fontSize: 16, marginTop: 8 },
  commentIcon: { width: 24, height: 24 },
  textComment: {
    fontSize: 16,
    color: "rgba(189, 189, 189, 1)",
    marginLeft: 6,
  },
  textLocation: { fontSize: 16, marginLeft: 4 },
  avatarImg: { width: 60, height: 60, borderRadius: 16 },
});

export default PostItem;
