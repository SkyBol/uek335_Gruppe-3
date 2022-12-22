import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import EditReminderElement from "../molecules/EditReminderElement";
import ReminderElement from "../molecules/ReminderElement";

type props = {
  setEditingElementIndex: (reminderElementIndex: number) => void;
  setReminderList: (reminderElement: ReminderElement[]) => void;
  reminderList: ReminderElement[];
  isEditing: boolean;
};

function ReminderList({setEditingElementIndex,setReminderList,reminderList,isEditing}: props) {

  const theme = useTheme();

  useEffect(() => {
    setReminderList(reminderList.map((elem) => {return {...elem, isSelected: false}}));
  }, [isEditing])
  return (
    <ScrollView style={{ flex: 1, flexDirection: "column", padding: "3%", paddingBottom: "0%"}}>
      {reminderList &&
        reminderList.map(
          (reminderElement: ReminderElement, index: number) => {
            let repeatAmount = 0;
            if (reminderElement.repeatUntil) {
              repeatAmount =
              (reminderElement.repeatUntil.getMonth() + (12 * reminderElement.repeatUntil.getFullYear()) -
              ((reminderElement.date.getMonth())  + (12 * reminderElement.date.getFullYear())));
            }

            const toggleIsSelected = () => {
              reminderList[index].isSelected = !reminderElement.isSelected;
              setReminderList([...reminderList]);
            };

            const toggleIsActive = () => {
              reminderList[index].isActive = !reminderElement.isActive;
              setReminderList([...reminderList]);
            }

            return ( isEditing ? 
              <EditReminderElement
                reminderElement={reminderElement}
                repeatAmount={repeatAmount}
                toggleIsSelected={toggleIsSelected}
              /> :
              <ReminderElement
                setEditingElementIndex={setEditingElementIndex}
                reminderElement={reminderElement}
                repeatAmount={repeatAmount}
                toggleIsActive={toggleIsActive}
                index={index}
              />
            );
          }
        )}
    </ScrollView>
  );
}

export default ReminderList;
