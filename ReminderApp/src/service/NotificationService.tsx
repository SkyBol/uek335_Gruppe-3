import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { t } from 'i18next';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

/**
 * This Service is used to manage Notifications.
 * The Device cannot be a emulator/simulator
 */
const NotificationService = {
    /**
     * Needed for Android
     * Sets the Channel for Notifications to post
     */
    setNotificationChannel: async () => {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    },
    /**
     * Requests for permission and creates a token for later use
     * @returns the created Token
     */
    getPermission: async () => {
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            return (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }
    },
    /**
     * Prepares the extension and all needed Components to use the Service
     * @returns the created Token
     */
    register: async () => {
        NotificationService.setNotificationChannel();
        return NotificationService.getPermission();
    },
    /**
     * Posts a notification to be shown later 
     * @param reminder The Reminder Element which containes when the notification posts
     */
    postNotification: async (reminder : ReminderElement) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: t("notification.title"),
                body: t("notification.body")
            },
            trigger: {
                seconds: 2
            },
        });
    },
}

export default NotificationService;