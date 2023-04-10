import {
    BrowserRouter as Router,
    Routes,
    Route,
}
from "react-router-dom";
import Main from "./router/Main";
function App (){
  
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Main/>}/>
            </Routes>
        </Router>
    ); 
    
}

export default App;