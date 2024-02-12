import React from "react";
import { View, Text } from "react-native";
export default function Detail({ route }) {
  const data = route.params;
  console.log(data);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>detail screen</Text>
      {data && data.map((datas) => <Text key={datas.id}>{datas.product}</Text>)}
    </View>
  );
}
