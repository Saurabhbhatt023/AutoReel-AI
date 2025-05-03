"use client"
import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/configs/firebaseConfig';
import { AuthContext } from './_context/AuthContext';
import { createContext } from 'react';
import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
// import { api } from "../convex/_generated/api";
import { api } from "@/convex/_generated/api"; // Adjust the import path as needed

// Remove the duplicate AuthContext declaration

const Provider = ({ children }) => {
  const [user, setUser] = useState();
  const CreateUSer = useMutation(api.users.CreateNewUser)
        
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      console.log(user);
      setUser(user);
      
      const result = await CreateUSer({
          name:user?.displayName,
          email:user?.email,
          pictureURL:user?.photoURL,
       })
      console.log(result)
    });
    return unsubscribe;
  }, []);

  return (
      <AuthContext.Provider value={{ user }}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

export default Provider;