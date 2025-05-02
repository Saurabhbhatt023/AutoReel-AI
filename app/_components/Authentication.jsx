"use client"
import React from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/configs/firebaseConfig' // adjust path as needed



const Authentication = ({ children }) => {
  const provider = new GoogleAuthProvider()

  const onSignInClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData?.email
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.error(errorCode, errorMessage, email, credential)
      })
  }

  return (
    <div onClick={onSignInClick}>
      {children}
    </div>
  )
}

export default Authentication

