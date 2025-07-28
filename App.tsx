
import React, { useState, useEffect } from 'react';
import { LoginConfig } from './types';
import ConfigPanel from './components/ConfigPanel';
import LoginModule from './components/LoginModule';
import { TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [config, setConfig] = useState<LoginConfig>({
    providers: {
      emailPassword: true,
      social: {
        google: true,
        facebook: false,
        twitter: true,
        microsoft: false,
        github: true,
      },
      passwordless: {
        magicLink: true,
        authenticator: false,
      },
      biometrics: true,
      sso: {
        okta: true,
        azureAd: false,
      },
    },
    features: {
      rememberMe: true,
      forgotPassword: true,
    },
    ui: {
      theme: 'light',
      language: 'en',
      brandLogoUrl: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    },
  });

  const t = TRANSLATIONS[config.ui.language];

  useEffect(() => {
    if (config.ui.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [config.ui.theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <main className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 flex items-center justify-center p-4 lg:p-12 min-h-screen">
          <LoginModule config={config} t={t} />
        </div>
        <aside className="w-full lg:w-1/3 bg-white dark:bg-gray-800 p-6 lg:p-8 shadow-2xl lg:shadow-none overflow-y-auto">
          <ConfigPanel config={config} setConfig={setConfig} t={t} />
        </aside>
      </main>
    </div>
  );
};

export default App;
