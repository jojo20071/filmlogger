document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form');
    const watchedList = document.getElementById('watched-list');
    const toWatchList = document.getElementById('to-watch-list');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const loginForm = document.getElementById('login-form');

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
        });
        return item;
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
        alert('Login functionality is not implemented yet.');
    });
});
