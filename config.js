// Import the functions you need from the SDKs you need
// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDfTwOH31gylX6ouluwo5nzvKRmxc_n9Hc",
  authDomain: "photomap-4b251.firebaseapp.com",
  projectId: "photomap-4b251",
  storageBucket: "photomap-4b251.appspot.com",
  messagingSenderId: "605551994185",
  appId: "1:605551994185:web:3f04d5a94f457f40e7e698",
  measurementId: "G-8HJK487CRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
