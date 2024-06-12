/**
계산 로직과 다른점은
계산은 사용자와의 인터렉션에 관련이 없으나
UI는 사용자와의 인터렉션에 관련이 있음
그러므로 count에 따라 보여줘야할지 말지는 UI에서 다뤄야 한다고 판단했음
 */
import readline from "readline";
import { gameData, InitialGameConfig } from "../domain/index.js";
import { gameStatus } from "../domain/index.js";

/**
 * 따로 constant 객체로 뺀 이유
 * 나중에 문구를 수정할 때 묶어두면 편함
 * 프로퍼티 명으로 문구 빠르게 유추 가능
 */

const constant = {
  askBoundary: "게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50) ",
  askTrialLimit: "게임 시작을 위해 진행 가능 횟수를 입력해주세요.",
  askRestart: "게임을 다시 시작하시겠습니까? (yes/no): ",
  restart: "게임을 다시 시작합니다.",
};

const getGameStatusMessages = ({
  notValidType,
  answer,
  trialCount,
  minNumber,
  maxNumber,
}) => {
  return {
    notValid: `입력하신 ${notValidType}이 유효하지 않습니다.`,
    guessNumber: `컴퓨터가 ${minNumber}~${maxNumber} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`,
    correct: `정답! 
  축하합니다! ${trialCount}번 만에 숫자를 맞추셨습니다.`,
    fail: `5회 초과! 숫자를 맞추지 못했습니다. (정답: ${answer})`,
    end: "게임을 종료합니다.",
  };
};

/**
사용자 입력을 받는다
최소 최대값 입력을 받는다 
재시작 종료 옵션
몇회만에 맞췄는지 보여준다
*/

export async function startGame() {
  const state = initializeGameSetting();

  while (state.status === gameStatus.USERSETTING) {
    promptUserSetting();
  }

  return playGame(state);

  function initializeGameSetting() {
    return { ...InitialGameConfig };
  }

  function promptUserSetting() {
    const promptCount = 1;
    // changeState(state.status, gameStatus.USERSETTING[promptCount]);
  }
}

export async function playGame(state) {

  while (state.status === gameStatus.PLAYING) {
    promptUser();
  }


  function checkStatus(state) {
    //상태를 check함
  }

}
export async function endGame() {}
