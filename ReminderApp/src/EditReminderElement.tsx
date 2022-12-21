import moment from 'moment';
import React from 'react';
import { Platform, View } from "react-native";
import { Card, Checkbox, Text, useTheme } from 'react-native-paper';

type props = {
  reminderElement : ReminderElement;
  repeatAmount : number;
  toggleIsSelected : () => void;
}

function EditReminderElement({reminderElement, repeatAmount, toggleIsSelected} : props) {

  const theme = useTheme();
  return (
        <Card style={{marginBottom: "4%"}} onPress={toggleIsSelected} key={moment(reminderElement.date).format("dd-mm-yyyy")}>
          <View style={{padding: '5%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{
                        justifyContent: 'center', paddingLeft: '5%',
                        transform: [{ scaleX: Platform.OS === "ios" ? 1 : 1.75 }, { scaleY: Platform.OS === "ios" ? 1 : 1.75
                      }]}}>
              <Checkbox 
                status={reminderElement.isSelected ? 'checked' : 'unchecked'}
              />
            </View>
            <Card.Content>
              <View style={{flexDirection: 'row'}}>
                <Text variant='displayLarge' style={{color: theme.colors.onPrimaryContainer}}>{moment(reminderElement.date).format("DD.MM")}</Text>
                <Text variant='headlineSmall' style={{color: theme.colors.onPrimaryContainer}}>{moment(reminderElement.date).format("YYYY")}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text variant='bodyLarge' style={{color: theme.colors.primaryContainer}}>{moment(reminderElement.date).format("ddd, hh:mm")}</Text>
                {(reminderElement && (0 < repeatAmount)) && 
                  <Text variant='bodyLarge' style={{color: theme.colors.primaryContainer}}> | Repeat: {repeatAmount}</Text>
                }
              </View>
            </Card.Content>
          </View>
        </Card>)
}

export default EditReminderElement