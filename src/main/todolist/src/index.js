import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import UserLogin from './components/UserLogin';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // createRoot로 컨테이너를 root로 생성

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/UserLogin" element={<UserLogin />} />
        </Routes>
    </BrowserRouter>
);
