import { useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CreateProfile from '../../screens/CreateProfile';
import Login from '../../screens/Login';
import Walkthrough from '../../screens/Walkthrough';
import Welcome from '../../screens/Welcome';
import DrawerNavigator from '../DrawerNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {

  const { user, isAuth } = useContext(AuthContext)

  const initialRoute = () => {
    if (!isAuth) return "Welcome";

    if (user.isProfile === false) return "CreateProfile"

    return "HomeNavigation"
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute()}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      {!isAuth &&
        <>
          <Stack.Screen name="Walkthrough" component={Walkthrough} />
          <Stack.Screen name="Login" component={Login} />
        </>
      }
      {
        isAuth &&
        <>
          <Stack.Screen name="CreateProfile" component={CreateProfile} />
          <Stack.Screen name="HomeNavigation" component={DrawerNavigator} />
        </>
      }
    </Stack.Navigator>
  );
}

export default StackNavigator;