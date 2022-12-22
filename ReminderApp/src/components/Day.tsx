import moment from 'moment';
import { Moment } from 'moment';
import React from 'react'
import { View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Text, useTheme } from 'react-native-paper';

type props = {
  index : number;
  switchSelector: (moment : Moment) => void;
  currentlySelected : Moment;
  firstDayOfLastWeek: Moment;
}

function Day({index, switchSelector, currentlySelected, firstDayOfLastWeek}: props) {

  const theme = useTheme();

  const workDays : string[] = ["M","T","W","T","F"]
  const currentDateOfDay = moment(firstDayOfLastWeek).add(index, "day")
  
  const isSelectable = Number(currentDateOfDay.format("D")) < Number(firstDayOfLastWeek.format("D"));


  return (
    <View>
      {!isSelectable ? 
        <TouchableOpacity style={{flexDirection:'column', justifyContent: 'center' }} onPress={() => {switchSelector(currentDateOfDay)}}>
          <Text style={{textAlign: 'center', color: theme.colors.onPrimaryContainer, marginBottom: "100%"}}>{workDays[index]}</Text>
          <Text  style={{textAlign: 'center', color: theme.colors.secondary, padding: "3%", borderRadius: 100, backgroundColor: (currentDateOfDay.format("d") === currentlySelected.format("d")) ? 'rgba(255,255,255,0.3)' : "transparent", shadowRadius: 100 }}>{currentDateOfDay.format('DD')}</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={{flexDirection:'column', justifyContent: 'center' }}>
          <Text style={{textAlign: 'center', color: theme.colors.onPrimaryContainer, opacity: 0.4, marginBottom: "100%"}}>{workDays[index]}</Text>
          <Text style={{textAlign: 'center', color: theme.colors.secondary, padding: "3%", opacity: 0.4}}>{currentDateOfDay.format('DD')}</Text>
        </TouchableOpacity>
      }
    </View>
    
  )
}

export default Day