import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";

type props = {
  isEditing: boolean;
  toggleEditing: () => void;
  deleteElements: () => void;
};

function Header({ isEditing, toggleEditing, deleteElements }: props) {
  return (
    <View>
      {!isEditing ? (
        <Appbar.Header
          style={{ justifyContent: "space-between", flexDirection: "row" }}
        >
          <Appbar.Action icon="pencil" onPress={toggleEditing} />
          <Appbar.Content
            style={{ flex: 3, alignItems: "center" }}
            title="Reminder"
          />
          <Appbar.Action icon="plus" onPress={() => {}} />
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
