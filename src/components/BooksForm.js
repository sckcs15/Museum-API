import styles from "./BooksForm.module.css";
import {useState, useRef} from "react";
import BestSeller from "./BestSeller";
import errorImage from "./no-image.jpeg";
function BooksForm(){
    const[search, setSearch]  = useState("");
    //검색어 State
    const[result, setResult] =useState(false);
    //검색여부 State
    const[books, setBooks] = useState([]);
    //api로 부터 불러온 책들 State
    const[meta, setMeta] = useState("");
    const[target, setTarget] = useState("title");
    //검색어의 카테고리 ex) 제목, 작가
    let sort ="accuracy";
    // 검색된 책의 정렬 ex) 정확도순, 발간일순
    const sortRef =useRef("");
    //sort dom을 대체하여 사용한 useRef
 const onChangeTarget = (event)=>{
     setTarget(event.target.value);
 } //검색 카테고리 State에 넣어주는 함수
 const onChangeKeyword = (event)=>{
    setSearch(event.target.value);
}   //검색어를 State에 넣어주는 함수
 const onSearch = ()=>{
    if(search===""){
        setResult(false);
    }
    else{
        if(sortRef.current!=="" && books.length!==0){
            sortRef.current.selected=true;
        }
        sort="accuracy";
        getSearch();
        setResult(true);
    }
}//검색한 결과를 보여주는 함수
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
 }//text focus에 따른 placeholde
const onChangeSort  = (event)=>{
    sort = event.target.value;
   getSearch();
}// 검색된 책 정렬하여 검색 
const noImage = (event)=>{
 event.target.src=errorImage;
}//이미지가 없는 책은 이미지 없음 이미지 출력
const reloading = ()=>{
    window.location.reload();
}//페이지 새로고침
const pageArr = [];
const [pages, setPages] = useState([]);
//페이지 수
let currentPage = 1;
//현재페이지
const goPage = (event)=>{
    currentPage = event.target.innerText;

    const siblings = event.target.parentElement.children;
    [...siblings].map((item, index)=>
        item.className = styles.pages__number
    )
    //htmlCollection은 배열에 다시 담아줘야 map함수를 사용 가능하다.
    //클릭한 페이지외에 나머지 페이지는 현재페이지 css제거
    event.target.className = styles.pages__number +" "+ styles.currentPage;
    //클릭한 페이지 현재페이지 css추가
    onSearch();
}// 선택한 페이지로 이동
const [pageAble, setPageAble] = useState(0);
// 5단위로 페이지를 몇번 넘기었는지
const pagePrev = ()=>{
    setPageAble(pageAble-1);
}//넘긴횟수 -1  (5단위이므로 -5)
const pageNext = ()=>{
    setPageAble(pageAble+1);    
}//넘긴횟수 +1 (5단위이므로 +5)
async function getSearch(){
   const data = await(await fetch(`https://dapi.kakao.com/v3/search/book?target=${target}&query=${search}&sort=${sort}&page=${currentPage}`
    ,{headers:{ 
        Authorization:"KakaoAK e16aea1796fb93d18e3c697359d304c3"},
        method:"GET",
    })).json();
    setBooks(data.documents);
    setMeta(data.meta);
   for(let i=1; i<=Math.ceil(data.meta.pageable_count/10); i++ ){
        pageArr.push(i);
   }
   setPages(pageArr);
}// fetch ajax
    return(
    <div className={styles.booksForm}>
        <h1 className={styles.logo} onClick={reloading}>Books</h1>
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
            {result&&meta.total_count>0?
                <p className={styles.books__total}>검색된 {meta.total_count}건의 문서</p>
                :null}
           {meta.total_count===0?
            <p className={styles.books__noResult}>검색된 결과가 없습니다.</p>
            :null}
            {result&&meta.total_count>0? 
                <select className={styles.books__align} onChange={onChangeSort}>
                    <option value="accuracy"  ref={sortRef}>정확도순</option>
                    <option value="latest" >발간일순</option>
                </select>
                :null}
            <ul className={styles.books__result}>
            {result? 
            books.map((item)=>
                <li key={item.isbn} className={styles.books__index}>
                        <img className={styles.books__img} src={item.thumbnail} onError={noImage} alt={item.isbn}/>
                    <div className={styles.books__detail}>
                        <h4 className={styles.books__title}>{item.title}</h4>
                        <p className={styles.books__contents}>
                        {item.contents.length>80 ? 
                        item.contents.slice(0, 81)+"...": item.contents}
                        </p>
                        <div className={styles.books__authorsAndDatetime}>
                        {item.authors.length===0?null:<span className={styles.books__authors}>{item.authors}</span>}
                            <span className={styles.books__datetime}>{item.datetime.slice(0,10)}</span>
                        </div>
                        <p className={styles.books__publisher}>{item.publisher}</p>
                    </div>
                </li>
            ) : null} 
            </ul>
        </div>
        {result? null:  <BestSeller/>}
        {result? <div className={styles.pages}>
            {pageAble===0? <p className={styles.pages__prevnext} ></p>: <p className={styles.pages__prevnext} onClick={pagePrev}>이전</p>}
           <div className={styles.pages__pagesBox}>

             
        {pages.map((item, index)=> (
            item>=1+(pageAble*5) && item<=5+(pageAble*5)?  <p className={item===1?styles.pages__number +" "+ styles.currentPage: styles.pages__number} key={index}  onClick={goPage} >{item}</p>   :null
            )
          )}

            </div>
        {pages.length/5-1<=pageAble  ? <p className={styles.pages__prevnext} ></p>: <p className={styles.pages__prevnext} onClick={pageNext}>다음</p>}      
        </div> : null}
    </div> 
    );
}
export default BooksForm;