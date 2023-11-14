// ? ADD DATE-AMOUNT-AREA PART TO TABLE

let infos = [];
let revenues=0;

// ? SELECTORS

// * Revenue form

const revenue = document.querySelector("#revenue");
const revenueForm = document.querySelector(".revenueForm")
const checkBtn= document.querySelector(".check-btn")


// * Spend form

const walletForm = document.querySelector(".walletForm")
const date = document.querySelector("#date");
const amount = document.querySelector("#amount")
const area = document.querySelector("#area");


// *Result table

let expense = document.getElementById("expense");
let rest = document.getElementById("rest");
let revenueT = document.querySelector("#total");

// * Spend table

const spendBody=document.querySelector("#spend-body")
const clearBtn=document.getElementById("clear-btn")

// ? CREATE OBJECT
// ? create object with entered values and save to localstorage
walletForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event.target);

    let info = { 
      id:new Date().getTime(),
      date: date.value, 
      amountMoney: Number(amount.value), 
      spendingArea: area.value };
      walletForm.reset();
    infos.push(info);
    localStorage.setItem("infos", JSON.stringify(infos));
    writeToDOM(info)
    countAndUpdate()
    
  });

// ? REVENUE PART
// ? save entered revenues to localstorage 
revenueForm.addEventListener("submit", (event) => {
    event.preventDefault();
    revenues = revenues + Number(revenue.value)
    localStorage.setItem("revenue",revenues);    
    revenueT.textContent = formattedCurrency(revenues);
    revenueForm.reset();
    countAndUpdate()
    
  });

  // ? PAGE LOAD
  // ? when page load get an array from localstorage and write to DOM  
window.addEventListener("load", () => {
  infos = JSON.parse(localStorage.getItem("infos")) || [];
  infos.forEach((info)=>{writeToDOM(info)})
  date.valueAsDate=new Date()
  countAndUpdate()
  
});

// ? ADD NEW ELEMENT TO TABLE
// ? this function take parameter as an object and create table elments and writes to DOM
function writeToDOM({id,date,amountMoney,spendingArea}) {
  let row = document.createElement("tr");
  console.log(amountMoney)
  const appendTd=(content)=>{
    const td=document.createElement("td")
    td.textContent=content
    return td
  }
  const formatted=(amount)=>{
    const td=document.createElement("td")
    td.textContent=formattedCurrency(Number(amount))
    return td
  }
  //  ? create delete item
  const lastTd=()=>{
    const td = document.createElement("td")
    const iElement=document.createElement("i")
    iElement.id=id
    iElement.className="fa-solid fa-trash-can text-danger"
    iElement.type="button"
    td.appendChild(iElement)
    return td
  }

  row.append(
    appendTd(date),
    appendTd(spendingArea),
    formatted(amountMoney),
    lastTd()
  )
  // ? add to table body
  spendBody.prepend(row);

 
}

// ? COUNT AND UPDATE
// ? calculate all expense and show the rest money 
function countAndUpdate() {
  revenues=Number(localStorage.getItem("revenue")) || 0
  revenueT.textContent=formattedCurrency(revenues)
  let totalExpense = JSON.parse(localStorage.getItem("infos")).reduce(
    (acc, val) => {
      return acc + val.amountMoney;
    },
    0
  );
  expense.textContent = formattedCurrency(totalExpense);
  console.log(totalExpense);

  rest.textContent = formattedCurrency(revenues - totalExpense);
}

// ?  Formatting as currency
function formattedCurrency(number) {
  let formattedNumber = number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formattedNumber;
}

// ? REMOVE ELEMENT
// ? when click to delete item it remove the table row and update localstorage and expenses
spendBody.addEventListener("click",(event)=>{
  console.log(event.target)
  if(event.target.classList.contains("fa-trash-can")){
    // console.log(event.target.closest("tr"))
    event.target.parentElement.parentElement.remove()
    event.target.closest("tr").remove()
  }


  const id=event.target.id

  infos=infos.filter((i)=>i.id!=id)

  localStorage.setItem("infos",JSON.stringify(infos))

  countAndUpdate()
})

// ? DELETE ALL INFORMATION
// ? delete all info 
clearBtn.addEventListener("click",()=>{
  if(confirm("Are you sure to delete?")){
    infos=[]
    revenues=0
    localStorage.removeItem("infos")
    localStorage.removeItem("revenue")
    spendBody.innerHTML=""
    countAndUpdate()
  }
})