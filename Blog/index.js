const postsList = document.querySelector(".post-list")
const addPostForm = document.querySelector('.add-post-form');
const titleValue = document.getElementById("title-value");
const imageValue = document.getElementById("image-value");
const bodyValue = document.getElementById("body-value");
const btnSubmit = document.querySelector(".btn");

const dates = new Date();

console.log(dates)
const authorValue = document.getElementById("author-value")
const categoryValue=document.getElementById("select-tag")
const url = " http://localhost:3000/posts";

let output = ""
const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
        <div class="card mt-4 col-md-6 bg-light" >
        
        <div class="card-body" data-id=${post.id}>
        <img src=${post.image} class="card-img-top" alt="..."> 
         <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
          <p class="card-date">${post.date}</p>
          <p class="card-author">${post.author}</p>
          <p class="card-category">${post.category}</p>
         <a href="#" class="card-link" id="edit-post">Edit</a>
          <a href="#" class="card-link" id="delete-post">Delete</a>
        </div>
        
      
          
       
      </div>
    `
            ;

    });
    postsList.innerHTML = output;

}
//GET read the posts
fetch(url)
    .then(res => res.json())
    .then(data =>renderPosts(data))
postsList.addEventListener("click", (e) => {
    e.preventDefault();
    let delButton = e.target.id == "delete-post";
    let editButton = e.target.id == "edit-post";
    let id = e.target.parentElement.dataset.id;
    if (delButton) {
        fetch(`${url}/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(() => location.reload())
    }
    if (editButton) {
        const parent = e.target.parentElement;
        let imageContent = parent.querySelector(".card-img-top").textContent;
        let titleContent = parent.querySelector('.card-title').textContent;
        let bodyContent = parent.querySelector(".card-text").textContent;
        let authorContent = parent.querySelector(".card-author").textContent;
        let categoryContent=parent.querySelector(".card-category").textContent;
        let dateContent=parent.querySelector(".card-date").textContent
        imageValue.value = imageContent;
        titleValue.value = titleContent;
        bodyValue.value = bodyContent;
        authorValue.value = authorContent;
        categoryValue.value=categoryContent;
        // dates=dateContent;

    }
    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault()
        fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                image: imageValue.value,
                title: titleValue.value,
                body: bodyValue.value,
                // date:dates,

                author: authorValue.value,
                category:categoryValue.value,
            })
        })
            .then(res => res.json())
            .then(()=>window.location.reload());
            addPostForm.reset();
    })
    //update the existing data
    //Mehod:GET
});

//Add new post
//Method:POST

addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            image: imageValue.value,
            title: titleValue.value,
            body: bodyValue.value,
            // dates: dates,
            author: authorValue.value,
            category:categoryValue.value,



        })
    })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr)
            
        })
        

})


