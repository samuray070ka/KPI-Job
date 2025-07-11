import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './router/home/Home';
import Admin from './router/admin/Admin'
import { LanguageProvider } from './LanguageContext.jsx';
import UniquePage from './router/home/UniquePage.jsx';
import Login from './router/login/Login.jsx';


function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isLogin = location.pathname.startsWith("/login");
  return (
    <div className="App">
      <LanguageProvider>
       {!isAdmin && !isLogin && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<Admin />} /> 
        <Route path="/job/:slug" element={<UniquePage/>} />
      </Routes>
      
      {!isAdmin && !isLogin && <Footer />}
      </LanguageProvider>
    </div>
  );
}

export default App;
