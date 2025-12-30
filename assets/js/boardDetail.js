const getBoardDetail = async () => {

    //board.html에서 전송한 특정 게시글의 글 번호를 가져오기
    const params = new URLSearchParams(location.search);
    let idx = params.get("idx");
    console.log(location.search);
    console.log(params.get("idx"));
    
    // 잘못된 접근 방식에 대한 예외 처리
    if(!idx){
        console.log("게시글 글 번호가 없습니다.")
        return;
    }

    try{
    // 게시글 번호를 Spring Boot에 전송 (특정 게시글 조회 기능 호출 >> api/board/getDetail)
    // 테스트용 : let res = await axios.get(`http://localhost:8081/api/board/${idx}`);
    let res = await axios.get(`/api/board/${idx}`);
    console.log(res.data);

    // 응답받은 데이터를 화면(웹페이지)에 출력하기 위한 HTML 요소 객체 접근하기
        const title = document.getElementById("title")
        const writer = document.getElementById("writer")
        const content = document.getElementById("content")
        const downloadLink = document.getElementById("download-link")
        
        title.innerText = res.data.b_title;
        writer.innerText = res.data.b_writer
        content.innerText = res.data.b_content

        // 첨부 파일이 없을 때에 대한 조건 부여
        if(res.data.b_file_path){ // 파일이 있는 경우
            // 테스트용 : downloadLink.href = `http://localhost:8081/api/board/${idx}/download`;
            downloadLink.href = `/api/board/${idx}/download`;
        }else{ // 파일이 없는 경우
            downloadLink.style.display = "none"
        }
    }catch(err){
        console.log(err);
        
    }
    
}

getBoardDetail();