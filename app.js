import { initializeBudget } from './budget.js';
import { initializeExpenses } from './expense.js';
import { initializeReferences } from './reference.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeBudget();
    initializeExpenses();
    initializeReferences();

    // Обновляем вид бюджета при загрузке
    const totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;
    const totalExpenses = parseFloat(localStorage.getItem('totalExpenses')) || 0;
    const balance = totalIncome - totalExpenses;

    document.getElementById('totalIncome').textContent = totalIncome.toFixed(2);
    document.getElementById('totalExpenses').textContent = totalExpenses.toFixed(2);
    document.getElementById('balance').textContent = balance.toFixed(2);
});
