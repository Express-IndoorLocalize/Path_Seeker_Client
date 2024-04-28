import { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet, ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import WifiManager from 'react-native-wifi-reborn';
import { PermissionsAndroid } from 'react-native';
import { Dimensions } from 'react-native';
import { Button, DropdownComponent } from '../../components';
import { locations } from './locations';
import NavPath from './pathBuilder';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Navigation({ navigation, route }: any) {
  const { mapDetails }: any = route.params;
  const [markerPosition, setMarkerPosition] = useState({ x: 120, y: 620 });
  const [angle, setAngle] = useState(0);
  const [loader, setLoader] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [navigatingCoordinates, setNavigatingCoordinates] = useState([]);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [isNavigating, setNavigating] = useState<boolean>(false);
  const [userNeedsNavigating, setUserNeedsNavigating] = useState<boolean>(false);


  const indoorMap = require('../../assets/maps/indoorMap.png');

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (!isNavigating) {
        // await getLiveLocation();
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

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

  const getLiveLocation = async () => {
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
      WifiManager.loadWifiList().then((list: any) => {
        const positionData = {
          projectId: 0,
          received_signals: [],
        };
        positionData.received_signals = list;
        const json_to_send = JSON.stringify(modifyJson(positionData));
        console.log('json_to_send: ', json_to_send);
        const url = 'https://indoor-localize-server.onrender.com/api/positioning/calculate_position';
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: json_to_send
        };
        console.log('getting live location');
        fetch(url, requestOptions)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            // Handle response data
            console.log('live updating:', data);
            const liveLoc = { x: data?.message?.x, y: data?.message?.y };
            setMarkerPosition(liveLoc);
          })
          .catch(error => {
            // Handle errors
            console.error('There was a problem with the POST request:', error);
          });
      });
    } catch (e) {
      console.error('Error getting live location:', e);
    }
  };

  const handleNavigate = async () => {
    setNavigating(true);
    setUserNeedsNavigating(true);
    setNavigatingCoordinates([]);

    try {
      setLoader(true);
      const postData = {
        'projectId': 0,
        'start_point': currentLocation,
        'goal': destinationLocation
      }
      const json_to_send = JSON.stringify(postData)
      const url = 'https://indoor-localize-server.onrender.com/api/navigating/get_path';
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: json_to_send,
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
          console.log('getting navigation path:', data);
          const allCoordinates = data?.data?.coordinates;
          setNavigatingCoordinates(allCoordinates);
        })
        .catch(error => {
          setLoader(false);
          Toast.show({
            type: 'error',
            text1: 'Navigation failed',
            text2: 'Server error',
          });
          console.error('There was a problem with the POST request:', error);
        });
    } catch (e) {
      setLoader(false);
      console.error('Error saving location:', e);
    }
    setLoader(false);
    setNavigating(false);
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
        size={30}
      />

      <NavPath userNeedsNavigating={userNeedsNavigating} coordinates={navigatingCoordinates} setUserNeedsNavigating={setUserNeedsNavigating} setNavigatingCoordinates={setNavigatingCoordinates}/>

      <DropdownComponent isDestination={false} locationValue={currentLocation} setLocation={setCurrentLocation} locations={locations} style={styles.dropDownStyle} />
      <DropdownComponent isDestination={true} locationValue={destinationLocation} setLocation={setDestinationLocation} locations={locations} style={styles.dropDownStyle} />
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
