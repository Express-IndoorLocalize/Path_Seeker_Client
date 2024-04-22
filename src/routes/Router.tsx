import { StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home,
  Welcome,
  Live,
  Navigation,
} from '../screens';
import { useLogin } from '../context/LoginProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigation(){
  const tabBarActiveTintColor:string = "#01507a";
  return (
      <Tab.Navigator
      initialRouteName="Home"
      // screenOptions={{
      //   tabBarActiveTintColor: tabBarActiveTintColor,
      // }}
      screenOptions={{
        tabBarLabelStyle: styles.label,

        headerTitleStyle: styles.header,
        tabBarStyle: [
          styles.tabContainer,
          Platform.OS === 'ios' && {
            shadowOffset: { height: -2, width: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
          },
        ],
        tabBarItemStyle: {
          marginBottom: 7,
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: tabBarActiveTintColor,
      }}
      safeAreaInsets={{
        bottom: 0,
      }}
    >
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }:any) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerShown: false,
            }}
        />
        <Tab.Screen
            name="Live"
            component={Live}
            options={{
            tabBarLabel: 'Live',
            tabBarIcon: ({ color, size }:any) => (
                <MaterialCommunityIcons name="map-marker" color={color} size={size} />
            ),
            headerShown: false,
            }}
        />
        <Tab.Screen
            name="Navigation"
            component={Navigation}
            options={{
              tabBarLabel: 'Navigation',
              tabBarIcon: ({ color, size }:any) => (
                  <MaterialCommunityIcons name="navigation" color={color} size={size} />
              ),
              headerShown: false,
            }}
        />
    </Tab.Navigator>
  )
}
// home-map-marker
// map-outline
function AuthNavigation(){
  return(
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false,}}>
      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}

function MainNavigation(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Main' component={TabNavigation} />
      {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
    </Stack.Navigator>
  );
}

const MainNavigator = () => {
  const loginContext = useLogin();
  return (
    loginContext.isLoggedIn ? <MainNavigation /> :<MainNavigation />
  );
};
const styles = StyleSheet.create({
  header: {
    textTransform: 'capitalize',
  },
  tabContainer: {
    position: 'absolute',
    width: '90%',
    borderRadius: 12,
    left: '5%',
    bottom: 20,
    // backgroundColor: '#121212',
    height: 60,
  },
  label: {
    textTransform: 'capitalize',
    fontSize: 12,
  },
});

export default MainNavigator;
