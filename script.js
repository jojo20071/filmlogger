document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form');
    const watchedList = document.getElementById('watched-list');
    const toWatchList = document.getElementById('to-watch-list');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const userInfo = document.getElementById('user-info');
    const userNameSpan = document.getElementById('user-name');
    const logoutButton = document.getElementById('logout');
    const reviewsSection = document.getElementById('reviews');
    const reviewForm = document.getElementById('review-form');
    const reviewList = document.getElementById('review-list');
    const apiSearchInput = document.getElementById('api-search-input');
    const apiResults = document.getElementById('api-results');

    function saveData() {
        const watchedItems = Array.from(watchedList.children).map(item => item.textContent);
        const toWatchItems = Array.from(toWatchList.children).map(item => item.textContent);
        const reviews = Array.from(reviewList.children).map(review => review.textContent);
        localStorage.setItem('watched', JSON.stringify(watchedItems));
        localStorage.setItem('toWatch', JSON.stringify(toWatchItems));
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    function loadData() {
        const watchedItems = JSON.parse(localStorage.getItem('watched')) || [];
        const toWatchItems = JSON.parse(localStorage.getItem('toWatch')) || [];
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        
        watchedItems.forEach(itemText => {
            const item = createItem(itemText, 'film');
            watchedList.appendChild(item);
        });
        
        toWatchItems.forEach(itemText => {
            const item = createItem(itemText, 'series');
            toWatchList.appendChild(item);
        });

        reviews.forEach(reviewText => {
            const review = document.createElement('div');
            review.classList.add('review');
            review.textContent = reviewText;
            reviewList.appendChild(review);
        });
    }

    function createItem(title, type) {
        const item = document.createElement('div');
        item.classList.add('item');
        item.textContent = `${title} (${type})`;
        item.dataset.title = title;
        item.addEventListener('click', () => {
            if (type === 'film') {
                watchedList.appendChild(item);
                item.classList.add('watched');
            } else {
                toWatchList.appendChild(item);
                item.classList.remove('watched');
            }
            saveData();
        });
        return item;
    }

    function handleLogin(username) {
        userInfo.style.display = 'block';
        userNameSpan.textContent = username;
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        reviewsSection.style.display = 'block';
        document.getElementById('api-search').style.display = 'block';
    }

    function handleLogout() {
        userInfo.style.display = 'none';
        document.getElementById('login').style.display = 'block';
        document.getElementById('register').style.display = 'block';
        reviewsSection.style.display = 'none';
        document.getElementById('api-search').style.display = 'none';
        localStorage.removeItem('user');
    }

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const type = document.getElementById('type').value;
        
        const item = createItem(title, type);
        if (type === 'film') {
            toWatchList.appendChild(item);
        } else {
            watchedList.appendChild(item);
        }
        
        addForm.reset();
        saveData();
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const items = document.querySelectorAll('.item');
        searchResults.innerHTML = '';
        items.forEach(item => {
            if (item.dataset.title.toLowerCase().includes(query)) {
                searchResults.appendChild(item.cloneNode(true));
            }
        });
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username && password) {
            localStorage.setItem('user', username);
            handleLogin(username);
            loadData();
        }
    });

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;

        if (username && password) {
            localStorage.setItem('user', username);
            handleLogin(username);
            loadData();
        }
    });

    logoutButton.addEventListener('click', () => {
        handleLogout();
    });

    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('review-title').value;
        const text = document.getElementById('review-text').value;
        
        const review = document.createElement('div');
        review.classList.add('review');
        review.textContent = `${title}: ${text}`;
        reviewList.appendChild(review);
        
        reviewForm.reset();
        saveData();
    });

    apiSearchInput.addEventListener('input', async () => {
        const query = apiSearchInput.value;
        if (query.length < 3) {
            apiResults.innerHTML = '';
            return;
        }

        const response = await fetch(`https://api.example.com/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        apiResults.innerHTML = '';
        data.results.forEach(result => {
            const apiItem = document.createElement('div');
            apiItem.classList.add('api-item');
            apiItem.textContent = `${result.title} (${result.year})`;
            apiItem.addEventListener('click', () => {
                const item = createItem(result.title, result.type);
                if (result.type === 'film') {
                    toWatchList.appendChild(item);
                } else {
                    watchedList.appendChild(item);
                }
                saveData();
            });
            apiResults.appendChild(apiItem);
        });
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        handleLogin(storedUser);
        loadData();
    }
});
