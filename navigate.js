import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {HomePage} from "./HomePage";
import FirstPage from "./pages/FirstPage";

const Stack = createNativeStackNavigator()

const StackNavigator = () => {

    const User = true

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
 
            {User == true ? 
            
            (
                <> 
                    <Stack.Screen 
                    name="Home"
                    component={HomePage}
                    />
                    <Stack.Screen 
                        name="FirstPage"
                        component={FirstPage}
                    />
                </> 
            )
            :
            (
                <>
                    <Stack.Screen 
                        name="FirstPage"
                        component={FirstPage}
                    />
                </>  
            )  
            
            }

        </Stack.Navigator>   
    ) 
}

export default StackNavigator