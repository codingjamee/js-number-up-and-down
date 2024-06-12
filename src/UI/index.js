import readline from "readline";
import {
  gameStatus,
  InitialGameConfig,
  checkPromptNumber,
  createRandomNumber,
  settingConfig,
  changeStatus,
  returnSettingQuestion,
  returnSettingErrorMessage,
  returnGameQuestion,
  returnGameErrorMessage,
  copyArr,
  checkUpDown,
  returnResultMessage,
  asyncloopWhileCondition,
} from "../domain/index.js";

export async function startGame() {
  const { promptCount, totalSettingCount } = { ...settingConfig };
  const state = initializeGameSetting();
  changeStatus(state.status, gameStatus.USERSETTING_COUNT[promptCount]);

  const whileCondition = promptCount <= totalSettingCount;
  await asyncloopWhileCondition(promptUserSetting, whileCondition);

  const targetStatus = gameStatus.PLAYING;
  changeStatus(state.status, targetStatus);

  computerSetting();

  return playGame(state);

  function computerSetting(state) {
    const randomNumber = createRandomNumber(state.min, state.max);
    changeStatus(state.answer, randomNumber);
  }

  function initializeGameSetting() {
    //gameSetting초기화
    return { ...InitialGameConfig };
  }

  function addCount(count) {
    return count++;
  }

  async function promptUserSetting() {
    //count만큼 user setting받기
    const userAnswer = await readLineAsync(returnSettingQuestion(state.status));

    const isValid = checkPromptNumber(userAnswer);
    if (!isValid) return console.log(returnSettingErrorMessage(state.status));

    const nowStatus = state[gameStatus.USERSETTING_COUNT[promptCount]];
    changeStatus(nowStatus, userAnswer);
    addCount(promptCount);
  }
}

export async function playGame(state) {
  const playState = { ...state };

  const whileCondition = playState.userTrials.length <= playState.trialLimit;

  const userAnswer = await asyncloopWhileCondition(
    continueGame,
    whileCondition
  );

  endGame(playState, userAnswer);

  //계속 게임이 진행됨
  async function continueGame() {
    //validCount인지 확인
    const isValidCount = checkValidCount(state);
    if (!isValidCount) return changeStatus(state);
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

  function checkValidCount(state) {
    return state.trialLimit >= playState.userTrials.length;
  }

  function onValidGame(userInput) {
    const isUp = checkUpDown(playState.answer, userInput);
    console.log(`${isUp ? "up" : "down"}`);

    addUserTrials(userInput);
    console.log(user.userTrials);

    addCount();
  }

  function addUserTrials(userInput) {}

  async function promptUser() {
    //user의 응답을 받음
    return await readLineAsync(returnSettingQuestion(state.status));
  }

  function checkIsAnswer(userTry, state) {
    return userTry === state.answer;
  }
}

export async function endGame(playState, result) {
  if (result) onSuccessGame();
  if (!result) onFailGame();

  console.log(returnResultMessage(state.status));

  const answer = await askRestart();
  if (answer === "yes") return playGame();

  return console.log("게임을 종료합니다.");

  function onFailGame() {
    changeStatus(playState.status, gameStatus.FAIL);
  }

  function onSuccessGame() {
    changeStatus(playState.status, gameStatus.SUCCESS);
  }

  async function askRestart() {
    return await readLineAsync("다시 시작하시겠습니까? (yes / no) : ");
  }
}

function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new Error("query must be string"));
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
}
