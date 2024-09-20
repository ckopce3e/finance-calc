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

export function initializeReferences() {
    // Categories functionality
    const categoryList = document.getElementById('categoryList');
    const categorySelect = document.getElementById('categorySelect');

    let categories = loadCategoriesFromLocalStorage();

    // Отображаем сохраненные категории
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.textContent = category;
        categoryList.appendChild(categoryItem);
        addOptionToSelect('categorySelect', category);
    });

    document.getElementById('addCategory').addEventListener('click', () => {
        const categoryName = document.getElementById('category').value.trim();
        if (!categoryName) return;

        const categoryItem = document.createElement('li');
        categoryItem.textContent = categoryName;
        categoryList.appendChild(categoryItem);

        addOptionToSelect('categorySelect', categoryName);
        categories.push(categoryName);
        saveCategoriesToLocalStorage(categories);
        document.getElementById('category').value = '';
    });

    document.getElementById('clearCategories').addEventListener('click', () => {
        categories = [];
        saveCategoriesToLocalStorage(categories);
        categoryList.innerHTML = '';
        categorySelect.innerHTML = '';
    });

    // Users functionality
    const userList = document.getElementById('userList');
    const userSelect = document.getElementById('userSelect');

    let users = loadUsersFromLocalStorage();

    // Отображаем сохраненные пользователи
    users.forEach(user => {
        const userItem = document.createElement('li');
        userItem.textContent = user;
        userList.appendChild(userItem);
        addOptionToSelect('userSelect', user);
    });

    document.getElementById('addUser').addEventListener('click', () => {
        const userName = document.getElementById('userName').value.trim();
        if (!userName) return;

        const userItem = document.createElement('li');
        userItem.textContent = userName;
        userList.appendChild(userItem);

        addOptionToSelect('userSelect', userName);
        users.push(userName);
        saveUsersToLocalStorage(users);
        document.getElementById('userName').value = '';
    });

    document.getElementById('clearUsers').addEventListener('click', () => {
        users = [];
        saveUsersToLocalStorage(users);
        userList.innerHTML = '';
        userSelect.innerHTML = '';
    });
}
