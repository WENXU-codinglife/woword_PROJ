import {Routes, Route} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/user/user.context';
import { WordProvider } from './contexts/word/word.context';

import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import SignIn from './components/signIn/signIn.component';
import SignUp from './components/signUp/signUp.component';
import GameEntrance from './routes/gameEntrance/gameEntrance.component';



const App = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <WordProvider>
                    <Routes>
                        <Route path='/' element={<Navigation />}>
                            <Route index element={<Home />}/>
                            <Route path='sign-in' element={<SignIn/>} />
                            <Route path='sign-up' element={<SignUp/>} />
                            <Route path='game' element={<GameEntrance/>} />
                        </Route>
                    </Routes>
                </WordProvider>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;