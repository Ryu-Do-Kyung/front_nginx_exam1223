// 작성 버튼을 클릭했을 때,
// 작성된 글 내용을 하나의 객체로 묶어 서버에 전송하는 기능을 구현

const addBtn = document.getElementById("addBtn");

const addBoard = async (event) => {
    // 0. 전송 기능 중단하기
    event.preventDefault();

    // 1. 작성된 글 내용 가져온 후 하나의 객체로 묶기
    // >> form 태그 안에 있는 입력 요소(input, textarea)
    let boardFrm = document.boardFrm; // form 요소 정보
    
    let bData = new FormData(boardFrm); // form 태그 하위에 있는 요소(input, textarea, select 등)를 하나의 객체로 묶어주는 역할을 하는 객체
    console.log(bData.get("b_title")); // get(name속성) 특정 입력 요소의 정보를 가져오는 메소드
    // ContentType 형식 : multipart / form-data (파일 업로드) ex) <form enctype:"multipart/form-data"></form>

    // 2. 서버에 데이터 전송하기
    try{
        // 테스트용 : let res = await axios.post("http://localhost:8081/api/board/register", bData);
        let res = await axios.post("/api/board/register", bData);
        console.log(res.data);
        // 글 작성 완료 후 게시판 페이지로 이동
        location.href = "board.html"
    }catch(err){
        console.log(err);
        
    }

    // 3. 성공적으로 작성이 되었다면 게시판 페이지로 이동
}

addBtn.addEventListener("click", addBoard);