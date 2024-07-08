document.getElementById("fetch-posts").addEventListener("click", () => {
  fetchPosts();
});

const fetchPosts = () => {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((posts) => {
      displayPosts(posts);
    })
    .catch((error) => {
      displayError(error);
    });
};

const displayPosts = (posts) => {
  const searchInput = document.getElementById("search-input").value.toLowerCase();
  const filterSelect = document.getElementById("filter-select").value;
  const postList = document.getElementById("post-list");
  postList.innerHTML = "";

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchInput) || post.description.toLowerCase().includes(searchInput);

    let matchesFilter = true;
    if (filterSelect === "low") {
      matchesFilter = post.price < 50;
    } else if (filterSelect === "medium") {
      matchesFilter = post.price >= 50 && post.price < 150;
    } else if (filterSelect === "high") {
      matchesFilter = post.price >= 150;
    }

    return matchesSearch && matchesFilter;
  });

  filteredPosts.forEach((post) => {
    const listItem = document.createElement("div");
    listItem.className = `product-${post.id}`;
    listItem.innerHTML = `
      <img src="${post.images[0]}" alt="${post.title}" style="width: 100%; height: auto;">
      <p>${post.title}</p>
      <p>Price: ${post.price}</p>
      <p>${post.description}</p>
    `;
    listItem.style.height = '400px';
    listItem.style.width = '300px';
    postList.appendChild(listItem);
  });

  postList.style.display = 'flex';
  postList.style.flexWrap = 'wrap';
  postList.style.gap = '20px';
};

const displayError = (error) => {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = `Error: ${error.message}`;
};

document.getElementById("search-input").addEventListener("input", () => {
  fetchPosts();
});

document.getElementById("filter-select").addEventListener("change", () => {
  fetchPosts();
});