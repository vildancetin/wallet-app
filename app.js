// ? ADD DATE-AMOUNT-AREA PART TO TABLE
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
    const myArr = [];
    let info = { date: date, amountMoney: amount, spendingArea: area };
    myArr.push(info);
    localStorage.setItem("info", JSON.stringify(myArr));
  });

// ? REVENUE PART
const revenueForm = document
  .querySelector(".revenueForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const revenue = Number(document.querySelector("#revenue").value);
    console.log(revenue);

    document.querySelector(".revenueForm").reset();
    addResult(revenue);
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

}

function addResult(revenue) {
  let revenueT = document.querySelector("#total");
  revenueT.textContent = formattedCurrency(revenue);
}

// Formatting as currency
function formattedCurrency(number) {
  let formattedNumber = number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formattedNumber;
}
