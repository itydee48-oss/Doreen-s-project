// 1. Get HTML Elements //
const form = document.querySelector("#transactionForm form");

const descriptionInput = document.getElementById("description");
const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amt");
const dateInput = document.getElementById("date");

const balanceDisplay = document.getElementById("Balance");
const incomeDisplay = document.getElementById("Income");
const expensesDisplay = document.getElementById("Expense");

const transactionList = document.getElementById("transaction-list");

// Local storage key
const STORAGE_KEY = "transactions";

// Load saved transactions
let transactions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

displayTransactions();


// function save transaction
function saveTransactionsToLocalStorage(){
localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// function addTransaction

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const type = typeInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    // Validation
    if (!description || !type || !date) {
        alert("Please fill in all fields.");
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        alert("Amount must be greater than 0.");
        return;
    }

    // Create transaction
    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        date: date
    };

    // Add transaction to array
    transactions.push(transaction);
    console.log(transaction);

    // Save to localStorage
    saveTransactionsToLocalStorage();

    // Update the page
    displayTransactions();
    updateSummary();

    // Clear form
    form.reset();

});

//Updating content in the cards
function updateSummary(){
    let totalIncome=0;
    let totalExpenses=0;

    transactions.forEach(function (transaction){
        if(transaction.type==="Income"){
            totalIncome+=transaction.amount;
           // console.log("inc:"+totalIncome);
        }
        if(transaction.type==="Expense"){
            totalExpenses+=transaction.amount;
            //console.log("expens:"+totalExpenses);
        }
    
    });

    const balance=totalIncome-totalExpenses;
   //console.log("bal:"+balance);
    
    //Displaying current balance,total income and total expense on their relative cards
    balanceDisplay.textContent=balance;
    incomeDisplay.textContent=totalIncome;
    expensesDisplay.textContent=totalExpenses;
}

function displayTransactions(){
    transactionList.innerHTML="";

    if(transactionList.length===0){
        const message=document.createElement("p");
        message.textContent="No transaction yet";

        transactionList.appendChild(message);
        return;
    }
    
    transactions.forEach(function(transaction){
        const transactList=document.createElement("li");
        
        transactList.innerHTML=`
        <span>Description: ${transaction.description}</span>
        <span>Type: ${transaction.type}</span>
        <span>Amount: ${transaction.amount}</span>
        <span>Date: ${transaction.date}</span>
        <button class="delete-btn" id="${transaction.id}">Delete</button>
        `;
        
        //Adding a delete button after each transaction
        
    
    transactionList.appendChild(transactList);
    });
}
