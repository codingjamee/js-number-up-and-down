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
} from "../domain/index.js";



export async function startGame() {
  const { promptCount, totalSettingCount } = { ...settingConfig };
  const state = initializeGameSetting();

  const whileCondition = promptCount <= totalSettingCount;
  loopWhileCondition(promptUserSetting, whileCondition);

  const targetStatus = gameStatus.USERSETTING_COUNT[promptCount];
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

  function loopWhileCondition(loopFn, condition) {
    //특정 조건 내에 함수 반복
    while (condition) {
      loopFn();
    }
  }

  async function promptUserSetting() {
    //count만큼 user setting받기
    const result = await readLineAsync(returnSettingQuestion(state.status));

    const isValid = checkPromptNumber(result);
    if (!isValid) return console.log(returnSettingErrorMessage(state.status));

    const nowStatus = state[gameStatus.USERSETTING_COUNT[promptCount]];
    changeStatus(nowStatus, result);
    addCount(promptCount);
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

// export async function playGame(state) {
//   const playState = { ...state };

//   while (state.status === gameStatus.PLAYING) {
//     promptUser();
//   }

//   async function promptUser() {
//     //user의 응답을 받음
//     return await readLineAsync();
//   }
// }
// export async function endGame() {}
