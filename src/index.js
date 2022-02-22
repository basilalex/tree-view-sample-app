import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Views/App';

const initApp = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root'),
    );
};

initApp();
