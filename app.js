// ? ADD DATE-AMOUNT-AREA PART TO TABLE
const infos = [];
const revenueArr = [];

const walletForm = document
  .querySelector(".walletForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event.target);

    const date = document.querySelector("#date").value;
    const amount = Number(document.querySelector("#amount").value);
    const area = document.querySelector("#area").value;

    document.querySelector(".walletForm").reset();
    addElement(date, amount, area);
  });

// ? REVENUE PART
const revenueForm = document
  .querySelector(".revenueForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const revenue = Number(document.querySelector("#revenue").value);

    document.querySelector(".revenueForm").reset();
    addResult(revenue);
  });

window.addEventListener("load", () => {
  let info = JSON.parse(localStorage.getItem("info"));

  if (info) {
    displayInfo(info);
  }
});
// ? ADD NEW ELEMENT TO TABLE
function addElement(date, amount, area) {
  let row = document.createElement("tr");

  let dateT = document.createElement("td");
  let amountT = document.createElement("td");
  let areaT = document.createElement("td");
  let process = document.createElement("td");

  dateT.textContent = date;
  amountT.textContent = formattedCurrency(amount);
  areaT.textContent = area;
  process.textContent = "@";

  row.append(dateT, amountT, areaT, process);
  document.querySelector("#spend-body").appendChild(row);

  let info = { date: date, amountMoney: amount, spendingArea: area };
  infos.push(info);
  localStorage.setItem("info", JSON.stringify(infos));
}

function addResult(revenue) {
  let revenueT = document.querySelector("#total");
  revenueT.textContent = formattedCurrency(revenue);

  revenueArr.push(revenue);
  localStorage.setItem("revenue", JSON.stringify(revenueArr));

  let expense = document.getElementById("expense");
  let totalExpense = JSON.parse(localStorage.getItem("info")).reduce(
    (acc, val) => {
      return acc + val.amountMoney;
    },
    0
  );
  expense.textContent = formattedCurrency(totalExpense);
  console.log(totalExpense);

  let rest = document.getElementById("rest");
  rest.textContent = formattedCurrency(revenue - totalExpense);
}

// Formatting as currency
function formattedCurrency(number) {
  let formattedNumber = number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formattedNumber;
}

function displayInfo(info) {

  info.forEach((element) => {

  let row = document.createElement("tr");
    let dateT = document.createElement("td");
    let amountT = document.createElement("td");
    let areaT = document.createElement("td");
    let process = document.createElement("td");

    console.log(element);
    row.append(dateT, amountT, areaT, process);
    dateT.textContent = element.date;
    amountT.textContent = formattedCurrency(element.amountMoney);
    areaT.textContent = element.spendingArea;
    process.textContent = "@";

     document.querySelector("#spend-body").appendChild(row);
    
  });
  
 
}
