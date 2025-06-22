// js/blog.js
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

function renderBlogs() {
  const list = document.getElementById("blogList");
  list.innerHTML = "";
  blogs.slice().reverse().forEach((blog, index) => {
    const serial = blogs.length - index;
    const div = document.createElement("div");
    div.className = "blog-post";
    div.innerHTML = `
      <h2>${serial}. ${blog.title}</h2>
      <pre>${blog.content}</pre>
      <p><strong>Author:</strong> ${blog.author}</p>
      <p><small>Created: ${blog.created} | Updated: ${blog.updated}</small></p>
      <button onclick="likeBlog(${blogs.length - 1 - index})">👍 ${blog.likes || 0}</button>
      <button onclick="dislikeBlog(${blogs.length - 1 - index})">👎 ${blog.dislikes || 0}</button>
      <div>
        <textarea placeholder="Add comment" id="comment-${blogs.length - 1 - index}"></textarea>
        <button onclick="addComment(${blogs.length - 1 - index})">Comment</button>
      </div>
      <ul>${(blog.comments || []).map(c => `<li>${c}</li>`).join("")}</ul>
      <button onclick="editBlog(${blogs.length - 1 - index})">Edit</button>
      <button onclick="deleteBlog(${blogs.length - 1 - index})">Delete</button>
    `;
    list.appendChild(div);
  });
}

document.getElementById("blogForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const now = new Date().toLocaleString();
  const blog = {
    title: title.value,
    content: content.value,
    author: author.value,
    password: password.value,
    created: now,
    updated: now,
    comments: [],
    likes: 0,
    dislikes: 0
  };
  blogs.push(blog);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  this.reset();
  renderBlogs();
});

function likeBlog(index) {
  blogs[index].likes = (blogs[index].likes || 0) + 1;
  localStorage.setItem("blogs", JSON.stringify(blogs));
  renderBlogs();
}

function dislikeBlog(index) {
  blogs[index].dislikes = (blogs[index].dislikes || 0) + 1;
  localStorage.setItem("blogs", JSON.stringify(blogs));
  renderBlogs();
}

function addComment(index) {
  const input = document.getElementById("comment-" + index);
  if (!blogs[index].comments) blogs[index].comments = [];
  if (input.value.trim()) blogs[index].comments.push(input.value.trim());
  localStorage.setItem("blogs", JSON.stringify(blogs));
  renderBlogs();
}

function editBlog(index) {
  const pass = prompt("Enter password to edit:");
  if (pass === blogs[index].password) {
    const newTitle = prompt("New Title:", blogs[index].title);
    const newContent = prompt("New Content:", blogs[index].content);
    blogs[index].title = newTitle;
    blogs[index].content = newContent;
    blogs[index].updated = new Date().toLocaleString();
    localStorage.setItem("blogs", JSON.stringify(blogs));
    renderBlogs();
  } else {
    alert("Wrong password!");
  }
}

function deleteBlog(index) {
  const pass = prompt("Enter password to delete:");
  if (pass === blogs[index].password) {
    blogs.splice(index, 1);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    renderBlogs();
  } else {
    alert("Wrong password!");
  }
}

renderBlogs();
