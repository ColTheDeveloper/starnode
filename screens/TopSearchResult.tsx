import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import ContentLoading from "../components/contentLoading";
import BlogComponent from "../components/BlogComponent";
import ListEndComponent from "../components/ListEndComponent";
import { useNavigation } from "@react-navigation/native";

type Props={
    blogData:any,
    isLoading:boolean,
    searchQuery:string,
    
}

const TopSearchResult=({blogData,isLoading,searchQuery}:Props)=>{
    const blogs=blogData.sort((a:any,b:any)=>a.views-b.views)
    const navigation=useNavigation()
    return(
        <>
        {searchQuery.length<4?
            <View style={styles.container}>
                <Text style={styles.textStyle}>Start typing to search...</Text>
                <Image 
                    source={require("../assets/Search.png")}
                    style={styles.imageStyle}
                />
            </View>
        :
            <>
            {isLoading?
                <ContentLoading />
            :
                <>
                {blogData.length==0?
                    <View style={styles.container}>
                        <Text style={styles.textStyle}>Article not Found!</Text>
                        <Image 
                            source={require("../assets/Error.png")}
                            style={styles.imageStyle}
                        />

                    </View>
                :
                    <View style={styles.mainContainer}>
                        <FlatList
                            data={blogs}
                            renderItem={({item})=><BlogComponent data={item} navigation={navigation} />}
                            ListFooterComponent={<ListEndComponent />}
                        />
                    </View>
                }
                </>
            }
            </>
        }
        </>
    )
}
export default TopSearchResult;

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"center",
        paddingTop:30

    },
    mainContainer:{
        backgroundColor:"white",
        flex:1
    },
    textStyle:{
        fontFamily:"poppins-bold",
        fontSize:23
    },
    imageStyle:{
        width:300,
        height:300,
        marginTop:40
    }
})