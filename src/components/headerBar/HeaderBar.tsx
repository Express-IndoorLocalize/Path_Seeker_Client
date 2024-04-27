import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useLayoutEffect } from 'react';
import { logo } from '../../constants/images';

const HeaderOptions = ({ navigation, refreshing, setLayoutEffectRendered }: any) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackVisible: false,
            headerLeft: () => (
                <View>
                    <Image
                        style={{ width: 40, height: 40, marginLeft: 1, resizeMode: 'contain' }}
                        source={logo}
                    />
                </View>
            ),
            headerTitle: () => <View></View>,
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("adminLogin")
                    }}
                    style={{ marginRight: 15 }}
                >
                    <Text>Admin Login</Text>
                </TouchableOpacity>
            ),
        });
        setLayoutEffectRendered(true);
    }, [refreshing]);
};

export default HeaderOptions;
