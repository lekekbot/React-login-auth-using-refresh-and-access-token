//index.js

import React, {useEffect, useCallback, useContext, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import reportWebVitals from './reportWebVitals';
import { TokenProvider, TokenContext } from './context/TokenContext';
import axios from 'axios';

ReactDOM.render(
  <React.StrictMode>
    <TokenProvider>
      <ContextParent />
    </TokenProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

function ContextParent() {
  const { setToken } = useContext(TokenContext)
  const [isloading, setisloading] = useState(true)

  const verifyUser = useCallback(() => {
    setisloading(true)
    axios.get(`http://localhost:8003/api/refresh-token`, {withCredentials: true})
    .then(response => {
        if(response.status == 200) {
            setToken(response.data.token) 
        } else {
            setToken(false)
        }
        // call refreshToken every 3 minutes to renew the authentication token.
        setTimeout(verifyUser, 3 * 60 * 1000)
    })
    .catch(error => console.log(error))
    .finally(()=> {
      setisloading(false)
    })
    }, [setToken]
  )

  useEffect(()=> {
    verifyUser()
  },[])

  return(
    <>
      {isloading ? <Load/> : <Routes/>}
    </>
  )
}

function Load() {
  return (
    <div class="loading loading--full-height"></div>
  )
}




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
