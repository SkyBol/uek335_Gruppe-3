import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from "react";
import { Button, Platform, Text, View } from "react-native";

type IOSMode = 'date' | 'time' | 'datetime' | 'countdown';
type AndroidMode = 'date' | 'time';

const Picker = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const isIOS = Platform.OS === 'ios';

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
        setShow(false)
    };

  return (
    <View>
        <Button onPress={() => setShow(!show)} title="Open" />
        <Text>selected: {date.toLocaleString()}</Text>
        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                display={'calendar'} // Is working for both IOS and Android
                value={date}
                mode={mode as AndroidMode}
                is24Hour={true}
                onChange={onChange}
            />
        )}
    </View>
  );
}

export default Picker;