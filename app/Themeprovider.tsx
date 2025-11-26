'use client'

import React, { use, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import { UserDetailContext } from '@/context/UserDetailContext';
import { se } from 'date-fns/locale';

function Themeprovider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>)
 {

  const {user} = useUser();
  const [userDetail,setUserDetail] = useState();

  useEffect(()=>{
       user && CreateNewUser();
  },[ user])

  const CreateNewUser = async () => {
    const result = await axios.post('/api/user',{}); 
    console.log(result);
    setUserDetail(result?.data);
  }
  return ( 
 <NextThemesProvider {...props}>
  <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
    {children}
  </UserDetailContext.Provider>
 </NextThemesProvider>
 )
}  


export default Themeprovider