import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from 'formik';
import * as yup from 'yup';
import { useLogin } from '../../context/LoginProvider';
import { COLORS } from '../../constants/theme';
import { Button } from '../../components';
import Toast from 'react-native-toast-message';
import { LoginDataType } from '../../types';
import { logo } from '../../constants/images';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AdminLogin({ navigation }: any) {
    const [loader, setLoader] = useState(false);
    const [isPasswordHide, setIsPasswordHide] = useState(true);
    const { setIsLoggedIn } = useLogin();

    const handleLogin = async (values: LoginDataType) => {
        try {
            setLoader(true)
            // eslint-disable-next-line eqeqeq
            if (values.email == 'admin@gmail.com' && values.password == 'Test1') {
                setLoader(false)
                if (setIsLoggedIn) {
                    setIsLoggedIn(true);
                    setLoader(false);
                }
            } else {
                setLoader(false)
                Toast.show({
                    type: 'error',
                    text1: 'Failed to login',
                    text2: 'your email and password are not matching',
                });
            }
        } catch (error: any) {
            setLoader(false)
            Toast.show({
                type: 'error',
                text1: 'Failed to login',
                text2: error,
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, marginHorizontal: 22, justifyContent: 'center'  }}>

                    <View style={{
                        marginVertical: 22,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Image
                            style={{
                                width: 90,
                                height: 90
                            }}
                            source={logo}
                        />
                    </View>

                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={values => { handleLogin(values) }}
                        validationSchema={yup.object().shape({
                            email: yup
                                .string()
                                .email()
                                .required('Please, provide your email!'),
                            password: yup
                                .string()
                                .min(4)
                                .max(10, 'Password should not exceed 10 chars.')
                                .required('Please, provide your password!'),
                        })}
                    >
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                            <>
                                <View style={{ marginBottom: 12 }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 400,
                                        marginVertical: 8
                                    }}>Email address</Text>

                                    <View style={{
                                        width: "100%",
                                        height: 48,
                                        borderColor: COLORS.black,
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingLeft: 22
                                    }}>
                                        <TextInput
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={() => setFieldTouched('email')}
                                            placeholder='Enter your email address'
                                            placeholderTextColor={COLORS.black}
                                            keyboardType='email-address'
                                            style={{
                                                width: "100%"
                                            }}
                                        />
                                    </View>
                                    {touched.email && errors.email &&
                                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
                                    }
                                </View>

                                <View style={{ marginBottom: 12 }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 400,
                                        marginVertical: 8
                                    }}>Password</Text>

                                    <View style={{
                                        width: "100%",
                                        height: 48,
                                        borderColor: COLORS.black,
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingLeft: 22
                                    }}>
                                        <TextInput
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={() => setFieldTouched('password')}
                                            placeholder='Enter your password'
                                            placeholderTextColor={COLORS.black}
                                            secureTextEntry={isPasswordHide}
                                            style={{
                                                width: "100%"
                                            }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setIsPasswordHide(!isPasswordHide)}
                                            style={{
                                                position: "absolute",
                                                right: 12
                                            }}
                                        >
                                            {
                                                isPasswordHide == true ? (
                                                    <MaterialCommunityIcons name="eye-off" color={"black"} size={20} />
                                                ) : (
                                                    <MaterialCommunityIcons name="eye" color={"black"} size={20} />
                                                )
                                            }

                                        </TouchableOpacity>
                                    </View>
                                    {touched.password && errors.password &&
                                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                                    }
                                </View>

                                <Button
                                    onPress={() => { handleSubmit() }}
                                    title={loader ? <ActivityIndicator size="small" color="#FFFFFF" /> : "Login"}
                                    disabled={!isValid}
                                    filled
                                    style={{
                                        marginTop: 18,
                                        marginBottom: 4,
                                    }}
                                />
                            </>
                        )}
                    </Formik>

                </View>
            </TouchableWithoutFeedback>
            <Toast
                autoHide={true}
                visibilityTime={7000}
                position='top'
            />
        </SafeAreaView>
    )
}

