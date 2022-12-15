import React from 'react'
import { StyleSheet, View } from "react-native";
import { MD3DarkTheme, Surface, useTheme, Text, Card, Title, Paragraph, Button} from 'react-native-paper';

function ReminderElement() {

  const reminderElement : ReminderElement = {date: new Date('March 13, 08 04:20'), isActive: true, repeatUntil: new Date('December 29, 08 04:20')}

  const theme = useTheme();
  return (
    <Card>
    <Card.Content>
      <Text variant='displayLarge'></Text>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
  </Card>
  )
}

export default ReminderElement