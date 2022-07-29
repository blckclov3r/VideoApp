import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout({darkMode,setDarkMode}) {
  return (
    <>
        <main className="App">
                <Outlet />
        </main>
    </>
  )
}
