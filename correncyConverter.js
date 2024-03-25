Base_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

function updateFlag(element) {
  let flagCode = element.value;
  let code = countryList[flagCode];
  let newSrc = `https://flagsapi.com/${code}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

for (let select of dropdowns) {
  for (cntryCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = cntryCode;
    newOption.value = cntryCode;
    if (select.name === "from" && cntryCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && cntryCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

async function updtExchRate() {
  let amounnt = document.querySelector("input");
  let value = amounnt.value;
  if (value == "" || value < 1) {
    value = 1;
    amounnt.value = "1";
  }

  const URL = `${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  let finalAmount = value * data[toCurr.value.toLowerCase()];
  msg.innerText = `${value} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `;
}
btn.addEventListener("click", (event) => {
  event.preventDefault();
  updtExchRate();
});
