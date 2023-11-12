
const add=document.querySelector(".add-btn")
const check=document.querySelector(".check-btn")


const walletForm=document.querySelector(".walletForm").addEventListener("submit",(event)=>{
    event.preventDefault()
    console.log(event.target)

    const date = document.querySelector("#date").value
    const amount=document.querySelector("#amount").value
    const area=document.querySelector("#area").value
    console.log(date,amount,area)

    document.querySelector(".walletForm").reset();
})

const revenueForm=document.querySelector(".revenueForm").addEventListener("submit",(event)=>{
    event.preventDefault()
    const revenue=document.querySelector("#revenue").value
    console.log(revenue)

    document.querySelector(".walletForm").reset();
})