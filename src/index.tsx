import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './page/index/IndexPage';
//core
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
//theme
import "primereact/resources/themes/md-dark-indigo/theme.css";
// import "primereact/resources/themes/md-light-indigo/theme.css";
import SettingPage from './page/setting/SettingPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<IndexPage />} />
          <Route path='/Setting' element={<SettingPage />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
