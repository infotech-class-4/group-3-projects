const select = document.querySelector("#users")
const albumContainer = document.querySelector("#album-container")

const data = axios.get('https://jsonplaceholder.typicode.com/users')

const getUsers =()=>{
    return axios.get('https://jsonplaceholder.typicode.com/users')
}


window.addEventListener("load",async()=>{
    const {data} = await getUsers();

    data.forEach(user => {

    const option = document.createElement("option");
    option.value=user.id;
    option.textContent=user.name;

    select.appendChild(option);
});
});

const getPhotos = (albumId)=>{
    return axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
}

select.addEventListener("change",async (e)=>{
   const {data} = await getPhotos(e.target.value)
   makeList(data)
})

let likecounter = 0


const makeList = (photos)=>{
    albumContainer.innerHTML = "";
    photos.forEach((photo)=>{
        const imageContainer = document.createElement("div")
        imageContainer.className = "photo-container "
        const image = document.createElement("img")

        image.src = photo.url
        image.alt = photo.title
        image.className = "photo d-flex "
        image.style.width ="400px"
        image.style.borderRadius = "10px "
        image.style.border = "5px solid white"


        // button kısmı div
        const buttonContainer = document.createElement("div")
        buttonContainer.className = "like-disslike-container d-flex justify-content-between"
       

        //like butonu
        const likeButtonDiv = document.createElement("div")
        likeButtonDiv.className ="d-flex justify-content-between align-items-center gap-2"
        const likeButtonContent = document.createElement("div")
        likeButtonContent.textContent ="0"
        const likeButton = document.createElement("i")
        likeButton.className ="fa-solid fa-thumbs-up"
        likeButton.style.color = "blue"

        likeButtonDiv.append(likeButton, likeButtonContent)
        
        likeButton.addEventListener("click", ()=>{
            likeButtonContent.textContent = ++likecounter
        })
        
        // disslike buton kısmı
        
        const dissLikeButtonDiv = document.createElement("div")
        dissLikeButtonDiv.className ="d-flex justify-content-between align-items-center gap-2"
        
        
        const disslikeButtonContent = document.createElement("div")
        disslikeButtonContent.textContent ="0"
        
        const disslikeButton = document.createElement("i")
        disslikeButton.className ="fa-solid fa-thumbs-down"
        disslikeButton.style.color = "red"
        
        dissLikeButtonDiv.append(disslikeButton, disslikeButtonContent)
        disslikeButton.addEventListener("click", ()=>{
            disslikeButtonContent.textContent = --likecounter
        })
         
        
        // delete butonu
        const deleteButtonDiv = document.createElement("div");
        deleteButtonDiv.className = "d-flex justify-content-between align-items-center gap-2";
        const deleteButton = document.createElement("i")
        deleteButton.className = "fa-solid fa-trash-can";
        
        deleteButtonDiv.appendChild(deleteButton);
        
        deleteButton.addEventListener("click", (e) => {
            const confirmation = confirm("Silmek istediğinize emin misiniz?");
            
            if (confirmation) {
                e.target.parentElement.parentElement.parentElement.remove()                
            }
        });


        //yorum ekle
        const commentContainer = document.createElement("div")
        commentContainer.className =  "comment-container"
        commentContainer.style.display = "flex"

        const commentInput = document.createElement("textarea")
        commentInput.className = "bi bi-chat"
        commentInput.placeholder = "Yorumunuzu buraya yaziniz!"
        commentInput.style.fontFamily = "cursive"

        const commentButton = document.createElement("button")
        commentButton.className = "fa-solid fa-comment"
        commentButton.style.backgroundColor = "lavender"

        commentContainer.append(commentInput, commentButton)


        commentButton.addEventListener("click", ()=> {
            const yorum = commentInput.value
            if (yorum) {
                alert("Yorumunuz: " + yorum)
            } else {
                alert("Lütfen yorum ekleyiniz!")
            }
        })
        
 
        buttonContainer.append(likeButtonDiv, dissLikeButtonDiv,deleteButtonDiv)
        
        imageContainer.append(image,buttonContainer, commentContainer)
        albumContainer.appendChild(imageContainer)

        
    })
}
