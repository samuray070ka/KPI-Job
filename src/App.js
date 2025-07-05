import './App.css';
import {Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './router/home/Home';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
