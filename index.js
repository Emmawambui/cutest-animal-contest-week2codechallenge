const myAnimalsNode = document.querySelector("#my-animals");
const nameNode = document.querySelector("#name");
const imgNode = document.querySelector("#img");
const votesNode = document.querySelector("#votes");

function fetchAnimal(id) {
  fetch(`http://localhost:3000/characters/${id}`)
    .then((res) => res.json())
    .then((data) => createAnAnimalDetails(data));
}

function fetchAnimals() {
  fetch("http://localhost:3000/characters")
    .then((res) => res.json())
    .then((data) => createAnimalList(data));
}

function createAnimalList(data) {
  data.forEach((element) => {
    const liNode = document.createElement("li");
    liNode.id = `${element.id}`;
    liNode.addEventListener("click", loadAnimalDetails);
    liNode.textContent = element.name;
    myAnimalsNode.appendChild(liNode);
  });
  fetchAnimal(data[0].id);
}

function createAnAnimalDetails(data) {
  nameNode.textContent = data.name;
  imgNode.src = data.image;
  imgNode.alt = data.name;
  votesNode.textContent = `Votes: ${data.votes}`;
  votesNode.value = data.votes;
  votesNode.addEventListener("click", votesCount);
}

function loadAnimalDetails(e) {
  const id = e.target.id;
  fetchAnimal(id);
}

function votesCount(e) {
  let votes = Number.parseInt(e.target.value);
  votes++;
  e.target.value = votes;
  votesNode.textContent = `Votes: ${votes}`;
}

window.onload = fetchAnimals;
