
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './views/Auth/Auth'
import Home from './views/Home/Home'
import GymPage from './views/GymPage/GymPage'
import { Provider } from 'react-redux'
import { persistor, store } from './Redux/Store'
import PrivateRoute from './components/PrivateRoute'
import DashBoard from './views/DashBoard/DashBoard'
import Profile from './views/Profile/Profile'
import { PersistGate } from 'redux-persist/integration/react'
import Plans from './views/Plans/Plans'

function App() {


  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:gymSlug" element={<Auth />} />
          <Route path="/:gymSlug/home" element={<PrivateRoute><GymPage /></PrivateRoute>} />
          <Route path="/:gymSlug/dashboard" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
          <Route path="/:gymSlug/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/:gymSlug/plans" element={<PrivateRoute><Plans /></PrivateRoute>} />
        </Routes>
      </PersistGate>
    </Provider>
    </>
  )
}

export default App
