export const gameStatus = {
  READY: "READY",
  USERSETTING_COUNT: ["min", "max", "limit"],
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
    limit: `진행 가능 횟수를`,
  };
  return `게임 시작을 위해 ${dynamicWord[state]} 입력해주세요. :`;
}

export function returnSettingErrorMessage(state) {
  //세팅 에러 메시지를 return
  const dynamicWord = {
    min: "최솟 값이",
    max: "최댓 값이",
    trialLimit: "진행 가능 횟수가",
  };
  return `${dynamicWord[state]} 유효하지 않습니다.`;
}

export function returnGameQuestion(state) {
  return `컴퓨터가 ${state.min}~${state.max} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`;
}

export function returnGameErrorMessage() {
  return "입력하신 숫자가 올바르지 않습니다.";
}

export function returnResultMessage(state) {
  if (state === gameStatus.FAIL)
    return `${state.trialLimit}회 초과! 숫자를 맞추지 못했습니다. (정답: ${state.answer})`;
  if (state === gameStatus.SUCCESS)
    return `정답! 
  축하합니다! ${state.trialCount}번 만에 숫자를 맞추셨습니다.`;
}

export const settingConfig = {
  promptCount: 0,
  totalSettingCount: 3,
};

export function createRandomNumber(min, max) {
  const minNumber = min;
  const maxNumber = max;
  return Math.floor(Math.random() * maxNumber + minNumber);
}

export function parseBoundary(boundary) {
  const [first, second] = boundary.split(",");
  const minNumber = Math.min(first, second);
  const maxNumber = Math.max(first, second);
  return [minNumber, maxNumber];
}

export function changeState(state, change) {
  if(state.status) state.status = change;
}

export function changeAnswer(state, change) {
  //status를 변경
  state.answer = change;
}

export function checkPromptNumber(prompt) {
  //prompt가 숫자인지 check함
  return prompt.every((input) => !isNaN(input));
}

export function copyArr(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export function pushArr(arr, elem) {
  return arr.push(elem);
}

export function checkUpDown(answer, input) {
  return answer > input;
}

export async function asyncloopWhileCondition(loopFn, condition) {
  //특정 조건 내에 함수 반복
  while (condition) {
    await loopFn();
  }
}
