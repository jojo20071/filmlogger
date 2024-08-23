document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('add-form');
    const watchedList = document.getElementById('watched-list');
    const toWatchList = document.getElementById('to-watch-list');

    function createItem(title, type) {
        const item = document.createElement('div');
        item.classList.add('item');
        item.textContent = `${title} (${type})`;
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
});
