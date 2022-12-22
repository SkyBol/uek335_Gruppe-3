import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, { useState } from "react";
import { Platform, View } from "react-native";
import { Button, useTheme } from 'react-native-paper';


type props = {
    mode : 'date' | 'time';
    time : Date;
    setTime : (time : Date) => void;
}

const Picker = ({mode, time, setTime} : props) => {
    const isIOS = Platform.OS === 'ios';
    const [show, setShow] = useState<boolean>(false);
    const theme = useTheme();

    const onChange = (_e, selectedDate) => {
        setTime(selectedDate);
        setShow(false)
    };

  return (
    <View>
        {!isIOS && 
            <View>
                <Button 
                    onPress={() => setShow(!show)} 
                    style={{
                        backgroundColor: theme.colors.primaryContainer,
                        marginHorizontal: "3%"
                    }}
                >
                    { mode === "time" ? moment(time).format("HH:mm") : moment(time).format("DD.MM.yyyy") }
                </Button>
            </View>
        }
        {(show || isIOS) && (
            <DateTimePicker
                testID="dateTimePicker"
                display={isIOS ? 'spinner' : 'default'}
                value={time}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                textColor={theme.colors.secondary}
                themeVariant={'dark'}
            />
        )}
    </View>
  );
}

export default Picker;