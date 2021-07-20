import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import MainScreen, { screenOptions as mainScreenOptions } from '../screens/MainScreen';
import Favourites, { screenOptions as favouritesOptions } from '../screens/Favourites';
import SearchScreen from '../screens/SearchScreen';
import Details, {screenOptions as detailOptions} from '../screens/Details';
import { appColor } from '../components/Color';


const Stack = createStackNavigator();




function MainStackNavigator(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main"
                screenOptions={{
                    headerTitleStyle: {
                        fontFamily: 'Roboto-Bold'
                    },
                    gestureEnabled: Platform.OS === 'android' ? false : true,
                    gestureDirection: "horizontal",
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerStyle: {
                        // height: 50,
                        backgroundColor: '#000',
                        shadowOpacity: 0, shadowOffset: {
                            height: 0,
                        }, shadowRadius: 0, elevation: 0
                    },
                    headerTintColor: appColor.white,
                }}
                headerMode="float"
                animation="fade">

                <Stack.Screen name="Main" component={MainScreen} options={mainScreenOptions} />
                <Stack.Screen name="Favourites" component={Favourites} options={favouritesOptions} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown: false}} />
                <Stack.Screen name="Details" component={Details} options={detailOptions} />
            

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainStackNavigator;

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();