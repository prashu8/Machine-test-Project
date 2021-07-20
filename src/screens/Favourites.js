import React, { useEffect, useState } from 'react';
import { Text, FlatList, SafeAreaView, View, StatusBar, Image, TouchableOpacity, Dimensions } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { appColor } from '../components/Color';
import Icons from '../components/Icons';
import { favArray } from '../redux/action/action-creator';


const { height, width } = Dimensions.get('window');
let sampleArray = [];
const Favourites = props => {


    const dispatch = useDispatch();
    const [breakingList, setBreakingList] = useState([]);








    console.log("favoriteArray", props.favoriteArray);


    return (
        <>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />

            <SafeAreaView style={{ flex: 1, backgroundColor: '#000', alignItems: 'center' }}>
                {props.favoriteArray != "" ?
                    <FlatList
                        data={props.favoriteArray}
                        contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ alignSelf: 'flex-start' }}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            // console.log("item.img", breakingList); 
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        props.navigation.navigate('Details', { item: item })
                                    }}
                                    style={{ margin: 10, }}>
                                    <Image source={{ uri: item.img }}
                                        style={{ width: width / 2.3, height: 250, borderRadius: 5 }}
                                        resizeMode="cover" />
                                    <View style={{ width: width / 2.3, justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10 }}>
                                        <View>
                                            <Text style={{ color: appColor.white, fontSize: 15, fontFamily: 'Roboto-Bold' }}>{item.name}</Text>
                                            <Text style={{ color: appColor.white, fontSize: 12, fontFamily: 'Roboto-Thin' }}>{item.nickname}</Text>
                                        </View>
                                        <View>
                                            <Icons.AntDesign name="heart" size={20} color={appColor.green} />

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )

                        }} />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: appColor.white, fontFamily: 'Roboto-Bold' }}>No Data found</Text>
                    </View>
                }
            </SafeAreaView>
        </>
    )

}



export const screenOptions = navData => {
    return {
        headerTitle: "Favourites",
        headerLeft: null,
        headerTintColor: appColor.green,
        headerRight: () => (
            <TouchableOpacity onPress={() => {
                navData.navigation.goBack();
            }}>
                <Icons.Feather name="x" size={25} color={appColor.white} style={{ marginRight: 20 }} />
            </TouchableOpacity>
        )
    }
}





function mapStateToProps(state) {
    return {
        isLoading: state.main.isLoading,
        badArrayList: state.main.badArrayList,
        favoriteArray: state.main.favoriteArray
    }
}



export default connect(mapStateToProps, { favArray })(Favourites);



