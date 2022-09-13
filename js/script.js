let elForm = document.querySelector('.form');
let elInput = elForm.querySelector('.form-input');

//Spiner
let elSpiner = document.querySelector(".js-spiner");

//Rezalt
let elList = document.querySelector('.list');

//Modal
let elModalImg = document.querySelector(".modal-img");
let elMdalTitle =document.querySelector(".modal-title");
let elModalBody = document.querySelector(".modal-info");


const dataCountris = countrie => {
  fetch(`https://restcountries.com/v3.1/name/${countrie}`)
    .then(res => {
      if(!res.ok) {
        throw new Error (alert('Mamlakat nomini xato kirgizdingiz!!!'))
      }
      return res.json();
    })
    .then(data => resultList(data))
    .finally(elSpiner.classList.add("d-none"))
}

const resultList = datum => {
  elList.innerHTML = "";
  elInput.value = "";

  datum.forEach(data => {
    let elItem = document.createElement("li");
    let elImg = document.createElement("img");
    let elContent = document.createElement("div");
    let elTitle = document.createElement("h5");
    let elCopital = document.createElement("p");

    
    elItem.setAttribute("class", "card my-3 p-2");
    elItem.style = "width: 18rem;";
    elImg.style = "width= 200px, height=250px";
    elContent.setAttribute("class", "card-body position-relative");
    elTitle.setAttribute("class", "card-title");
    elCopital.setAttribute("class", "card-text");

    elImg.src = data.flags.png;
    elImg.alt = data.name.common;
    elTitle.textContent = data.name.common;
    elCopital.textContent = `Copital: ${data.capital}`;
    
    elContent.innerHTML = `
    <button type="button" class="position-absolute bottom-0 end-0 btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Info</button>
    `;

    elModalImg.src = data.flags.png;
    elMdalTitle.textContent = data.name.common;
    
    elModalBody.innerHTML = `
    <h5 class="my-3">"Name: ${data.name.official}"</h5>
    <p>"Area: ${data.area}"</p>
    <p>"Population: ${data.population}"</p>
    <p>"Border friends: ${data.borders}"</p>

    `

    elContent.append(elTitle, elCopital)
    elItem.append(elImg, elContent);
    elList.appendChild(elItem);
  })
}

elForm.addEventListener("submit", evt => {
  evt.preventDefault();

  elSpiner.classList.remove("d-none")


  const elInpValue = elInput.value.trim().toLowerCase();

  dataCountris(elInpValue);
})
