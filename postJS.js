// Variables to track posts loading
let currentPage = 1;
let isLoading = false;

// Function to fetch posts
function fetchPosts(page) {
    isLoading = true;
    document.getElementById('loader').style.display = 'block'; // Show loader

    // AJAX request to fetch posts from the JSONPlaceholder API
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=6`, true);
    xhr.onload = function () {
        if (this.status === 200) {
            const posts = JSON.parse(this.responseText);
            appendPosts(posts);
            isLoading = false;
            document.getElementById('loader').style.display = 'none'; // Hide loader
        }
    };
    xhr.send();
}

// Function to append fetched posts to the page
function appendPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Infinite scrolling logic
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && !isLoading) {
        // Fetch the next page of posts
        currentPage++;
        fetchPosts(currentPage);
    }
});

// Load the initial posts when the page loads
window.onload = function () {
    fetchPosts(currentPage);
};
