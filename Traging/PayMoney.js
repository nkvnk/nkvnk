import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Dimensions,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { UserInformation } from "../Context/UserInformation";
import { generateClient } from "aws-amplify/api";
import { listChats, getChat, listPrices } from "../src/graphql/queries";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SK_Url, AC_Url } from "@env";
import { listCards, getCard } from "../src/graphql/queries";
import {
  PlatformPayButton,
  isPlatformPaySupported,
  confirmPlatformPayPayment,
  PlatformPay,
  createPaymentMethod,
  createPlatformPayPaymentMethod,
} from "@stripe/stripe-react-native";

const client = generateClient();
export default function PayMoney() {
  const userInformation = useContext(UserInformation);
  // console.log(userInformation.user.sub);
  const [lastPrice, setLastPrice] = useState(null);
  const [commission, setCommission] = useState(null);
  const [deliveryCost, setDeliveryCost] = useState(null);
  const [total, setTotal] = useState(null);
  const list = [
    {
      id: 1,
      name: "小計",
    },
    {
      id: 2,
      name: "配達料金",
    },
    {
      id: 3,
      name: "手数料",
    },
    {
      id: 4,
      name: "合計",
    },
  ];

  const calcuration = async () => {
    try {
      const variables = {
        filter: { ordererp: { eq: userInformation.user.sub } },
      };
      const allPrices = await client.graphql({
        query: listPrices,
        variables: variables,
      });

      setLastPrice(allPrices.data.listPrices.items);
      //console.log(allPrices.data.listPrices.items);
    } catch (err) {
      console.log("価格の入力が完了ません");
    }
  };
  useEffect(() => {
    calcuration();
  }, []);
  useEffect(() => {
    if (
      lastPrice !== null &&
      Array.isArray(lastPrice) &&
      lastPrice.length > 0
    ) {
      const newCalculatedValue = lastPrice[0].price * 0.3; // 最初の要素のpriceを取得して×0.3する
      setCommission(newCalculatedValue);
      //console.log(newCalculatedValue);
      const total = lastPrice[0].price + newCalculatedValue;
      // 計算した値をコンソールに出力

      if (300 > newCalculatedValue) {
        const cost = 300 - newCalculatedValue;
        setDeliveryCost(cost);
        const toatals = lastPrice[0].price + newCalculatedValue + cost;
        setTotal(toatals);
      } else {
        console.log(total);
        setTotal(total);
      }
    }
  }, [lastPrice]);

  const navigation = useNavigation();

  //価格を表示できる
  const [selectedMethod, setSelectedMethod] = useState("Apple Pay");
  const renderStatusIcon = (method) => {
    if (selectedMethod === method) {
      return <Icon name="check-circle" size={24} color="#00a960" />;
    }
    return <Icon name="radio-button-unchecked" size={24} color="#000" />;
  };

  const [judge, setJudge] = useState(null);
  const get = async () => {
    // List all items
    try {
      console.log("確認");
      const variables = {
        filter: {
          userId: {
            eq: userInformation?.user?.sub,
          },
        },
      };
      const allCards = await client.graphql({
        query: listCards,
        variables: variables,
      });
      setJudge("カード情報の確認", allCards.data?.listCards?.items[0].customer);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const paymentbutton = () => {
    if (judge) {
      setIsLoading(true);
      console.log("judgeの確認を完了する");
      fetchPaymentIntentClientSecret();
    } else {
      navigation.navigate("payments", { total, lastPrice });
    }
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${SK_Url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total,
        customerId: judge,
      }),
    });
    const { clientSecret, customer } = await response.json();

    // クライアントサイドでclientSecretとcustomerを表示させる
    console.log("Client Secret:", clientSecret);
    if (clientSecret) {
      setIsLoading(false);
      alert("支払いが完了しました");
      navigation.navigate("wait");
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View
          style={{ alignItems: "flex-start", marginTop: 30, marginLeft: 30 }}
        >
          <FlatList
            data={list}
            style={{ width: "100%" }}
            scrollEnabled={false}
            renderItem={({ item }) => {
              const special = item.name.includes("合計");
              return (
                <View>
                  <Text
                    style={{
                      fontSize: special ? 25 : 20,
                      marginTop: 15,
                      fontWeight: special ? "bold" : "normal",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View
          style={{
            alignItems: "flex-end",
            marginRight: 30,
            marginTop: 30,
            flex: 1,
          }}
        >
          {lastPrice &&
            lastPrice.map((item, index) => (
              <Text style={{ marginTop: 10, fontSize: 17 }} key={index}>
                ￥{item.price}
              </Text>
            ))}
          {commission && (
            <Text style={{ fontSize: 17, marginTop: 20 }}>￥{commission}</Text>
          )}
          {deliveryCost ? (
            <Text style={{ marginTop: 20, fontSize: 17 }}>
              ￥{deliveryCost}
            </Text>
          ) : (
            <Text style={{ fontSize: 17, marginTop: 20 }}>¥0</Text>
          )}
          {total && (
            <Text style={{ marginTop: 20, fontSize: 17 }}>￥{total}</Text>
          )}
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 0.3,
          width: "100%",
          borderBottomColor: "grey",
          marginTop: 10,
          alignItems: "center",
        }}
      />
      <View
        style={{
          // justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, marginLeft: 5 }}
          onPress={paymentbutton}
          disabled={isLoading}
        >
          <View
            style={{
              backgroundColor: "black",
              borderRadius: 10,
              height: 45,
              width: "90%",

              marginLeft: 20,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            {isLoading ? (
              // ローディング中はActivityIndicatorを表示
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              // ローディング中でなければテキストを表示
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                注文する
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
  },

  header: {
    positon: "absolute",
    marginTop: 50,
  },
  headertext: {
    fontSize: 20,
    fontWeight: "bold",
  },

  modalView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    height: 150,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "black",
    height: 60,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 1,
    textAlign: "center",
    color: "white",
    paddingVertical: 9,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  addCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  text: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "bold",
  },
  iconContainer: {
    borderWidth: 1, // 四角い線の幅を設定
    borderColor: "black", // 線の色を設定
    padding: 2, // アイコンと線の間に余白を設定
    borderRadius: 4, // 円形の線を作成（必要に応じて調整）
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between", // ボタン間のスペースを最大にする
    width: "90%", // 親ビューの幅の90%に設定
    alignSelf: "center", // 親ビューの中心に配置
  },
  button: {
    paddingVertical: 15, // 縦のパディングを増やしてボタンの高さを増加
    paddingHorizontal: 30, // 横のパディングを増やしてテキストとアイコンの間隔を開ける
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexGrow: 1, // 利用可能なスペースを均等に分ける
  },
  text: {
    flex: 1,
    marginLeft: 12,
    fontSize: 17,
    fontWeight: "bold",
  },
  iconContainer: {
    borderWidth: 1, // 四角い線の幅を設定
    borderColor: "black", // 線の色を設定
    padding: 2, // アイコンと線の間に余白を設定
    borderRadius: 4,
    textAlign: "center", // 円形の線を作成（必要に応じて調整）
  },

  // その他のスタイル
});
