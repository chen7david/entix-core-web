import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import { HashRouter } from 'react-router-dom'
import { RouterContent } from './routes'

function App() {

  return (
    <AuthProvider>
        <HashRouter>
          <RouterContent />
        </HashRouter>
    </AuthProvider>
  )
}

export default App
