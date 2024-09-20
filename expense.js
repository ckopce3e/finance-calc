function saveExpensesToLocalStorage(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpensesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('expenses')) || [];
}

export function initializeExpenses() {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
    const clearExpenses = document.getElementById('clearExpenses');

    let expenses = loadExpensesFromLocalStorage();
    totalExpenses = parseFloat(localStorage.getItem('totalExpenses')) || 0;

    // Отображаем ранее добавленные расходы
    expenses.forEach(expense => {
        const expenseItem = document.createElement('li');
        expenseItem.textContent = `Расход на ${expense.category}: ${expense.amount} руб.`;
        expenseList.appendChild(expenseItem);
    });
    updateExpenses();

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const expenseValue = parseFloat(document.getElementById('expense').value);
        const category = document.getElementById('categorySelect').value;
        if (isNaN(expenseValue) || !category) return;

        const expenseItem = document.createElement('li');
        expenseItem.textContent = `Расход на ${category}: ${expenseValue} руб.`;
        expenseList.appendChild(expenseItem);

        totalExpenses += expenseValue;
        localStorage.setItem('totalExpenses', totalExpenses);

        // Сохраняем новый расход в массив
        expenses.push({ category, amount: expenseValue });
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
