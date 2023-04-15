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
// 결과물에 따른 page 만들기
// 검색전 보여줄 것 만들기
export default App;