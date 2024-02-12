import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { generateClient } from "aws-amplify/api";
import { createChat } from "../src/graphql/mutations";
import { useRoute } from "@react-navigation/native";
import { listChats } from "../src/graphql/queries";
import { UserInformation } from "../Context/UserInformation";
const client = generateClient();
import { GiftedChat, Send } from "react-native-gifted-chat";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { onCreateChat } from "../src/graphql/subscriptions";
export default function Chat() {
  const userinformation = useContext(UserInformation);
  // console.log(userinformation.user.sub);

  const route = useRoute();
  const order = route.params.order;
  console.log(order);
  const [messages, setMessages] = useState([]);
  //console.log("chatapp", passedData);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "取引相手",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const message = messages[0].text;
    try {
      await makeChat(message);
    } catch (error) {
      console.log("送れない", error);
    }
  }, []);
  //make chat
  const makeChat = async (message) => {
    try {
      const newChat = await client.graphql({
        query: createChat,
        variables: {
          input: {
            orderer: order,
            deliverer: userinformation?.user?.sub,
            content: message,
            judgment: "d",
          },
        },
      });
      console.log("バックエンドに送信できました");
    } catch (error) {
      console.log("makechat", error);
    }
  };
  //read chat
  const readChat = async () => {
    try {
      const currentUserId = userinformation?.user?.sub; //
      const variables = {
        filter: {
          deliverer: { eq: userinformation?.user?.sub },
        },
      };
      const allChats = await client.graphql({
        query: listChats,
        variables: variables,
      });

      const formattedMessages = allChats.data.listChats.items
        .map((msg) => ({
          _id: msg.id,
          text: msg.content,
          createdAt: new Date(msg.createdAt),
          user: {
            _id:
              msg.judgment === "d" && msg.deliverer === currentUserId
                ? msg.deliverer
                : msg.orderer,
            // 必要に応じて他のユーザー情報を追加
            // 必要に応じて他のユーザー情報を追加
          },
        }))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // 時系列順にソート

      // 状態にメッセージを設定
      setMessages(formattedMessages);
      console.log("全て完了しました");
    } catch (error) {
      console.log("readmessage", error);
    }
  };
  useEffect(() => {
    readChat();
  }, []);

  //リアルタイムでチャット機能実装

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        alwaysShowSend={true}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userinformation?.user?.sub,
        }}
        renderSend={(props) => {
          return (
            <Send {...props} containerStyle={styles.sendContainer}>
              <MaterialIcons name="send" size={30} color="#007AFF" />
            </Send>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  sendContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 15,
  },
  sendButtonTitile: {
    color: "#4fa9ff",
    fontWeight: "bold",
  },
});

{
  /*




const variables = {
  filter: {
    and: [
      { deliverer: { eq: userinformation?.user?.sub } },
      { judgment: { eq: "o" } },
    ],
  },
};
const chats = client
  .graphql({
    query: onCreateChat,
    variables: variables,
  })
  .subscribe({
    next: ({ data }) => {
      console.log(data);
      const formattedMessages = chats.data.onCreateChat.items
        .map((msg) => ({
          _id: msg.id,
          text: msg.content,
          createdAt: new Date(msg.createdAt),
          user: {
            _id:
              msg.judgment === "d" && msg.deliverer === currentUserId
                ? msg.deliverer
                : msg.orderer,
            // 必要に応じて他のユーザー情報を追加
            // 必要に応じて他のユーザー情報を追加
          },
        }))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // 時系列順にソート

      // 状態にメッセージを設定
      setMessages(formattedMessages);
    },
    error: (error) => console.warn(error),
  });*/
}
