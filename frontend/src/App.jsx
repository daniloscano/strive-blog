import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = () => {

    return (
        <>
            <Router>
                <Routes>
                    <Route index path="/" element={<h1>HomePage</h1>}/>

                    <Route path="*" element={<h1>404 Page Not Found</h1>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App
