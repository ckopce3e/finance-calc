// Универсальная функция для добавления элемента в список
function addItemToList(list, array, value, saveFunction, selectId) {
    const item = document.createElement('li');
    item.textContent = value;
    addDeleteButtonToItem(item, list, array, saveFunction);
    list.appendChild(item);
    addOptionToSelect(selectId, value);
}

// Функция для сохранения данных в localStorage
function saveCategoriesToLocalStorage(categories) {
    localStorage.setItem('categories', JSON.stringify(categories));
}

function loadCategoriesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('categories')) || [];
}

function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function loadUsersFromLocalStorage() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Функция для добавления кнопки удаления к каждой записи
function addDeleteButtonToItem(item, list, array, saveFunction) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', () => {
        const index = Array.from(list.children).indexOf(item);
        array.splice(index, 1);
        saveFunction(array);
        list.removeChild(item);
    });
    item.appendChild(deleteButton);
}

export function initializeReferences() {
    const categoryList = document.getElementById('categoryList');
    const categorySelect = document.getElementById('categorySelect');
    const userList = document.getElementById('userList');
    const userSelect = document.getElementById('userSelect');

    let categories = loadCategoriesFromLocalStorage();
    let users = loadUsersFromLocalStorage();

    // Рендеринг сохраненных категорий
    categories.forEach(category => {
        addItemToList(categoryList, categories, category, saveCategoriesToLocalStorage, 'categorySelect');
    });

    // Рендеринг сохраненных пользователей
    users.forEach(user => {
        addItemToList(userList, users, user, saveUsersToLocalStorage, 'userSelect');
    });

    // Добавление новой категории
    document.getElementById('addCategory').addEventListener('click', () => {
        const categoryName = document.getElementById('categoryInput').value.trim();
        if (!categoryName || categories.includes(categoryName)) return;

        addItemToList(categoryList, categories, categoryName, saveCategoriesToLocalStorage, 'categorySelect');
        categories.push(categoryName);
        saveCategoriesToLocalStorage(categories);
        document.getElementById('categoryInput').value = '';
    });

    // Добавление нового пользователя
    document.getElementById('addUser').addEventListener('click', () => {
        const userName = document.getElementById('userNameInput').value.trim();
        if (!userName || users.includes(userName)) return;

        addItemToList(userList, users, userName, saveUsersToLocalStorage, 'userSelect');
        users.push(userName);
        saveUsersToLocalStorage(users);
        document.getElementById('userNameInput').value = '';
    });

    // Очистка всех категорий
    document.getElementById('clearCategories').addEventListener('click', () => {
        categories = [];
        saveCategoriesToLocalStorage(categories);
        categoryList.innerHTML = '';
        categorySelect.innerHTML = '';
    });

    // Очистка всех пользователей
    document.getElementById('clearUsers').addEventListener('click', () => {
        users = [];
        saveUsersToLocalStorage(users);
        userList.innerHTML = '';
        userSelect.innerHTML = '';
    });

    // Вкладки
    const categoryTab = document.getElementById('categoryTab');
    const userTab = document.getElementById('userTab');
    const categoryContent = document.getElementById('categoryContent');
    const userContent = document.getElementById('userContent');

    categoryTab.addEventListener('click', () => {
        handleTabSwitch(0, categoryTab, userTab, categoryContent, userContent);
    });

    userTab.addEventListener('click', () => {
        handleTabSwitch(1, categoryTab, userTab, categoryContent, userContent);
    });

    // Активируем первую вкладку по умолчанию
    handleTabSwitch(0, categoryTab, userTab, categoryContent, userContent);
}

// Функция для переключения вкладок
function handleTabSwitch(activeIndex, categoryTab, userTab, categoryContent, userContent) {
    if (activeIndex === 0) {
        categoryTab.classList.add('active');
        userTab.classList.remove('active');
        categoryContent.style.display = 'block';
        userContent.style.display = 'none';
    } else {
        userTab.classList.add('active');
        categoryTab.classList.remove('active');
        categoryContent.style.display = 'none';
        userContent.style.display = 'block';
    }
}

// Функция для добавления опции в select
function addOptionToSelect(selectId, value) {
    const select = document.getElementById(selectId);
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
}
