// Load Category Wise Pet
function loadCategoryPets(id) {
    document.getElementById("loading").style.display = "none"
    const activeBtn = document.getElementById(`btn-${id}`)
    // Remove Active
    const buttons = document.getElementsByClassName("all-category-btn")
    for (const button of buttons) {
        button.classList.remove('active')
        button.classList.add('rounded-xl')
        button.classList.add('border')
    }

    // Active Class Btn
    activeBtn.classList.remove('rounded-xl')
    activeBtn.classList.remove('border')
    activeBtn.classList.add('active')

    fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
        .then(res => res.json())
        .then(data => {
            for (const x of data.categories) {
                if (x.id == id) {
                    fetch(`https://openapi.programming-hero.com/api/peddy/category/${x.category}`)
                        .then(res => res.json())
                        .then(data => displayAllPets(data.data))
                }
            }
        })
}

// Loading Btn
const handleSearch = (id) => {
    document.getElementById("loading").style.display = "block"
    setTimeout(function () {

        loadCategoryPets(id)
    }, 1200)

}
// Display Pets Category
const diplayPetsCategory = (categories) => {
    for (const category of categories) {
        const petsCategory = document.getElementById('pets-category')
        const div = document.createElement("div")
        div.innerHTML = `
        <button id="btn-${category.id}" onclick="handleSearch(${category.id})" class="flex justify-center items-center gap-5 text-3xl font-bold px-20 py-3 all-category-btn rounded-xl border hover:bg-gray-200 ">
          <img src=${category.category_icon} />
           <p>${category.category}</p>
    </button>
    `
        petsCategory.appendChild(div)
    }
}

// Feting PetsCategory
const petsCategory = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => diplayPetsCategory(data.categories))
        .catch(error => console.log(error))

}
// Show Details 
const showDetails = (pets) => {
    const pet = pets.petData
    console.log(pet)
    const detailsModalContiner = document.getElementById("my_modal_4")
    const div = document.createElement('div')
    div.classList = "modal-box w-11/12 max-w-5xl"
    div.innerHTML = `
    <div>
    <img class="w-full h-[400px] rounded-lg" src="${pet.image}" alt="">
    </div>

     <div class="text-center space-y-2">
     <h2 class="text-2xl font-extrabold mt-4">${(pet.pet_name == undefined || pet.pet_name == null) ? "Not Available" : pet.pet_name}</h2>
     
    <p class="text-color-2"><i class="fa-solid fa-mars mr-2"></i>Breed : ${(pet.breed == undefined || pet.breed == null) ? "Not Available" : pet.breed}</p>

    <p class="text-color-2"><i class="fa-regular fa-calendar mr-2"></i> Birth: ${(pet.
            date_of_birth == undefined || pet.date_of_birth == null) ? "Not Available" : pet.date_of_birth
        }</p>

         <p class="text-color-2"><i class="fa-solid fa-mercury mr-2"></i> Gender : ${(pet.gender == undefined || pet.gender == null) ? "Not Available" : pet.gender} </p>

         <p class="text-color-2"><i class="fa-solid fa-dollar-sign mr-2"></i>Price : ${(pet.price == undefined || pet.price == null) ? "Not Available" : pet.price + " $"} </p>
        
         <p class="text-color-2"><i class="fa-solid fa-mercury mr-2"></i> Vacinated Status : ${(pet.vaccinated_status == undefined || pet.vaccinated_status == null) ? "Not Available" : pet.vaccinated_status} </p>
          <p class="border-b-2 mt-3 mb-3"></p>
         </div>
        
         <h1 class="text-2xl text-center font-bold mt-3 mb-3"><i>Details Information</i></h1>
         <p class="text-color-2 w-10/12 mx-auto text-center">${pet.pet_details}</p>

    <div class="modal-action flex justify-center mt-10">
    <form method="dialog">
    <button class="btn w-[300px] md:w-[500px] bg-gray-300  font-bold text-2xl hover:bg-[#7bdac2] hover:text-black">Close</button>
    </form>
    </div>
    `
    detailsModalContiner.append(div)
    my_modal_4.showModal()
}

// Details Button Functionality
const detailsBtn = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
        .then(res => res.json())
        .then(pet => showDetails(pet))
        .catch(error => console.log(error))
}

