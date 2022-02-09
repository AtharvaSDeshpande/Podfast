import reducer, { initialState } from '../redux/reducer'
import { StateProvider } from '../redux/StateProvider'
import '../styles/globals.css'
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return     <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>



}

export default MyApp
