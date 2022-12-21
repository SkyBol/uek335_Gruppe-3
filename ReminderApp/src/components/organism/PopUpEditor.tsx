import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
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
      
    }

    const setTimeEditigElement = (newTime : Date) => {
      setEditingElement({...editingElement, date: newTime});
    }

    return (
        <BottomSheet
          ref={sheetRef}
          enablePanDownToClose={true}
          snapPoints={["97%"]}
        >
          { editingElement && (
            <View>
              <View style={{padding: '5%', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Button onPress={cancel}>Cancel</Button>
                  <Button onPress={save}>Done</Button>
              </View>
              <Picker 
                mode={"time"} 
                time={editingElement.date} 
                setTime={setTimeEditigElement} 
              />
              <DatePicker />
            </View>
          )}
        </BottomSheet>
    )
}

export default PopUpEditor;