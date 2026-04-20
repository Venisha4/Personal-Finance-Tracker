let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

displayTransactions();
updateUI();

function showPage(page) {

    document.getElementById("dashboardPage").style.display = "none";
    document.getElementById("addPage").style.display = "none";
    document.getElementById("viewPage").style.display = "none";

    if (page === "dashboard") {
        document.getElementById("dashboardPage").style.display = "block";
    }

    if (page === "add") {
        document.getElementById("addPage").style.display = "block";
    }

    if (page === "view") {
        document.getElementById("viewPage").style.display = "block";
        displayTransactions();
    }
}

function addTransaction() {

    let desc = document.getElementById("desc").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;

    if (!desc || !amount) {
        alert("Please fill all fields");
        return;
    }

    transactions.push({
        id: Date.now(),
        desc,
        amount,
        type,
        category
    });

    saveData();
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveData();
}

function displayTransactions() {

    let list = document.getElementById("list");
    list.innerHTML = "";

    transactions.forEach(t => {
        list.innerHTML += `
        <tr>
            <td>${t.desc}</td>
            <td>${t.amount}</td>
            <td class="${t.type}-text">${t.type}</td>
            <td>${t.category}</td>
            <td><button class="delete-btn" onclick="deleteTransaction(${t.id})">X</button></td>
        </tr>`;
    });
}

function updateUI() {

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;
    });

    document.getElementById("income").innerText = income;
    document.getElementById("expense").innerText = expense;
    document.getElementById("balance").innerText = income - expense;
}

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();
    updateUI();

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}

function filterData(type) {

    let list = document.getElementById("list");
    list.innerHTML = "";

    let filtered = transactions;

    if (type !== "all") {
        filtered = transactions.filter(t => t.type === type);
    }

    filtered.forEach(t => {
        list.innerHTML += `
        <tr>
            <td>${t.desc}</td>
            <td>${t.amount}</td>
            <td class="${t.type}-text">${t.type}</td>
            <td>${t.category}</td>
            <td><button class="delete-btn" onclick="deleteTransaction(${t.id})">X</button></td>
        </tr>`;
    });
}