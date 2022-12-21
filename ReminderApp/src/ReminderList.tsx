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
  setEditingElement: (reminderElement: ReminderElement) => void;
  setReminderList: (reminderElement: ReminderElement[]) => void;
  reminderList: ReminderElement[];
  isEditing: boolean;
};

function ReminderList({setEditingElement,setReminderList,reminderList,isEditing}: props) {
  useEffect(() => {
    setReminderList(reminderList.map((elem) => {return {...elem, isSelected: false}}));
  }, [isEditing])
  const theme = useTheme();
  return (
    <ScrollView style={{ flex: 1, flexDirection: "column", padding: "3%", paddingBottom: "0%"}}>
      {reminderList &&
        reminderList.map(
          (reminderElement: ReminderElement, index: number) => {
            let repeatAmount = 0;
            if (reminderElement.repeatUntil) {
              repeatAmount =
              reminderElement.repeatUntil.getMonth()! -
              reminderElement.date.getMonth()!;
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
                setEditingElement={setEditingElement}
                reminderElement={reminderElement}
                repeatAmount={repeatAmount}
                toggleIsActive={toggleIsActive}
              />
            );
          }
        )}
    </ScrollView>
  );
}

export default ReminderList;
