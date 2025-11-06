import './app.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './component/HomePage';
import Login from './component/Login';  
import RegistrationForm from './component/RegistrationForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/Home" element={<HomePage />} /> 
        <Route path="/Reg" element={<RegistrationForm />} />
      </Routes>
    </div>
  );
}

export default App;

