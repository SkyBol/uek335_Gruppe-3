import AsyncStorage from "@react-native-async-storage/async-storage";


const StorageService = {
    save: async (key : string, value : string) => {
        await AsyncStorage.setItem(key, value);
    },
    get: async (key : string) => {
        let a =  await AsyncStorage.getItem(key);
        return a;
    }
}

export default StorageService;