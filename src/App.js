import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './router/home/Home';
import Admin from './router/admin/Admin'


function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <div className="App">
       {!isAdmin && <Navbar />}
      
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/admin' element={<Admin />} /> 
      </Routes>
      
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
