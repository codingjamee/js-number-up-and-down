import { copyObject } from "../utils/util.js";

export const gameStatus = {
  READY: "READY",
  USERSETTING_COUNT: ["min", "max", "limit"],
  COMPUTERSETTING: "COMPUTERSETTING",
  PLAYING: "PLAYING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  ASKRESTART: "ASKRESTART",
  END: "END",
  NOTVALID_ANSWER: "NOTVALID_ANSWER",
};

export const InitialGameConfig = {
  status: gameStatus.READY,
  settingType: "user",
  promptCount: 0,
  totalSettingCount: 3,
  userTrialCount: 0,
  userTrials: [],
  trialLimit: 0,
  answer: 0,
  min: 1,
  max: 50,
};

export const settingConfig = {
  promptCount: 0,
};

export const GameState = () => {
  const state = { ...InitialGameConfig };

  return {
    getState() {
      return copyObject(state); //get함수에서 객체 변경 방지를 위해
    },

    updateState(key, value) {
      state[key] = value;
    },

    resetState() {
      Object.keys(state).map((key) => (state[key] = InitialGameConfig[key]));
    },
  };
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

export function isNumber(answer) {
  //answer가 숫자인지 check함
  return !isNaN(answer);
}


export function checkUpDown(answer, input) {
  return answer > input;
}

export async function runAsyncLoopWhileCondition(loopFn, condition) {
  //특정 조건 내에 함수 반복
  while (condition()) {
    await loopFn();
  }
}

export function addListenerById(id, eventType, callback) {
  const elementId = document.getElementById(id);
  elementId.addEventListener(eventType, callback);
}

export function render(template) {
  const root = document.getElementById("root");
  console.log("add Child");
  mutateDOM().addChild(root, template);
}

export function addChildrenById (id, element) {
  const elementId = document.getElementById(id);
  mutateDOM().addChild(elementId, element)
}

export function removeChildrenById (id){
  const elementId = document.getElementById(id);
  mutateDOM().removeChild(elementId)
}

export function changeTextById(id, text) {
  const elementId = document.getElementById(id);
  elementId.innerText = text;
}

export const getGameInstructions = () => {
  // 안내 메시지 함수들을 리턴

  return {
    returnSettingQuestion(state) {
      //필요한 세팅 요청문구를 return
      const dynamicWord = {
        min: `최솟 값을`,
        max: `최댓 값을`,
        limit: `진행 가능 횟수를`,
      };
      return `게임 시작을 위해 ${dynamicWord[state]} 입력해주세요. :`;
    },
    returnSettingErrorMessage(state) {
      //세팅 에러 메시지를 return
      const dynamicWord = {
        min: "최솟 값이",
        max: "최댓 값이",
        trialLimit: "진행 가능 횟수가",
      };
      return `${dynamicWord[state]} 유효하지 않습니다.`;
    },
    returnGameQuestion(state) {
      return `컴퓨터가 ${state.min}~${state.max} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`;
    },
    returnGameErrorMessage() {
      return "입력하신 숫자가 올바르지 않습니다.";
    },
    returnResultMessage(state) {
      if (state === gameStatus.FAIL)
        return `${state.trialLimit}회 초과! 숫자를 맞추지 못했습니다. (정답: ${state.answer})`;
      if (state === gameStatus.SUCCESS)
        return `정답! 
    축하합니다! ${state.trialCount}번 만에 숫자를 맞추셨습니다.`;
    },
  };
};

export function showGuideMessage(message) {
  // 메시지를 받아서 출력해주는 함수
  console.log(message);
}
