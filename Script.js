const recipes = {
  financier: {
    이름: "휘낭시에",
    기준키: "white",
    기준이름: "흰자",
    재료: {
      white: { 이름: "흰자", 값: 105 },
      sugar: { 이름: "설탕", 값: 110 },
      honey: { 이름: "꿀", 값: 15 },
      salt: { 이름: "소금", 값: 2 },
      flour: { 이름: "중력분", 값: 50 },
      almond: { 이름: "아몬드", 값: 75 },
      butter: { 이름: "버터", 값: 125 }
    }
  },

  sable: {
    이름: "사브레 플레인",
    기준키: "yolk",
    기준이름: "노른자",
    재료: {
      yolk: { 이름: "노른자", 값: 110 },
      butter: { 이름: "버터", 값: 462 },
      sugar: { 이름: "설탕", 값: 220 },
      salt: { 이름: "소금", 값: 5.5 },
      flour: { 이름: "중력분", 값: 660 },
      chocolate: { 이름: "초코칩", 값: 140 }
    }
  },

  sable_choc: {
    이름: "사브레 초코",
    기준키: "노른자",
    기준이름: "노른자",
    재료: {
      버터: { 이름: "버터", 값: 462 },
      설탕:   { 이름: "설탕", 값: 250 },
      소금:   { 이름: "소금", 값: 5.5 },
      노른자:   { 이름: "노른자", 값: 110 },
      중력분: { 이름: "중력분", 값: 605 },
      코코아: { 이름: "코코아파우더", 값: 55 },
      아몬드: { 이름: "아몬드", 값: 140 }
    }
  },
}

let current = "financier"

function renderInputs() {
  const box = document.getElementById("inputs")
  box.innerHTML = ""

  const recipe = recipes[current]

  for (const key in recipe.재료) {
    const item = recipe.재료[key]
    box.innerHTML += `
      <label>
        ${item.이름}
        <input type="number" id="${key}" value="${item.값}">
      </label>
    `
  }

  box.innerHTML += `
    <div class="divider"></div>
    <label class="base">
      새 ${recipe.기준이름} (x)
      <input type="number" id="newBase" value="${recipe.재료[recipe.기준키].값}">
    </label>
  `

  document.querySelectorAll("input").forEach(el => {
    el.addEventListener("input", calc)
  })

  calc()
}

function calc() {
  const recipe = recipes[current]
  const baseKey = recipe.기준키

  const base = Number(document.getElementById(baseKey).value)
  const newBase = Number(document.getElementById("newBase").value)

  if (!base || !newBase) {
    result.innerText = "기준 값이 0이거나 잘못됨"
    return
  }

  let out = `${recipe.이름}\n`
  out += `${recipe.기준이름} ${newBase} 기준\n\n`

  for (const key in recipe.재료) {
    const item = recipe.재료[key]
    const v = Number(document.getElementById(key).value)
    const scaled = (v / base) * newBase
    out += `${item.이름}: ${scaled.toFixed(1)} g\n`
  }

  result.innerText = out
}

/* 레시피 체인저 */
financierBtn.onclick = () => {
  current = "financier"
  financierBtn.classList.add("active")
  sableBtn.classList.remove("active")
  sableChocBtn.classList.remove("active")
  renderInputs()
}

sableBtn.onclick = () => {
  current = "sable"
  sableBtn.classList.add("active")
  financierBtn.classList.remove("active")
  sableChocBtn.classList.remove("active")
  renderInputs()
}

sableChocBtn.onclick = () => {
  current = "sable_choc"
  sableChocBtn.classList.add("active")
  sableBtn.classList.remove("active")
  financierBtn.classList.remove("active")
  renderInputs()
}


/* 시작 */
renderInputs()
