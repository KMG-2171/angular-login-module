
export interface LoginConfig {
  providers: {
    emailPassword: boolean;
    social: {
      google: boolean;
      facebook: boolean;
      twitter: boolean;
      microsoft: boolean;
      github: boolean;
    };
    passwordless: {
      magicLink: boolean;
      authenticator: boolean;
    };
    biometrics: boolean;
    sso: {
      okta: boolean;
      azureAd: boolean;
    };
  };
  features: {
    rememberMe: boolean;
    forgotPassword: boolean;
  };
  ui: {
    theme: 'light' | 'dark';
    language: 'en' | 'hi';
    brandLogoUrl: string;
  };
}
