import { useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';

const LoginScreen = () => {
  const [isAuthenticating, setisAuthenticating] = useState(false);
  // const authCtx = useContext(AuthContext);

  const loginHandler = async ({ email, password }) => {
    setisAuthenticating(true);
    // try {
    //   const token = await login(email, password);
    //   authCtx.authenticate(token);
    // } catch (error) {
    //   Alert.alert('Authentication failed. Please try again.');
    //   setisAuthenticating(false);
    // }
  };

  // if (isAuthenticating) {
  //   return <LoadingOverlay message="Logging you in..." />;
  // }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
