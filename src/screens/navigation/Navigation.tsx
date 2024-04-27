import { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  PanResponder,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import WifiManager from 'react-native-wifi-reborn';
import { PermissionsAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import { Button, DropdownComponent } from '../../components';
import Modal from "react-native-modal";
import { locations } from './lacations';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Navigation({ navigation, route }: any) {
  const { mapDetails }: any = route.params;
  const [markerPosition, setMarkerPosition] = useState({ x: 120, y: 620 });
  const [n, setN] = useState(0);
  const [angle, setAngle] = useState(0);
  const [loader, setLoader] = useState(false);
  const [wifiList, setWifiList] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);

  const indoorMap = require('../../assets/maps/indoorMap.png');

  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required for WiFi connections',
          message:
            'This app needs location permission as this is required to scan for wifi networks.',
          buttonNegative: 'DENY',
          buttonPositive: 'ALLOW',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('granted');
      } else {
        console.log('not granted');
      }
    } catch (error) {
      console.error('Error occurred while fetching WiFi list:', error);
    }
  };

  const handleNavigate = async () => {
    try {
      console.log('currentLocation: ',currentLocation);
      console.log('destinationLocation: ',destinationLocation);
    } catch (e) {
      console.error('Error saving location:', e);
    }
  };

  return (
    <View style={styles.container}>

      <Image
        source={indoorMap}
        style={styles.image}
        resizeMode="contain"
      />

      <MaterialCommunityIcons
        style={[
          styles.marker,
          {
            left: markerPosition.x,
            top: markerPosition.y,
            transform: [{ rotate: `${angle}deg` }],
          },
        ]}
        name="navigation"
        color={'red'}
        size={20}
      />

      <DropdownComponent isDestination={false} locationValue={currentLocation} setLocation={setCurrentLocation} locations={locations} style={styles.dropDownStyle}/>
      <DropdownComponent isDestination={true} locationValue={destinationLocation} setLocation={setDestinationLocation} locations={locations} style={styles.dropDownStyle}/>
      <Button
        onPress={handleNavigate}
        title={loader ? <ActivityIndicator size="small" color="#FFFFFF" /> : "Navigate"}
        disabled={loader}
        filled
        style={styles.saveButton}
        isCalibrate={true}
      />

      <Toast
        autoHide={true}
        visibilityTime={7000}
        position='top'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Optional: Set background color if needed
  },
  image: {
    width: screenWidth, // Set image width to screen height
    height: screenHeight * 0.9, // Set image height to screen width
  },
  marker: {
    position: 'absolute',
  },
  saveButton: {
    position: 'absolute',
    right: 20,
    width: '30%',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 2,
    alignSelf: 'center',
  },
  dropDownStyle: {
    backgroundColor: 'white',
    paddingLeft: 20,
    padding: 3,
  },
  navigationContainer: {
    position: 'relative',
    flexDirection: 'row',
    bottom: 15,
  },
  x: {
    position: 'absolute',
    left: 10,
    bottom: 33,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 2,
  },
  y: {
    position: 'absolute',
    left: 10,
    bottom: 15,
    flexDirection: 'row', // Arrange texts horizontally
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'black',
  },
  xyText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
