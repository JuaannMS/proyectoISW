import '../styles/globals.css'
import { useEffect } from 'react'
import comprobarCookies from '../utils/comprobarCookies'
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from "recoil"
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    comprobarCookies()
  }, [])


  return (
    <>
     <RecoilRoot>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
     </RecoilRoot>
    </>
  )
}

export default MyApp