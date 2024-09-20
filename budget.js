let totalIncome = 0;

function saveIncomesToLocalStorage(incomes) {
    localStorage.setItem('incomes', JSON.stringify(incomes));
}

function loadIncomesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('incomes')) || [];
}

function updateBudget() {
    const totalExpenses = parseFloat(localStorage.getItem('totalExpenses')) || 0;
    const balance = totalIncome - totalExpenses;

    document.getElementById('balance').textContent = balance.toFixed(2);
}

export function initializeBudget() {
    const incomeForm = document.getElementById('incomeForm');
    const incomeList = document.getElementById('incomeList');
    const clearIncomes = document.getElementById('clearIncomes');

    let incomes = loadIncomesFromLocalStorage();
    totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;

    incomes.forEach(income => {
        const incomeItem = document.createElement('li');
        incomeItem.textContent = `Доход от ${income.userName}: ${income.amount} руб.`;
        incomeList.appendChild(incomeItem);
    });
    updateBudget();

    incomeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const incomeValue = parseFloat(document.getElementById('income').value);
        const userName = document.getElementById('userSelect').value;
        if (isNaN(incomeValue) || !userName) return;

        const incomeItem = document.createElement('li');
        incomeItem.textContent = `Доход от ${userName}: ${incomeValue} руб.`;
        incomeList.appendChild(incomeItem);

        totalIncome += incomeValue;
        localStorage.setItem('totalIncome', totalIncome);

        incomes.push({ userName, amount: incomeValue });
        saveIncomesToLocalStorage(incomes);

        updateBudget();
        document.getElementById('income').value = '';
    });

    clearIncomes.addEventListener('click', () => {
        totalIncome = 0;
        localStorage.removeItem('totalIncome');
        incomes = [];
        saveIncomesToLocalStorage(incomes);
        incomeList.innerHTML = '';
        updateBudget();
    });
}