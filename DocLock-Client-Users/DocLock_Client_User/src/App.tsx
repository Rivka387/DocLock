import './App.css'
import { Provider } from 'react-redux'
import store from './components/Store'
import { router } from './router'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from '@emotion/react'
import theme from './Them'
import EmailIcon from './EmailIcon'
function App() {

  return (
    <>
    <EmailIcon/>
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
