import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Button } from "react-native";
import { useContext, useState } from "react";
import { UserInformation } from "../Context/UserInformation";
import { updateUserAttributes } from "aws-amplify/auth";
import Logout from "../Components/Logout";
export default function ProfileScreen() {
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");

  const userInformation = useContext(UserInformation);
  //user情報を更新する
  useEffect(() => {
    setNewName(userInformation.user.name);
    setNewEmail(userInformation.user.email);
  }, []);

  async function handleUpdateName(newName) {
    try {
      const attributes = await updateUserAttributes({
        userAttributes: {
          name: newName,
        },
      });
      console.log("complited名前の変更");
      // handle next steps
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUpdateEmail(newEmail) {
    try {
      const attributes = await updateUserAttributes({
        userAttributes: {
          email: newEmail,
        },
      });
      console.log("complitedメールの変更");
      // handle next steps
    } catch (error) {
      console.log(error);
    }
  }
  const handleNameChange = async (text) => {
    setNewName(text);
    await handleUpdateName(text);
    // Amplifyでデータを更新
  };

  const handleEmailChange = async (text) => {
    setNewEmail(text);

    await handleUpdateEmail(text);
  };
  const [borderColor, setBorderColor] = useState("#EEEEEE");
  const handleFocus = () => {
    setBorderColor("#00a960");
  };

  const handleBlur = () => {
    setBorderColor("#EEEEEE");
  };

  const [borderColors, setBorderColors] = useState("#EEEEEE");
  const handleFocuss = () => {
    setBorderColors("#00a960");
  };

  const handleBlurs = () => {
    setBorderColors("#EEEEEE");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <TextInput
        value={newName}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleNameChange}
        style={{
          height: 50,
          width: 300,
          backgroundColor: "#EEEEEE",
          paddingHorizontal: 10,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: borderColor,
        }}
      />
      <TextInput
        value={newEmail}
        onChangeText={handleEmailChange}
        onFocus={handleFocuss}
        onBlur={handleBlurs}
        style={{
          height: 50,
          width: 300,
          marginTop: 30,
          backgroundColor: "#EEEEEE",
          paddingHorizontal: 10,
          borderRadius: 10,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: borderColors,
        }}
      />
      <TextInput
        style={{
          height: 50,
          width: 300,
          marginTop: 30,
          backgroundColor: "#EEEEEE",
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
        onChangeText={() => setProduct()}
      />

      <Logout />
    </View>
  );
}
