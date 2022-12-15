import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { MD3DarkTheme, Provider, Text, useTheme } from "react-native-paper";
import ReminderElement from "./src/ReminderElement";

export default function App() {
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
      <View style={styles.container}>
        <Text>Open up my dudes!</Text>
        <View style={{flexDirection:'row', flex: 1}}>
          <ReminderElement/>
        </View>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}


