import React, { useState } from 'react'
const ThemeContext = React.createContext({})

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState('dark')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
