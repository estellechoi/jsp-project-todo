/**
 * 
 */

	function updateType(id, type) {
		
		var oReq = new XMLHttpRequest(); // oReq.UNSENT == 0
	
		// 이벤트 리스너 콜백함수 등록
		/*
		oReq.addEventListener("load", function() {
			if (this.responseText == "success") {
				// 프론트 처리
			}
		});
		*/
		
		// onreadystatechange 대신에 onload를 사용해도 됩니다. 요청 완료만 잡아내도 된다면요. 
		oReq.onreadystatechange = function() {
			if (oReq.readyState == oReq.DONE) { // 요청이 완료되면 (oReq.DONE == 4)
				if (oReq.status == 200 || oReq.status == 201) {
					if (oReq.responseText == "success") {
						// responseText : 현재까지 읽은 응답의 전체 값을 반환
						// 프론트 처리
						alert(oReq.responseText);
						// 리스트 재정렬 함수 호출
						updateList(id, type);
					}
				}
				else {
					console.error(this.responseText);
				}
			}
		}
		
		oReq.open("GET", "TodoTypeServlet?id=" + id + "&type=" + type); // oReq.OPENED == 1
		oReq.send(); // oReq.HEADERS_RECEIVED (2) -> LOADING (3) -> DONE (4)
	}
	
	function updateList(id, type) {
		const targetList = document.getElementById(id);
		
		switch(type) {
		case "TODO" : 
			document.querySelector("#todo").removeChild(targetList);
			document.querySelector("#doing").append(targetList);
			break;
		case "DOING" :
			document.querySelector("#doing").removeChild(targetList);
			document.querySelector("#done").append(targetList);
			break;
		default: 
			break;
			
		}
	}