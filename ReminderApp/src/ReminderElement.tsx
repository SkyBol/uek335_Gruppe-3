import React from 'react'
import moment from 'moment';
import { StyleSheet, Switch, View } from "react-native";
import { MD3DarkTheme, Surface, useTheme, Text, Card, Title, Paragraph, Button} from 'react-native-paper';

function ReminderElement() {

  const reminderElement : ReminderElement = {date: new Date('2016-01-02T00:00:00'), isActive: true, repeatUntil: new Date('2016-02-02T00:00:00')}
  const reminderElement2 : ReminderElement = {date: new Date('2016-01-05T00:00:00'), isActive: true, repeatUntil: new Date('2016-02-02T00:00:00')}

  const reminderList : ReminderElement[] = [reminderElement, reminderElement2]

  const repeatAmount = reminderElement.repeatUntil.getMonth() - reminderElement.date.getMonth();


  const theme = useTheme();
  return (
    <View style={{flex: 1, flexDirection: 'column', padding: "3%"}}>
      {reminderList && reminderList.map((reminderElement : ReminderElement) => {
        return (
        <Card style={{marginTop: "3%", flexDirection: 'row'}}>
          <Card.Content style={{borderColor: "red", borderWidth: 1}}>
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
          <Switch></Switch>
        </Card>)
      })}
    
    </View>
  )
}

export default ReminderElement