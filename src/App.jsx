import { useState } from 'react'
import AppRouting from './AppRouting'
import Header from './shared/component/header'
import Footer from './shared/component/footer'

function App() {
  return (
    <>
      <Header />
      <AppRouting />
      <Footer />
    </>
  )
}

export default App
