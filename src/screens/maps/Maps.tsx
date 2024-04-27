import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import SearchBarCustom from "../../components/searchBar/searchBar";
import HeaderOptions from "../../components/headerBar/HeaderBar";
import { useLogin } from '../../context/LoginProvider';
import { allMaps } from "./mapData";


export default function Maps({ navigation }:any) {
    const [refreshing, setRefreshing] = useState(false);
    const [filterList, setFilterList] = useState<any[]|[]>([]);
    const [allScannedDocsForUser, setAllScannedDocsForUser] = useState<any[]|[]>([]);
    const [isLayoutEffectRendered, setLayoutEffectRendered] = useState(false);

    const loginContext = useLogin();

    HeaderOptions({navigation, refreshing, setLayoutEffectRendered});

    useEffect(() => {
        const allScannedDocumentsForUser = allMaps;
        setAllScannedDocsForUser(allScannedDocumentsForUser);
        setFilterList(allScannedDocumentsForUser);
      }, []);

    if (!isLayoutEffectRendered) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulate a 1-second delay
  };

  const handleCardPress = (item:any) => {
    const path = loginContext.isLoggedIn ? 'calibration' : 'live';
    navigation.navigate(path, {
      mapDetails: item,
    });
  };

  return (
    <View style={styles.container}>
    <SearchBarCustom setFilterList={setFilterList} originalList={allScannedDocsForUser}/>
    <FlatList
        data={filterList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress(item)}
            key={item.id}
        >
            <Image
            source={require('../../assets/maps/indoorMap.png')}
            style={styles.cardImage}
            />
            <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{item.buildingName}</Text>
            <Text style={styles.cardText}></Text>
            <Text style={styles.cardText}>Floor Name: {item.floorName}</Text>
            <Text style={styles.cardText}>Description: {(item.description).replace(/\n/g, ' ')}</Text>
            <Text style={styles.cardText}></Text>
            </View>
        </TouchableOpacity>
        )}
        refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            // colors={["#007AFF"]}
            // tintColor={"#007AFF"}
        />
        }
    />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    margin: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  cardDetails: {
    marginLeft: 10,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 14,
    color: "#888",
  },
  selectedImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImage: {
    width: "100%",
    height: 500,
    resizeMode: "contain",
    marginBottom: 10,
  },
  iconTray: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  iconButton: {
    width: 50,
    height: 60,
    marginHorizontal: 10,
    backgroundColor: "#ECF0F1",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});


