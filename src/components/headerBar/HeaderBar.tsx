import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useLayoutEffect } from 'react';
import { logo } from '../../constants/images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useLogin } from '../../context/LoginProvider';

const HeaderOptions = ({ navigation, refreshing, setLayoutEffectRendered }: any) => {
    const loginContext = useLogin();
    const { setIsLoggedIn } = useLogin();
    
    const renderTopRight = () => {

        if(loginContext.isLoggedIn){
            return (
                <TouchableOpacity
                onPress={() => {
                    if (setIsLoggedIn) {
                        setIsLoggedIn(false);
                    }
                }}
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontWeight:'bold' }}>Navigation</Text>
                    <MaterialCommunityIcons name="logout" color={'black'} size={20} style={{ paddingLeft: 5 }} />
                </View>
            </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity
                onPress={() => {
                    navigation.navigate("adminLogin")
                }}
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontWeight:'bold' }}>Admin</Text>
                    <MaterialCommunityIcons name="login" color={'black'} size={20} style={{ paddingLeft: 5 }} />
                </View>
            </TouchableOpacity>
            )
        }
    };

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
                renderTopRight()
            ),
        });
        setLayoutEffectRendered(true);
    }, [refreshing]);
};

export default HeaderOptions;
