import { StatusBar } from "expo-status-bar";
<<<<<<< HEAD
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MD3DarkTheme, Provider, Text } from "react-native-paper";
import PopUpEditor from "./src/components/organism/PopUpEditor";
=======
import { Dimensions, StyleSheet, View } from "react-native";
import { MD3DarkTheme, Provider, Text, useTheme } from "react-native-paper";
import EditReminderElement from "./src/EditReminderElement";
import ReminderElement from "./src/ReminderElement";
>>>>>>> 6b71b095d4234fd2a13e7ebd1f50e94e4bfe798a

export default function App() {
  const [isEditScreenOpen, setIsEditScreenOpen] = useState<boolean>(false);

  const theme = {
    ...MD3DarkTheme,
  }

  const windowWidth = Dimensions.get('window').width;

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
      <View style={styles.container}>
        <Text>Open up my dudes!</Text>
        <View style={{flexDirection:'row', flex: 1}}>
          <ReminderElement/>
          <EditReminderElement/>
        </View>
        <PopUpEditor 
          open={isEditScreenOpen} 
          setOpen={setIsEditScreenOpen} 
        />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}


