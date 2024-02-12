import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { confirmSignUp } from "aws-amplify/auth";
import { signIn } from "aws-amplify/auth";
const Otp = () => {
  let textInput = useRef(null);
  const route = useRoute();
  const email = route.params.email;
  const password = route.params.password;
  const navigation = useNavigation();
  console.log("確認", email);
  const lengthInput = 6;
  const [internalVal, setInternalVal] = useState();

  const onChangeText = (val) => {
    setInternalVal(val);
    if (val.length === lengthInput) {
    }
  };
  useEffect(() => {
    keybord();
  }, []);
  const keybord = () => {
    textInput.focus();
    console.log("キーボードのセットが完了しました");
  };
  const [isValid, setIsValid] = useState(true);
  const handin = () => {
    if (internalVal?.length < 6) {
      setIsValid(false);
      console.log("認証できません");
    } else {
      handleSignUpConfirmation();
    }
  };
  console.log(internalVal);

  async function handleSignUpConfirmation() {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email,
        confirmationCode: internalVal,
      });
      console.log("全全て完了しました");
      await signIn({
        username: email,
        password: password,
      });
      navigation.navigate("home");
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior="padding"
        style={styles.containerAvoiddingView}
      >
        <Text style={styles.titleStyle}>認証コードを入力してください</Text>
        <View>
          <TextInput
            ref={(input) => (textInput = input)}
            onChangeText={onChangeText}
            style={{ width: 0, height: 0 }}
            value={internalVal}
            maxLength={lengthInput}
            returnKeyType="done"
            keyboardType="numeric"
          />
          <View style={styles.containerInput}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View key={index} style={styles.cellView}>
                  <Text onPress={keybord} style={styles.cellText}>
                    {internalVal && internalVal.length > 0
                      ? internalVal[index]
                      : ""}
                  </Text>
                </View>
              ))}
          </View>
        </View>
        {!isValid && (
          <Text style={{ color: "red" }}>6桁で記入してください</Text>
        )}
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={handin}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderWidth: 1,
                backgroundColor: "#075eec",
                borderColor: "#075eec",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 26,
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                認証する
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8ecf4",
  },
  containerAvoiddingView: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  titleStyle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomView: {
    flexDirection: "row",
    flex: 1,
    //justifyContent: "flex-end",
    marginBottom: 50,
    alignItems: "center",
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textChange: {
    color: "#234DB7",
    alignItems: "center",
    fontSize: 16,
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  textResend: {
    alignItems: "center",
    fontSize: 16,
  },
});
