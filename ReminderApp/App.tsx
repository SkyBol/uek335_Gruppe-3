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
    },
  });

  return (
    <Provider theme={theme}>
      <View style={styles.container}>
        <View>
          <Button
            onPress={() => {setIsEditScreenOpen(!isEditScreenOpen)}}
          >
            <Text>Open Ediotr</Text>
          </Button>
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


