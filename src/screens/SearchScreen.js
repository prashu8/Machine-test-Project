import React, { useEffect, useState } from 'react';
import { Text, FlatList, SafeAreaView, ActivityIndicator, TextInput, StatusBar, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { appColor } from '../components/Color';
import Icons from '../components/Icons';
import { searchList, favArray } from '../redux/action/action-creator';


const { height, width } = Dimensions.get('window');

const SearchScreen = props => {


    const dispatch = useDispatch();
    const [breakingList, setBreakingList] = useState('');
    const [favList, setFavList] = useState('');
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        getList();
    }, [])



    const searchHandler = text => {
        setSearchText(text);
        getList(text);
    }


    const getList = (text) => {
        const data = {
            name: text
        }
        dispatch(searchList(data))
            .then((res) => {
                console.log("searchList screen res : ", res.data);
                props.favArray(breakingList);
                if (res.searchListSuccess) {
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

    // console.log("props.favoriteArray ", props.favoriteArray);

    // console.log("favList", favList);


    return (
        <>
            <StatusBar translucent backgroundColor={'transparent'} barStyle={'light-content'} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                <View style={{
                    backgroundColor: '#242424', flexDirection: 'row',
                    justifyContent: 'center', alignItems: 'center', paddingTop: '10%'
                }}>
                    <TextInput
                        value={searchText}
                        placeholderTextColor="#ccc"
                        placeholder="Search"
                        onChangeText={searchHandler}
                        style={{
                            width: width - 60, marginLeft: 20,
                            color:  appColor.white, height: 50, fontSize: 20,
                        }} />
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.goBack();
                        }}>
                        <Icons.Feather name="x" size={25} color={ appColor.white} style={{ marginRight: 20 }} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={breakingList}
                    contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
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
                                        <Text style={{ color:  appColor.white, fontSize: 15, fontFamily: 'Roboto-Bold' }}>{item.name}</Text>
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
            </SafeAreaView>
        </>
    )

}








function mapStateToProps(state) {
    return {
        isLoading: state.main.isLoading,
        badArrayList: state.main.badArrayList,
        favoriteArray: state.main.favoriteArray
    }
}



export default connect(mapStateToProps, { searchList, favArray })(SearchScreen);




