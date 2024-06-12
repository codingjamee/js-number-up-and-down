
// export function gameData() {
//   return {
//     createRandomNumber: (min, max) => createRandomNumber(min, max),
//     printUpDown,
//     showInput,
//     numberValidation,
//     parseBoundary,
//     isAnswerCorrect,
//   };


//   function printUpDown(answer, input) {
//     if (answer > input) {
//       return "업";
//     }
//     if (answer < input) {
//       return "다운";
//     }
//   }

//   function showInput(guessArr, guessInput) {
//     const guess = guessArr;
//     const toNumberInput = parseFloat(guessInput);
//     if (Array.isArray(guess)) guess.push(toNumberInput);
//     return guess;
//   }

//   function numberValidation(...userInput) {
//     let isValid;
//     isValid = userInput.every((input) => !isNaN(input));
//     return isValid;
//   }

//   function parseBoundary(boundary) {
//     const [first, second] = boundary.split(",");
//     const minNumber = Math.min(first, second);
//     const maxNumber = Math.max(first, second);
//     return [minNumber, maxNumber];
//   }

//   function isAnswerCorrect(input, answer) {
//     return input === answer;
//   }
// }

export const gameStatus = {
  READY: "READY",
  USERSETTING_COUNT: ["MIN", "MAX", "TRIALLIMIT"],
  DEFAULTSETTING: "DEFAULTSETTING",
  PLAYING: "PLAYING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  ASKRESTART: "ASKRESTART",
  END: "END",
};

export const InitialGameConfig = {
  status: gameStatus.READY,
  settingType: "user",
  userTrialCount: 0,
  userTrials: [],
  trialLimit: 0,
  answer: 0,
  min: 1,
  max: 50,
};

export function returnSettingQuestion(state) {
  //필요한 세팅 요청문구를 return
  const dynamicWord = {
    min: `최솟 값을`,
    max: `최댓 값을`,
    limit: `게임 시작을 위해 진행 가능 횟수를`,
  };
  return `게임 시작을 위해 ${dynamicWord[state]} 입력해주세요.`;
}

export function returnSettingErrorMessage(state) {
  //세팅 에러 메시지를 return
  const dynamicWord = {
    min: "최솟 값",
    max: "최댓 값",
    trialLimit: "진행 가능 횟수",
  };
  return `${dynamicWord[state]}이 유효하지 않습니다.`;
}

export const settingConfig = {
  promptCount: 1,
  totalSettingCount: 3,
};

export function createRandomNumber(min, max) {
  const minNumber = min;
  const maxNumber = max;
  return Math.floor(Math.random() * maxNumber + minNumber);
}

export function changeStatus(state, change) {
  //status를 변경
  state = change;
  return;
}


export function checkPromptNumber(prompt) {
  //prompt가 숫자인지 check함
  return userInput.every((input) => !isNaN(input));
}