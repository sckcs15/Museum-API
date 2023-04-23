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
//상세정보 contents 풀로 보여주는 정도
export default App;