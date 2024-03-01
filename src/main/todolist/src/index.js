import React from 'react';
import ReactDOM from 'react-dom/client'; // 변경된 임포트 경로
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// React 18에서의 새로운 루트 생성 방식
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);
