import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, MD3DarkTheme, Provider, Text } from "react-native-paper";
import PopUpEditor from "./src/components/organism/PopUpEditor";
import ReminderElement from "./src/ReminderElement";

export default function App() {
  const [editingElement, setEditingElement] = useState<ReminderElement | null>(null);

  const theme = {
    ...MD3DarkTheme,
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
      <Appbar.Header>
          <Appbar.Action icon="magnify" onPress={() => {}} />
          <Appbar.Content title="Reminder" />
          <Appbar.Action icon="dots-vertical" onPress={() => {}} />
        </Appbar.Header>
      <View style={styles.container}>
        <Text>Open up my dudes!</Text>
        <View style={{flexDirection:'row', flex: 1}}>
          <ReminderElement setEditingElement={setEditingElement}/>
          {/* <EditReminderElement/> */}
        </View>
        <StatusBar style="auto" />
      </View>
      <PopUpEditor 
          editingElement={editingElement}
          setEditingElement={setEditingElement}
          reminders={[]}
        />
    </Provider>
  );
}


