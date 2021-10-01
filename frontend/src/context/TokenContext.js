//TokenContext.js

import React, { useState } from 'react'

const TokenContext = React.createContext()

const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null)

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    )
}

export { TokenContext, TokenProvider } 