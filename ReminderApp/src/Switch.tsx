import * as React from 'react';
import { View } from 'react-native';
import { Switch } from 'react-native-paper';

const MyComponent = () => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return <View><Switch value={isSwitchOn} onValueChange={onToggleSwitch} /></View>;
};

export default MyComponent;