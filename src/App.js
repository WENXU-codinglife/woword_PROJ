import {Routes, Route} from 'react-router-dom';


import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignIn from './components/signIn/signIn.component';
import SignUp from './components/signUp/signUp.component';
import GameEntrance from './routes/gameEntrance/gameEntrance.component';



const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />}/>
                <Route path='sign-in' element={<SignIn/>} />
                <Route path='sign-up' element={<SignUp/>} />
                <Route path='game' element={<GameEntrance/>} />
            </Route>
        </Routes>
    );
}

export default App;
