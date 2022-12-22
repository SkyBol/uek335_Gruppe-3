import React, { useEffect } from "react";
import moment from "moment";
import { Platform, ScrollView, StyleSheet, Switch, View } from "react-native";
import {
  MD3DarkTheme,
  Surface,
  useTheme,
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Checkbox,
} from "react-native-paper";
import ReminderElement from "./ReminderElement";
import EditReminderElement from "./EditReminderElement";

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
              Number(reminderElement.repeatUntil.getMonth()) -
              Number(reminderElement.date.getMonth());
            }
            console.log(reminderElement.repeatUntil.getMonth(), "rep")
            console.log(reminderElement.date.getMonth(), "date")

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
