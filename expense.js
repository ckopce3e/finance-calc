let totalExpenses = 0;

function saveExpensesToLocalStorage(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpensesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('expenses')) || [];
}

function updateExpenses() {
    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
    updateBudgetDisplay(); // Обновляем отображение бюджета
}

function updateBudgetDisplay() {
    const totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    const balance = totalIncome - totalExpenses;

    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('balance').textContent = balance.toFixed(2);
}

export function initializeExpenses() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const clearExpenses = document.getElementById('clearExpenses');

    let expenses = loadExpensesFromLocalStorage();
    totalExpenses = parseFloat(localStorage.getItem('totalExpenses')) || 0;

    expenses.forEach((expense, index) => {
        addExpenseToList(expense, index);
    });
    updateExpenses();

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const expenseValue = parseFloat(document.getElementById('expense').value);
        const category = document.getElementById('categorySelect').value;
        if (isNaN(expenseValue) || !category) return;

        const expense = { category, amount: expenseValue };
        expenses.push(expense);
        addExpenseToList(expense, expenses.length - 1);

        totalExpenses += expenseValue;
        localStorage.setItem('totalExpenses', totalExpenses);
        saveExpensesToLocalStorage(expenses);

        updateExpenses();
        document.getElementById('expense').value = '';
    });

    clearExpenses.addEventListener('click', () => {
        totalExpenses = 0;
        localStorage.removeItem('totalExpenses');
        expenses = [];
        saveExpensesToLocalStorage(expenses);
        expenseList.innerHTML = '';
        updateExpenses();
    });
}

function addExpenseToList(expense, index) {
    const expenseList = document.getElementById('expenseList');
    const expenseItem = document.createElement('li');
    expenseItem.textContent = `Расход на ${expense.category}: ${expense.amount} руб.`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => {
        totalExpenses -= expense.amount;
        localStorage.setItem('totalExpenses', totalExpenses);

        const expenses = loadExpensesFromLocalStorage();
        expenses.splice(index, 1);
        saveExpensesToLocalStorage(expenses);

        expenseList.removeChild(expenseItem);
        updateExpenses();
    });

    expenseItem.appendChild(deleteButton);
    expenseList.appendChild(expenseItem);
}
