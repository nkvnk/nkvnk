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

const LoginF = ({ navigation }) => {
  let textInput = useRef(null);
  let clockCall = null;
  const lengthInput = 6;
  const defaultCountdown = 30;
  const [internalVal, setInternalVal] = useState();
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableRedend, setEnableRedend] = useState(false);

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  }, []);
  const decrementClock = () => {
    if (countdown === 0) {
      setEnableRedend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const onChangeText = (val) => {
    setInternalVal(val);
    if (val.length === lengthInput) {
    }
  };
  const onChangeNumber = () => {
    setInternalVal("");
  };
  const onResendOTP = () => {
    if (enableRedend) {
      setCountdown(defaultCountdown);
      setEnableRedend(false);
      clearInterval(clockCall);
      clockCall = setInternalVal(() => {
        decrementClock(0);
      }, 1000);
    }
  };
  useEffect(() => {
    textInput.focus();
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior="padding"
        style={styles.containerAvoiddingView}
      >
        <Text style={styles.titleStyle}>input your OTP code sent via sms</Text>
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
                  <Text
                    style={styles.cellText}
                    onPress={() => textInput.focus()}
                  >
                    {internalVal && internalVal.length > 0
                      ? internalVal[index]
                      : ""}
                  </Text>
                </View>
              ))}
          </View>
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={onChangeNumber}>
            <View style={styles.btnChangeNumber}>
              <Text style={styles.textChange}>change number</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onResendOTP}>
            <View style={styles.btnResend}>
              <Text
                style={[
                  styles.textResend,
                  { color: enableRedend ? "#234DB7" : "gray" },
                ]}
              >
                Resend OTP({countdown})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default LoginF;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoiddingView: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  titleStyle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 16,
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
    fontSize: 16,
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
