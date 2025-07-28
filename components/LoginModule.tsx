
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './ui/Icon';
import * as auth from '../services/auth';
import { useConfig } from '../contexts/ConfigContext'

const SocialButton: React.FC<{ provider: string, label: string, onClick: (provider: string) => void }> = ({ provider, label, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(provider)}
    className="flex-1 flex items-center justify-center p-3 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    aria-label={label}
  >
    <Icon name={provider.toLowerCase()} className="h-6 w-6" />
  </button>
);

const ActionButton: React.FC<{ icon: string; text: string; onClick?: () => void }> = ({ icon, text, onClick }) => (
  <button
    type="button"
    onClick={onClick || (() => alert(`${text}...`))}
    className="w-full flex items-center justify-center p-3 text-sm font-semibold border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
  >
    <Icon name={icon} className="h-5 w-5 mr-3" />
    {text}
  </button>
);

const SSOButton: React.FC<{ provider: 'okta' | 'azureAd', t: Record<string, string> }> = ({ provider, t }) => {
    const brandColors = {
        okta: 'border-okta-blue text-okta-blue hover:bg-okta-blue/10',
        azureAd: 'border-azure-blue text-azure-blue hover:bg-azure-blue/10',
    };
    return (
        <button
            type="button"
            onClick={() => alert(`Signing in with ${provider}...`)}
            className={`w-full flex items-center justify-center p-3 text-sm font-semibold border rounded-md transition-colors duration-200 ${brandColors[provider]}`}
        >
            <Icon name={provider} className="h-5 w-5 mr-3" />
            {t[provider]}
        </button>
    )
};


const LoginModule: React.FC = () => {
  const { config, t } = useConfig();
  const { providers, features, ui } = config;  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors on a new attempt
    try {
      const response = await auth.login({ email, password });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('authToken', token);
        navigate('/dashboard');
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (err) {
      console.error('Login failed', err);
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      const response = await auth.getExternalLoginUrl(provider.toLowerCase());
      console.log('Social login URL', response);
      window.location.href = response.data.data.toString(); // Redirect to the social login URL
    } catch (error) {
      console.error('Social login failed', error);
      alert('Social login failed!');
    }
  };
  
  const anySocial = Object.values(providers.social).some(v => v);
  const anyPasswordless = Object.values(providers.passwordless).some(v => v);
  const anySso = Object.values(providers.sso).some(v => v);
  const hasAnyProvider = providers.emailPassword || anySocial || anyPasswordless || providers.biometrics || anySso;

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 transition-colors duration-300">
      <div className="text-center mb-8">
        <img src={ui.brandLogoUrl} alt="Brand Logo" className="h-12 w-auto mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{t.subtitle}</p>
      </div>

      {!hasAnyProvider ? (
        <div className="text-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <Icon name="warning" className="h-12 w-12 mx-auto text-yellow-500" />
            <p className="mt-4 font-semibold text-lg">{t.noOptions}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t.configurePrompt}</p>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          {providers.emailPassword && (
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.emailLabel}</label>
                <div className="mt-1">
                  <input type="email" id="email" autoComplete="email" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-white sm:text-sm" placeholder={t.emailPlaceholder} value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t.passwordLabel}</label>
                <div className="mt-1">
                  <input type="password" id="password" autoComplete="current-password" required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-white sm:text-sm" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
              </div>
              {(features.rememberMe || features.forgotPassword) && (
                <div className="flex items-center justify-between text-sm">
                  {features.rememberMe && <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700" />
                    <label htmlFor="remember-me" className="ml-2 block text-gray-900 dark:text-gray-200">{t.rememberMe}</label>
                  </div>}
                  {features.forgotPassword && <a href="#" className="font-medium text-brand-primary hover:text-brand-primary/80">{t.forgotPassword}</a>}
                </div>
              )}
              
              {error && (
                <p className="text-sm text-center text-red-600 dark:text-red-400">{error}</p>
              )}

              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">{t.loginButton}</button>
            </div>
          )}

          {(providers.emailPassword && (anySocial || anyPasswordless || providers.biometrics || anySso)) && (
            <div className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">{t.orSeparator}</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {anySocial && (
                <div className="flex gap-3">
                    {providers.social.google && <SocialButton provider="Google" label={`${t.loginWith} Google`} onClick={handleSocialLogin} />}
                    {providers.social.facebook && <SocialButton provider="Facebook" label={`${t.loginWith} Facebook`} onClick={handleSocialLogin} />}
                    {providers.social.twitter && <SocialButton provider="Twitter" label={`${t.loginWith} Twitter`} onClick={handleSocialLogin} />}
                    {providers.social.microsoft && <SocialButton provider="Microsoft" label={`${t.loginWith} Microsoft`} onClick={handleSocialLogin} />}
                    {providers.social.github && <SocialButton provider="Github" label={`${t.loginWith} Github`} onClick={handleSocialLogin} />}
                </div>
            )}
            
            {anyPasswordless && (
                <div className="space-y-3">
                    {providers.passwordless.magicLink && <ActionButton icon="magiclink" text={t.magicLink} />}
                    {providers.passwordless.authenticator && <ActionButton icon="authenticator" text={t.authenticator} />}
                </div>
            )}

            {providers.biometrics && (
                <ActionButton icon="biometrics" text={t.biometrics} />
            )}

            {anySso && (
                <>
                    {(providers.emailPassword || anySocial || anyPasswordless || providers.biometrics) && (
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">{t.ssoSeparator}</span>
                            </div>
                        </div>
                    )}
                    <div className="space-y-3">
                        {providers.sso.okta && <SSOButton provider="okta" t={t} />}
                        {providers.sso.azureAd && <SSOButton provider="azureAd" t={t} />}
                    </div>
                </>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginModule;
