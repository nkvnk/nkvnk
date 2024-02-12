import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
LocaleConfig.locales["ja"] = {
  monthNames: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  monthNamesShort: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  dayNames: [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日",
  ],
  dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
  today: "今日",
};
LocaleConfig.defaultLocale = "ja";
export default function ShareCar3() {
  const [selected, setSelected] = useState("");
  const navigation = useNavigation();
  const go = () => {
    if (selected) {
      navigation.navigate("sharecar4");
    } else {
      alert("日付を選択してください");
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.title}>出発する日付を選択してしてください</Text>
      </View>
      <View style={{ marginTop: 30 }}>
        <Calendar
          // ロケールを日本語に設定

          locale="ja"
          // 日付を選択した際のハンドラ
          onDayPress={(day) => {
            setSelected(day.dateString);
          }}
          // 選択された日付をマーク
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "#00a960",
            },
          }}
          // カスタムスタイルを適用
          theme={{
            selectedDayTextColor: "white",
            todayTextColor: "#00a960",
            //textSectionTitleColor: "#00a960",
            selectedDayBackgroundColor: "#00a960",
            textDayFontSize: 18,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 16,
          }}
        />
      </View>
      <TouchableOpacity style={styles.fab} onPress={go}>
        <AntDesign name="arrowright" size={28} color="#fff" />
      </TouchableOpacity>
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
});
