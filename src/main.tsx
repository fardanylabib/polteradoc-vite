import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

declare global{
  interface Window{
    pushToast:Function;
    token:string;
    imagekit:any;
    companyId:number;
  } 
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
