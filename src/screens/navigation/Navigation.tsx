import {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  PanResponder,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import WifiManager from 'react-native-wifi-reborn';
import {PermissionsAndroid} from 'react-native';
import {Dimensions} from 'react-native';
import RNFS from 'react-native-fs';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Navigation({navigation}: any) {
  const [markerPosition, setMarkerPosition] = useState({x: 120, y: 620});
  const [n, setN] = useState(0);
  const [mapCalibrations, setMapCalibrations] = useState([
    {
      projectId: 0,
      CalibrationPointId: n,
      received_signals: [],
      position: {x: 120, y: 300},
    },
  ]);
  const [angle, setAngle] = useState(0);
  const [wifiList, setWifiList] = useState([]);
  const indoorMap = require('../../assets/maps/indoorMap.png');

  const handlePanResponderGrant = (event: any, gestureState: any) => {
    const {x0, y0} = gestureState;
    setMarkerPosition({x: x0 - 10, y: y0 - 10});
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
      WifiManager.loadWifiList().then((list: any) => {
        const positionData = {
          projectId: 0,
          CalibrationPointId: n,
          received_signals: [],
          position: {x: 0, y: 0},
        };
        positionData.received_signals = list;
        positionData.position = markerPosition;
        setN(n + 1);
        console.log('positionData: ',positionData);
        setMapCalibrations([...mapCalibrations,positionData]);
      });
    } catch (e) {
      console.error('Error saving location:', e);
    }
  };

  const handleDownload = async () => { 
    try {
      const filePath = RNFS.DocumentDirectoryPath + '/mapCalibrations.json';
      RNFS.writeFile(filePath, JSON.stringify(mapCalibrations), 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!',success);
        console.log('Download the file from:', filePath);
      })
      .catch((err) => {
        console.log(err.message);
      });
    } catch (error) {
      console.error('Error saving map calibrations:', error);
    }
  };

  // useEffect(() => {
  //   permission()
  //   WifiManager.getCurrentWifiSSID().then(
  //     ssid => {
  //       console.log('Your current connected wifi SSID is ' + ssid);
  //     },
  //     () => {
  //       console.log('Cannot get current SSID!');
  //     }
  //   );
  //   WifiManager.loadWifiList().then((list: any) => {
  //     console.log('list: ', list);
  //   })
  // }, []);

  return (
    <View style={styles.container}>
      <Image
        source={indoorMap}
        style={styles.image}
        resizeMode="contain"
        {...panResponder.panHandlers}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveLocation}>
        <Icon name="save" size={30} color="black" />
        <Text style={styles.buttonText}>save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.exportButton} onPress={handleDownload}>
        <Icon name="download" size={30} color="black" />
        <Text style={styles.buttonText}>down</Text>
      </TouchableOpacity>

      <MaterialCommunityIcons
        style={[
          styles.marker,
          {
            left: markerPosition.x,
            top: markerPosition.y,
            transform: [{rotate: `${angle}deg`}],
          },
        ]}
        name="navigation"
        color={'red'}
        size={30}
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
    // Set marker styles as needed
  },
  saveButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    borderRadius: 20,
    // backgroundColor: 'black',
  },
  exportButton: {
    position: 'absolute',
    top: 200,
    right:5,
    borderRadius: 20,
    // backgroundColor: 'black',
  },
  buttonText: {
    color: 'black',
  },
});
