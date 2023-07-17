import { Text, View, FlatList, Image } from "react-native";
import { useState, useEffect } from "react";
import UserPhoto from "../../assets/UserPhoto.jpg";
import Comments from "../../assets/icons/message-circle.jpg";
import uuid from "react-native-uuid";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [locationParams, setLocationParams] = useState({});

  useEffect(() => {
    if (route.params) {
      setPosts((prev) => [...prev, route.params]);
      const {
        params: {
          locationParams: { coords },
        },
      } = route;
      setLocationParams(coords);
    }
  }, [route.params]);

  const handlePostMap = () => {
    navigation.navigate("MapPost", { locationParams });
  };

  const handlePostComments = () => {
    navigation.navigate("CommentsPost");
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 32, flex: 1, marginHorizontal: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={UserPhoto} />
          <View style={{ marginLeft: 8 }}>
            <Text style={{ fontSize: 13 }}>Natali Romanova</Text>
            <Text style={{ fontSize: 11, color: "rgba(33, 33, 33, 0.8)" }}>
              email@example.com
            </Text>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.6}>
          <Image
            source={{ uri: item.photo }}
            style={{
              width: "100%",
              height: 240,
              borderRadius: 8,
              marginTop: 32,
            }}
          />
          <Text style={{ fontSize: 16, marginTop: 8 }}>{item.postName}</Text>
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
            onPress={handlePostComments}
          >
            <Image style={{ width: 24, height: 24 }} source={Comments} />
            <Text
              style={{
                fontSize: 16,
                color: "rgba(189, 189, 189, 1)",
                marginLeft: 6,
              }}
            >
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            activeOpacity={0.7}
            onPress={handlePostMap}
          >
            <Feather
              name="map-pin"
              size={24}
              color="rgba(189, 189, 189, 1)"
              style={{}}
            />
            <Text style={{ fontSize: 16, marginLeft: 4 }}>
              {item.postLocation}
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
        height: "100%",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "rgba(33, 33, 33, 0.8)",
        flex: 1,
      }}
    >
      <FlatList
        data={posts}
        keyExtractor={() => uuid.v4()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default DefaultPostsScreen;
