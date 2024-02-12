import Test from "../Test";
import Tests from "../Tests";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// 上で作成したカスタムドロワーコンテンツをインポート
import CustomDrawerContent from "../CustomDrawerContent";
const Drawer = createDrawerNavigator();
export default function Draws() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: "85%",
        },
      }}
      //  initialRouteName="test"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="test"
        component={Test}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
