import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import Login from './components/Login';
import Sign from './components/Sign';
import { PrivateRoute } from './components/PrivateRoute';
import CreateBook from './components/CreateBook';
import GetAllbook from './components/GetAllbook';
import Update from './components/Update';

function App() {

  return (
    <div className="App">
    <Navbar/>
    
    <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/sign-up" element={<Sign/>} />
        <Route exact path="/createbook" element={<PrivateRoute><CreateBook/></PrivateRoute>} />
        <Route exact path="/book_store" element={<PrivateRoute><GetAllbook/></PrivateRoute>} />
        <Route exact path="/update/:id" element={<PrivateRoute><Update/></PrivateRoute>} />
        </Routes>
    </div>
  );
}

export default App;
