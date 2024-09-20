import { initializeBudget } from './budget.js';
import { initializeExpenses } from './expense.js';
import { initializeReferences } from './reference.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeBudget();
    initializeExpenses();
    initializeReferences();
});