import BottomSheet, { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { Button, TextInput, useTheme } from "react-native-paper";
import Picker from "../../Picker";
import DatePicker from "../DatePicker";

type props = {
    editingElementIndex : number | null;
    setEditingElementIndex : (editingElementIndex : number) => void;
    reminders : ReminderElement[];
    setReminders : (reminders : ReminderElement[]) => void;
}

const PopUpEditor = ({editingElementIndex, setEditingElementIndex, reminders, setReminders} : props) => {
    const [editingElement, setEditingElement] = useState<ReminderElement | null>(null)
    const sheetRef = useRef<BottomSheet>(null);
    const theme = useTheme();
    const [isActive, setActive] = useState<boolean>(false);

    useEffect(() => {
      if (editingElementIndex || editingElementIndex === 0) {
        //setReminders();
        if (editingElementIndex === -1) {
          setEditingElement({
            date: moment().endOf('month').startOf('isoWeek').toDate(),
            isActive: true,
            isSelected: false,
            repeatUntil: moment().endOf('month').startOf('isoWeek').toDate(),
          })
        } else {
          setEditingElement({...reminders[editingElementIndex]});
        }
        sheetRef.current.expand();
      } else {
        setEditingElement(null);
        sheetRef.current.close();
      }
    }, [editingElementIndex])

    const cancel = () => {
      setEditingElementIndex(null);
    }
    const save = () => {
      // TODO
      if (editingElementIndex === -1) {
        setReminders([...reminders, editingElement]);
      } else {
        reminders[editingElementIndex] = editingElement;
        setReminders([...reminders]);
      }
      cancel();
    }

    const toggleIsActive = () => {
      if(isActive){
        setEditingElement({...editingElement, repeatUntil: editingElement.date})
      }
      setActive(!isActive);
    }

    const setTimeForEditigElement = (newTime : Date) => {
      setEditingElement({...editingElement, date: new Date(editingElement.date.setTime(newTime.getTime()))})
    }

    const setRepeatForEditigElement = (newTime : Date) => {
      setEditingElement({...editingElement, repeatUntil: newTime})
    }

    return (
        <BottomSheet
          ref={sheetRef}
          snapPoints={[1, "97%"]}
          onChange={(index : number) => {index === 0 && cancel()}}
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
              <View style={{padding: "3%"}}>
                <DatePicker 
                editingElement={editingElement} 
                setEditingElement={setEditingElement} 
                
                />
              </View>
              <View style={{alignSelf: "center"}}>
                <Switch 
                  style={{ 
                    transform: [{ scaleX: Platform.OS === "ios" ? 1 : 1.75 }, { scaleY: Platform.OS === "ios" ? 1 : 1.75 }],
                  }}
                  thumbColor={theme.colors.onPrimary} 
                  trackColor={{true: theme.colors.primary, false: theme.colors.surfaceVariant}} 
                  value={isActive} 
                  onValueChange={toggleIsActive}
                />
              </View>
              <View>
                {isActive ?
                  <View>
                    <Picker 
                      mode={"date"} 
                      time={editingElement.repeatUntil} 
                      setTime={setRepeatForEditigElement} 
                    />
                  </View>
                  :
                  <></>
                }
              </View>


            </View>
          )}
        </BottomSheet>
    )
}

export default PopUpEditor;