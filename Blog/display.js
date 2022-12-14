const postsList = document.querySelector(".post-list")

const url = " http://localhost:3000/posts";
let output = ""
const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
       
        
        <div class="card-body" data-id=${post.id}>
        <img src=${post.image} class="card-img-top" alt="..."> 
         <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
          <p class="card-date">${post.date}</p>
          <p class="card-author">${post.author}</p>
          
        
        
      
          
       
      </div>
    `
            ;

    });
    postsList.innerHTML = output;

}

fetch(url)
    .then(res => res.json())
    .then(data =>renderPosts(data))