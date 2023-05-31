import  {
  HashRouter as Router,
  Route,
  Routes
} from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import CarList from './pages/CarList'
import CarDetail from './pages/CarDetail'
import MechanicList from './pages/MechanicList'
import MechanicDetail from './pages/MechanicDetail'
import CarTypeList from './pages/CarTypeList'
import CarTypeDetail from './pages/CarTypeDetail'
import RepairedList from './pages/RepairedList'
import RepairedDetail from './pages/RepairedDetail'


function App() {
  return (
   <Router>
    <div className="Container">
    <div className="app">
      <Header />
       <Routes>
      <Route path = "/" exact element={<CarList/>} />
      <Route path = "/cars/:id" element={<CarDetail/>} />
      <Route path = "/mechanics/" element={<MechanicList/>} />
      <Route path = "/mechanics/:id" element={<MechanicDetail/>} />
      <Route path = "/carTypes/" element={<CarTypeList/>} />
      <Route path = "/carTypes/:id" element={<CarTypeDetail/>} />
      <Route path = "/repaireds/" element={<RepairedList/>} />
      <Route path = "/repaireds/:id" element={<RepairedDetail/>} />
       </Routes>
    </div>
    </div>  
   </Router>
  );
}

export default App;
