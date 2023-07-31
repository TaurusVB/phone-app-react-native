import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, storage } from "../../../config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const registerDB = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { login, email, password, photoURL } = credentials;
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      await updateProfile(auth.currentUser, { displayName: login, photoURL });
      return auth.currentUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const loginDB = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { email, password } = credentials;
      await signInWithEmailAndPassword(auth, email, password);
      return auth.currentUser;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authStateChanged = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    try {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(user);
          } else {
            reject(new Error("User not logged in"));
          }
        });
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const uploadPhotoToStorage = createAsyncThunk(
  "auth/setImageAvatar",
  async (userAvatar, thunkAPI) => {
    try {
      const metadata = {
        contentType: "image/jpeg",
      };
      const uniqId = uuid.v4();

      const response = await fetch(userAvatar);
      const blob = await response.blob();

      const storageRef = ref(storage, "images/" + uniqId);
      await uploadBytesResumable(storageRef, blob, metadata);

      return await getDownloadURL(storageRef);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export { registerDB, loginDB, logOut, authStateChanged, uploadPhotoToStorage };
