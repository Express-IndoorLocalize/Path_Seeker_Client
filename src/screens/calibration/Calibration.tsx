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
import { Button } from '../../components';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Calibration({ navigation, route }: any) {
  const { mapDetails }: any = route.params;
  const [markerPosition, setMarkerPosition] = useState({ x: 120, y: 620 });
  const [n, setN] = useState(0);
  const [angle, setAngle] = useState(0);
  const [loader, setLoader] = useState(false);
  const indoorMap = require('../../assets/maps/gridMap.png');

  const handlePanResponderGrant = (event: any, gestureState: any) => {
    const { x0, y0 } = gestureState;
    setMarkerPosition({ x: x0 - 10, y: y0 - 10 });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: handlePanResponderGrant,
  });

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

  const handleSaveLocation = async () => {
    try {
      permission();
      WifiManager.getCurrentWifiSSID().then(
        ssid => {
          console.log('Your current connected wifi SSID is ' + ssid);
        },
        () => {
          console.log('Cannot get current SSID!');
        },
      );
      WifiManager.reScanAndLoadWifiList().then((list: any) => {
        const positionData = {
          projectId: 0,
          calibrationpointID: n,
          received_signals: [],
          position: { x: 0, y: 0 },
        };
        positionData.received_signals = list;
        positionData.position = markerPosition;
        setN(n + 1);
        (positionData as any).position.floor = 2;
        const json_to_send = JSON.stringify(modifyJson(positionData))
        const url = 'https://indoor-localize-server.onrender.com/api/calibrating/create_fingerprint';
        setLoader(true)
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: json_to_send
        };
        fetch(url, requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            // Handle response data
            setLoader(false);
            console.log('Response:', data);
            Toast.show({
              type: 'success',
              text1: 'Added the calibration point',
              text2: `Calibrated X: ${markerPosition.x} Y: ${markerPosition.y}`,
            });
          })
          .catch(error => {
            // Handle errors
            setLoader(false);
            console.error('There was a problem with the POST request:', error);
            Toast.show({
              type: 'error',
              text1: 'Failed to add the calibration point',
              text2: 'Server error',
            });
          });
      });
    } catch (e) {
      setLoader(false);
      console.error('Error saving location:', e);
    }
  };

  const modifyJson = (json: any) => {
    json.received_signals.forEach(signal => {
      signal.bssid = signal.BSSID;
      signal.ssid = signal.SSID;
      signal.rss = signal.level;
      delete signal.BSSID;
      delete signal.SSID;
      delete signal.level;
      delete signal.capabilities;
      delete signal.timestamp;
    });

    return json;
  };

  return (
    <View style={styles.container}>

      <Image
        source={indoorMap}
        style={styles.image}
        resizeMode="contain"
        {...panResponder.panHandlers}
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
        name="pin"
        color={'red'}
        size={20}
      />

      <View style={styles.x}>
        <Text style={styles.xyText}>X: {(markerPosition.x).toFixed(3)}</Text>
      </View>

      <View style={styles.y}>
        <Text style={styles.xyText}>Y: {(markerPosition.y).toFixed(3)}</Text>
      </View>

      <Button
        onPress={handleSaveLocation}
        title={loader ? <ActivityIndicator size="small" color="#FFFFFF" /> : "Calibrate"}
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
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 2,
    alignSelf: 'center',
  },
  x: {
    position: 'absolute',
    left: 10,
    bottom: 33,
    flexDirection: 'row', // Arrange texts horizontally
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
