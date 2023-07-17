import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultPostsScreen from "./nestedScreens/DefaultPostsScreen";
import CommentsPostScreen from "./nestedScreens/CommentsScreen";
import MapPostScreen from "./nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator initialRouteName="DefaultPosts">
      <NestedScreen.Screen
        name="DefaultPosts"
        component={DefaultPostsScreen}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="CommentsPost"
        component={CommentsPostScreen}
        options={{ title: "Коментарі" }}
      />
      <NestedScreen.Screen
        name="MapPost"
        component={MapPostScreen}
        options={{ title: "Локація" }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
