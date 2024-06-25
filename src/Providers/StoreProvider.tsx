'use client'
import InitialLoading from '@/components/InitialLoading'
import store, { initializeStore } from '@/store'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

let persistor = persistStore(store)

const StoreProvider = ({ children, serverStore }: any) => {
  const myStore = initializeStore(serverStore)
  return (
    <Provider store={myStore}>
      {typeof window === 'undefined' ? (
        children
      ) : (
        <PersistGate persistor={persistor} loading={<InitialLoading />}>
          {children}
        </PersistGate>
      )}
    </Provider>
  )
}

export default StoreProvider
