import './App.css'
import { Outlet } from 'react-router'
import Header from './Header'

function App() {
  

  return (
    <>
      <h1>Vite + React: Dashboard</h1>
      
      <div className="card">
        <Header />
        <Outlet />
      </div>
      <div className='info-container'>
        <p>
          All info about this app goes here.
        </p>
      </div>
    </>
  )
}

export default App
