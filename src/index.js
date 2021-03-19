let addToy = false;
const toysUrl = (`http://localhost:3000/toys/`)

document.addEventListener("DOMContentLoaded", () => {
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })
  fetchToys()
  document.querySelector('.add-toy-form').addEventListener
  ('submit', (event) => {
    event.preventDefault()
    let newToy = {
    'name': event.target.name.value,
    'image': event.target.image.value,
    'likes': 0
    }
    postToy(newToy)
  })
})

function fetchToys(){
  fetch(toysUrl)
  .then(response => response.json())
  .then(toyArray => toyArray.forEach(toy => renderCard(toy)))
  
}

function renderCard(toy){
  const toyCollection = document.getElementById('toy-collection')
  
  let toyCard= document.createElement('div')
  toyCard.className = 'card'
  
  
  let toyName = document.createElement('h2')
  toyName.innerText = toy.name
  
  let toyImage = document.createElement('img')
  toyImage.className = 'toy-avatar'
  toyImage.src = toy.image
  
  let likes = document.createElement('p')
  likes.innerText = `${toy.likes} likes`
  
  let likeButton = document.createElement('button')
  likeButton.className = 'like-btn'
  likeButton.innerText = 'like'
  likeButton.addEventListener('click', (event) => {addLikes(toy, likes)})
  
  
  toyCard.append(toyName, toyImage, likes, likeButton)
  toyCollection.append(toyCard)
}

function postToy(newToy){
  let options = {
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  }
    fetch(toysUrl, options)
    .then(response => response.json())
    .then(renderCard)
}


function addLikes(toy, likes){
    let likesCount = parseInt(likes.innerText) + 1
  
    let newLikes = {
        "likes": likesCount
      }
    
      let options = {
          method: 'PATCH',
          headers:{
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(newLikes)
        
          }
          fetch(toysUrl+toy.id, options)
          .then(response => response.json())
          .then(updatedToy =>likes.innerText = `${updatedToy.likes}Likes`)
        }