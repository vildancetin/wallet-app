const spendBody = document.querySelector("#spend-body");
const clearBtn = document.getElementById("clear-btn");

let expense = document.getElementById("expense");
let rest = document.getElementById("rest");
let totalRevenue = document.querySelector("#total");

window.addEventListener("load", () => {
  infos = JSON.parse(localStorage.getItem("infos")) || [];
  infos.forEach((info) => {
    writeToDOM(info);
  });

});

// ? ADD NEW ELEMENT TO TABLE
// ? this function take parameter as an object and create table elments and writes to DOM
function writeToDOM({ id, date, amountMoney, spendingArea }) {
  let row = document.createElement("tr");
  console.log(amountMoney);
  const appendTd = (content) => {
    const td = document.createElement("td");
    td.textContent = content;
    return td;
  };
  const formatted = (amount) => {
    const td = document.createElement("td");
    td.textContent = formattedCurrency(Number(amount));
    return td;
  };



  row.append(appendTd(date), appendTd(spendingArea), formatted(amountMoney));
  // ? add to table body
  spendBody.prepend(row);

  let total = Number(localStorage.getItem("revenue"));
  totalRevenue.textContent = formattedCurrency(total);

  let totalExpense = JSON.parse(localStorage.getItem("infos")).reduce(
    (acc, val) => {
      return acc + val.amountMoney;
    },
    0
  );
  expense.textContent = formattedCurrency(totalExpense);
  console.log(total - totalExpense);
  rest.textContent = formattedCurrency(total - totalExpense);
}

// ?  Formatting as currency
function formattedCurrency(number) {
  let formattedNumber = number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formattedNumber;
}
