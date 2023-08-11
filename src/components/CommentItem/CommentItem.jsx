import { Text, View, Image } from "react-native";

const CommentItem = ({ item: { data } }) => {
  const isUserComment = auth.currentUser.uid === data.userId;
  return (
    <View
      style={{
        width: "100%",
        marginTop: 24,
        display: "flex",
        flexDirection: isUserComment ? "row-reverse" : "row",
      }}
    >
      <Image
        style={[
          {
            width: 28,
            height: 28,
            backgroundColor: "black",
            borderRadius: 14,
          },
          isUserComment ? { marginLeft: 16 } : { marginRight: 16 },
        ]}
        source={{ uri: data.avatarPhoto }}
      />

      <View
        style={[
          {
            width: "88%",
            backgroundColor: isUserComment ? "#C3ECFF" : "rgba(0, 0, 0, 0.03)",
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 35,
            flexWrap: "wrap",
            borderRadius: 10,
          },
        ]}
      >
        <Text style={[{ width: "100%" }]}>{data.commentText}</Text>
      </View>
      <Text
        style={{
          position: "absolute",
          fontSize: 10,
          color: "rgba(189, 189, 189, 1)",
          right: 16,
          bottom: 16,
        }}
      >
        {data.commentLeaveDate}
      </Text>
    </View>
  );
};

export default CommentItem;
