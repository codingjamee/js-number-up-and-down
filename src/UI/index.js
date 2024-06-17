import {
  gameStatus,
  checkPromptNumber,
  createRandomNumber,
  checkUpDown,
  runAsyncLoopWhileCondition,
  GameState,
  getGameInstructions,
  addListenerById,
  render,
  removeChildrenById,
  mutateDisabledBtn,
} from "../domain/index.js";
import {
  startTemplate,
  playTemplate,
  containerTemplate,
} from "../templates/index.js";
import { toNumber } from "../utils/util.js";

export async function startGame() {
  console.log("start game");
  const gameState1 = GameState();
  const settingIdArray = ["min", "max", "limit"];

  gameState1.updateState("status", gameStatus.READY);

  updateView();

  addSettingListener();
  computerSetting();

  const targetStatus = gameState1.getState().PLAYING;
  gameState1.updateState("status", targetStatus);
  return playGame();

  function updateView() {
    const view = composeDetailView(gameState1.getState().status);
    render(containerTemplate(view));

    changeTextById(submitBtn, "시작하기");
  }

  function addSettingListener() {
    gameState1.updateState("status", targetStatus);

    addValidationListener();
    addSubmitListener();
  }

  function addValidationListener() {
    settingIdArray.map((inputId) => {
      addListenerById(inputId, "blur", inputIsNotValid);
      addListenerById(inputId, "input", inputIsValid);
    });
  }

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
  const playState = { ...state };

  const whileCondition = () =>
    playState.userTrials.length <= playState.trialLimit;

  const userAnswer = await runAsyncLoopWhileCondition(
    continueGame,
    whileCondition()
  );

  endGame(playState, userAnswer);

  //계속 게임이 진행됨
  async function continueGame() {
    //validCount인지 확인
    const isValidCount = checkValidCount(state);
    if (!isValidCount) return changeState(state);
    //loop를 빠져나옴

    //user 입력 받음
    const userInput = await promptUser();

    //validation 확인
    const isValid = checkPromptNumber(userInput);
    if (!isValid) return console.log(returnGameErrorMessage());

    //answer인지 확인
    const isAnswer = checkIsAnswer(userInput, playState);
    if (isAnswer) return true;

    onValidGame(userInput);
  }

  function checkValidCount() {
    return playState.trialLimit >= playState.userTrials.length;
  }

  function onValidGame(userInput) {
    const isUp = checkUpDown(playState.answer, userInput);
    console.log(`${isUp ? "up" : "down"}`);

    addUserTrials(userInput);
    console.log(user.userTrials);

    addCount();
  }

  function addUserTrials(userInput) {
    playState.userTrials.push(userInput);
  }

  async function promptUser() {
    //user의 응답을 받음
    return await alert(returnGameQuestion(playState.status));
  }

  function checkIsAnswer(userTry) {
    return userTry === playState.answer;
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

function composeDetailView(state) {
  return state === "ready" ? startTemplate() : playTemplate();
}
