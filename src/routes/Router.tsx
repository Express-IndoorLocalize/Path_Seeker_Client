import { StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Maps,
  Welcome,
  Calibration,
  Navigation,
  AdminLogin
} from '../screens';
import { useLogin } from '../context/LoginProvider';


const Stack = createNativeStackNavigator();

function MainNavigation(){
  return(
    <Stack.Navigator initialRouteName="Welcome" screenOptions={({ route }) => ({
      headerShown: (route.name === "maps" || route.name === "adminLogin"),
    })}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="maps" component={Maps} />
      <Stack.Screen name="live" component={Navigation} />
      <Stack.Screen name="adminLogin" component={AdminLogin} />
    </Stack.Navigator>
  );
}

function AdminNavigation(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='adminMaps' component={Maps} />
      <Stack.Screen name='calibration' component={Calibration} />
    </Stack.Navigator>
  );
}

const MainNavigator = () => {
  const loginContext = useLogin();
  return (
    loginContext.isLoggedIn ? <AdminNavigation /> :<MainNavigation />
  );
};

export default MainNavigator;
