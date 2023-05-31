import { Routes, Route } from 'react-router-dom'
import NewSessionPage from '../pages/NewPassPage/NewPassPage'
import NewComboPage from '../pages/NewComboPage/NewComboPage'
import ComboListPage from '../pages/ComboListPage/ComboListPage'
import ComboDetailsPage from '../pages/ComboDetailsPage/ComboDetailsPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import PrivateRoute from './PrivateRoute'
import PassListPage from '../pages/PassListPage/PassListPage'
import IndexPage from '../pages/IndexPage/IndexPage'
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<IndexPage></IndexPage>}> </Route>
            {/* <Route path='/pass' element={<PassListPage />}> </Route> */}
            <Route path='/pass/:id' element={<h1>Sesiones especifica</h1>}> </Route>
            <Route path='/pass/:id/buy' element={<h1>Sesiones Compra</h1>}> </Route>
            <Route path='/movies/:movie_id' element={<MovieDetailsPage />}> </Route>
            <Route path='/order' element={<h1>tu cesta</h1>}> </Route>
            <Route path='/combos' element={<ComboListPage />}> </Route>
            <Route path='/combos/:combo_id' element={<ComboDetailsPage />}> </Route>
            <Route path='/signup' element={<SignupPage />}> </Route>
            <Route path='/login' element={<LoginPage />}> </Route>
            <Route path='/profile' element={<PrivateRoute />}>
                <Route path='' element={<ProfilePage />}> </Route>
            </Route>
            <Route path='/admin/pass/create' element={<NewSessionPage />}> </Route>
            <Route path='/admin/pass/edit' element={<h1>Pirata</h1>}> </Route>
            <Route path='/admin/pass/delete' element={<h1>Pirata</h1>}> </Route>
            <Route path='/admin/combo/create' element={<NewComboPage />}> </Route>
        </Routes>
    )
}

export default AppRoutes