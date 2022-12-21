import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, MD3DarkTheme, Provider, Text } from "react-native-paper";
import PopUpEditor from "./src/components/organism/PopUpEditor";
import ReminderElement from "./src/ReminderElement";
import ReminderList from "./src/ReminderList";
import StorageService from "./src/service/StorageService";

export default function App() {
  const [isEditScreenOpen, setIsEditScreenOpen] = useState<boolean>(false);
  const [editingElement, setEditingElement] = useState<ReminderElement | null>(null);
  const [isEditing, setEditing] = useState<boolean>(false);

  const theme = {
    ...MD3DarkTheme,
  }

  //Only for testing -> remove after
  const reminderListInit: ReminderElement[] = [{date: new Date('2016-01-02T00:00:00'), isActive: true, repeatUntil: new Date('2016-02-02T00:00:00'), isSelected: false}, {date: new Date('2016-01-05T00:00:00'), isActive: false, repeatUntil: new Date('2016-01-02T00:00:00'), isSelected: false},{date: new Date('2016-01-02T00:00:00'), isActive: true, repeatUntil: new Date('2016-02-02T00:00:00'), isSelected: false}, {date: new Date('2016-01-05T00:00:00'), isActive: false, repeatUntil: new Date('2016-01-02T00:00:00'), isSelected: false},{date: new Date('2016-01-02T00:00:00'), isActive: true, repeatUntil: new Date('2016-02-02T00:00:00'), isSelected: false}, {date: new Date('2016-01-05T00:00:00'), isActive: false, repeatUntil: new Date('2016-01-02T00:00:00'), isSelected: false},{date: new Date('2016-01-02T00:00:00'), isActive: true, repeatUntil: new Date('2016-02-02T00:00:00'), isSelected: false}, {date: new Date('2016-01-05T00:00:00'), isActive: false, repeatUntil: new Date('2016-01-02T00:00:00'), isSelected: false},{date: new Date('2016-01-02T00:00:00'), isActive: true, repeatUntil: new Date('2016-02-02T00:00:00'), isSelected: false}, {date: new Date('2016-01-05T00:00:00'), isActive: false, repeatUntil: new Date('2016-01-02T00:00:00'), isSelected: false}, ]
  const [reminderList, setReminderList] = useState<ReminderElement[]>(reminderListInit);
  StorageService.save(reminderListInit);

  useEffect(() => {
    StorageService.get().then((reminders : ReminderElement[]) => {
      setReminderList(reminders);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    StorageService.save(reminderList);
  }, [setReminderList])

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
      <Appbar.Header style={{justifyContent: "space-between", flexDirection: "row"}}>
        <Appbar.Action icon="pencil" onPress={() => {setEditing(!isEditing)}} />
        <Appbar.Content style={{flex: 3, alignItems: "center"}} title="Reminder" />
        <Appbar.Action icon="plus" onPress={() => {}} />
      </Appbar.Header>
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


