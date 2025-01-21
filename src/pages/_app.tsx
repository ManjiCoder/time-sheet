import DynamicHead from '@/components/DynamicHead';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { persistor, store } from '@/redux/store';
import '@/styles/globals.css';
import { appName } from '@/types/constants';
import type { AppProps } from 'next/app';
import { Geist, Geist_Mono } from 'next/font/google';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={<h1>Loading...</h1>}
        ></PersistGate>
        <div className={`${geistSans.variable} ${geistMono.variable}`}>
          <Navbar />
          <DynamicHead title={appName} desc='Time Sheet to know your time.' />
          <Component {...pageProps} />
          <Footer />
        </div>
      </Provider>
    </ThemeProvider>
  );
}
