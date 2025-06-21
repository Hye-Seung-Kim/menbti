import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind 스타일 import
import WellnessApp from './WellnessApp'; // 이게 네가 만든 전체 앱

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WellnessApp />
  </React.StrictMode>,
);