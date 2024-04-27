import { useEffect, useState } from "react";
import SearchBar from "react-native-dynamic-search-bar";
import { View } from "react-native";

export default function SearchBarCustom({ setFilterList, originalList }:any) {
    const [spinnerVisibility, setSpinnerVisibility] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const placeholders = [
        "Search any document ...",
        "Try searching by floor name...",
        "Try searching by building name...",
        "Try searching by description...",
        // Add more placeholders as needed
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 2000);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    const onChangeText = (text:string)=> {
        setSpinnerVisibility(true)
        const lowerCaseSearch = text.toLowerCase();
        const searchedList = originalList.filter((doc) => {
          return Object.values(doc).some((value) =>
            String(value).toLowerCase().includes(lowerCaseSearch)
          );
        });
        setFilterList(searchedList);
        setTimeout(() => {
            setSpinnerVisibility(false)
        }, 1500);
    }

    return (
        <View style={{
            marginVertical: 12,
        }}>
            <SearchBar
                spinnerVisibility={spinnerVisibility}
                placeholder={placeholders[placeholderIndex]}
                onChangeText={(text)=>onChangeText(text)}
                onSearchPress={() => console.log("Search Icon is pressed")}
                onClearPress={() => setFilterList(originalList)}
                onPress={() => alert("onPress")}
                textInputStyle={{color:'black'}}
            />
        </View>
    )
}