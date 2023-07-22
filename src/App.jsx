import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import FormPage from './pages/FormPage/FormPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import ExercisesPage from './pages/ExercisesPage/ExercisesPage';
import NavTop from './components/NavTop/NavTop';
import NavBottom from './components/NavBottom/NavBottom';
import { useSelector } from 'react-redux';



function App() {

  const currentUser = useSelector(({user}) => user.currentUser?.userName)

  return (
    <div className="App" style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {currentUser && (<NavTop/>)}
      
      
      <div style={{flex: '1 1 auto', overflow: 'auto'}}>
        <Routes>
          <Route path='/Pocket_Dictionary' element={<LoginPage/>}/>
          <Route path='/main' element={<MainPage/>}/>
          <Route path='/form' element={<FormPage/>}/>
          <Route path='/settings' element={<SettingsPage/>}/>
          <Route path='/exercises' element={<ExercisesPage/>}/>
        </Routes>
      </div>
      
      {currentUser && (<NavBottom/>)}

      


    </div>
  );
}

export default App;
