import React, { useEffect } from 'react'
import moment from 'moment';
import { Platform, StyleSheet, Switch, View } from "react-native";
import { MD3DarkTheme, Surface, useTheme, Text, Card, Title, Paragraph, Button} from 'react-native-paper';

function ReminderElement() {

  const reminderElement1 : ReminderElement = {date: new Date('2016-01-02T00:00:00'), isActive: true, repeatUntil: new Date('2016-02-02T00:00:00')}
  const reminderElement2 : ReminderElement = {date: new Date('2016-01-05T00:00:00'), isActive: false, repeatUntil: new Date('2016-01-02T00:00:00')}

  const [reminderList, setReminderList] = React.useState<ReminderElement[]>([reminderElement1,reminderElement2]);

  const theme = useTheme();
  return (
    <View style={{flex: 1, flexDirection: 'column', padding: "3%"}}>
      {reminderList && reminderList.map((reminderElement : ReminderElement, index : number) => {

        let color = {...theme.colors};

        if(!reminderList[index].isActive && reminderElement && reminderList[index]){
          color.onPrimaryContainer = theme.colors.surfaceVariant;
          color.primaryContainer = theme.colors.surfaceVariant;
          color.onPrimary = theme.colors.outline;
        }

        const repeatAmount = reminderElement.repeatUntil.getMonth() - reminderElement.date.getMonth();

        return (
        <Card style={{marginTop: "3%"}}>
          <View style={{padding: '5%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Card.Content>
              <View style={{flexDirection: 'row'}}>
                <Text variant='displayLarge' style={{color: color.onPrimaryContainer}}>{moment(reminderElement.date).format("DD.MM")}</Text>
                <Text variant='headlineSmall' style={{color: color.onPrimaryContainer}}>{moment(reminderElement.date).format("YYYY")}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text variant='bodyLarge' style={{color: color.primaryContainer}}>{moment(reminderElement.date).format("ddd, hh:mm")}</Text>
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
                onValueChange={() => {
                  reminderList[index].isActive = !reminderElement.isActive;
                  setReminderList([...reminderList]);
                }}
              />
            </View>
          </View>
        </Card>)
      })}
    </View>
  )
}

export default ReminderElement