import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angular5-social-login';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('475074999578615')
    },
    {
     id: GoogleLoginProvider.PROVIDER_ID,
     provider: new  GoogleLoginProvider('496273594722-9k50hk5h04q7u6v35i2728fd21svmg73.apps.googleusercontent.com')
    }
  ]);
   return config;
}
