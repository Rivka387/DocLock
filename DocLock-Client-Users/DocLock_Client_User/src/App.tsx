
import { Provider } from 'react-redux'
import './App.css'
import store from './store'
import { ThemeProvider } from '@emotion/react'
import { RouterProvider } from 'react-router'
import { router } from './router'
import theme from './Them'

function App() {

  return (
    <>

      <h1></h1>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      </ThemeProvider>

      
    </>
  )
}

export default App


