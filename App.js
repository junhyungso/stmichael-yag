import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import IconButton from './components/ui/IconButton';
import { GlobalStyles } from './constants/styles';
import EventsScreen from './screens/EventsScreen';
import ForumScreen from './screens/ForumScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import PrayersScreen from './screens/PrayersScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignupScreen from './screens/SignupScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import ModalContextProvider, { ModalContext } from './store/modal-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedStack = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  const authCtx = useContext(AuthContext);
  return authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />;
};

const EventsStack = () => {};

const YagOverview = () => {
  const modalCtx = useContext(ModalContext);

  return (
    <BottomTabs.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'black',
      }}
    >
      <BottomTabs.Screen
        name="PrayersScreen"
        component={PrayersScreen}
        options={{
          title: 'Prayer Intentions',
          tabBarLabel: 'Prayer Intentions',
          tabBarActiveBackgroundColor: GlobalStyles.colors.accent500,
          tabBarIcon: ({ color, size }) => <Ionicons name="star" />,
        }}
      />
      <BottomTabs.Screen
        name="EventsScreen"
        component={EventsScreen}
        options={{
          title: 'Events',
          tabBarLabel: 'Events',
          tabBarActiveBackgroundColor: GlobalStyles.colors.accent500,
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" />,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              color={tintColor}
              size={24}
              onPress={modalCtx.openModal}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "St. Michael's Church Korean YAG",
          tabBarLabel: 'Home',
          tabBarActiveBackgroundColor: GlobalStyles.colors.accent500,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" />,
        }}
      />
      <BottomTabs.Screen
        name="ForumScreen"
        component={ForumScreen}
        options={{
          title: 'Forum',
          tabBarLabel: 'Forum',
          tabBarActiveBackgroundColor: GlobalStyles.colors.accent500,
          tabBarIcon: ({ color, size }) => <Ionicons name="list" />,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              color={tintColor}
              size={24}
              onPress={modalCtx.openModal}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ProfileScreen"
        component={ProfileStack}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarActiveBackgroundColor: GlobalStyles.colors.accent500,
          tabBarIcon: ({ color, size }) => <Ionicons name="person" />,
        }}
      />
    </BottomTabs.Navigator>
  );
};

const Root = () => {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    };

    fetchToken();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={YagOverview}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <ModalContextProvider>
          <Root />
        </ModalContextProvider>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
