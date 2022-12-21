import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, MD3DarkTheme, Provider } from "react-native-paper";
import ReminderList from "./src/ReminderList";
import Header from "./src/Header";
import StorageService from "./src/service/StorageService";

export default function App() {
  const [editingElement, setEditingElement] = useState<ReminderElement | null>(null);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const theme = {
    ...MD3DarkTheme,
  }

  //Only for testing -> remove after
  const [reminderList, setReminderList] = useState<ReminderElement[]>([]);

  useEffect(() => {
    StorageService.get().then((reminders : ReminderElement[]) => {
      setLoading(false)
      if(reminders) { setReminderList(reminders); }
    }).catch((error) => {
      console.log(error);
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!loading) {
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
      <Header isEditing={isEditing} toggleEditing={toggleEditing} deleteElements={deleteElements}/>
      <View style={styles.container}>
        <View style={{flexDirection:'row', flex: 1}}>
          <ReminderList isEditing={isEditing} reminderList={reminderList} setEditingElement={setEditingElement} setReminderList={setReminderList}/>
        </View>
        <StatusBar style="auto" />
      </View>
      {/* <PopUpEditor 
          open={isEditScreenOpen}
          setOpen={setIsEditScreenOpen}
          editingElement={editingElement}
          setEditingElement={setEditingElement}
          reminders={[]}
        /> */}
    </Provider>
  );
}


