import React, { useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
const Provider = ({children}) => {

    useEffect(() => {

    } , [])
  return (
    <div>

        <NextThemesProvider
           attribute= "class"
           defaultTheme='dark'
           enableSystem
           disableTransitionOnChange
         >
        {children}
        </NextThemesProvider>
    </div>
  )
}

export default Provider
