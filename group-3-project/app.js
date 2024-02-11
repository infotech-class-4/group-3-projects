
const select = document.querySelector("#users")
const albumContainer = document.querySelector("#album-container")

const data = axios.get('https://jsonplaceholder.typicode.com/users')

const getUsers =()=>{
    return axios.get('https://jsonplaceholder.typicode.com/users')
}


window.addEventListener("load",async()=>{
    const {data} = await getUsers();

    data.forEach(user => {
    // console.log(user.name);

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
    // console.log(e.target.value);
   const {data} = await getPhotos(e.target.value)
   makeList(data)
   //console.log(data);
})

let likecounter = 0


const makeList = (photos)=>{
    albumContainer.innerHTML = "";
    photos.forEach((photo)=>{
        const imageContainer = document.createElement("div")
        imageContainer.className = "photo-container"
        //imageContainer.innerHTML =photos.completed;
        const image = document.createElement("img")

        image.src = photo.url
        image.alt = photo.title
        image.className = "photo"
        image.style.width ="400px"
        image.style.border ="5px solid red"


        // button kısmı div
        const buttonContainer = document.createElement("div")
        buttonContainer.className = "like-disslike-container d-flex justify-content-between"
        buttonContainer.style.border="3px solid red"

        //like butonu
        const likeButtonDiv = document.createElement("div")
        likeButtonDiv.className ="d-flex justify-content-between align-items-center gap-2"
        const likeButtonContent = document.createElement("div")
        likeButtonContent.textContent ="0"
        const likeButton = document.createElement("i")
        likeButton.className ="fa-solid fa-thumbs-up"

        imageContainer.append(likeButtonDiv, likeButton, likeButtonContent)

        likeButton.addEventListener("click", ()=>{
            likeButtonContent.textContent = ++likecounter
        })

        // dislike nutonu
        


        // delete butonu


        imageContainer.appendChild(image)
        albumContainer.appendChild(imageContainer)

        
    })
}


