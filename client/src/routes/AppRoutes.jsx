import { Routes, Route } from 'react-router-dom'

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/' element={<h1>Hello there</h1>}> </Route>
            <Route path='/sessions' element={<h1>Sesiones aqui</h1>}> </Route>
            <Route path='/sessions/:id' element={<h1>Sesiones especifica</h1>}> </Route>
            <Route path='/sessions/:id/buy' element={<h1>Sesiones Compra</h1>}> </Route>
            <Route path='/order' element={<h1>tu cesta</h1>}> </Route>
            <Route path='/combos' element={<h1>Pedazo combo niño</h1>}> </Route>
            <Route path='/signup' element={<h1>Registrate o te empapelo</h1>}> </Route>
            <Route path='/login' element={<h1>Me caes regular</h1>}> </Route>
            <Route path='/logout' element={<h1>Tira</h1>}> </Route>
            <Route path='/profile' element={<h1>Juapo</h1>}> </Route>
            <Route path='/admin/session/create' element={<h1>Pirata</h1>}> </Route>
            <Route path='/admin/session/edit' element={<h1>Pirata</h1>}> </Route>
            <Route path='/admin/session/delete' element={<h1>Pirata</h1>}> </Route>
            <Route path='/admin/combo/create' element={<h1>Garrapata</h1>}> </Route>
            <Route path='/admin/combo/edit' element={<h1>Garrapata</h1>}> </Route>
            <Route path='/admin/combo/delete' element={<h1>Garrapata</h1>}> </Route>
        </Routes>
    )
}

export default AppRoutes