// Displaying All pets
const displayAllPets = (pets) => {
    const allPetContainer = document.getElementById('all-pet-container')
    allPetContainer.innerHTML = ''
    if (pets.length == 0) {
        const div = document.createElement('div')
        div.classList = "text-center space-y-3 px-5 py-10"
        allPetContainer.classList.remove('grid')
        div.innerHTML = `
           <div class="flex items-center justify-center">
            <img src="images/error.webp" alt="">
           </div>
            <h1 class="font-bold text-3xl">No Information Available</h1>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at
                its layout. The point of using Lorem Ipsum is that it has a.</p>
        `
        allPetContainer.appendChild(div)
    }
    else {
        allPetContainer.classList.add('grid')
        for (const pet of pets) {
            const div = document.createElement('div')
            div.classList = "border border-gray-300 rounded-lg"
            div.innerHTML = `
         <figure class="px-3 pt-2 ">
          <img src=${pet.image} alt="Shoes" class="rounded-xl w-full h-[200px]" />
         </figure>

         <div class="card-body">

         <h2 class="text-2xl font-extrabold">${(pet.pet_name == undefined || pet.pet_name == null) ? "Not Available" : pet.pet_name}</h2>

         <p class="text-color-2"><i class="fa-solid fa-mars mr-2"></i>Breed : ${(pet.breed == undefined || pet.breed == null) ? "Not Available" : pet.breed}</p>

         <p class="text-color-2"><i class="fa-regular fa-calendar mr-2"></i> Birth: ${(pet.
                    date_of_birth == undefined || pet.date_of_birth == null) ? "Not Available" : pet.date_of_birth
                }</p>

         <p class="text-color-2"><i class="fa-solid fa-mercury mr-2"></i> Gender : ${(pet.gender == undefined || pet.gender == null) ? "Not Available" : pet.gender} </p>

         <p class="text-color-2"><i class="fa-solid fa-dollar-sign mr-2"></i>Price : ${(pet.price == undefined || pet.price == null) ? "Not Available" : pet.price + " $"} </p>
         <p class="border-b-2 mt-3 mb-3"></p>
    
         <div class="card-actions justify-between">
    
         <button onclick="displayPetImage(${pet.petId})" class="btn border-primary-color hover:bg-primary-color hover:text-white"><i class="fa-solid fa-thumbs-up"></i></button>
    
         <button id="adopt-btn-${pet.petId}" onclick="my_modal_1.showModal(); adoptInactive(${pet.petId})" class="btn border-primary-color text-primary-color hover:bg-primary-color hover:text-white">Adopt</button>
    
         <button onclick="detailsBtn(${pet.petId})" class="btn border-primary-color text-primary-color hover:bg-primary-color hover:text-white">Details</button>
    
         </div>
    
          </div>
        `
            allPetContainer.appendChild(div)
        }
    }
}

// Adopt Disable
const adoptInactive = (id) => {
    const btn = document.getElementById(`adopt-btn-${id}`)
    console.log(btn)
    btn.innerText = 'Addopted'
    btn.setAttribute("disabled", true)
}
// Like Button Functionality
const displayPetImage = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
        .then(res => res.json())
        .then(pet => {
            const petImageContainer = document.getElementById("pet-image-container")
            const div = document.createElement("div")
            div.classList = "border border-gray-300 p-1 rounded-lg "
            div.innerHTML = `
              <img class="w-full rounded-lg" src=${pet.petData.image} />
    `
            petImageContainer.append(div)
        })
}

// Fetching All Pets
const allPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => displayAllPets(data.pets))
        .catch(error => console.log(error))
}

// Countdown Modal
let interval;
const modalCount = () => {
    const modal = document.getElementById('my_modal_1');
    const countdown = document.getElementById("countdown");
    let count = 3;
    countdown.innerHTML = count;
    clearInterval(interval);
    document.body.style.overflow = "hidden";
    interval = setInterval(function () {
        count--;
        countdown.innerHTML = count;
        if (count === 0) {
            clearInterval(interval);
            modal.close();
            document.body.style.overflow = "";
        }
    }, 1000);
    modal.showModal();
}

// Sort By Price
const sortByPrice = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => {
            data.pets.sort((a, b) => b.price - a.price);
            displayAllPets(data.pets)
        })
        .catch(error => console.log(error))
}
// Function Call
petsCategory()
allPets()