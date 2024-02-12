import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, Text } from "react-native";

const Addressf = () => {
  const [placeData, setPlaceData] = useState("");
  const navigation = useNavigation();
  const datas = (data) => {
    setPlaceData(data.description);
    navigation.navigate("signup", { placeData });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        backgroundColor: "#e8ecf4",
      }}
    >
      <GooglePlacesAutocomplete
        styles={{
          container: {
            // コンテナ全体のスタイル
            flex: 1,
            width: "100%",
          },
          textInputContainer: {
            // テキスト入力コンテナのスタイル
            backgroundColor: "lightgrey",
            borderTopWidth: 0,
            borderBottomWidth: 1,
            borderColor: "white",
          },
          textInput: {
            // テキスト入力フィールドのスタイル
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: "green",
          },
          predefinedPlacesDescription: {
            // プレースの説明のスタイル
            color: "#1faadb",
          },
        }}
        placeholder="郵便番号を入力してください。
        "
        onPress={datas}
        value={String(placeData)}
        fetchDetails={true}
        query={{
          key: "AIzaSyACqbF9hQeI9zPHs6c24NVlgCHau5Jbgxc",
          language: "ja", // 言語設定
          components: "country:jp",
        }}
        renderDescription={(row) => (
          <View>
            <Text
              style={row.isPredefinedPlace ? styles.currentasgoogleText : {}}
            >
              {row.description}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Addressf;
