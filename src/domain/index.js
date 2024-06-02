/**
 * domain으로 로직을 분리하려면
굳이 한 파일에서 전역변수를 피할 필요가 없으므로 
즉시실행함수는 사용하지 않아도 됨
domain의 하위의 모듈은 view하위의 모듈에 의존하지 말아야 한다는 의미는
view에서 호출한 인수를 변경하면 안된다는 것으로 해석?
 */
/**
계산하고 결과를 출력하는 로직
최소 최대 값 사이의 랜덤숫자 생성
업 다운 정답 계산하여 출력
이전 추측들을 보여준다

 */

export function gameData(min, max) {
  //game 객체를 활용한 이유?
  //하나의 객체로 UI 로직을 호출하여 데이터를 보내주기 위해
  return {
    answer: createRandomNumber(min, max),
    printUpDown,
  };

  function createRandomNumber(min, max) {
    const minNumber = min;
    const maxNumber = max;
    return Math.floor(Math.random() * maxNumber + minNumber);
  }
  function printUpDown(answer, input) {
    if (answer > input) {
      console.log("업");
    }
    if (answer < input) {
      console.log("다운");
    }
  }
  function showInput(guessInput) {
    const guess = [];
    const toNumberInput = parseFloat(guessInput);
    guess.push(toNumberInput);
    console.log(toNumberInput);
    console.log("이전 추측:", guess.join(", "));
  }
}
