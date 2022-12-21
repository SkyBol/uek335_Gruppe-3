import AsyncStorage from "@react-native-async-storage/async-storage";

const storageKey = "@reminders"

const StorageService = {
    save: async (reminders : ReminderElement[]) => {
        await AsyncStorage.setItem(storageKey, JSON.stringify(reminders));
    },
    get: async () : Promise<ReminderElement[]> => {
        const reminders : string = await AsyncStorage.getItem(storageKey);
        let remindersParsed : ReminderElement[] = JSON.parse(reminders);
        return remindersParsed.map((elem) => {return {...elem, date: new Date(elem.date), repeatUntil: new Date(elem.repeatUntil)}});
    }
}

export default StorageService;