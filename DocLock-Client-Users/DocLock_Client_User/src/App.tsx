import './App.css'
import { Provider } from 'react-redux'
import store from './components/Store'
import { router } from './router'
import { RouterProvider } from 'react-router'

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
