import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import FormPage from './pages/FormPage/FormPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import ExercisesPage from './pages/ExercisesPage/ExercisesPage';
import NavTop from './components/NavTop/NavTop';
import NavBottom from './components/NavBottom/NavBottom';
import { useDispatch, useSelector } from 'react-redux';
import ExersiseSinglePage from './pages/ExersiseSinglePage/ExersiseSinglePage';
import { useEffect } from 'react';
import { removeUser } from './store/userSlice';



function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const userActivity = localStorage.getItem('userActivity')
    const currentTime = Date.now()
    const timeDiff = currentTime - userActivity
    
    if(timeDiff > 2000*60) dispatch(removeUser())
 
  },[])
 
  const currentUser = useSelector(({user}) => user.currentUser?.userName)

  useEffect(() => {
    localStorage.setItem('userActivity', Date.now())
    if(currentUser){
      const writeDate = () => {
        localStorage.setItem('userActivity', Date.now())
      }
      window.addEventListener('touchstart', writeDate)
      window.addEventListener('mousemove', writeDate)
  
      return () => {
        window.removeEventListener('touchstart', writeDate)
        window.removeEventListener('mousemove', writeDate)
      }
    }

  },[currentUser])

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
          {currentUser && <Route path='/settings' element={<SettingsPage/>}/>}
          {currentUser && <Route path='/exercises' element={<ExercisesPage/>}/>}
          {currentUser && <Route path='/Pocket_Dictionary/exercises/:type' element={<ExersiseSinglePage/>}/>}
          <Route path='/*' element={<MainPage/>}/>
        </Routes>
      </div>
      
      {currentUser && (<NavBottom/>)}

      


    </div>
  );
}

export default App;
