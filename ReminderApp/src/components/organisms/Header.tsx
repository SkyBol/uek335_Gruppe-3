import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import "../../../i18n/config";


type props = {
  isEditing: boolean;
  toggleEditing: () => void;
  deleteElements: () => void;
  setEditingElementIndex: (editingElementIndex : number) => void;
};

function Header({ isEditing, toggleEditing, deleteElements, setEditingElementIndex }: props) {
  const { t } = useTranslation();

  return (
    <View>
      {!isEditing ? (
        <Appbar.Header
          style={{ justifyContent: "space-between", flexDirection: "row"}}
        >
          <Appbar.Action icon="pencil" onPress={toggleEditing} />
          <Appbar.Content
            style={{ flex: 3, alignItems: "center" }}
            title={t("title")}
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
            title={t("edit")}
          />
          <Appbar.Action icon="delete" onPress={deleteElements} />
        </Appbar.Header>
      )}
    </View>
  );
}

export default Header;
