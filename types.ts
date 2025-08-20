export interface LoginConfig {
  ui: {
    brandLogoUrl: string;
    theme: 'light' | 'dark';
    language: 'en' | 'hi';
  };
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
    sso: {
      okta: boolean;
      azureAd: boolean;
    };
    biometrics: boolean;
  };
  features: {
    rememberMe: boolean;
    forgotPassword: boolean;
  };
}

// --- API Service Types ---

export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface LoginPayload {
  email: string;
  password?: string; // Password might be optional for some flows
}

export interface ExternalLoginUrlResponse {
  data:string
  success: boolean;
  message: string;
}