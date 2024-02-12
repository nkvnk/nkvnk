import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState, useRef } from "react";

//location 現在と関連のインポート
import Header from "./Components/Header";
import * as Location from "expo-location";
import { UserLocationContext } from "./Context/UserLocationContext";
import { useNavigation } from "@react-navigation/native";
import Test from "./Test";
import Shopping2 from "./Order/Shopping2";
import Shopping1 from "./Order/Shopping1";
import SearchDetail from "./Search/SearchDetail";
import Chato from "./Components/Chato";
import Otp from "./authnicator/Otp";
import Login from "./authnicator/Login";
import Signup from "./authnicator/Signup";
import Address from "./Components/Address";
import CheckPlace from "./Order/CheckPlace";
import PlaceDetail from "./Components/PlaceDetail";
import Payments from "./Components/Payments";
import SearchDetail2 from "./Search/SearchDetail2";
import Wait from "./Traging/Wait";
import LoginS from "./Components/LoginS";
import LoginF from "./Components/LoginF";
import Tab from "./navigations/TabNavigation";
import Home from "./Screens/Home";
import Map from "./Screens/Map";
import Chat from "./Components/Chat";
import Setting from "./Screens/Setting";
import Trade from "./Screens/Trade";
import Activity from "./Screens/Activity";
import ShoppingPost from "./Order/ShoppingPost";
import Delete from "./Editme/Delete";
import Edit from "./Editme/Edit";
import See from "./Editme/See";
import MakeMoney from "./Traging/MakeMoney";
import PayMoney from "./Traging/PayMoney";
import Detail from "./Components/Detail";
import SettingScreen from "./setting/SettingScreen";
import ProfileScreen from "./setting/ProfileScreen";
import PayScreen from "./setting/PayScreen";
import KeepCard from "./setting/KeepCard";
import WithdrawScreen from "./setting/WithdrawScreen";
import HelpScreen from "./setting/HelpScreen";
import QuestionScreen from "./setting/QuestionScreen";
import WaitingCustomer from "./Components/WaitingCustomer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Addressf from "./Components/Addressf";
import Check from "./Traging/Check";
import { ShareCarInformation } from "./Context/ShareCarInformation";
import Search from "./Screens/Search";
import ShareCar1 from "./Order/ShareCar1";
import ShareCar2 from "./Order/ShareCar2";
import ShareCar3 from "./Order/ShareCar3";
import ShareCar4 from "./Order/ShareCar4";
import ShareCar5 from "./Order/ShareCar5";
import ShareCar6 from "./Order/ShareCar6";
import ShareCar7 from "./Order/ShareCar7";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./src/amplifyconfiguration.json";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { Auth } from "aws-amplify";
import { UserInformation } from "./Context/UserInformation";
import { fetchUserAttributes, signIn, signUp } from "aws-amplify/auth";
Amplify.configure(amplifyconfig);
//payment
import Draws from "./navigations/DrawerNavigation";
//
import { StripeProvider } from "@stripe/stripe-react-native";
import Product from "./Order/CheckPlace";
import { Sp_Key } from "@env";

export default function App() {
  const Stack = createNativeStackNavigator();
  //現在地取得のコード
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  //現在のユーザー情報の取得

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    async function handleFetchUserAttributes() {
      try {
        const userAttributes = await fetchUserAttributes();
        console.log("ユーザー確認", userAttributes);
        setUser(userAttributes);
      } catch (error) {
        console.log(error);
        setOpen(false);
      }
    }
    handleFetchUserAttributes();
  }, []);
  //providerの定義をしている
  const [place1, setPlace1] = useState(null);
  const [place2, setPlace2] = useState(null);
  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserInformation.Provider value={{ user }}>
        <StripeProvider
          publishableKey={Sp_Key}
          merchantIdentifier=" merchant.com.makePayment.tsuideni" // required for Apple Pay
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
          <ShareCarInformation.Provider
            value={{ place1, setPlace1, place2, setPlace2 }}
          >
            <NavigationContainer>
              <Stack.Navigator
              //initialRouteName="payments"
              >
                {open ? (
                  <Stack.Screen
                    name="tab"
                    component={Tab}
                    options={{ headerShown: false }}
                  />
                ) : (
                  <Stack.Screen
                    name="login"
                    component={Login}
                    options={{ headerShown: false }}
                  />
                )}
                <Stack.Screen
                  name="signup"
                  component={Signup}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="search"
                  component={Search}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="sharecar1"
                  component={ShareCar1}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="sharecar2"
                  component={ShareCar2}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="sharecar3"
                  component={ShareCar3}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="sharecar4"
                  component={ShareCar4}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="sharecar5"
                  component={ShareCar5}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="sharecar6"
                  component={ShareCar6}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="sharecar7"
                  component={ShareCar7}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="shopping2"
                  component={Shopping2}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="shopping1"
                  component={Shopping1}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="searchdetail"
                  component={SearchDetail}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="searchdetail2"
                  component={SearchDetail2}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="check"
                  component={Check}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="test"
                  component={Draws}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="chato"
                  component={Chato}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="header"
                  component={Header}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="chat"
                  component={Chat}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="home"
                  component={Home}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="keepcard"
                  component={KeepCard}
                  options={{ title: "カードを追加する" }}
                />
                <Stack.Screen
                  name="trade"
                  component={Trade}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="activity"
                  component={Activity}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="waitingcustomer"
                  component={WaitingCustomer}
                />
                <Stack.Screen
                  name="otp"
                  component={Otp}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="addressf"
                  component={Addressf}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="address" component={Address} />
                <Stack.Screen name="checkplace" component={CheckPlace} />
                <Stack.Screen name="placedetail" component={PlaceDetail} />
                <Stack.Screen name="payments" component={Payments} />
                <Stack.Screen
                  name="wait"
                  component={Wait}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="logins" component={LoginS} />
                <Stack.Screen name="loginf" component={LoginF} />
                <Stack.Screen name="detail" component={Detail} />
                <Stack.Screen name="map" component={Map} />
                <Stack.Screen name="Setting" component={Setting} />
                <Stack.Screen
                  name="shoppingpost"
                  component={ShoppingPost}
                  options={{ title: "注文情報の記載" }}
                />
                <Stack.Screen name="see" component={See} />
                <Stack.Screen name="delete" component={Delete} />
                <Stack.Screen name="edit" component={Edit} />
                <Stack.Screen name="pay" component={PayMoney} />
                <Stack.Screen
                  name="make"
                  component={MakeMoney}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="settings" component={SettingScreen} />
                <Stack.Screen name="profile" component={ProfileScreen} />
                <Stack.Screen
                  name="pays"
                  component={PayScreen}
                  options={{ title: "支払い方法" }}
                />
                <Stack.Screen
                  name="withdraw"
                  component={WithdrawScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="help" component={HelpScreen} />
                <Stack.Screen
                  name="question"
                  component={QuestionScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </ShareCarInformation.Provider>
        </StripeProvider>
      </UserInformation.Provider>
    </UserLocationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
