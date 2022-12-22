import moment from 'moment';
import React from 'react';
import { Platform, Switch, View } from "react-native";
import { Card, Text, useTheme } from 'react-native-paper';

type props = {
  setEditingElementIndex : (reminderElementIndex : number) => void;
  reminderElement : ReminderElement;
  repeatAmount : number;
  toggleIsActive : () => void;
  index : number;
}

function ReminderElement({setEditingElementIndex, reminderElement, repeatAmount, toggleIsActive, index} : props) {
  const theme = useTheme();

  let color = {...theme.colors};

  if(!reminderElement.isActive){
    color.onPrimaryContainer = theme.colors.surfaceVariant;
    color.primaryContainer = theme.colors.surfaceVariant;
    color.onPrimary = theme.colors.outline;
  }

  return (
        <Card style={{marginBottom: "4%"}} onPress={() => {setEditingElementIndex(index);}}>
          <View style={{padding: '5%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Card.Content>
              <View style={{flexDirection: 'row'}}>
                <Text variant='displayLarge' style={{color: color.onPrimaryContainer}}>{moment(reminderElement.date).format("DD.MM")}</Text>
                <Text variant='headlineSmall' style={{color: color.onPrimaryContainer}}>{moment(reminderElement.date).format("YYYY")}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text variant='bodyLarge' style={{color: color.primaryContainer}}>{moment(reminderElement.date).format("ddd, HH:mm")}</Text>
                {(reminderElement && (0 < repeatAmount)) && 
                  <Text variant='bodyLarge' style={{color: color.primaryContainer}}> | Repeat: {repeatAmount}</Text>
                }
              </View>
            </Card.Content>
            <View style={{justifyContent: 'center', paddingRight: Platform.OS === "ios" ? 0 : '10%'}}>
              <Switch 
                style={{ 
                  transform: [{ scaleX: Platform.OS === "ios" ? 1 : 1.75 }, { scaleY: Platform.OS === "ios" ? 1 : 1.75 }],
                }}
                thumbColor={color.onPrimary} 
                trackColor={{true: theme.colors.primary, false: theme.colors.surfaceVariant}} 
                value={reminderElement.isActive} 
                onValueChange={toggleIsActive}
              />
            </View>
          </View>
        </Card>
  )
}

export default ReminderElement