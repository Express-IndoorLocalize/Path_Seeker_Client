import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function NavPath(props: any) {
  const coordinates = props.coordinates;
  const startCordinate = coordinates[0] ?? {x:0,y:0};
  const endCordinate = coordinates[coordinates.length-1] ?? {x:0,y:0};
  const markerDetails = { start: {x:startCordinate.x, y:startCordinate.y}, end:{x:endCordinate.x, y:endCordinate.y }};

  const renderLines = () => {
    if (!coordinates || coordinates.length < 2) return null;

    const pathData = coordinates.reduce((acc, coordinate, index) => {
      if (index === 0) {
        return `M${coordinate.x + 10},${coordinate.y - 10}`;
      } else {
        return `${acc} L${coordinate.x + 13},${coordinate.y + 10}`;
      }
    }, '');

    return <Path d={pathData} stroke="blue" strokeWidth="5" fill="none" />;
  };
  if (props.userNeedsNavigating) {
    return (
      <>
      <MaterialCommunityIcons
        style={[
          styles.marker,
          {
            left: markerDetails.start.x-3,
            top: markerDetails.start.y-22,
          },
        ]}
        name="bullseye"
        color={'#227ef5'}
        size={25}
      />
      <MaterialCommunityIcons
        style={[
          styles.marker,
          {
            left: markerDetails.end.x,
            top: markerDetails.end.y-13,
          },
        ]}
        name="pin"
        color={'#227ef5'}
        size={25}
      />
      <Svg width={screenWidth} height={screenHeight} style={StyleSheet.absoluteFill}>
        {renderLines()}
      </Svg>
      </>
    );
  } else {
    <></>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.9,
    position: 'absolute',
  },
  marker: {
    position: 'absolute',
  },
});