import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import { MD3DarkTheme, Provider, Text, useTheme } from "react-native-paper";
import EditReminderElement from "./src/EditReminderElement";
import ReminderElement from "./src/ReminderElement";

export default function App() {
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
        <View style={{flexDirection:'column', flex: 1, width: windowWidth}}>
            <ReminderElement/>
            <EditReminderElement/>
        </View>
        
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}


