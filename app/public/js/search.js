const searchInput = document.getElementById('searchInput');
const searchOutput = document.getElementById('searchOutput');


let debounceTimeout;

searchInput.addEventListener('input', function() {
    clearTimeout(debounceTimeout);
    const query = this.value.trim();

    if (query.length === 0) {
        searchOutput.innerHTML = '';
        searchOutput.classList.remove('show');
        return;
    }

    // Debounce: wait for 400ms of inactivity before making the request
    debounceTimeout = setTimeout(async () => {
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            renderSuggestions(data);
        } catch (error) {
            console.error("Search error:", error);
        }
    }, 400);
});


function renderSuggestions(data) {
    searchOutput.innerHTML = '';
    searchOutput.classList.add('show');

    // Example: render posts suggestions
    if (data.posts.length > 0) {
        const postsHeader = document.createElement('li');
        postsHeader.className = 'dropdown-item fw-bold text-uppercase';
        postsHeader.textContent = "Posts";
        searchOutput.appendChild(postsHeader)

        data.posts.forEach(post => {
            let item = document.createElement('a');
            item.className = 'dropdown-item';
            item.href = `/post/${post._id}`;
            item.textContent = post.title;
            searchOutput.appendChild(item);
        });

        searchOutput.innerHTML += '<li><hr class="dropdown-divider"></li>';
    }
    // Render categories suggestions
    if (data.categories.length > 0) {
        const catHeader = document.createElement('li');
        catHeader.className = 'dropdown-item fw-bold text-uppercase';
        catHeader.textContent = "Categories";
        searchOutput.appendChild(catHeader);

        data.categories.forEach(category => {
            const item = document.createElement('a');
            item.className = 'dropdown-item';
            item.href = `/category/${category._id}`;
            item.textContent = category.name;
            searchOutput.appendChild(item);
        });
        searchOutput.innerHTML += '<li><hr class="dropdown-divider"></li>';
    }

    // Render users suggestions
    if (data.users.length > 0) {
        const usersHeader = document.createElement('li');
        usersHeader.className = 'dropdown-item fw-bold text-uppercase';
        usersHeader.textContent = "Users";
        searchOutput.appendChild(usersHeader);

        data.users.forEach(user => {
            const item = document.createElement('a');
            item.className = 'dropdown-item';
            item.href = `/user/${user._id}`;
            item.textContent = user.name;
            searchOutput.appendChild(item);
        });
        searchOutput.innerHTML += '<li><hr class="dropdown-divider"></li>';
    }
}