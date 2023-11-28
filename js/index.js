const answer = "APPLE";
let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:rgba(0,0,0,0.5); color:#fff; padding:50px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts++;
    index = 0;
  };

  const handleEnter = () => {
    //정답 확인
    let count_answer = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      //console.log(block.innerText);
      const write_letter = block.innerText;
      const answer_letter = answer[i];
      //console.log("입력한 글자", write_letter, "정답글자", answer_letter);
      if (write_letter === answer_letter) {
        count_answer++;
        block.style.background = "#6aaa64";
      } else if (answer.includes(write_letter))
        block.style.background = "#c9b458";
      else block.style.background = "#787c7e";
      block.style.color = "#fff";
    }

    if (count_answer === 5) gameover();
    else nextLine();
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    const handleBackspace = () => {
      if (index > 0) {
        const preBlock = document.querySelector(
          `.board-block[data-index='${attempts}${index - 1}']`
        );
        preBlock.innerText = "";
      }
      if (index !== 0) index -= 1;
    };

    /* if (event.keyCode === 8)
      handleBackspace(thisBlock); //thisBlock을 파라미터로 전달 받아서 사용한다. 중복해서 변수 사용 안해도 됨*/
    if (event.keyCode === 8) handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnter();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++; // index += 1; // index = index +  1
    }
  };

  const startTimer = () => {
    const timeStart = new Date();

    function setTime() {
      const timeNow = new Date();
      const timeFlow = new Date(timeNow - timeStart);
      const minutes = timeFlow.getMinutes().toString().padStart(2, "0");
      const seconds = timeFlow.getSeconds().toString().padStart(2, "0");
      const timeText = document.querySelector(".time");
      timeText.innerText = `${minutes}:${seconds}`;
    }
    timer = setInterval(setTime, 1000);
    // console.log(timer); setInterval의 ID값을 확인할 수 있음
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}
appStart();
