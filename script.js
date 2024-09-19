let incomes = [];
let expenses = [];
let categories = [];

// Загрузка данных из localStorage при загрузке страницы
window.onload = function() {
    if (localStorage.getItem("incomes")) {
        incomes = JSON.parse(localStorage.getItem("incomes"));
    }
    if (localStorage.getItem("expenses")) {
        expenses = JSON.parse(localStorage.getItem("expenses"));
    }
    if (localStorage.getItem("categories")) {
        categories = JSON.parse(localStorage.getItem("categories"));
    }
    
    updateBudget();  // Обновить данные на странице
    updateCategoryList();  // Обновить список категорий
    updateExpenseList();  // Отобразить расходы
    updateIncomeList();  // Отобразить доходы
}

// Обработчик добавления дохода
document.getElementById("incomeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const income = parseFloat(document.getElementById("income").value);
    if (income > 0) {
        incomes.push(income);
        updateBudget();
        updateIncomeList();  // Обновить список доходов
        saveData();  // Сохраняем данные после добавления дохода
    }
    document.getElementById("income").value = "";
});

// Очистка всех доходов
document.getElementById("clearIncomes").addEventListener("click", function () {
    incomes = [];
    updateIncomeList();  // Обновить список доходов
    updateBudget();  // Обновить бюджет
    saveData();  // Сохранить изменения
});

// Удаление отдельного дохода
function deleteIncome(index) {
    incomes.splice(index, 1); // Удалить доход по индексу
    updateIncomeList();  // Обновить список доходов
    updateBudget();  // Обновить бюджет
    saveData();  // Сохранить изменения
}

// Функция для обновления списка доходов
function updateIncomeList() {
    const incomeList = document.getElementById("incomeList");
    incomeList.innerHTML = '';  // Очистить текущий список

    incomes.forEach((income, index) => {
        const li = document.createElement("li");
        li.textContent = income.toFixed(2);

        // Создаем кнопку "Удалить"
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.addEventListener("click", function () {
            deleteIncome(index);  // Удалить конкретный доход
        });

        li.appendChild(deleteBtn);  // Добавляем кнопку к элементу списка
        incomeList.appendChild(li);  // Добавляем элемент списка в список доходов
    });
}

// Обработчик добавления расхода
document.getElementById("expenseForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const expense = parseFloat(document.getElementById("expense").value);
    const selectedCategory = document.getElementById("categorySelect").value;

    if (expense > 0 && selectedCategory) {
        expenses.push({ amount: expense, category: selectedCategory });
        updateBudget();
        updateExpenseList();  // Обновить список расходов
        saveData();  // Сохраняем данные после добавления расхода
    }

    document.getElementById("expense").value = "";
    document.getElementById("categorySelect").value = ""; // Сбросить выбор категории
});

// Очистка всех расходов
document.getElementById("clearExpenses").addEventListener("click", function () {
    expenses = [];
    updateExpenseList();  // Обновить список расходов
    updateBudget();  // Обновить бюджет
    saveData();  // Сохранить изменения
});

// Удаление отдельного расхода
function deleteExpense(index) {
    expenses.splice(index, 1); // Удалить расход по индексу
    updateExpenseList();  // Обновить список расходов
    updateBudget();  // Обновить бюджет
    saveData();  // Сохранить изменения
}

// Функция для обновления списка расходов
function updateExpenseList() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = '';  // Очистить текущий список

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.textContent = `${expense.amount.toFixed(2)} - ${expense.category}`;

        // Создаем кнопку "Удалить"
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.addEventListener("click", function () {
            deleteExpense(index);  // Удалить конкретный расход
        });

        li.appendChild(deleteBtn);  // Добавляем кнопку к элементу списка
        expenseList.appendChild(li);  // Добавляем элемент списка в список расходов
    });
}

// Обновляем выпадающий список категорий
function updateCategorySelect() {
    const categorySelect = document.getElementById("categorySelect");
    categorySelect.innerHTML = '<option value="" disabled selected>Выберите категорию</option>'; // Очистить текущий список

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function addExpenseToList(amount, comment) {
    const li = document.createElement("li");
    li.textContent = `${amount.toFixed(2)} - ${comment || 'Без комментария'}`;
    document.getElementById("expenseList").appendChild(li);
}

// Обновляем бюджет
function updateBudget() {
    const totalIncome = incomes.reduce((acc, curr) => acc + curr, 0);
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const balance = totalIncome - totalExpenses;

    document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
    document.getElementById("totalExpenses").textContent = totalExpenses.toFixed(2);
    document.getElementById("balance").textContent = balance.toFixed(2);
}

// Добавляем элемент в список доходов
function addItemToList(amount, listId) {
    const li = document.createElement("li");
    li.textContent = amount.toFixed(2);
    document.getElementById(listId).appendChild(li);
}

// Добавляем элемент в список расходов
function addExpenseToList(amount, category) {
    const li = document.createElement("li");
    li.textContent = `${amount.toFixed(2)} - ${category}`;
    document.getElementById("expenseList").appendChild(li);
}

// Добавляем категорию
document.getElementById("categoryForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const category = document.getElementById("category").value.trim();
    if (category) {
        categories.push(category);
        updateCategoryList();
        saveData();  // Сохраняем данные после добавления категории
    }

    document.getElementById("category").value = "";
});

// Обновляем список категорий
function updateCategoryList() {
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = ''; // Очистить список

    categories.forEach((category, index) => {
        const li = document.createElement("li");
        li.textContent = category;

        // Создаем кнопку "Удалить"
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.addEventListener("click", function () {
            deleteCategory(index);  // Удалить категорию
        });

        li.appendChild(deleteBtn); // Добавляем кнопку к элементу списка
        categoryList.appendChild(li); // Добавляем элемент списка в список категорий
    });

    updateCategorySelect(); // Обновить выпадающий список
}

// Удаляем категорию
function deleteCategory(index) {
    categories.splice(index, 1); // Удалить категорию по индексу
    updateCategoryList(); // Обновить список и выпадающий список
    saveData();  // Сохраняем данные после удаления категории
}

// Очищаем все категории
document.getElementById("clearCategories").addEventListener("click", function () {
    categories = [];
    updateCategoryList(); // Очистить список и выпадающий список
    saveData();  // Сохраняем данные после очистки категорий
});

// Сохранение данных в localStorage
function saveData() {
    localStorage.setItem("incomes", JSON.stringify(incomes));
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("categories", JSON.stringify(categories));
}