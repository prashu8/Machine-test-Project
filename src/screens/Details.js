import React from 'react';
import {
    View, StatusBar, SafeAreaView, ScrollView, FlatList,
    Dimensions, Text, TouchableOpacity, Image, ImageBackground
} from 'react-native';
import { appColor } from '../components/Color';
import LinearGradient from 'react-native-linear-gradient';
import Icons from '../components/Icons';

import moment from 'moment';



const { height, width } = Dimensions.get('window');



const Details = props => {

    const { item } = props.route.params;
    var formatedDate = "";
    const setDate = () => {
        const date = item.birthday.split('-');

        const newDate = date[0] + '/' + date[1] + '/' + date[2];
        formatedDate = moment(newDate).format('DD-MMM-YYYY');
    }
    console.log("formatedDate", item.birthday);
    setDate();


    return (
        <>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                <ImageBackground style={{
                    alignSelf: 'center',
                    flex: 1, width: width, height: '100%',
                }}
                    resizeMode='cover'
                    source={{ uri: item.img }}>
                    <LinearGradient style={{
                        width: width, height: '100%', justifyContent: 'center', alignItems: 'center'
                    }} colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.7)", "rgba(0,0,0,1)"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 0.7 }}>
                        <ScrollView>
                            <View style={{
                                marginTop: '35%', paddingBottom: 30, alignItems: 'center'
                            }}>

                                <Image source={{ uri: item.img }}
                                    style={{ width: width / 2, alignSelf: 'center', height: 190, borderRadius: 15 }}
                                    resizeMode="contain" />

                                <Text style={{ color: '#ccc', marginTop: 30, fontFamily: 'Roboto-Bold', fontSize: 30 }}>{item.name}</Text>
                                <Text style={{ color: '#ccc', fontFamily: 'Roboto-Thin', fontSize: 15 }}>{item.nickname}</Text>

                                <View style={{
                                    flexDirection: 'row', alignItems: 'flex-end', marginTop: 10,
                                    justifyContent: 'space-between', alignSelf: 'center', width: width
                                }}>
                                    <View style={{ width: width - 200, alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 10 }}>
                                        <Text style={{ fontFamily: 'Roboto-Bolg', fontSize: 15, color: appColor.green, width: width }}>Portrayed</Text>
                                        <Text style={{ fontFamily: 'Roboto-Thin', fontSize: 12, color: appColor.white }}>{item.portrayed}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', marginRight: 30, }}>
                                        <Text style={{ fontFamily: 'Roboto-Thin', marginRight: 5, fontSize: 12, color: appColor.white }}>{formatedDate == 'Invalid date' ? 'Unknown' : formatedDate}</Text>
                                        <Icons.Feather name="gift" size={15} color={'#ccc'} />
                                    </View>

                                </View>

                                <Text style={{ marginTop: 10, marginLeft: 20, fontFamily: 'Roboto-Bolg', fontSize: 15, color: appColor.green, width: width }}>Occupation</Text>

                                <FlatList
                                    style={{ marginLeft: 20, paddingBottom: 10, alignSelf: 'flex-start' }}
                                    data={item.occupation}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <Text style={{ fontFamily: 'Roboto-Thin', fontSize: 12, color: appColor.white }}>{item}</Text>
                                        )
                                    }} />


                                <Text style={{ marginTop: 10, marginLeft: 20, fontFamily: 'Roboto-Bolg', fontSize: 15, color: appColor.green, width: width }}>Appeared in</Text>

                                <FlatList
                                    horizontal={true}
                                    style={{ marginLeft: 20, marginTop: 10, paddingBottom: 10, alignSelf: 'flex-start' }}
                                    data={item.appearance}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{ backgroundColor: appColor.grey, marginRight: 10, paddingHorizontal: 5, paddingVertical: 2 }}>
                                                <Text style={{ fontFamily: 'Roboto-Thin', fontSize: 12, color: appColor.white }}>Season {item}</Text>
                                            </View>
                                        )
                                    }} />

                            </View>
                        </ScrollView>
                    </LinearGradient>

                </ImageBackground>
            </SafeAreaView>
        </>
    )
}




export const screenOptions = navData => {
    return {
        headerTitle: "",
        headerRight: () => (
            <TouchableOpacity onPress={() => {
                navData.navigation.navigate('Favourites');
            }}>
                <Image source={require('../assets/HEART_FILLED.png')}
                    style={{ height: 25, width: 25, marginRight: 20 }} resizeMode="contain" />
            </TouchableOpacity>
        ),
        headerTransparent: true


    }
}



export default Details;