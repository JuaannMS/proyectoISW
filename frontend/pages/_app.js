import '../styles/globals.css'
import { useEffect } from 'react'
import comprobarCookies from '../utils/comprobarCookies'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    comprobarCookies()
  }, [])


  return (
    <>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>

    </>
  )
}

export default MyApp