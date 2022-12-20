import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, MD3DarkTheme, Provider, Text } from "react-native-paper";
import PopUpEditor from "./src/components/organism/PopUpEditor";

export default function App() {
  const [isEditScreenOpen, setIsEditScreenOpen] = useState<boolean>(false);

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
          <Button
            onPress={() => {setIsEditScreenOpen(!isEditScreenOpen)}}
          >
            <Text>Open Ediotr</Text>
          </Button>
          <ReminderElement/>
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


