let toggle = document.getElementById("toggle");
let sideNav = document.getElementById("sideNav");
let row = document.getElementById("row");
let logo = document.getElementById("logo");
let searchBtn = document.getElementById("search");
let displaySearchItems = document.getElementById("display-search-items")  

let categories = document.getElementById("categories");
let area = document.getElementById("area")
let ingredient = document.getElementById("ingredient")
let contactUs = document.getElementById("contactUs")

toggle.addEventListener("click", function () {
  if (sideNav.classList.contains("d-none")) {
    // If the sideNav is hidden, show it
    sideNav.classList.replace("d-none", "d-block");
    toggle.classList.replace("fa-bars", "fa-x");
  } else {
    // If the sideNav is visible, hide it
    sideNav.classList.replace("d-block", "d-none");
    toggle.classList.replace("fa-x", "fa-bars");
  }
});
function closeNav(){
    sideNav.classList.add("d-none");
}
// defult images lmma el website byft777

window.addEventListener("load", function () {
  getDefult();
});

logo.addEventListener("click", function(){
    getDefult()
})

async function getDefult() {
  let api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let data = await api.json();
  console.log(data);

  function displayData() {
    let cartona = ``;
    for (let i = 0; i < 25; i++) {
      cartona += `
      <div class="col-md-3 my-3">
      <div class="position-relative overflow-hidden border-3">
          <img src="${data.meals[i].strMealThumb}" alt="${data.meals[i].strMeal}">
          <div class="meal-overlay position-absolute d-flex align-items-center justify-content-center text-white p-2">
              <h3>${data.meals[i].strMeal}</h3>
          </div>
      </div>
  </div>
            `;
    }
    row.innerHTML = cartona;
  }
  displayData();
}


// search by Name & First letter

searchBtn.addEventListener("click", function (e) {
   closeNav()
    e.preventDefault()
    row.innerHTML = `<div class="inputs-groub d-flex  ms-auto">
    <input onkeyup="searchByMealName(this.value)" type="text" name="text" class="input my-4 mx-2" placeholder="Search by Meal Name ">
    <input onkeyup="searchByFirstLetter(this.value)" type="text" name="text" class="input my-4 mx-2" placeholder="Search by Meal Firsr Letter ">
   </div>`;
  
});


async function searchByMealName(target) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${target}`);
    let data = await api.json();
    console.log(data);

    function displayData(){
        let cartona = ``
        for(let i=0 ; i<data.meals.length ; i++) {
            cartona += `
            <div class="col-md-3 my-3">
           <img src="${data.meals[i].
            strMealThumb
            }" alt="">
          </div>
            `
    }
    displaySearchItems.innerHTML = cartona


}
displayData()

}


async function searchByFirstLetter(target) {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${target}`);
    let data = await api.json();
    console.log(data);
    function displayData(){
        let cartona = ``
        for(let i=0 ; i<data.meals.length ; i++) {
            cartona += `
            <div class="col-md-3 my-3">
           <img src="${data.meals[i].
            strMealThumb
            }" alt="">
          </div>
            `
    }
    displaySearchItems.innerHTML = cartona


}
displayData()
}



// search by categories


categories.addEventListener('click', function(e){
    e.preventDefault();
    closeNav()
    row.innerHTML = ``;
    getCategories();
});


function appearDetails(index) {
    let api = fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(response => response.json())
        .then(data => {
            let category = data.categories[index];
            row.innerHTML = `
                <div class="col-md-6">
                <img class= "w-75" src=" ${category.strCategoryThumb}" alt="">

                    <h1 class="text-white text-center mt-3">${category.strCategory}</h1>
                </div>
            `;
        })
        
}

async function getCategories() {
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await api.json();
    console.log(data);

    function displayCategories() {
        let row = document.getElementById('row'); 
        let cartona = ``;
        for (let i = 0; i < data.categories.length; i++) {
            cartona += `
                <div class="col-md-3 my-3">
                    <div class="position-relative overflow-hidden border-3">
                        <img src="${data.categories[i].strCategoryThumb}">
                        
                        <div onclick="appearDetails(${i})" class="meal-overlay position-absolute d-flex align-items-center justify-content-center text-white p-2">
                            <h3>${data.categories[i].strCategory}</h3>
                        </div>
                    </div>
                </div>
            `;
        }
        row.innerHTML = cartona;
    }

    displayCategories();
}




contactUs.addEventListener('click', function(e){
    closeNav()
    e.preventDefault()
    showContacts()
})




area.addEventListener("click" , function(e){
    e.preventDefault()
    closeNav()
   showAreas()

})





async function showAreas() {
    let api = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let data = await api.json();
    console.log(data);

    let cartona = ``;
    for (let i = 0; i < data.meals.length; i++) {
        cartona += `
            <div class="col-md-3 text-white text-center">
                <i onclick="displayDetails(${i})" class="fa-solid fa-house-laptop  fa-6x"></i>
                <h2 class="my-3">${data.meals[i].strArea}</h2>
            </div>`;
    }

    row.innerHTML = cartona;
}

async function displayDetails(i) {
    let api = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    let data = await api.json();
    console.log(data);

    let meal = data.meals[i];

    let cartona = `
        <div class="col-md-4">
            <img src="${meal.strMealThumb}" alt="">
            <h2 class="mx-2 text-white">${meal.strMeal}</h2>
        </div>
        <div class="col-md-8">
            <h1 class="text-white">Instructions</h1>
            <p class="text-white mt-3 fs-3">${meal.strInstructions}</p>
            <ul class="mt-3">
                <li class="text-white fs-4"><span class="fw-bolder fs-3">Area :</span> ${meal.strArea}</li>
                <li class="text-white fs-4"><span class="fw-bolder fs-3">Category :</span> ${meal.strCategory}</li>
                <li class="text-white fs-4"><span class="fw-bolder fs-3">Recipes :</span> <span class="recipes">test</span> </li>
            </ul>
        </div>`;
    
    row.innerHTML = cartona;
}


ingredient.addEventListener("click" , function(e){
    e.preventDefault()
    closeNav()
    displayIngredient()

})

async function displayIngredient(){
    let api =await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
    let data = await api.json()
    console.log(data);

    let cartona = ``
    for(i = 0; i < 20 ; i++){
        cartona += `
        <div class="col-md-3 text-white text-center">
            <i onclick="displayLast('${data.meals[i].strIngredient}')" class="fa-solid fa-drumstick-bite  fa-6x"></i>
            <h2 class="my-3">${data.meals[i].strIngredient}</h2>
        </div>`;

    }
    row.innerHTML = cartona
}


async function displayLast(inputMeal){
    let api = await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?i=${inputMeal}`)
    let data = await  api.json();
    console.log(data);  

    let cartona = ``
    for(let i = 0; i < data.meals.length; i++) {

        cartona+= `
        <div class="col-md-3">
          <img onclick="displayDetails(${i})" class= "w-100 my-2" src="${data.meals[i].strMealThumb}" alt="">

  
         </div>
    
        `
}

row.innerHTML = cartona
}













function showContacts() {
    row.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

