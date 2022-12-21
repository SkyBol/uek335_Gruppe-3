import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import { Button, Platform, View } from "react-native";
import { useTheme } from 'react-native-paper';


type props = {
    mode : 'date' | 'time';
    time : Date;
    setTime : (time : Date) => void;
}

const Picker = ({mode, time, setTime} : props) => {
    const isIOS = Platform.OS === 'ios';
    const [show, setShow] = useState<boolean>(false);
    const theme = useTheme();

    const onChange = (event, selectedDate) => {
        setTime(selectedDate);
        setShow(false)
    };

  return (
    <View
        style={{
            backgroundColor: theme.colors.primary
        }}
    >
        {!isIOS && <Button onPress={() => setShow(!show)} title="Open" />}
        {show || isIOS && (
            <DateTimePicker
                testID="dateTimePicker"
                display={isIOS ? 'spinner' : 'default'}
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