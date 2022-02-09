import { SessionProvider } from 'next-auth/react'
import reducer, { initialState } from '../redux/reducer'
import { StateProvider } from '../redux/StateProvider'
import '../styles/globals.css'
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return <SessionProvider session={session}>
    
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>


  </SessionProvider>
}

export default MyApp
