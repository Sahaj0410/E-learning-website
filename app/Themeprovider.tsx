import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"

function Themeprovider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>)
 {
  return ( 
 <NextThemesProvider {...props}>
    {children}
 </NextThemesProvider>
 )
}  


export default Themeprovider