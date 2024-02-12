import React from "react";
import { useRef, useState, useEffect } from "react";

import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Countries } from "./Countries";
export default function LoginS({ navigation }) {
  let textInput = useRef(null);
  const defaultCOdeCountry = "+84";
  const defaultMaskcountry = "902 291 011";
  const [phoneNumber, setPhoneNumber] = useState();
  const [focusInput, setFocusInput] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataCountries, setDataCountrie] = useState(Countries);
  const [codeCountry, setCodeCountry] = useState(defaultCOdeCountry);
  const [placeholder, setPlaceholder] = useState(defaultMaskcountry);
  const onShowHideModal = () => {
    setModalVisible(!modalVisible);
  };
  const onChangePhone = (number) => {
    setPhoneNumber(number);
  };
  const onPressContinue = () => {
    if (phoneNumber) {
      navigation.navigate("loginf");
    }
  };
  const onChangeFocus = () => {
    setFocusInput(true);
  };
  const onchangeBlur = () => {
    setFocusInput(false);
  };
  useEffect(() => {
    textInput.focus();
  }, []);
  const filterCountries = (value) => {
    if (value) {
      const countryDate = dataCountries.filter(
        (obj) => obj.en.indexOf(value) > -1 || obj.dialCode.indexOf(value) > -1
      );
      setDataCountrie(countryDate);
    } else {
      setDataCountrie(Countries);
    }
  };
  const onCountryChange = (item) => {
    setCodeCountry(item.dialCode);
    setPlaceholder(item.mask);
    onShowHideModal();
  };
  let renderModal = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <View style={styles.filterInputContainer}>
              <TextInput
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder="Filter"
                focusable={true}
                style={styles.filterInputStyle}
              />
            </View>

            <FlatList
              style={{ flex: 1 }}
              data={dataCountries}
              extraData={dataCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                  <View style={styles.countModalStyle}>
                    <View style={styles.modalItemContainer}>
                      <Text style={styles.modalItemName}>{item.en}</Text>
                      <Text style={styles.modalItemDialcode}>
                        {item.dialCode}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>
          <TouchableOpacity
            onPress={onShowHideModal}
            style={styles.closeButtonStyele}
          >
            <Text style={styles.closeTextStyle}>close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior="padding"
        style={styles.containerAvoiddingView}
      >
        <Text style={styles.textTitle}>
          please input your mobile phone number
        </Text>
        <View
          style={[
            styles.containerInput,
            {
              borderBottomColor: focusInput ? "#244DB7" : "#ffffff",
            },
          ]}
        >
          <TouchableOpacity onPress={onShowHideModal}>
            <View style={styles.openDialogView}>
              <Text>{codeCountry + ""}</Text>
            </View>
          </TouchableOpacity>
          {renderModal()}
          <TextInput
            ref={(input) => (textInput = input)}
            style={styles.phoneInputStyle}
            placeholder="902 291 011"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={onChangePhone}
            secureTextEntry={false}
            onFocus={onChangeFocus}
            onBlur={onchangeBlur}
            autoFocus={focusInput}
          />
        </View>

        <View style={styles.viewBottom}>
          <TouchableOpacity onPress={onPressContinue}>
            <View style={styles.btnContinue}>
              <Text style={styles.textContinue}>continue</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoiddingView: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  textTitle: {
    marginBottom: 50,
    marginTop: 50,
    fontSize: 16,
  },
  containerInput: {
    flexDirection: "row",
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "#00a960",
  },
  openDialogView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneInputStyle: {
    marginLeft: 5,
    flex: 1,
    height: 50,
  },
  viewBottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
    alignItems: "center",
  },
  btnContinue: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00a960",
  },
  textContinue: {
    color: "white",
    alignItems: "center",
  },
  modalContainer: {
    paddingTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: "white",
  },
  filterInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    color: "#424242",
  },
  countModalStyle: {
    flex: 1,
    borderColor: "black",
    borderTopWidth: 1,
    paddding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalItemContainer: {
    flex: 1,
    paddingLeft: 5,
    flexDirection: "row",
  },
  modalItemName: {
    flex: 1,
    fontSize: 16,
  },
  modalItemDialcode: {
    fontSize: 16,
  },
  filterInputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonStyele: {
    padding: 12,
    alignItems: "center",
  },
  closeTextStyle: {
    padding: 5,
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});
