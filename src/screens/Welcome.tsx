import { View, Text, Pressable, Image, ImageSourcePropType } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import {COLORS,linearColorsLight,linearColorsDark} from '../constants/theme';
import {Button} from '../components';
import { heroImages } from '../constants/images';
import { useLogin } from '../context/LoginProvider';

function generateRandomNumbers(range:number,n:number): number[] {
    const numbers: number[] = [];
  
    while (numbers.length < n) {
      const randomNumber = Math.floor(Math.random() * range) + 1;
  
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
}

export default function Welcome({ navigation }:any) {
    const [render, setRender] = useState<boolean>(false)
    const [isNavigated, setIsNavigated] = useState<boolean>(false)
    const picNumbers:number[] = generateRandomNumbers(12,4);
    const colorNumbers:number[] = generateRandomNumbers(4,2);
    const { setIsLoggedIn } = useLogin();

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(!isNavigated){
                setRender(!render)
            }
        }, 3000);
        return () => clearInterval(intervalId);
    }, [render]);

    const gradientColors: string[] = [
        linearColorsLight[colorNumbers[0]],
        linearColorsDark[colorNumbers[1]],
    ];
    const img1:ImageSourcePropType = heroImages[picNumbers[0]];
    const img2:ImageSourcePropType = heroImages[picNumbers[1]];
    const img3:ImageSourcePropType = heroImages[picNumbers[2]];
    const img4:ImageSourcePropType = heroImages[picNumbers[3]];

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={gradientColors}
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                        source={img1}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 10,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={img2}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: -30,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-5deg" }
                            ]
                        }}
                    />

                    <Image
                        source={img3}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 130,
                            left: -50,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={img4}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            position: "absolute",
                            top: 110,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 400,
                    width: "100%", 
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Welcome</Text>

                    <View style={{
                        flexDirection: "row", 
                        alignItems: "center" 
                    }}>
                        <Text style={{
                            fontSize: 46,
                            marginTop: 15,
                            fontWeight: 800,
                            color: COLORS.white
                        }}>to Path Seeker</Text>
                        <Image
                            style={{
                                width: 60,
                                height: 60,
                                marginLeft: 10,
                                marginRight: "auto",
                                marginTop: 0,
                            }}
                            source={require("../assets/logo/pathSeekerLogo.png")}
                        />
                    </View>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginVertical: 4
                        }}>Welcome to Path Seeker: Your Indoor Navigation Companion!</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                        }}></Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                        }}>Explore With Ease: Path Seeker Empowers You with Indoor Localization and Map Navigation via Wi-Fi!</Text>
                    </View>

                    <Button
                        title="Get Started"
                        onPress={() => {
                            setIsNavigated(true);
                            if(setIsLoggedIn){
                                setIsLoggedIn(true);
                            }
                        }}
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />
                </View>
            </View>
        </LinearGradient>
    )
}
