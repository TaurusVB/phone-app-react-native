import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { TextInput } from "react-native";
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { format, parse } from "date-fns";
import { uk } from "date-fns/locale";
import {
  getCommentsFromFirestore,
  writeCommentToFirestore,
} from "../../redux/posts/operations";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../config";
import { selectComments } from "../../redux/posts/selectors";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";

const CommentsScreen = ({ route }) => {
  const [commentText, setCommentText] = useState("");
  const [isShowKeyboard, setShowKeyboard] = useState(false);
  const [sortedCommentsByDate, setSortedCommentsByDate] = useState([]);

  const { postId, photoUrl } = route.params;
  const { nickname } = useSelector(selectUser);
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();

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

    const unsubscribe = onSnapshot(
      collection(db, `posts/${postId}/comments`),
      () => {
        dispatch(getCommentsFromFirestore({ postId }));
      }
    );

    return () => {
      unsubscribe();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    sortedComments(comments);
  }, [comments]);

  const leaveComment = () => {
    const commentLeaveDate = format(
      new Date(Date.now()),
      "dd MMMM, yyyy | HH:mm",
      {
        locale: uk,
      }
    );

    if (commentText.length < 6) {
      return alert("Тут повинно бути не менше 6 символів!");
    }

    dispatch(
      writeCommentToFirestore({
        postId,
        commentData: {
          commentText,
          commentLeaveDate,
          nickname,
          userId: auth.currentUser.uid,
          avatarPhoto: auth.currentUser.photoURL,
        },
      })
    );

    setCommentText("");
    Keyboard.dismiss();
  };

  const renderItem = ({ item: { data } }) => {
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
              backgroundColor: isUserComment
                ? "#C3ECFF"
                : "rgba(0, 0, 0, 0.03)",
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

  const sortedComments = (array) => {
    if (comments === []) {
      return;
    }
    const parsedDate = (date) => {
      return parse(date, "dd MMMM, yyyy | HH:mm", new Date(), {
        locale: uk,
      });
    };

    const newArray = [...array];

    newArray.sort((a, b) => {
      const aDate = parsedDate(a.data.commentLeaveDate);
      const bDate = parsedDate(b.data.commentLeaveDate);
      return aDate - bDate;
    });
    setSortedCommentsByDate(newArray);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "rgba(33, 33, 33, 0.8)",
            marginBottom: isShowKeyboard ? 224 : 0,
          }}
        >
          <FlatList
            style={{ marginHorizontal: 16 }}
            ListHeaderComponent={
              <View
                style={{
                  marginTop: 32,
                  marginBottom: 32,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 240,
                    borderRadius: 8,
                  }}
                >
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 8,
                    }}
                    source={{ uri: photoUrl }}
                  />
                </View>
              </View>
            }
            data={sortedCommentsByDate || []}
            keyExtractor={() => uuid.v4()}
            renderItem={renderItem}
          />

          <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
            <TextInput
              onFocus={() => {
                setShowKeyboard(true);
              }}
              placeholder="Коментувати..."
              value={commentText}
              onChangeText={setCommentText}
              style={{
                width: "100%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                backgroundColor: "#F6F6F6",
                marginTop: 16,
                fontSize: 16,
                paddingLeft: 16,
                paddingRight: 46,
              }}
            />
            <TouchableOpacity
              onPress={leaveComment}
              activeOpacity={0.7}
              style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                width: 34,
                height: 34,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                backgroundColor: "rgba(255, 108, 0, 1)",
                marginTop: 32,
              }}
            >
              <AntDesign name="arrowup" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;
