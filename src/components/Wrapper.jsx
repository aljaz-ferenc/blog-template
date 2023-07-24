import React, { useEffect } from 'react'
import { Outlet, useNavigation } from 'react-router'
import Loading from './Loading'
import { createPortal } from 'react-dom'

export default function Wrapper() {
    const navigation = useNavigation()
    const isLoading = navigation.state === 'loading'

    useEffect(() => {
        console.log(isLoading)
    }, [isLoading])
    
  return (
    <>
    {isLoading && createPortal(<Loading />, document.body)}
    <Outlet/>
    </>
  )
}
