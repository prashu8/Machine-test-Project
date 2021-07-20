import React, { Component } from 'react';
import {
    StyleSheet,
    View, ActivityIndicator, Text,
    Image, Alert,
    Dimensions,
    Modal
} from 'react-native';

const { width, height } = Dimensions.get('window');


const Loader = (props) => {
    return (
        <Modal

            visible={props.visible}
            transparent={true}
        >
            <View
                style={{
                    flex: 1, backgroundColor: 'rgba(0,0,0,0.3)',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >

                <View style={{
                    backgroundColor: '#000', justifyContent: 'center',
                    padding: 5, alignSelf: 'center', borderRadius: 5,
                    alignItems: 'center', width: width / 3.5, height: width / 3.5
                }}>
                    <ActivityIndicator color="#ccc"
                        size="large" />
                    <Text style={{ fontSize: 18, fontFamily: 'Roboto-Light', color: '#ccc' }}>Loading...</Text>
                </View>
            </View>
        </Modal>
    );
}

export default Loader;