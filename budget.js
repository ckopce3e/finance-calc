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

    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('balance').textContent = balance.toFixed(2);
}

export function initializeBudget() {
    const incomeForm = document.getElementById('incomeForm');
    const incomeList = document.getElementById('incomeList');
    const clearIncomes = document.getElementById('clearIncomes');

    let incomes = loadIncomesFromLocalStorage();
    totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    incomes.forEach((income, index) => {
        addIncomeToList(income, index);
    });
    updateBudget();

    incomeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const incomeValue = parseFloat(document.getElementById('income').value);
        const userName = document.getElementById('userSelect').value;
        if (isNaN(incomeValue) || !userName) return;

        const income = { userName, amount: incomeValue };
        incomes.push(income);
        addIncomeToList(income, incomes.length - 1);

        totalIncome += incomeValue;
        localStorage.setItem('totalIncome', totalIncome);
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

function addIncomeToList(income, index) {
    const incomeList = document.getElementById('incomeList');
    const incomeItem = document.createElement('li');
    incomeItem.textContent = `Доход от ${income.userName}: ${income.amount} руб.`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => {
        totalIncome -= income.amount;
        localStorage.setItem('totalIncome', totalIncome);

        const incomes = loadIncomesFromLocalStorage();
        incomes.splice(index, 1);
        saveIncomesToLocalStorage(incomes);

        incomeList.removeChild(incomeItem);
        updateBudget();
    });

    incomeItem.appendChild(deleteButton);
    incomeList.appendChild(incomeItem);
}
