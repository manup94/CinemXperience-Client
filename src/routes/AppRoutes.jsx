import { Routes, Route } from 'react-router-dom'
import NewSessionPage from '../pages/NewPassPage/NewPassPage'
import NewComboPage from '../pages/NewComboPage/NewComboPage'
import ComboListPage from '../pages/ComboListPage/ComboListPage'
import SignupPage from '../pages/SignupPage/SignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import PrivateRoute from './PrivateRoute'
import PassListPage from '../pages/PassListPage/PassListPage'
import IndexPage from '../pages/IndexPage/IndexPage'
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage'
import EditProfileForm from '../pages/ProfileEditPage/ProfileEditPage'
import TopMovieDetailsPage from '../pages/TopMovieDetailsPage/TopMovieDetailsPage'
import TopMoviePage from '../pages/TopMoviePage/TopMoviePage'



const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<IndexPage />} />
            <Route path='/movies/:movie_id' element={<MovieDetailsPage />} />
            <Route path='/TopRatedMovieList' element={<TopMoviePage />} />
            <Route path='/TopRatedMovie/:movie_id' element={<TopMovieDetailsPage />} />
            <Route path='/combos' element={<ComboListPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />


            <Route path='' element={<PrivateRoute admittedRoles={['USER', 'ADMIN']} />}>
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/profile/:profile_id/edit' element={<EditProfileForm />} />
            </Route>

            <Route path='' element={<PrivateRoute admittedRoles={['ADMIN']} />} >
                <Route path='/admin/pass/create' element={<NewSessionPage />} />
                <Route path='/admin/pass' element={<PassListPage />} />
                <Route path='/admin/combo/create' element={<NewComboPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes