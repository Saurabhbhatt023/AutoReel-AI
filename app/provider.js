"use client"
import React, { useContext, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/configs/firebaseConfig';
import { AuthContext } from './_context/AuthContext';
import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const Provider = ({ children }) => {
  const [user, setUser] = useState();
  const [dbUser, setDbUser] = useState();
  const CreateUSer = useMutation(api.users.CreateNewUser)
        
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(firebaseUser) => {
      console.log('Firebase User:', firebaseUser); // This will log the Firebase user object as in tutorial
      setUser(firebaseUser); // Set the user state to Firebase user
      
      if(firebaseUser) {
        const result = await CreateUSer({
          name: firebaseUser?.displayName,
          email: firebaseUser?.email,
          pictureURL: firebaseUser?.photoURL,
        });
        console.log('Database User:', result);
        setDbUser(result); // Store database user separately
      }
    });
    return unsubscribe;
  }, []);

  return (
      <AuthContext.Provider value={{ user, dbUser }}>
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