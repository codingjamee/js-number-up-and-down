export function startTemplate() {
  return `
  <div>
    <label>숫자 범위</label>
    <input id="minNumber" placeholder="최소" name="min"> ~ 
    <input id="maxNumber" placeholder="최대" name="max">
  </div>
  <div>
    <label>진행 가능 횟수</label>
    <input id="trialLimit" name="trial"/>
  </div>
  `;
}

export function playTemplate() {
  return `
<div>
  <label>숫자 범위</label>
  <input id="minNumber" placeholder="최소" name="min"> ~ 
  <input id="maxNumber" placeholder="최대" name="max">
</div>
<div>
  <label>진행 가능 횟수</label>
  <input id="trialLimit" name="trial"/>
</div>
  `;
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