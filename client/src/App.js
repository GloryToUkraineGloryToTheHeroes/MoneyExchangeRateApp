import { Navbar } from './components/Navbar'
import { useRouter } from './router'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

function App() {

  const router = useRouter()

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {router}
      </BrowserRouter>
    </div>
  )
}

export default App;
