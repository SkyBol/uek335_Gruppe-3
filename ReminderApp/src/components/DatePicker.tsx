import moment from "moment";
import { Text, View } from "react-native";


type props = {
    editingElement : ReminderElement;
    setEditingElement : (editingElement : ReminderElement) => void;
}

const DatePicker = ({editingElement, setEditingElement} : props) => {
    const lastMondayInMonth = moment().endOf('month').startOf('isoWeek');

    return (
        <View>
            {
                new Array(5).fill(() => {}).map((index : number) => {
                    return (
                        <View>
                            <Text>
                                {
                                    lastMondayInMonth.add(index).format("dd")
                                }
                            </Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default DatePicker;