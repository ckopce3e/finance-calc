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

    let categories = loadCategoriesFromLocalStorage();
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.textContent = category;
        addDeleteButtonToItem(categoryItem, categoryList, categories, saveCategoriesToLocalStorage);
        categoryList.appendChild(categoryItem);
        addOptionToSelect('categorySelect', category);
    });

    document.getElementById('addCategory').addEventListener('click', () => {
        const categoryName = document.getElementById('categoryInput').value.trim();
        if (!categoryName) return;

        const categoryItem = document.createElement('li');
        categoryItem.textContent = categoryName;
        addDeleteButtonToItem(categoryItem, categoryList, categories, saveCategoriesToLocalStorage);
        categoryList.appendChild(categoryItem);
        addOptionToSelect('categorySelect', categoryName);
        categories.push(categoryName);
        saveCategoriesToLocalStorage(categories);
        document.getElementById('categoryInput').value = '';
    });

    document.getElementById('clearCategories').addEventListener('click', () => {
        categories = [];
        saveCategoriesToLocalStorage(categories);
        categoryList.innerHTML = '';
        categorySelect.innerHTML = '';
    });

    const userList = document.getElementById('userList');
    const userSelect = document.getElementById('userSelect');

    let users = loadUsersFromLocalStorage();
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = user;
        addDeleteButtonToItem(userItem, userList, users, saveUsersToLocalStorage);
        userList.appendChild(userItem);
        addOptionToSelect('userSelect', user);
    });

    document.getElementById('addUser').addEventListener('click', () => {
        const userName = document.getElementById('userNameInput').value.trim();
        if (!userName) return;

        const userItem = document.createElement('li');
        userItem.textContent = userName;
        addDeleteButtonToItem(userItem, userList, users, saveUsersToLocalStorage);
        userList.appendChild(userItem);
        addOptionToSelect('userSelect', userName);
        users.push(userName);
        saveUsersToLocalStorage(users);
        document.getElementById('userNameInput').value = '';
    });

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
