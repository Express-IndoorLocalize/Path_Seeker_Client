import { useEffect, useState } from "react";
import { SearchBar } from 'react-native-elements';
import { View } from "react-native";

export default function SearchBarCustom({ setFilterList, originalList }:any) {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [search, setSearch] = useState('');

    const placeholders = [
        "Search any map ...",
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
        setSearch(text);
        const lowerCaseSearch = text.toLowerCase();
        const searchedList = originalList.filter((doc) => {
          return Object.values(doc).some((value) =>
            String(value).toLowerCase().includes(lowerCaseSearch)
          );
        });
        setFilterList(searchedList);
        setTimeout(() => {
        }, 1500);
    }

    return (
        <View style={{
            marginVertical: 12,
        }}>
            <SearchBar
                placeholder={placeholders[placeholderIndex]}
                onChangeText={(text)=>onChangeText(text)}
                value={search}
                lightTheme = {true}
                inputStyle={{ backgroundColor: 'white' }} 
                inputContainerStyle={{ backgroundColor: 'white' }} 
                containerStyle={{ backgroundColor: 'white' }} 
                leftIconContainerStyle={{ backgroundColor: 'white' }} 
                rightIconContainerStyle={{ backgroundColor: 'white' }} 
            />
        </View>
    )
}