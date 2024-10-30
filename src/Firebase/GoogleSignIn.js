import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const onGoogleButtonPress=async()=> {
 try{
  GoogleSignin.configure({
    offlineAccess: false,
    webClientId: '746421436534-dr97lr43mbvfsl3bpq4kpolorfmv75v3.apps.googleusercontent.com', 
    scopes: ['profile', 'email']
  });
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const userInfo = await GoogleSignin.signIn()
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
 auth().signInWithCredential(googleCredential);
 return userInfo
 }
 catch(err){
    console.log(err)
 }
 
}
