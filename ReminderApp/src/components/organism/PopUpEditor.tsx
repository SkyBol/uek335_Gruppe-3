import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import Picker from "../../Picker";

type props = {
    open : boolean;
    setOpen : (open : boolean) => void;
}

const PopUpEditor = ({open, setOpen} : props) => {
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = ["97%"]

    return (
        <BottomSheet
          ref={sheetRef}
          enablePanDownToClose={true}
          snapPoints={snapPoints}
          onChange={(index) => {console.log(index)}}
        >
          <BottomSheetView>
            <View style={{}}>
                <Button>Cancel</Button>
                <Button>Done</Button>
                <Picker />
            </View>
          </BottomSheetView>
        </BottomSheet>
    )
}

export default PopUpEditor;