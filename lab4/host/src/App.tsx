import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import SidePanel from './Components/SidePanel/SidePanel'
import { BrowserRouter, Routes, Route } from 'react-router-dom' // 👈 правильно
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store'
import Charts from './pages/Charts/Chats'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import AddMeasurements from './pages/Add/AddMeasurements'
import AddWorkout from './pages/Add/AddWorkout'
import History from './pages/History/History'
import Plan from './pages/Plan/Plan'

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="bg-background flex">
          <SidePanel />
          <main className="ml-[24%] p-10 px-20 w-full min-h-[100vh]">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/charts" element={<Charts />} />
              /* <Route path="/plan" element={<Plan />} />
              <Route path="/history" element={<History />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add_workout" element={<AddWorkout/>} />
              <Route path="/add_measurements" element={<AddMeasurements />} />
            </Routes>
          </main>
        </div>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)

const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)
root.render(<App />)
