import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../../config";
import { createAsyncThunk } from "@reduxjs/toolkit";

const registerDB = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { login, email, password } = credentials;
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: login });
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

export { registerDB, loginDB, logOut, authStateChanged };
