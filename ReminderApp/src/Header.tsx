import React from "react";
import { View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import ReminderElement from "./ReminderElement";

type props = {
  isEditing: boolean;
  toggleEditing: () => void;
  deleteElements: () => void;
  setEditingElementIndex: (editingElementIndex : number) => void;
};

function Header({ isEditing, toggleEditing, deleteElements, setEditingElementIndex }: props) {

  const theme = useTheme();

  return (
    <View>
      {!isEditing ? (
        <Appbar.Header
          style={{ justifyContent: "space-between", flexDirection: "row"}}
        >
          <Appbar.Action icon="pencil" onPress={toggleEditing} />
          <Appbar.Content
            style={{ flex: 3, alignItems: "center" }}
            title="Reminder"
          />
          <Appbar.Action icon="plus" onPress={() => {setEditingElementIndex(-1)}} />
        </Appbar.Header>
      ) : (
        <Appbar.Header
          style={{ justifyContent: "space-between", flexDirection: "row" }}
        >
          <Appbar.Action icon="arrow-left" onPress={toggleEditing} />
          <Appbar.Content
            style={{ flex: 3, alignItems: "center" }}
            title="Edit"
          />
          <Appbar.Action icon="delete" onPress={deleteElements} />
        </Appbar.Header>
      )}
    </View>
  );
}

export default Header;
