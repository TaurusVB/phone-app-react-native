import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../../config";
import { createAsyncThunk } from "@reduxjs/toolkit";

const writeDataToFirestore = createAsyncThunk(
  "posts/addPost",
  async (credentials, thunkAPI) => {
    try {
      await addDoc(collection(db, "posts"), credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const writeCommentToFirestore = createAsyncThunk(
  "posts/addComment",
  async (credentials, thunkAPI) => {
    try {
      const { postId, commentData } = credentials;
      await addDoc(collection(db, `posts/${postId}/comments`), commentData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const getDataFromFirestore = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      const response = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const getCommentsFromFirestore = createAsyncThunk(
  "posts/getComments",
  async (credentials, thunkAPI) => {
    try {
      const { postId } = credentials;
      const snapshot = await getDocs(
        collection(db, `posts/${postId}/comments`)
      );
      const response = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const getCurrentUserPosts = createAsyncThunk(
  "posts/getCurrentUserPosts",
  async (credentials, thunkAPI) => {
    try {
      const { userId } = credentials;
      const q = query(collection(db, "posts"), where("userId", "==", userId));

      const querySnapshot = await getDocs(q);
      const response = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// const updateDataInFirestore = createAsyncThunk(
//   "posts/updatePost",
//   async (credentials, thunkAPI) => {
//     try {
//       const { docId } = credentials;
//       const ref = doc(db, "posts", docId);

//       await updateDoc(ref, {
//         age: 25,
//       });
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export {
  writeDataToFirestore,
  getDataFromFirestore,
  writeCommentToFirestore,
  getCommentsFromFirestore,
  getCurrentUserPosts,
};
