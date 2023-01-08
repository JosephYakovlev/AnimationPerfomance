import { useNavigation } from '@react-navigation/native';
import { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import {Context as AuthContext, Context} from './context/AuthContext';
import * as Google from 'expo-auth-session/providers/google'
import tw from 'twrnc'
import Animated , { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring, withRepeat, withTiming, Easing} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';


    const SPRING_CONFIG = {
        damping: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 500
    }

export const HomePage = () => {
    
    const navigation = useNavigation()

    const {state, signin} = useContext(AuthContext) 

    const dimensions = useWindowDimensions()


    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

    const marginsphere = useSharedValue(-300)

    const top = useSharedValue(0)

    const opacity = useSharedValue(1)

    const angle = useSharedValue(0)

    
    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, context) {
            context.startTop = top.value;
        },
        onActive(event, context) {
            if(top.value < 250) {
                top.value = context.startTop + event.translationY,
                opacity.value = 0
                marginsphere.value = withSpring(-300, SPRING_CONFIG)
                angle.value = withTiming(0,{duration: 2000})
            } else if(top.value > 250 && top.value < dimensions.height - 200)  {
                top.value = context.startTop + event.translationY,
                opacity.value = 0
                marginsphere.value = withSpring(100, SPRING_CONFIG)
                angle.value = withRepeat(withTiming(4320,{duration: 48000,easing: Easing.linear }), -1, true )
            } else if(top.value >  dimensions.height - 200)  {
                top.value = context.startTop + event.translationY,
                opacity.value = 0
                marginsphere.value = withSpring(270, SPRING_CONFIG)
                angle.value = withRepeat(withTiming(4320,{duration: 48000,easing: Easing.linear }), -1,true )
                console.log(event.absoluteY)
            } 
            else {
                top.value = context.startTop + event.translationY,
                opacity.value = event.absoluteY/5
                marginsphere.value = withSpring(-300, SPRING_CONFIG)
                angle.value = withTiming(0,{duration: 2000})
            }
        },
        onEnd() {
            if(top.value < dimensions.height / 4) {
                top.value = 0,
                opacity.value = withSpring(0, SPRING_CONFIG)
            } else if(top.value > dimensions.height -200) {
                
                top.value = dimensions.height-100,
                opacity.value = withSpring(0, SPRING_CONFIG)
            } 
            else {
                top.value = dimensions.height / 2,
                opacity.value = withSpring(0, SPRING_CONFIG)
            }
        }
    })

 

    const style = useAnimatedStyle(()=>{
        return {
            bottom: withSpring( dimensions.height - top.value, SPRING_CONFIG ),
            height: withSpring(top.value + 84), 
        }
    })


    const mainspherestyle = useAnimatedStyle(()=> {
        return {
            marginTop: withSpring(marginsphere.value, SPRING_CONFIG),
            transform: [{rotate: `${angle.value}deg`}]
        }
    })

    const rotatetion = useAnimatedStyle(()=> {
        return {
            transform: [{rotate: `${-angle.value}deg`}]
            
        }
    })
    


    const config = {
        clientId: '118934681710-dkv57e064behptc84s572r57cfm5r9q3.apps.googleusercontent.com',
        androidClientId: '118934681710-lhl7o6tihc8l0a5nmfsg3a8a6s3u9m49.apps.googleusercontent.com',
        iosClientId: '118934681710-q87pluija2qn4gj0sh8obent5nj9f1h7.apps.googleusercontent.com',
        scopes: ["profile", "email"],
        permissions: ["public_profile", "email", "gender", "location"]
    }
   
   const [accessToken, setAcessToken] = useState('')
   const [request, response, promtAsync] = Google.useAuthRequest(config) 

    // useEffect(() => {
    //     if(response?.type === 'success') {
    //         setAcessToken(response.authentication.accessToken)
    //         accessToken && state.user === null && fetchUserInfo()
    //     }
    // },[response,accessToken])

    async function fetchUserInfo() {
        let response = await fetch("https://www.googleapis.com/userinfo/v2/me",{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(async(response) => {
            const useInfo = await response.json()
            signin(useInfo)
        }).then(()=>{
            navigation.navigate('FirstPage')
        })

    }



  

  console.log('MAIN')
  return (
    <View style={{ flex: 1 }}
    >
        <PanGestureHandler
            onGestureEvent={gestureHandler}
        >
            <Animated.View 
                style={[
                    { 
                        width: '100%', 
                        top: 0,
                        left: 0,
                        backgroundColor: '#966CA5', 
                        alignItems: 'center', 
                        justifyContent: 'flex-end',
                    },
                    style
                ]}


            >
                <Text style={{ color: 'white', fontSize: 22, marginBottom: 13}}>
                    Добро пожаловать!
                </Text>

                {/* <TouchableOpacity style={{
                    position: 'absolute',
                    right: 5,
                    bottom: 0,
                    padding: 10,
                }}>
                    <Text>
                        Войти..
                    </Text>
                </TouchableOpacity> */}
            </Animated.View>
        </PanGestureHandler>

            <AnimatedTouchable 

                onPress={()=>{
                    top.value = withSpring(
                        dimensions.height/2,
                        SPRING_CONFIG
                    )

                    marginsphere.value = withSpring(
                        100, 
                        SPRING_CONFIG
                    )

                    angle.value = withRepeat(
                        withTiming(
                            4320,
                            {
                                duration: 48000,
                                easing: Easing.linear 
                            }
                        ), 
                         -1, 
                        true 
                    )
                }}

                style={[
                        {   
                            top: 40,
                            backgroundColor: '#8E9BC1',
                            marginHorizontal: '25%', 
                            height: 50, 
                            alignItems: 'center', 
                            justifyContent: 'center',
                        },
                ]}
            >

                <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                    Open 
                </Text>
                

            </AnimatedTouchable>

            <AnimatedTouchable 

                onPress={()=>{
                    top.value = withSpring(
                        0,
                        SPRING_CONFIG
                    )

                    marginsphere.value = withSpring(
                        -300, 
                        SPRING_CONFIG
                    )

                    angle.value = withTiming(0,{duration: 2000})
                }}

                style={[
                        {   
                            top: 60,
                            backgroundColor: '#8E9BC1',
                            marginHorizontal: '25%', 
                            height: 50, 
                            alignItems: 'center', 
                            justifyContent: 'center',
                        }
                    ]}
            >
                <Text style={[
                    {
                        color: 'white', 
                        fontSize: 22, 
                        fontWeight: 'bold'
                    },
                ]}>
                    Close
                </Text>
            
            </AnimatedTouchable>


           <Animated.View 
                style={[
                    {   
                        position: 'absolute',
                        height: 270,
                        width: 270,
                        borderRadius: 150,
                        alignSelf: 'center'

                    },
                    mainspherestyle,

                ]}
            >
                <Animated.View 
                    style={[
                        {   
                            top: -40,
                            right: -140,
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: 'grey',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                        rotatetion
                    ]}
                >

                        <Image 
                            source={require('./assets/andr.png')}
                            style={{
                                height: 100, 
                                width: 100,
                                borderRadius: 50,
                            }}
                        />
                        

                </Animated.View>

                <Animated.View 
                    style={[
                        {   
                            top: 0,
                            left: -50,
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: 'red',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        rotatetion
                    ]}
                >
                        <Image 
                            source={require('./assets/iph.jpeg')}
                            style={{
                                height: 100, 
                                width: 100,
                                borderRadius: 50,
                            }}
                        />
                </Animated.View>

                <Animated.View 
                    style={[
                        {   
                            top: -5,
                            right: -155,
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            backgroundColor: 'green',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        rotatetion
                    ]}
                >
                    <Image 
                            source={require('./assets/windows.png')}
                            style={{
                                height: 100, 
                                width: 100,
                                borderRadius: 50,
                            }}
                        />
                    
                </Animated.View>

                

           </Animated.View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});