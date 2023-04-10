import {useState} from "react";
import styles from "./Main.module.css";
function Main (){
 const[search, setSearch]  = useState("");
 const[result, setResult] =useState(false);
 const[books, setBooks] = useState([]);
 const onChange = (event)=>{
    setSearch(event.target.value);
}   
 const onSearch = ()=>{
     getSearch();
     setResult(true);
}
 const onEnter = (event)=>{
 if(event.key==="Enter"){
        onSearch();
 }
}
 const onTextFocusIn = (event)=>{
    event.target.placeholder="";
 }
 const onTextFocusOut = (event)=>{
    event.target.placeholder="검색어를 입력해주세요.";
 }
 async function getSearch(){
   const data = await(await fetch(`https://dapi.kakao.com/v3/search/book?target=title&query=${search}`,{
    headers:{ 
        Authorization:"KakaoAK e16aea1796fb93d18e3c697359d304c3"},
        method:"GET",
    })).json();
    setBooks(data.documents);
        console.log(data);
}
    return(
    <div className={styles.books}>
        <div className={styles.books__search}>
            <input className={styles.books__text} type="text" 
            onChange={onChange} onKeyUp={onEnter} onFocus={onTextFocusIn} onBlur={onTextFocusOut}
            value={search} placeholder="검색어를 입력해주세요."/>
            <button className={styles.books__btn} onClick={onSearch} onKeyUp={onEnter} >검색</button>
        </div>
        <ul className="books__result">
         {result? 
         books.map((item)=>
            <li key={item.isbn} className={styles.books__index}>
                    <img className="styles.books__img" src={item.thumbnail} alt={item.isbn}/>
                <div className={styles.books__detail}>
                    <h4 className={styles.books__title}>{item.title}</h4>
                    <p className="styles.books__contents">
                       {item.contents.length>100 ? 
                       item.contents.slice(0, 101): item.contents}
                    </p>
                </div>
            </li>
           ) : null} 
        </ul>
    </div>
        

        
    );
}


export default Main;