let postsList = document.querySelector(".post-list")
let data=[]
let url = " https://tmet-neha-hue.vercel.app/posts";
// let output = ""
// let renderPosts = (posts) => {
    
//     posts.forEach(post => {
//         output += `
       
        
//         <div class="card-body" data-id=${post.id}>
//         <img src=${post.image} class="card-img-top" alt="..."> 
//          <h5 class="card-title">${post.title}</h5>
//           <p class="card-text">${post.body}</p>
//           <p class="card-date">${post.date}</p>
//           <p class="card-author">${post.author}</p>
//           <p class="card-author">${post.category}</p>
          
        
        
      
          
       
//       </div>
//     `
//             ;

//     });
//     postsList.innerHTML = output;

// }

// fetch(url)
//     .then(res => res.json())
//     .then((data )=>{
//         bag=data;
//         //console.log(bag)
//         renderPosts(data)


//     })
async function showData(){
    try{
        let res=await fetch(url);
        out=await res.json();
        data=out;
        console.log(out);
        display(out);


    }
    catch(err){
        console.log(err);


    }
}
showData();
   
function search(){
    let q=document.querySelector("#search").value;
    
        let newData=data.filter(function(elem){
        
            return elem.category.toLowerCase().includes(q.toLowerCase())
        });
        console.log(newData)
        display(newData)

   
    
    
}

function display(data){
    document.querySelector(".post-list").innerHTML="";
    data.forEach(function(elem){
        let div=document.createElement("div");
        div.className="card-body"
        let image=document.createElement("img");
        image.src=elem.image;
        image.className="card-img-top"
        let title=document.createElement("h5");
        title.innerText=elem.title;
        let text=document.createElement("p");
        text.innerText=elem.body;
        let date=document.createElement("p");
        let dates=new Date()
        date.innerText=dates;
        let author=document.createElement("p");
        author.innerText=elem.author;
        let category=document.createElement("p");
        category.innerText=elem.category;
        div.append(image,title,text,author,category);
        document.querySelector(".post-list").append(div)
    });
}