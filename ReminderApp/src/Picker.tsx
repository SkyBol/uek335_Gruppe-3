import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import { Button, Platform, View } from "react-native";


type props = {
    mode : 'date' | 'time';
    time : Date;
    setTime : (time : Date) => void;
}

const Picker = ({mode, time, setTime} : props) => {
    const isIOS = Platform.OS === 'ios';
    const [show, setShow] = useState<boolean>(isIOS);

    const onChange = (event, selectedDate) => {
        setTime(selectedDate);
        setShow(false)
    };

  return (
    <View>
        {!isIOS && <Button onPress={() => setShow(!show)} title="Open" />}
        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                display={'spinner'} // Is working for both IOS and Android
                value={time}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
            />
        )}
    </View>
  );
}

export default Picker;