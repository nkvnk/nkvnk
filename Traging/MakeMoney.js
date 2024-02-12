import {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { createChat, createPrice } from "../src/graphql/mutations";
import { listChats } from "../src/graphql/queries";
import { UserInformation } from "../Context/UserInformation";
import { MaterialIcons } from "@expo/vector-icons";
import { generateClient } from "aws-amplify/api";
import Cameras from "../Components/Cameras";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { uploadData } from "aws-amplify/storage";

const client = generateClient();
export default function MakeMoney() {
  const [price, setPrice] = useState();
  const [message, setMessage] = useState([]);
  const userinformation = useContext(UserInformation);
  const navigation = useNavigation();
  //配達する人間のuserid
  console.log("ユーザー", userinformation.user.sub);
  //配達を依頼する人間のuserid
  const route = useRoute();
  const passedData = route.params.passData;
  console.log("確認完了", passedData);
  console.log(passedData.userId);
  //send price data

  const sendPrice = async () => {
    if (priceData) {
      try {
        const newPrice = await client.graphql({
          query: createPrice,
          variables: {
            input: {
              ordererp: passedData.userId,
              delivererp: userinformation.user.sub,
              price: priceData,
            },
          },
        });
        console.log("complited send price");

        navigation.navigate("wait");
      } catch (err) {
        console.log("cont send price");
      }
    } else {
      console.log("買い物袋がカラです");
    }
  };

  //cameraの機能
  const [startCamera, setStartCamera] = useState(false);
  const [picture, setPicture] = useState(null);
  console.log("送れるのか確認", picture);

  const addProduct = () => {
    setStartCamera(true);
  };

  useEffect(() => {
    if (picture) {
      const uri = picture;
      console.log("uridayo", uri);

      const change = async () => {
        try {
          const base64ImageData = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          // console.log("長いね", base64ImageData);
          sendImageToCloudVision(base64ImageData);
          //console.log("この形式で良いのか", base64ImageData);
        } catch (err) {
          console.log("データの変換失敗");
        }
      };
      change();
    }
  }, [picture]);
  const [priceData, setPriceData] = useState();
  const sendImageToCloudVision = async (base64ImageData) => {
    const apiKey = "AIzaSyAR3yFvokm1nLtJnK4DvrXzU-3Rg50byEo"; // あなたのCloud Vision APIキーをここに入力

    const body = JSON.stringify({
      requests: [
        {
          features: [{ type: "TEXT_DETECTION" }],
          image: {
            content: base64ImageData, // Base64エンコードされた画像データをcontentフィールドにセット
          },
        },
      ],
    });

    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,

        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: body,
        }
      );
      console.log("2", base64ImageData);
      const data = await response.json();
      const textData = data.responses[0]?.fullTextAnnotation?.text;
      const text = textData;
      const pricePattern = /¥(\d{1,3}(,\d{3})*|(\d+))(\.\d+)?/;
      const extractedPrice = text.match(pricePattern);
      const final = extractedPrice[0].replace(/[^0-9]/g, "");
      // dataからテキスト情報を取得し、必要に応じて画面に表示する処理を追加します
      const priceAsNumber = parseInt(final);
      console.log(final);
      console.log("3", textData);
      console.log(priceAsNumber);
      setPriceData(priceAsNumber);
      //console.log("エキストラだよ", extractedPrice);
      setStartCamera(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  //bottomsheetのためのコード
  console.log(priceData);
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };
  const screenHeight = Dimensions.get("window").height;
  const list = [
    {
      id: 1,
      name: "商品名",
      brand: "メーカー",
      quantity: "個数",
      range: "値段範囲",
    },
  ];

  const [product, setProduct] = useState();
  const [brand, setBrand] = useState();
  useEffect(() => {
    setProduct(passedData.product);
    console.log("g", product);
    setBrand(passedData.brand);
  }, [passedData]);

  return (
    <View style={{ flex: 1 }}>
      {startCamera ? (
        <Cameras
          startCamera={startCamera}
          setStartCamera={setStartCamera}
          picture={picture}
          setPicture={setPicture}
        />
      ) : (
        <View style={styles.placeholder}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between", // 子要素を両端に配置
              borderRadius: 30,
              padding: 10, // コンテナ内の要素に余白を追加
            }}
          >
            <TouchableOpacity onPress={addProduct}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flexDirection: "column" }}>
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={{ fontWeight: "600", fontSize: 20 }}>
                      商品を追加する
                    </Text>
                  </View>
                  <Image
                    source={require("../assets/camera.png")}
                    style={{ width: 40, height: 40, marginLeft: 50 }}
                  />
                  <Text style={{ fontSize: 10 }}>
                    *注文主に商品の確認をとって もらうため
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontWeight: "600", fontSize: 20 }}>
                  注文内容
                </Text>
                <Image
                  source={require("../assets/clipboard.png")}
                  style={{
                    width: 40,
                    height: 40,
                    marginLeft: 15,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.placeholderInset}>
            <View>
              <Image
                source={{ uri: picture }}
                style={{ height: 150, width: 150 }}
              />
              {priceData ? (
                <Text style={styles.overlayContentPrice}> {priceData}円</Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </ScrollView>

          <View style={styles.overlay}>
            <View style={styles.overlayContent}>
              <View style={styles.overlayContentTop}>
                {priceData ? (
                  <Text style={styles.overlayContentPrice}>
                    Total: {priceData}円
                  </Text>
                ) : (
                  <Text style={styles.overlayContentPrice}>Total: 0</Text>
                )}
              </View>
            </View>
            <TouchableOpacity onPress={sendPrice}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>依頼者に送る</Text>
                <MaterialCommunityIcons
                  color="#fff"
                  name="play-circle"
                  size={24}
                  style={{ marginLeft: 12 }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Modal
            visible={visible}
            transparent={true}
            animationType="slide" // アニメーションは無効
            onRequestClose={toggleModal} // Androidでのバックボタン対応
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <View style={styles.modalView}>
                <View style={{ position: "absolute", left: 20, top: 10 }}>
                  <TouchableOpacity onPress={toggleModal} style={styles.butu}>
                    <Icon
                      name="close"
                      size={25}
                      color="black"
                      style={{ right: "0%" }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ alignSelf: "center" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                    }}
                  >
                    注文票
                  </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                  <FlatList
                    scrollEnabled={false}
                    data={list}
                    renderItem={({ item }) => (
                      <View style={styles.itemRow}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text style={styles.itemText}>{item.brand}</Text>
                        <Text style={styles.itemText}>{item.quantity}</Text>
                        <Text style={styles.itemText}>{item.range}</Text>
                      </View>
                    )}
                  />
                  <ScrollView>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      <FlatList
                        data={product}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <View style={{ marginLeft: 40, paddingBottom: 10 }}>
                            {product && (
                              <Text style={styles.item}>{product}</Text>
                            )}
                          </View>
                        )}
                        scrollEnabled={false} // スクロールを無効化
                        style={styles.flatList}
                      />
                      <FlatList
                        data={brand}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <View style={{ marginLeft: 40, paddingBottom: 10 }}>
                            {brand && <Text style={styles.item}>{brand}</Text>}
                          </View>
                        )}
                        scrollEnabled={false} // スクロールを無効化
                        style={styles.flatList}
                      />
                    </ScrollView>
                  </ScrollView>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
}
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 10,
    padding: 24,
    backgroundColor: "#F3F4F6",
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: "#CFD1D4",
    borderStyle: "dashed",
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Overlay */
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  overlayContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  overlayContentTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 2,
  },
  overlayContentPriceBefore: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
    color: "#8e8e93",
    marginRight: 4,
    textDecorationLine: "line-through",
    textDecorationColor: "#8e8e93",
    textDecorationStyle: "solid",
  },
  overlayContentPrice: {
    paddingLeft: 10,
    paddingTop: 20,
    fontSize: 25,
    lineHeight: 26,
    fontWeight: "700",
    color: "#000",
  },
  overlayContentTotal: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: "#4c6cfd",
    letterSpacing: -0.07,
    textDecorationLine: "underline",
    textDecorationColor: "#4c6cfd",
    textDecorationStyle: "solid",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#007aff",
    borderColor: "#007aff",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
  modalView: {
    height: screenHeight / 3, // 画面の高さの3分の1
    backgroundColor: "#fffaf0",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // ここで背景色を指定
  },
  butu: {
    justifyContent: "center",
    alignItems: "center",
    width: 30, // 必要に応じてサイズを調整してください
    height: 30, // 必要に応じてサイズを調整してください
    backgroundColor: "white",
    borderRadius: 25, // 幅と高さの半分の値にして円を作ります
    elevation: 3, // Android用の影を追加
    // iOS用の影
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { height: 0, width: 0 },
  },
  itemRow: {
    flexDirection: "row",
    //alignItems: "flex-end",

    width: "80%", // アイテム行の幅をモーダルの幅に合わせる
    marginLeft: 50,
    justifyContent: "space-between", // アイテム内の要素間に均等なスペースを設定
  },
  itemText: {
    fontWeight: "500",
  },
});
