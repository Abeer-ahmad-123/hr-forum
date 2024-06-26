'use client'
import InitialLoading from '@/components/InitialLoading'
import store, { initializeStore } from '@/store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store)

const StoreProvider = ({ children, serverState }: any) => {
  // const myStore = initializeStore(serverState)
  return (
    <Provider store={store} serverState={serverState}>
      {/* {typeof window === 'undefined' ? (
        children
      ) : (
        <PersistGate persistor={persistor} loading={<InitialLoading />}>
          {children}
        </PersistGate>
      )} */}
      {children}
    </Provider>
  )
}

export default StoreProvider
