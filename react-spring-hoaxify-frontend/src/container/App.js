import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import UserSignupComponent from '../components/UserSignupComponent';
import LoginComponent from '../components/LoginComponent';
import HomepageComponent from '../components/HomepageComponent';
import UserComponent from '../components/UserComponent';
import TopBarComponent from '../components/TopBarComponent';

function App() {
  return (
    <Router>
      <TopBarComponent/>
      <div className='container'> 
        <Routes>
          <Route path="/" element={<HomepageComponent/>}/>
          <Route path="/signup" element={<UserSignupComponent/>}/>
          <Route path="/login" element = {<LoginComponent/>}/>
          <Route path='/:username' element={<UserComponent/>}/>
        </Routes>    
      </div>
    </Router>
  );
}

export default App;
