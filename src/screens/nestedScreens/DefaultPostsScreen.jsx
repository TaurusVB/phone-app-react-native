import { View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromFirestore } from "../../redux/posts/operations";
import { selectAllPosts } from "../../redux/posts/selectors";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../config";
import ListEmptyComponent from "../../components/ListEmptyComponent/ListEmptyComponent";
import PostItem from "../../components/PostItem/PostItem";

const DefaultPostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector(selectAllPosts);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), () => {
      dispatch(getDataFromFirestore());
    });

    return () => unsubscribe();
  }, []);

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
        ListEmptyComponent={
          <ListEmptyComponent
            navigation={navigation}
            text="Тут ще немає твоїх публікацій або інших користувачів, але ти можеш створити першу публікацію, яку побачать усі! Натиснувши на:"
          />
        }
        data={allPosts}
        keyExtractor={() => uuid.v4()}
        renderItem={(obj) => (
          <PostItem obj={obj} navigation={navigation} userDetails />
        )}
        style={{}}
      />
    </View>
  );
};

export default DefaultPostsScreen;
