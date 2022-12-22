import moment, { Moment } from "moment";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import Day from "./Day";


type props = {
    editingElement : ReminderElement;
    setEditingElement : (editingElement : ReminderElement) => void;
}

const DatePicker = ({editingElement, setEditingElement} : props) => {
  const theme = useTheme();

  const lastMondayInMonth = moment().endOf('month').startOf('isoWeek');

  const switchSelectedDate = (date : Moment) => {
    setEditingElement({...editingElement, date: new Date(editingElement.date.setDate(date.toDate().getDate()))});
  }

  return (
      <View style={{flexDirection: "row", justifyContent: "space-around", backgroundColor: theme.colors.onPrimary, borderRadius: 30, paddingTop: "5%", paddingRight: "2%", paddingBottom: "5%", paddingLeft: "2%"}}>
          {
              [0,1,2,3,4].map((_e : number, index : number) => {
                  return (
                      <View>
                        <Day index={index} switchSelector={switchSelectedDate} firstDayOfLastWeek={lastMondayInMonth} currentlySelected={moment(editingElement.date)} />
                      </View>
                  )
              })
          }
      </View>
  )
}

export default DatePicker;