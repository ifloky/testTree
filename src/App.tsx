import './App.css'
import { HeaderView } from './Components/header/HeaderView'
import { MainPage } from './Pages/MainPage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => (
  <>
  <HeaderView />
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  </>
);


export default App
