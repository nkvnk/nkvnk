import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // インストールが必要です
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function ShareCar4() {
  const initialTime = new Date();
  initialTime.setHours(8);
  initialTime.setMinutes(0);
  const [time, setTime] = useState(initialTime);
  const [show, setShow] = useState(null);

  const onChange = (event, selectedTime) => {
    if (selectedTime) {
      setTime(selectedTime); // 新しい時間でtimeステートを更新
    }
  };
  const go = () => {
    setShow(true);
  };
  const navigation = useNavigation();
  const goes = () => {
    navigation.navigate("sharecar5");
  };
  const close = () => {
    setShow();
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.title}>出発する時間を選択してしてください</Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1,
          // justifyContent: "center",
          marginTop: 50,
        }}
      >
        <TouchableOpacity style={styles.timeContainer} onPress={go}>
          <Text style={styles.timeText}>
            {time.getHours().toString().padStart(2, "0")}:
            {time.getMinutes().toString().padStart(2, "0")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {show && (
          <TouchableOpacity style={{ marginLeft: 300 }} onPress={close}>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>閉じる</Text>
          </TouchableOpacity>
        )}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="spinner" // これはAndroidでの表示スタイルです。iOSでは 'spinner' がデフォルトです
            onChange={onChange}
            style={styles.timePicker}
          />
        )}
      </View>
      {!show && (
        <TouchableOpacity style={styles.fab} onPress={goes}>
          <AntDesign name="arrowright" size={28} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    textAlign: "center", // テキストを中央揃えにします。
  },
  timeContainer: {
    flexDirection: "row", // アイコンとテキストを横に並べます。
    alignItems: "center", // 中央に配置します。
    borderWidth: 1,
    textAlign: "center",
    borderColor: "grey",
    borderRadius: 50, // ボタンの端を丸くします。
    paddingVertical: 10,
    paddingHorizontal: 20,
    // backgroundColor: "#F0F0F0",
    width: "90%",
    // ボタンの背景色を設定します。
  },
  timeText: {
    fontSize: 60,
    flex: 1,
    fontWeight: "bold",
    color: "#000",
    marginRight: 10,
    textAlign: "center",
    // アイコンとの間に余白を作ります。
  },
  fab: {
    backgroundColor: "#00a960", // Bootstrap primary blue
    width: 56, // Standard FAB size
    height: 56,
    borderRadius: 28, // Half the width and height to create a circle
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16, // Margin from the bottom
    right: 16, // Margin from the right
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  timePicker: {
    width: 300, // ピッカーの幅を設定
    height: 300,
    backgroundColor: "white",
  },
});
