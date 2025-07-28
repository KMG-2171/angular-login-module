
import React from 'react';
import type { LoginConfig } from '../types';
import Switch from './ui/Switch';

interface ConfigPanelProps {
  config: LoginConfig;
  setConfig: React.Dispatch<React.SetStateAction<LoginConfig>>;
  t: Record<string, string>;
}

const ConfigSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, setConfig, t }) => {
  const handleToggle = (path: string, value: boolean) => {
    setConfig(prevConfig => {
      const keys = path.split('.');
      const newConfig = JSON.parse(JSON.stringify(prevConfig));
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };
  
  const handleSelect = (path: string, value: string) => {
     setConfig(prevConfig => {
      const keys = path.split('.');
      const newConfig = JSON.parse(JSON.stringify(prevConfig));
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.configPanelTitle}</h2>
      
      <ConfigSection title={t.theme}>
        <div className="flex space-x-2 rounded-lg bg-gray-200 dark:bg-gray-700 p-1">
          <button onClick={() => handleSelect('ui.theme', 'light')} className={`w-full rounded-md py-2 text-sm font-medium ${config.ui.theme === 'light' ? 'bg-white dark:bg-gray-500 shadow' : 'text-gray-600 dark:text-gray-300'}`}>{t.light}</button>
          <button onClick={() => handleSelect('ui.theme', 'dark')} className={`w-full rounded-md py-2 text-sm font-medium ${config.ui.theme === 'dark' ? 'bg-black text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>{t.dark}</button>
        </div>
      </ConfigSection>

       <ConfigSection title={t.language}>
        <div className="flex space-x-2 rounded-lg bg-gray-200 dark:bg-gray-700 p-1">
          <button onClick={() => handleSelect('ui.language', 'en')} className={`w-full rounded-md py-2 text-sm font-medium ${config.ui.language === 'en' ? 'bg-white dark:bg-gray-500 shadow' : 'text-gray-600 dark:text-gray-300'}`}>{t.english}</button>
          <button onClick={() => handleSelect('ui.language', 'hi')} className={`w-full rounded-md py-2 text-sm font-medium ${config.ui.language === 'hi' ? 'bg-white dark:bg-gray-500 shadow' : 'text-gray-600 dark:text-gray-300'}`}>{t.hindi}</button>
        </div>
      </ConfigSection>

      <ConfigSection title={t.providers}>
        <Switch label={t.emailPassword} checked={config.providers.emailPassword} onChange={(c) => handleToggle('providers.emailPassword', c)} />
        <h4 className="font-medium text-gray-600 dark:text-gray-400 pt-2">{t.socialLogins}</h4>
        <div className="pl-4 space-y-3 border-l-2 border-gray-200 dark:border-gray-600">
            <Switch label="Google" checked={config.providers.social.google} onChange={(c) => handleToggle('providers.social.google', c)} />
            <Switch label="Facebook" checked={config.providers.social.facebook} onChange={(c) => handleToggle('providers.social.facebook', c)} />
            <Switch label="Twitter" checked={config.providers.social.twitter} onChange={(c) => handleToggle('providers.social.twitter', c)} />
            <Switch label="Microsoft" checked={config.providers.social.microsoft} onChange={(c) => handleToggle('providers.social.microsoft', c)} />
            <Switch label="GitHub" checked={config.providers.social.github} onChange={(c) => handleToggle('providers.social.github', c)} />
        </div>
        <h4 className="font-medium text-gray-600 dark:text-gray-400 pt-2">{t.passwordless}</h4>
        <div className="pl-4 space-y-3 border-l-2 border-gray-200 dark:border-gray-600">
            <Switch label="Magic Link" checked={config.providers.passwordless.magicLink} onChange={(c) => handleToggle('providers.passwordless.magicLink', c)} />
            <Switch label="Authenticator App" checked={config.providers.passwordless.authenticator} onChange={(c) => handleToggle('providers.passwordless.authenticator', c)} />
        </div>
        <Switch label="Biometrics (WebAuthn)" checked={config.providers.biometrics} onChange={(c) => handleToggle('providers.biometrics', c)} />
        <h4 className="font-medium text-gray-600 dark:text-gray-400 pt-2">{t.sso}</h4>
        <div className="pl-4 space-y-3 border-l-2 border-gray-200 dark:border-gray-600">
            <Switch label="Okta" checked={config.providers.sso.okta} onChange={(c) => handleToggle('providers.sso.okta', c)} />
            <Switch label="Azure AD" checked={config.providers.sso.azureAd} onChange={(c) => handleToggle('providers.sso.azureAd', c)} />
        </div>
      </ConfigSection>

      <ConfigSection title={t.features}>
        <Switch label="Remember Me" checked={config.features.rememberMe} onChange={(c) => handleToggle('features.rememberMe', c)} />
        <Switch label="Forgot Password" checked={config.features.forgotPassword} onChange={(c) => handleToggle('features.forgotPassword', c)} />
      </ConfigSection>
    </div>
  );
};

export default ConfigPanel;
