import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Picker from "../../Picker";
import StorageService from "../../service/StorageService";

type props = {
    open : boolean;
    setOpen : (open : boolean) => void;
    editingElement : ReminderElement | null;
    setEditingElement : (editingElement : ReminderElement) => void;
    reminders : ReminderElement[];
}

const PopUpEditor = ({open, setOpen, editingElement, setEditingElement, reminders} : props) => {
    const sheetRef = useRef<BottomSheet>(null);
    const [time, setTime] = useState<Date>(new Date());
    const theme = useTheme();

    useEffect(() => {
      if (open) {
        sheetRef.current.expand();
      } else {
        sheetRef.current.close();
      }
    }, [open]);

    useEffect(() => {
      if (editingElement) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }, [editingElement])

    const cancel = () => {
      setOpen(false);
    }
    const save = () => {
      let newReminders : ReminderElement[] = [...reminders];
      if (newReminders.indexOf(editingElement) === -1) {
        StorageService.save([...newReminders, editingElement]);
      } else {
        
      }
    }

    return (
        <BottomSheet
          ref={sheetRef}
          enablePanDownToClose={true}
          snapPoints={["97%"]}
        >
          <View>
            <View style={{padding: '5%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button onPress={cancel}>Cancel</Button>
                <Button onPress={save}>Done</Button>
            </View>
            <Picker 
              mode={"time"} 
              time={time} 
              setTime={setTime} 
            />
          </View>
        </BottomSheet>
    )
}

export default PopUpEditor;