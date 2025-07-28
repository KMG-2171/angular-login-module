import React, { createContext, useContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { LoginConfig } from '../types';
import { TRANSLATIONS } from '../constants';

// The mock config is better suited here as the initial state for the context.
const initialConfig: LoginConfig = {
  ui: {
    brandLogoUrl: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    theme: 'light',
    language: 'en',
  },
  providers: {
    emailPassword: true,
    social: { google: true, facebook: true, twitter: true, microsoft: true, github: true },
    passwordless: { magicLink: true, authenticator: true },
    sso: { okta: true, azureAd: true },
    biometrics: true,
  },
  features: { rememberMe: true, forgotPassword: true },
};

type TranslationSet = typeof TRANSLATIONS['en'];

interface ConfigContextType {
  config: LoginConfig;
  t: TranslationSet;
  setConfig: Dispatch<SetStateAction<LoginConfig>>;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Lazily initialize state from localStorage or fall back to the initial config.
  const [config, setConfig] = useState<LoginConfig>(() => {
    try {
      const storedConfig = localStorage.getItem('app-config');
      return storedConfig ? JSON.parse(storedConfig) : initialConfig;
    } catch (error) {
      console.error("Failed to parse config from localStorage", error);
      return initialConfig;
    }
  });

  const t = TRANSLATIONS[config.ui.language];

  // This effect now handles both applying the theme and persisting any config changes.
  useEffect(() => {
    try {
      document.documentElement.classList.toggle('dark', config.ui.theme === 'dark');
      localStorage.setItem('app-config', JSON.stringify(config));
    } catch (error) {
      console.error("Failed to save config to localStorage", error);
    }
  }, [config]);
  
  return (
    <ConfigContext.Provider value={{ config, t, setConfig }}>{children}</ConfigContext.Provider>
  );
};