import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ProtectedRoutes from "./middleware/ProtectedRoutes.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import Success from "./pages/Success.jsx";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route index path='/' element={<Login />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path='/blog' element={<BlogPage />} />
                </Route>
                <Route path='/success' element={<Success />} />
            </Routes>
        </Router>
    )
}

export default App
