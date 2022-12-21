import AsyncStorage from "@react-native-async-storage/async-storage";

const storageKey = "@reminders"

const StorageService = {
    save: async (reminders : ReminderElement[]) => {
        await AsyncStorage.setItem(storageKey, JSON.stringify(reminders));
    },
    get: async () : Promise<ReminderElement[]> => {
        let reminders : string = await AsyncStorage.getItem(storageKey);
        return JSON.parse(reminders);
    }
}

export default StorageService;