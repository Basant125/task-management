
import Home from './components/Home/Home'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Showtask from './components/ShowTask/Showtask';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {/* <Route path='/subtask/:id' element={<Showtask />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
