import AsyncStorage from "@react-native-async-storage/async-storage";

const storageKey = "@reminders"

/**
 * This service manages Storage-Relevant functions
 */
const StorageService = {
    /**
     * This function saves an array of reminders to Storage
     * @param reminders The list of reminders to save
     */
    save: async (reminders : ReminderElement[]) => {
        await AsyncStorage.setItem(storageKey, JSON.stringify(reminders));
    },
    /**
     * This function fetches the saved reminders in Storage
     * @returns the reminders wrapped in a Promise
     */
    get: async () : Promise<ReminderElement[]> => {
        const reminders : string = await AsyncStorage.getItem(storageKey);
        let remindersParsed : ReminderElement[] = JSON.parse(reminders);
        return remindersParsed.map((elem) => {return {...elem, date: new Date(elem.date), repeatUntil: new Date(elem.repeatUntil)}});
    }
}

export default StorageService;