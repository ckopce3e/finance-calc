// Функция для переключения вкладок
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        const tab = button.getAttribute('data-tab');
        button.classList.add('active');
        document.getElementById(tab).classList.add('active');
    });
});

// При загрузке страницы активируем первую вкладку
window.onload = function () {
    document.querySelector('.tab-button').click();
};

// Обработка доходов
const incomeForm = document.getElementById("incomeForm");
const incomeList = document.getElementById("incomeList");
const userSelect = document.getElementById("userSelect");

let incomes = JSON.parse(localStorage.getItem("incomes")) || [];

function updateIncomes() {
    incomeList.innerHTML = "";
    incomes.forEach((income, index) => {
        const li = document.createElement("li");
        li.textContent = `Доход от ${income.user}: ${income.amount} руб.`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.onclick = () => {
            incomes.splice(index, 1);
            saveIncomes();
            updateIncomes();
        };
        li.appendChild(deleteBtn);
        incomeList.appendChild(li);
    });
}

function saveIncomes() {
    localStorage.setItem("incomes", JSON.stringify(incomes));
}

incomeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const income = {
        amount: document.getElementById("income").value,
        user: userSelect.value
    };
    incomes.push(income);
    saveIncomes();
    updateIncomes();
    incomeForm.reset();
});

document.getElementById("clearIncomes").addEventListener("click", function () {
    incomes = [];
    saveIncomes();
    updateIncomes();
});

updateIncomes();

// Обработка расходов
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const categorySelect = document.getElementById("categorySelect");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.textContent = `Расход на ${expense.category}: ${expense.amount} руб.`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.onclick = () => {
            expenses.splice(index, 1);
            saveExpenses();
            updateExpenses();
        };
        li.appendChild(deleteBtn);
        expenseList.appendChild(li);
    });
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const expense = {
        amount: document.getElementById("expense").value,
        category: categorySelect.value
    };
    expenses.push(expense);
    saveExpenses();
    updateExpenses();
    expenseForm.reset();
});

document.getElementById("clearExpenses").addEventListener("click", function () {
    expenses = [];
    saveExpenses();
    updateExpenses();
});

updateExpenses();

// Справочник категорий
const addCategoryBtn = document.getElementById("addCategory");
const clearCategoriesBtn = document.getElementById("clearCategories");
const categoryList = document.getElementById("categoryList");

let categories = JSON.parse(localStorage.getItem("categories")) || [];

function updateCategories() {
    categoryList.innerHTML = "";
    categorySelect.innerHTML = "<option value=''>Выберите категорию</option>";
    categories.forEach((category, index) => {
        const li = document.createElement("li");
        li.textContent = category;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.onclick = () => {
            categories.splice(index, 1);
            saveCategories();
            updateCategories();
        };
        li.appendChild(deleteBtn);
        categoryList.appendChild(li);

        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

function saveCategories() {
    localStorage.setItem("categories", JSON.stringify(categories));
}

addCategoryBtn.addEventListener("click", function () {
    const categoryInput = document.getElementById("category").value;
    if (categoryInput) {
        categories.push(categoryInput);
        saveCategories();
        updateCategories();
        document.getElementById("category").value = "";
    }
});

clearCategoriesBtn.addEventListener("click", function () {
    categories = [];
    saveCategories();
    updateCategories();
});

updateCategories();

// Справочник пользователей
const addUserBtn = document.getElementById("addUser");
const clearUsersBtn = document.getElementById("clearUsers");
const userList = document.getElementById("userList");

let users = JSON.parse(localStorage.getItem("users")) || [];

function updateUsers() {
    userList.innerHTML = "";
    userSelect.innerHTML = "<option value=''>Выберите пользователя</option>";
    users.forEach((user, index) => {
        const li = document.createElement("li");
        li.textContent = user;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Удалить";
        deleteBtn.onclick = () => {
            users.splice(index, 1);
            saveUsers();
            updateUsers();
        };
        li.appendChild(deleteBtn);
        userList.appendChild(li);

        const option = document.createElement("option");
        option.value = user;
        option.textContent = user;
        userSelect.appendChild(option);
    });
}

function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

addUserBtn.addEventListener("click", function () {
    const userInput = document.getElementById("userName").value;
    if (userInput) {
        users.push(userInput);
        saveUsers();
        updateUsers();
        document.getElementById("userName").value = "";
    }
});

clearUsersBtn.addEventListener("click", function () {
    users = [];
    saveUsers();
    updateUsers();
});

updateUsers();