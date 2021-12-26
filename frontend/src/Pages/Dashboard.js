import axios from 'axios'
import React, {useContext, useEffect, useCallback, useState,useRef} from 'react'
import { Button } from 'react-bootstrap'
import { TokenContext } from '../context/TokenContext'
import JoditEditor from "jodit-react";

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

  const gethandler = () => {
    axios.get('http://localhost:8000/api/gay',{withCredentials: true}
    )
  }

  const posthandler = () => {
    axios({
      method: 'post',
      url: 'http://localhost:8003/api/post',
      headers: {
        'Access-Control-Allow-Credentials': true
      }
    })
    // axios.post('http://localhost:8003/api/post', {},{withCredentials: true})

  }
  
  const puthandler = () => {
    // axios({
    //   method: 'put',
    //   url: 'http://localhost:8003/api/put',
    //   headers: {
    //     'Access-Control-Allow-Credentials': true
    //   }
    // })
    axios.put('http://localhost:8003/api/put', {},{withCredentials: true})

  }
  
  const deletehandler = () => {
    // axios({
    //   method: 'delete',
    //   url: 'http://localhost:8003/api/delete',
    //   headers: {
    //     'Access-Control-Allow-Credentials': true
    //   }
    // })
    axios.delete('http://localhost:8003/api/delete',{withCredentials: true})

  }
  const editor = useRef(null)
	const [content, setContent] = useState('')
	
	const config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
	}
	  
    return (
        <div>
            Dashboard
            <Button
            onClick={logoutHandler}
            >
              Logout
              </Button>


            {/* requests */}
            <Button onClick={gethandler}>GET</Button>
            <Button onClick={posthandler}>POST</Button>
            <Button onClick={puthandler}>PUT</Button>
            <Button onClick={deletehandler}>DELETE</Button>

            <JoditEditor
            	ref={editor}
              value={content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={newContent => {}}
            />
        </div>
    )
}
