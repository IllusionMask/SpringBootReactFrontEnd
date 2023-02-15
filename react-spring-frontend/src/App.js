import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import ListEmployeeComponent from './component/ListEmployeeComponent';
import FooterComponent from './component/FooterComponent';
import HeaderComponent from './component/HeaderComponent';
import CreateEmployeeComponent from './component/CreateEmployeeComponent';
import UpdateEmployeeComponent from './component/UpdateEmployeeComponent';
import ViewEmployeeComponent from './component/ViewEmployeeComponent';

function App() {
  return (
    <div>
    <Router>  
        <HeaderComponent/>
        <div className="container">
          <Routes>
            <Route path="/" element={<ListEmployeeComponent/>}/>
            <Route path="/employees" element={<ListEmployeeComponent/>}/>
            <Route path="/add-employee/:id" element={<CreateEmployeeComponent/>}/>
            {/* Original
            <Route path="/add-employee" element={<CreateEmployeeComponent/>}/>
            <Route path="/update-employee/:id" element={<UpdateEmployeeComponent/>}/>*/}
            <Route path = "/view-employee/:id" element={<ViewEmployeeComponent/>}/>
          </Routes>         
        </div>
        <FooterComponent />    
    </Router>
    </div>
  );
}

export default App;
