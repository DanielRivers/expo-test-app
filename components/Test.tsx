
import { useKindeAuth } from '@kinde/expo';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Authentication from './Authentication';
export default function Test() {
  const kinde = useKindeAuth()
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // throw new Error('Test error');
    console.log('here');
    kinde.getAccessToken().then((token) => { setToken(token); console.log("access", token) }).catch(console.error);  
    kinde.getIdToken().then((token) => { console.log("id", token) }).catch(console.error);  
    kinde.getUserProfile().then(setUser).catch(console.error);
    kinde.getUserOrganizations().then(console.log).catch(console.error);
    kinde.getCurrentOrganization().then(console.log).catch(console.error);
    kinde.getFlag<number>('test-feature').then(console.log).catch(console.error);
  }, [kinde.isAuthenticated])

  const clearStorage = async () => {
    // await kinde.clearStorage();
    console.log('cleared');
  } 

  const refreshToken = async () => {
    await kinde.refreshToken();
  } 

  return (
    <View style={{ display: 'flex', gap: 10, flexDirection: 'column'}}>
        <Authentication></Authentication>

        <Text>Domain {process.env.EXPO_PUBLIC_KINDE_DOMAIN}</Text>
        <Text>EXPO_PUBLIC_KINDE_CLIENT_ID {process.env.EXPO_PUBLIC_KINDE_CLIENT_ID}</Text>

        <Pressable onPress={clearStorage}><Text>ClearStorage</Text></Pressable>
        <Pressable onPress={refreshToken}><Text>RefreshToken</Text></Pressable>

        <Text>{token}</Text>
        <Text>%%{ kinde.isAuthenticated ? "yes" : "no" }%%</Text>
        <Text>{JSON.stringify(user)}</Text>
    </View>
  );
}
