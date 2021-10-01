import axios from 'axios'
import React, {useContext, useEffect, useCallback} from 'react'
import { Button } from 'react-bootstrap'
import { TokenContext } from '../context/TokenContext'


export default function Dashboard() {
    let {token, setToken} = useContext(TokenContext)

  const syncLogout = useCallback(event => {
    if (event.key === "logout") {
      window.location.reload()
    }
  }, [])

  useEffect(() => {
    window.addEventListener("storage", syncLogout)
    return () => {
      window.removeEventListener("storage", syncLogout)
    }
  }, [syncLogout])

  const logoutHandler = () => {
    axios.get("http://localhost:8003/api/logout", {
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      setToken(false)
      window.localStorage.setItem("logout", Date.now())
    })
  }

    return (
        <div>
            Dashboard
            <Button
            onClick={logoutHandler}
            >
              Logout
              </Button>
        </div>
    )
}
