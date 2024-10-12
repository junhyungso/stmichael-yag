import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser, storeBirthday } from '../util/auth';

const SignupScreen = () => {
  const [isAuthenticating, setisAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const signupHandler = async ({ name, email, password, birthday }) => {
    setisAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      console.log(error);
      Alert.alert('Signup failed. Please try again.');
      setisAuthenticating(false);
    }

    try {
      const birthdayInfo = {
        name: name,
        birthday: birthday,
      };
      const id = await storeBirthday(birthdayInfo);
    } catch (error) {
      console.log(error);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
};

export default SignupScreen;
