/**
 *
domain의 하위의 모듈은 view하위의 모듈에 의존하지 말아야 한다는 의미는
view에서 전달한 인수를 변경하면 안된다는 것으로 해석?
함수내의 내부함수로 설정한 까닭은 
 */
/**
계산하고 결과를 출력하는 로직
최소 최대 값 사이의 랜덤숫자 생성
업 다운 정답 계산하여 출력
이전 추측들을 보여준다

 */

export function gameData(min, max) {
  //객체를 활용한 이유 하나의 객체로 UI 로직을 호출하여 데이터를 보내주기 위해
  return {
    answer: createRandomNumber(min, max),
    printUpDown,
    showInput,
    numberValidation,
    parseBoundary,
    isAnswerCorrect,
  };

  function createRandomNumber(min, max) {
    const minNumber = min;
    const maxNumber = max;
    return Math.floor(Math.random() * maxNumber + minNumber);
  }

  function printUpDown(answer, input) {
    if (answer > input) {
      return "업";
    }
    if (answer < input) {
      return "다운";
    }
  }

  function showInput(guessArr, guessInput) {
    const guess = guessArr;
    const toNumberInput = parseFloat(guessInput);
    if (Array.isArray(guess)) guess.push(toNumberInput);
    return guess;
  }

  function numberValidation(...userInput) {
    let isValid;
    isValid = userInput.every((input) => !isNaN(input));
    return isValid;
  }

  function parseBoundary(boundary) {
    const [first, second] = boundary.split(",");
    const minNumber = Math.min(first, second);
    const maxNumber = Math.max(first, second);
    return [minNumber, maxNumber];
  }

  function isAnswerCorrect(input, answer) {
    return input === answer;
  }
}
