export function startTemplate() {
  return `
  <div>
    <label>숫자 범위</label>
    <input id="minNumber" placeholder="최소" name="min"> ~ 
    <input id="maxNumber" placeholder="최대" name="max">
  </div>
  <div>
    <label>진행 가능 횟수</label>
    <input id="trialLimit" name="trialLimit"/>
  </div>
  `;
}

export function playTemplate() {
  return `
  <div>
    <label>숫자 입력</label>
    <input id="userTrial" name="userTrial"/>
    <button id="tryBtn">확인</button>
  </div>
  <div>
    <h1>진행 화면</h1>
    <div id="instructionView"></div>
  </div>
  `;
}

export function endTemplate() {
  return `
  <div>
    게임이 종료되었습니다. 다시 시작하시겠습니까?
  </div>
  `;
}

export function getDivTemplate(element) {
  return `<div>${element}</div>`;
}

export function containerTemplate(template) {
  return `
  <style>
  
  </style>
  <article class="container">
    <h1>🔢 숫자 업 & 다운 Game</h1>
    <h3>게임설정</h3>
    <form id="userSubmitData">
     ${template}
      <button type="submit" id="submitBtn"></button>
    </form>
  </article>
`;
}
