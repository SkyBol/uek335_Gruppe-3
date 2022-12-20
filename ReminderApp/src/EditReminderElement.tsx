import React, { useEffect } from 'react'
import moment from 'moment';
import { Platform, StyleSheet, Switch, View } from "react-native";
import { MD3DarkTheme, Surface, useTheme, Text, Card, Title, Paragraph, Button, Checkbox} from 'react-native-paper';

function EditReminderElement() {

  const editReminderElement1 : ReminderElement = {date: new Date('2016-01-02T00:00:00'), isActive: true, repeatUntil: new Date('2016-02-02T00:00:00'), isSelected: false}
  const editReminderElement2 : ReminderElement = {date: new Date('2016-01-05T00:00:00'), isActive: false, repeatUntil: new Date('2016-01-02T00:00:00'), isSelected: false}

  const [editReminderList, setEditReminderList] = React.useState<ReminderElement[]>([editReminderElement1,editReminderElement2]);

  const theme = useTheme();
  return (
    <View style={{flex: 1, flexDirection: 'column', padding: "3%"}}>
      {editReminderList && editReminderList.map((editReminderElement : ReminderElement, index : number) => {

        const repeatAmount = editReminderElement.repeatUntil.getMonth() - editReminderElement.date.getMonth();

        return (
        <Card style={{marginTop: "3%"}}>
          <View style={{padding: '5%', flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{justifyContent: 'center', paddingLeft: Platform.OS === "ios" ? 0 : '5%'}}>
              <Checkbox 
                status={editReminderElement.isSelected ? 'checked' : 'unchecked'}
                onPress={() => {
                  editReminderList[index].isSelected = !editReminderElement.isSelected;
                  setEditReminderList([...editReminderList]);
                }}
              />
            </View>
            <Card.Content>
              <View style={{flexDirection: 'row'}}>
                <Text variant='displayLarge' style={{color: theme.colors.onPrimaryContainer}}>{moment(editReminderElement.date).format("DD.MM")}</Text>
                <Text variant='headlineSmall' style={{color: theme.colors.onPrimaryContainer}}>{moment(editReminderElement.date).format("YYYY")}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text variant='bodyLarge' style={{color: theme.colors.primaryContainer}}>{moment(editReminderElement.date).format("ddd, hh:mm")}</Text>
                {(editReminderElement && (0 < repeatAmount)) && 
                  <Text variant='bodyLarge' style={{color: theme.colors.primaryContainer}}> | Repeat: {repeatAmount}</Text>
                }
              </View>
            </Card.Content>
          </View>
        </Card>)
      })}
    </View>
  )
}

export default EditReminderElement