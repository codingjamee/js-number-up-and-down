import {
  gameStatus,
  createRandomNumber,
  checkUpDown,
  GameState,
  getGameInstructions,
  addListenerById,
  removeChildrenById,
  mutateDisabledBtn,
  addChildrenById,
} from "../domain/index.js";
import { addNumber, toNumber } from "../utils/util.js";

export async function startGame() {
  console.log("start game");
  const gameState1 = GameState();
  const settingIdArray = ["min", "max", "limit"];

  gameState1.updateState("status", gameStatus.READY);

  updateView({ state: gameState1.getState().status, btnText: "시작하기" });

  addSettingListener();
  computerSetting();

  function addSettingListener() {
    addValidationListener();
    addSubmitListener();

    //이 로직을 어디에 두어야 할지 생각해야함
    //listener 작동 후 setting후에 설정 되어야함
    // const targetStatus = gameState1.getState().PLAYING;
    // gameState1.updateState("status", targetStatus);
    // return playGame(gameState1);
  }

  function addValidationListener() {
    settingIdArray.map((inputId) => {
      addListenerById(inputId, "blur", inputIsNotValid);
      addListenerById(inputId, "input", inputIsValid);
    });
    function inputIsNotValid(event) {
      if (!isNumber(event.target.value)) {
        addChildrenById(
          inputId,
          getGameInstructions().returnSettingErrorMessage(inputId)
        );
        mutateDisabledBtn("submitBtn", true);
      }
    }

    function inputIsValid(event) {
      if (isNumber(event.target.value)) {
        removeChildrenById(inputId);
        mutateDisabledBtn("submitBtn", false);
      }
    }
  }

  function addSubmitListener() {
    //submit할 때 input의 setting을 모두 설정
    settingIdArray.map((inputId) => {
      const input = document.getElementById(inputId);
      gameState1.updateState(inputId, toNumber(input));
    });
  }

  function computerSetting() {
    const { min, max } = gameState1.getState();
    const randomNumber = createRandomNumber(min, max);
    gameState1.updateState("answer", randomNumber);
  }
}

export async function playGame(state) {
  const playGameState1 = { ...state };

  //template제공
  updateView({
    state: playGameState1.getState().status,
    btnText: "메인화면으로 이동",
  });

  addPlayingListener();

  function addPlayingListener() {
    addValidationListener({ inputId: "userTrial" });
    addSubmitListener();

    function addValidationListener({ inputId }) {
      //validate 이벤트 리스너
      addListenerById(inputId, "blur", inputIsNotValid);
      addListenerById(inputId, "input", inputIsValid);
      //이부분은 dom이 재렌더링이 너무많이 일어날 것 같았지만
      //유효여부 변경될 때만 버튼 변경되어 렌더링 될 것같다

      function inputIsNotValid(event) {
        //모듈화 할 수 있지 않을까? 그런데 재사용성이 있는 대신 의존도가 높아질 수 있다.
        if (!isNumber(event.target.value)) {
          addChildrenById(
            inputId,
            getGameInstructions().returnGameErrorMessage(inputId)
          );
          mutateDisabledBtn("submitBtn", true);
        }
      }

      function inputIsValid(event) {
        if (isNumber(event.target.value)) {
          removeChildrenById(inputId);
          mutateDisabledBtn("submitBtn", false);
        }
      }
    }

    function addSubmitListener() {
      //submit시 발생하는 이벤트 리스너
      addListenerById("submitBtn", "click", submitListener);

      function submitListener() {
        const userTry = document.getElementById("tryBtn");
        if (checkIsAnswer(userTry)) {
          playGameState1.updateState("status", gameStatus.SUCCESS);
          return endGame(playGameState1);
        }

        onValidGame(userTry);

        const isValidGame = checkValidCount();
        if (!isValidGame) {
          playGameState1.updateState("status", gameStatus.FAIL);
          return endGame(playGameState1);
        }

        function checkValidCount() {
          return playGameState1.trialLimit >= playGameState1.userTrials.length;
        }

        function onValidGame(userInput) {
          const isUp = checkUpDown(playGameState1.answer, userInput);
          if (isUp) return addChildrenById("up"); //문구 설정 필요
          addChildrenById("down");

          addChildrenById(userInput); //usertry 추가
          console.log(user.userTrials);

          playGameState1.updateState(
            "userTrialCount",
            addNumber(playGameState1.getState().userTrialCount)
          );
        }
        
        function checkIsAnswer(userTry) {
          return userTry === playGameState1.answer;
        }
      }

    }
  }
}

export async function endGame(playState, result) {
  const endState = { ...playState };

  if (result) onSuccessGame();
  if (!result) onFailGame();

  console.log(returnResultMessage(endState.status));

  const answer = await askRestart();
  if (answer === "yes") return playGame();

  return console.log("게임을 종료합니다.");

  function onFailGame() {
    changeState(endState.status, gameStatus.FAIL);
  }

  function onSuccessGame() {
    changeState(endState.status, gameStatus.SUCCESS);
  }

  async function askRestart() {
    return await alert("다시 시작하시겠습니까? (yes / no) : ");
  }
}

// function alert(query) {
//   return new Promise((resolve, reject) => {
//     if (arguments.length !== 1) {
//       reject(new Error("arguments must be 1"));
//     }

//     if (typeof query !== "string") {
//       reject(new Error("query must be string"));
//     }

//     const rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });

//     rl.question(query, (input) => {
//       rl.close();
//       resolve(input);
//     });
//   });
// }
