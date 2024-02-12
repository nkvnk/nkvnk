import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Modal,
} from "react-native";

import Slider from "@react-native-community/slider";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
//user情報のusecontext
import { UserInformation } from "../Context/UserInformation";
import { UserLocationContext } from "../Context/UserLocationContext";
//amplifyのimport
import { generateClient } from "aws-amplify/api";
import { createOrder, createPlace } from "../src/graphql/mutations";
import MapView, { Marker } from "react-native-maps";
const client = generateClient();

export default function ShoppingPost() {
  //context 情報をまとめている
  const userinformation = useContext(UserInformation);
  const userLocation = useContext(UserLocationContext);
  // console.log(userinformation.user);
  //インプット情報をhookでまとめている。
  const [product, setProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [shop, setShop] = useState("");
  const [color, setColor] = useState("");
  const [comment, setComment] = useState("");
  const [price, setPrice] = useState("");
  const navigation = useNavigation("");
  //console.log(userinformation);
  console.log(userLocation.location.coords.latitude);
  console.log(userinformation.user.sub);
  //テキストインプットの色の変化を楽しむ
  const [borderColor, setBorderColor] = useState("grey");
  const handleFocus = () => {
    setBorderColor("#00a960");
  };

  const handleBlur = () => {
    setBorderColor("grey");
  };
  const [orderId, setOrderId] = useState(null);
  //amplfyでのバックエンドに情報を保存する
  const uploadOrder = async () => {
    console.log("1");
    try {
      const newOrder = await client.graphql({
        query: createOrder,
        variables: {
          input: {
            product: product,
            brand: brand,
            shop: shop,
            color: color,
            comment: comment,
            price: price,
            userId: userinformation.user.sub,
            longitude: userLocation.location.coords.longitude,
            latitude: userLocation.location.coords.latitude,
          },
        },
      });
      console.log("2");
      //console.log(newOrder.data.createOrder.id);
      setOrderId(newOrder.data.createOrder.id);
    } catch (err) {
      console.log("アップロードが完了しません");
    }
  };
  useEffect(() => {
    const uploadPlace = async () => {
      try {
        console.log("これで良い", orderId);
        const newPlace = await client.graphql({
          query: createPlace,
          variables: {
            input: {
              longitude: userLocation.location.coords.longitude,
              latitude: userLocation.location.coords.latitude,
              OrderId: orderId,
            },
          },
        });
        console.log("placeが完了しました");
      } catch (err) {
        console.log("placeが完了しません");
      }
    };
    if (orderId !== null) {
      uploadPlace();
    }
  }, [orderId]);
  const [modal, setModal] = useState(false);
  const open = () => {
    setModal(true);
  };
  const close = () => {
    setModal(false);
  };
  const [markers, setMarkers] = useState([]);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkers([coordinate]);
    console.log(markers);
  };

  const [priceRange, setPriceRange] = useState([0, 300]);

  const handleSliderChange = (values) => {
    setPriceRange(values);
  };

  const check = () => {
    console.log("完了");
    if (markers.length > 0) {
      setModal(false);
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView style={{ flex: 1 }} behavior="padding">
        <View
          style={{
            marginLeft: 10,
            marginTop: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 22, fontWeight: "bold", color: "grey" }}>
              商品詳細
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 0.3,
              width: "80%",
              borderBottomColor: "grey",
              marginTop: 10,
              alignSelf: "center",
            }}
          />
          <View>
            <Text style={styles.productName}>商品名</Text>
            <TextInput
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                borderWidth: 1,
                height: 40,
                width: 330,
                borderColor: borderColor,
                paddingHorizontal: 10,
                borderRadius: 15,
                borderWidth: 2,
                color: "black",
              }}
              onChangeText={(text) => setProduct(text)}
              placeholder="正確でなくてもよいので、できるだけ伝わるように"
              placeholderTextColor="grey"
            />
            <Text style={styles.productName}>メーカー</Text>
            <TextInput
              style={styles.inputProductName}
              onChangeText={(text) => setBrand(text)}
              placeholder="(任意)"
              placeholderTextColor="grey"
            />
            <Text style={styles.productName}>コメント</Text>
            <TextInput
              style={styles.inputProductComment}
              onChangeText={(text) => setComment(text)}
              placeholder="サイズや色など伝えたい情報があれば記入して下さい"
              placeholderTextColor="grey"
            />
            <Text style={styles.productName}>料金</Text>
            <TextInput
              style={styles.inputProductName}
              onChangeText={(number) => setPrice(number)}
              keyboardType="numeric"
              placeholder="200～300円"
              placeholderTextColor="grey"
            />
            <View
              style={{
                borderBottomWidth: 0.3,
                width: "80%",
                borderBottomColor: "grey",
                marginTop: 10,
                alignSelf: "center",
              }}
            />
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "bold", color: "grey" }}>
                購入場所
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 0.3,
                width: "80%",
                borderBottomColor: "grey",
                marginTop: 10,
                alignSelf: "center",
              }}
            />
            <Text style={styles.productName}>指定のお店(任意)</Text>
            <TouchableOpacity onPress={open}>
              <MapView style={{ height: 150, width: 330 }}>
                {markers &&
                  markers.map((marker, index) => (
                    <Marker key={index} coordinate={marker} />
                  ))}
                <Text style={{ fontWeight: "600" }}>
                  タップしてピンを指そう
                </Text>
              </MapView>
            </TouchableOpacity>
            <Modal
              visible={modal}
              animationType="slide"
              transparent={true}
              onRequestClose={close}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <View style={{ alignSelf: "flex-end" }}>
                    <TouchableOpacity onPress={close}>
                      <Text>閉じる</Text>
                    </TouchableOpacity>
                  </View>

                  {/* ここにModalの内容を追加 */}
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ fontWeight: "500" }}>
                      ピンの位置を調整する
                    </Text>
                  </View>

                  <MapView
                    onPress={handleMapPress}
                    style={{ width: "100%", height: "83%", marginTop: 10 }}
                  >
                    {markers &&
                      markers.map((marker, index) => (
                        <Marker key={index} coordinate={marker} />
                      ))}
                  </MapView>
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#00a960",
                      width: 200,
                      height: 40,
                      borderRadius: 20,
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                    onPress={check}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      この場所を指定する
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "bold", color: "grey" }}>
                価格指定
              </Text>
              <View style={{ width: 300, alignSelf: "center" }}>
                <MultiSlider
                  values={priceRange}
                  sliderLength={300}
                  min={0}
                  max={10000}
                  step={100}
                  onValuesChange={handleSliderChange}
                  containerStyle={{ height: 40 }}
                  trackStyle={{ height: 5, backgroundColor: "lightgrey" }}
                  selectedStyle={{ backgroundColor: "#0067C0" }}
                  markerStyle={{
                    backgroundColor: "white",
                    height: 20,
                    width: 20,
                    borderWidth: 0,
                  }}
                />
              </View>
              <Text>Min Price: ${priceRange[0]}</Text>
              <Text>Max Price: ${priceRange[1]}</Text>
            </View>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#00a960",
                width: 200,
                height: 40,
                borderRadius: 20,
              }}
              onPress={uploadOrder}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                アップロード
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: "white",
  },
  headView: {
    flex: 1,
    alignItems: "center",
  },
  headText: {
    color: "black",
    fontSize: 30,
    marginTop: 40,
    fontWeight: "bold",
    marginBottom: 30,
  },

  productName: {
    color: "grey",
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputProductName: {
    borderWidth: 1,
    height: 40,
    width: 330,

    borderColor: "#9c9c9c",
    paddingHorizontal: 10,
    borderRadius: 15,
    //  color: "#fff",
    color: "black",
  },
  inputProductComment: {
    borderWidth: 1,
    height: 100,
    width: 330,
    borderColor: "#9c9c9c",
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "black",
  },
  buttonView: {
    alignItems: "center",
    marginTop: 30,
    borderRadius: 15,
  },

  buttonupload: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00a960",
    width: 200,
    height: 40,
    borderRadius: 20,
  },
  uploadText: {
    fontWeight: "bold",
  },
  //modalの内容
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});

{
  /*
<Text style={styles.productName}>購入場所</Text>
<TextInput
  style={styles.inputProductName}
  onChangeText={(text) => setShop(text)}
  placeholder="(任意)"
  placeholderTextColor="grey"
/>
<Text style={styles.productName}>サイズや色など</Text>
            <TextInput
              style={styles.inputProductName}
              onChangeText={(text) => setColor(text)}
              placeholder="(任意)"
              placeholderT

<Text style={styles.productName}>予算範囲</Text>
            <TextInput
              style={styles.inputProductName}
              onChangeText={(number) => setPrice(number)}
              keyboardType="numeric"
              placeholder="200～300円"
              placeholderTextColor="grey"
            />


              <View
              style={{
                borderBottomWidth: 0.3,
                width: "80%",
                borderBottomColor: "grey",
                marginTop: 10,
                alignSelf: "center",
              }}
            />
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#00a960",
                  width: 200,
                  height: 40,
                  borderRadius: 20,
                }}
                onPress={uploadOrder}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  アップロード
                </Text>
              </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={close} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>閉じる</Text>
                </TouchableOpacity>
*/
}
