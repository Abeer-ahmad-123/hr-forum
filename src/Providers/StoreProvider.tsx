'use client'

import store from '@/store'
import { Provider } from 'react-redux'

function StoreProvider({ children, serverState }: any) {
  return (
    <Provider store={store} serverState={serverState}>
      {children}
    </Provider>
  )
}

export default StoreProvider
