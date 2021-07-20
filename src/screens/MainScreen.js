import React, { useEffect, useState } from 'react';
import { Text, FlatList, SafeAreaView, StatusBar, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { appColor } from '../components/Color';
import Icons from '../components/Icons';
import Loader from '../components/Loader';
import { breakingBadList, favArray } from '../redux/action/action-creator';


const { height, width } = Dimensions.get('window');

const MainScreen = props => {


    const dispatch = useDispatch();
    const [breakingList, setBreakingList] = useState('');
    const [favList, setFavList] = useState('');


    useEffect(() => {
        getList();
    }, [])


    const getList = () => {
        dispatch(breakingBadList())
            .then((res) => {
                console.log("breakingBadList screen res : ", res);
                props.favArray(breakingList);
                if (res.breakingBadListSuccess) {
                    var newData = [...res.data];
                    newData.forEach(function (file) {
                        file.selectedItem = false
                    })
                    setBreakingList(newData);
                }
            })
    }







    const onClickLike = (item, index) => {
        if (item.selectedItem) {
            breakingList[index].selectedItem = false;
            setBreakingList([...breakingList]);
            var newArray = breakingList.filter(function (item) {
                return item.selectedItem == true;
            });
            console.log("nnnnnnnn", newArray);
            setFavList(newArray);
            props.favArray(newArray);
        } else {
            breakingList[index].selectedItem = true;
            setBreakingList([...breakingList]);
            props.favArray(breakingList);
            var newArray = breakingList.filter(function (item) {
                return item.selectedItem == true;
            });
            console.log("nnnnnnnn", newArray);
            setFavList(newArray);
            props.favArray(newArray);
        }
    }


    const renderLoader = () => {
        if (props.isLoading) {
            return (
                <Loader visible={true} />
            )
        }
    }


    return (
        <>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                <FlatList
                    data={breakingList}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        // console.log("item.img", breakingList);
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    props.navigation.navigate('Details', { item: item })
                                }}
                                style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: item.img }}
                                    style={{ width: width / 2.3, height: 250, borderRadius: 5 }}
                                    resizeMode="cover" />
                                <View style={{ width: width / 2.3, justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10 }}>
                                    <View>
                                        <Text style={{ color: appColor.white, fontSize: 15, fontFamily: 'Roboto-Bold' }}>{item.name}</Text>
                                        <Text style={{ color:  appColor.white, fontSize: 12, fontFamily: 'Roboto-Thin' }}>{item.nickname}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {

                                        onClickLike(item, index);

                                    }}>
                                        {item.selectedItem ?
                                            <Icons.AntDesign name="heart" size={20} color={appColor.green} />
                                            :
                                            <Icons.AntDesign name="hearto" size={20} color="grey" />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />

                {renderLoader()}
            </SafeAreaView>
        </>
    )

}



export const screenOptions = navData => {
    return {
        headerTitle: "The Breaking bad",
        headerRight: () => (
            <View style={{ marginRight: 25, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    navData.navigation.navigate('SearchScreen');
                }}>
                    <Icons.Feather name="search" size={25} color={ appColor.white} style={{ marginRight: 25 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navData.navigation.navigate('Favourites');
                }}>
                    <Image source={require('../assets/HEART_FILLED.png')} style={{ height: 25, width: 25 }} resizeMode="contain" />
                </TouchableOpacity>
            </View>
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



export default connect(mapStateToProps, { breakingBadList, favArray })(MainScreen);



