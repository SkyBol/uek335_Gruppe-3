import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3DarkTheme, Provider } from "react-native-paper";
import Header from "./src/components/organisms/Header";
import PopUpEditor from "./src/components/organisms/PopUpEditor";
import ReminderList from "./src/components/organisms/ReminderList";
import NotificationService from "./src/service/NotificationService";
import StorageService from "./src/service/StorageService";

export default function App() {
  const [editingElementIndex, setEditingElementIndex] = useState<number | null>(null);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const theme = {
    ...MD3DarkTheme,
  }

  const [reminderList, setReminderList] = useState<ReminderElement[]>([]);

  /**
   * This useEffect loads the saved Reminders from Storage
   * and prepares everything for the reminders to work
   */
  useEffect(() => {
    StorageService.get().then((reminders : ReminderElement[]) => {
      setLoading(false)
      if(reminders) { setReminderList(reminders); }
    }).catch((error) => {
      console.log(error);
      setLoading(false)
    });
    NotificationService.register().catch((error) => {
      console.log(error);
    })
  }, [])

  /**
   * Everytime the reminderList gets updated, this useEffect
   * saves the new Array to Storage.
   * Also sets all reminders to post.
   */
  useEffect(() => {
    /**
     * To avoid setting storage before it is loaded
     */
    if (!loading) {
      NotificationService.clear();
      reminderList.forEach((elem) => {
        NotificationService.postNotification(elem);
      });
      StorageService.save(reminderList);
    }
  }, [reminderList])

  const toggleEditing = () => {
    setEditing(!isEditing);
  }

  const deleteElements = () => {
    setReminderList(reminderList.filter((elem) => !elem.isSelected));
    toggleEditing();
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: 'column'
    },
  });

  return (
    <Provider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Header isEditing={isEditing} toggleEditing={toggleEditing} deleteElements={deleteElements} setEditingElementIndex={setEditingElementIndex}/>
          <View style={styles.container}>
            <View style={{flexDirection:'row', flex: 1}}>
              <ReminderList isEditing={isEditing} reminderList={reminderList} setEditingElementIndex={setEditingElementIndex} setReminderList={setReminderList}/>
            </View>
            <StatusBar style="auto" />
          </View>
          <PopUpEditor 
              editingElementIndex={editingElementIndex}
              setEditingElementIndex={setEditingElementIndex}
              reminders={reminderList}
              setReminders={setReminderList}
            />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}


