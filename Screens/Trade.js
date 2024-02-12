
import { StatusBar } from "expo-status-bar";
import { useState ,useRef} from "react";
import { StyleSheet, Text, TouchableOpacity, View,ScrollView,Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getCurrentUser } from "aws-amplify/auth";
export default function Trade() {
  





const [action,setAction]=useState(null);


 const page=Dimensions.get("screen").width;
  const ScrollViewRef=useRef(null);
 const scroll=(pageNumber)=>{

if(ScrollViewRef.current){
  const offset=pageNumber*page;

  ScrollViewRef.current.scrollTo({x:offset,animated:true});
  setAction(pageNumber);
}


 }

  return (
    <View style={{flex: 1,
      
     marginTop:50,
     alignItems:"center"
      }}>
         
        <View style={{flexDirection: "row",}}>
          <TouchableOpacity onPress={()=> scroll(0)}
          style={{backgroundColor: action===0? "#00a960":"transparent",}}
          
        
          >
            <Text style={styles.button}>
              未完了
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>scroll(1)}style={{backgroundColor: action===1? "#00a960":"transparent",}}>
            <Text style={styles.button}>
              完了
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>scroll(2)}style={{backgroundColor: action===2? "#00a960":"transparent",}}>
            <Text style={styles.button}>
              キャンセル済み
            </Text>
          </TouchableOpacity>
        </View>




        <ScrollView horizontal pagingEnabled ref={ScrollViewRef} showsHorizontalScrollIndicator={false}>
        <View style={{ width: page, justifyContent: 'center', alignItems: 'center',}}>
        <Text>未完了ページ</Text>
        {/* ここにページ1のコンテンツを追加 */}
      </View>

      <View style={{width:page,justifyContent:"center",alignItems:"center",}}>
        <Text >
完了ページ
        </Text>
      </View>

      <View style={{ width: page, justifyContent: 'center', alignItems: 'center',}}>
        <Text>キャンセル済み</Text>
        {/* ここにページ1のコンテンツを追加 */}
      </View>
         
        </ScrollView>


      
    </View>
  );
}

const styles=StyleSheet.create({

  button:{
    paddingRight:30,
    fontWeight:"bold",
    borderRadius:100,
    
    
  }
  
})