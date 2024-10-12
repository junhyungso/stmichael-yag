import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { GlobalStyles } from '../../constants/styles';
import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    birthday: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let { name, email, password, confirmPassword, birthday } = credentials;

    email = email.trim();
    password = password.trim();

    const nameIsValid = name.length >= 2;
    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length >= 6;
    const passwordsAreEqual = password === confirmPassword;
    const birthdayIsValid = birthday.length === 10;

    if (
      !nameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && !passwordsAreEqual) ||
      (!isLogin && !birthdayIsValid)
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        name: !nameIsValid,
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        birthday: !birthdayIsValid,
      });
      return;
    }
    onAuthenticate({ name, email, password, birthday });
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
