import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { Platform, Switch, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import Picker from "../../Picker";
import DatePicker from "../DatePicker";

type props = {
    editingElement : ReminderElement | null;
    setEditingElement : (editingElement : ReminderElement) => void;
    reminders : ReminderElement[];
}

const PopUpEditor = ({editingElement, setEditingElement, reminders} : props) => {
    const sheetRef = useRef<BottomSheet>(null);
    const theme = useTheme();

    useEffect(() => {
      if (editingElement) {
        sheetRef.current.expand();
      } else {
        sheetRef.current.close();
      }
    }, [editingElement])

    const cancel = () => {
      setEditingElement(null);
    }
    const save = () => {
      // TODO
      cancel();
    }

    const setTimeForEditigElement = (newTime : Date) => {
      setEditingElement({...editingElement, date: newTime});
    }

    return (
        <BottomSheet
          ref={sheetRef}
          enablePanDownToClose={true}
          snapPoints={[1, "97%"]}
          onClose={save}
          backgroundStyle={{
            backgroundColor: theme.colors.background
          }}
        >
          { editingElement && (
            <View style={{justifyContent: 'center'}}>
              <View style={{padding: '5%', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Button onPress={cancel}>Cancel</Button>
                  <Button onPress={save}>Done</Button>
              </View>
              <Picker 
                mode={"time"} 
                time={editingElement.date} 
                setTime={setTimeForEditigElement} 
              />
              <View>
                <Text variant='bodyLarge'>Repeat</Text>
                <Switch 
                  style={{ 
                    transform: [{ scaleX: Platform.OS === "ios" ? 1 : 1.75 }, { scaleY: Platform.OS === "ios" ? 1 : 1.75 }],
                  }}
                  thumbColor={theme.colors.onPrimary} 
                  trackColor={{true: theme.colors.primary, false: theme.colors.surfaceVariant}} 
                  value={editingElement.isActive} 
                  onValueChange={() => {
                    setEditingElement({...editingElement, isActive: !editingElement.isActive})
                  }}
                />
              </View>
              <DatePicker 
                editingElement={editingElement} 
                setEditingElement={setEditingElement} 
              />
            </View>
          )}
        </BottomSheet>
    )
}

export default PopUpEditor;