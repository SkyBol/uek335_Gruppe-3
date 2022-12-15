import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { MD3DarkTheme, Provider, Text } from "react-native-paper";
import ReminderElement from "./src/ReminderElement";

export default function App() {
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const snapPoints = ["97%"]

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
        <Text>Open up my dudes!</Text>
        <View>
          <ReminderElement/>
        </View>
        <Button onPress={() => setIsOpen(!isOpen)} title="Open" />
        <StatusBar style="auto" />
      </View>
      {isOpen && (
        <BottomSheet
          ref={sheetRef}
          enablePanDownToClose={true}
          snapPoints={snapPoints}
          onChange={(index) => {console.log(index)}}
        >
          <BottomSheetView>
            <View style={{}}>
              <Text>AA</Text>
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}
    </Provider>
  );
}


