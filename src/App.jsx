import { useState } from 'react'
import AppRouting from './AppRouting'
import Header from './shared/component/header'
import Footer from './shared/component/footer'
import ScrollToTop from './shared/component/scrollToTop'

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <AppRouting />
      <Footer />
    </>
  )
}

export default App
