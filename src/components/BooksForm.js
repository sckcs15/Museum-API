import styles from "./BooksForm.module.css";
import {useState} from "react";
import BestSeller from "./BestSeller";
import errorImage from "./no-image.jpeg";
function BooksForm(){
    const[search, setSearch]  = useState("");
    //검색어 State
    const[result, setResult] =useState(false);
    //검색여부 State
    const[books, setBooks] = useState([]);
    //api로 부터 불러온 책들 State
    const[target, setTarget] = useState("title");
    //검색어의 카테고리 ex) 제목, 작가
    let sort ="accuracy";
    // 검색된 책의 정렬 ex) 정확도순, 발간일순
 const onChangeTarget = (event)=>{
     setTarget(event.target.value);
 }
 const onChangeKeyword = (event)=>{
    setSearch(event.target.value);
}   
//검색어를 State에 넣어주는 함수
 const onSearch = ()=>{
    if(search===""){
        setResult(false);
    }
    else{
        sort="accuracy";
        getSearch();
        setResult(true);
    }
}
//검색한 결과를 보여주는 함수
 const onEnter = (event)=>{
 if(event.key==="Enter"){
        onSearch();
 }
}//엔터시에도 검색이 가능하게 하는 함수
 const onTextFocusIn = (event)=>{
    event.target.placeholder="";
 }
 const onTextFocusOut = (event)=>{
    event.target.placeholder="검색어를 입력해주세요.";
 }
 //text focus에 따른 placeholde
const onChangeSort  = (event)=>{
    sort = event.target.value;
   getSearch();
}
// 검색된 책 정렬하여 검색 
const noImage = (event)=>{
 event.target.src=errorImage;
}
 async function getSearch(){
   const data = await(await fetch(`https://dapi.kakao.com/v3/search/book?target=${target}&query=${search}&sort=${sort}`
    ,{headers:{ 
        Authorization:"KakaoAK e16aea1796fb93d18e3c697359d304c3"},
        method:"GET",
    })).json();
    setBooks(data.documents);
}
// fetch ajax
    return(
        <div className={styles.booksForm}>
        <h1 className={styles.logo}>Books</h1>
        <div className={styles.books}>
            <div className={styles.books__search}>
                <select className={styles.books__target} onChange={onChangeTarget}>
                    <option value="title">제목</option>
                    <option value="person">작가</option>
                    <option value="publisher">출판사</option>
                </select>
                <input className={styles.books__text} type="text" 
                onChange={onChangeKeyword} onKeyUp={onEnter} onFocus={onTextFocusIn} onBlur={onTextFocusOut}
                value={search} placeholder="검색어를 입력해주세요."/>
                <button className={styles.books__btn} onClick={onSearch} onKeyUp={onEnter} >검색</button>
            </div>
            <ul className={styles.books__result}>
            {result? 
                <select className={styles.books__align} onChange={onChangeSort} >
                    <option value="accuracy" >정확도순</option>
                    <option value="latest" >발간일순</option>
                </select>
                :null}
            {result? 
            books.map((item)=>
                <li key={item.isbn} className={styles.books__index}>
                        <img className={styles.books__img} src={item.thumbnail} onError={noImage} alt={item.isbn}/>
                    <div className={styles.books__detail}>
                        <h4 className={styles.books__title}>{item.title}</h4>
                        <p className={styles.books__contents}>
                        {item.contents.length>80 ? 
                        item.contents.slice(0, 81): item.contents}
                        </p>
                        <div className={styles.books__authorsAndDatetime}>
                            <span className={styles.books__authors}>{item.authors}</span>
                            <span className={styles.books__datetime}>{item.datetime.slice(0,10)}</span>
                        </div>
                        <p className={styles.books__publisher}>{item.publisher}</p>
                    </div>
                </li>
            ) : <BestSeller/>} 
            </ul>
        </div>
    </div> 
    );
}
export default BooksForm;