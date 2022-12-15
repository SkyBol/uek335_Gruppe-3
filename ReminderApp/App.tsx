import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const snapPoints = ["97%"]

  return (
    <View style={styles.container}>
      <Button onPress={() => setIsOpen(!isOpen)} title="Open" />
      <StatusBar style="auto" />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});