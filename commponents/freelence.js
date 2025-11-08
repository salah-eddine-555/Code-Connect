const STORAGE_KEY = 'freelancerData';

async function getData() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        const freelance = await fetch('../data/freelence.json');
        const dataFreeelance = await freelance.json();
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataFreeelance));
        return dataFreeelance;
    }
}

// // function 1 pour lister les freelencer(son photo, specialisation , leur moyenne)charge depuis json
function afficherListeFreelancers() {
    async function main() {
        const data = await getData();
    
        let cardParent = document.getElementsByClassName('section-freelance')[0];
        let card = "";

        for (const element of data.freelancers) {
            card += `
                <div class="card">
                    <img src="${element.profile_picture}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${element.specialization}</p>
                        <p class="card-text">${element.rating}</p>
                        <button id="${element.id}" class="btn btn-primary">Afficher details</button>
                    </div>
                </div>
            `;
        }
        cardParent.innerHTML = card;
        affichierDeatils();
    }
     main();
     

}

afficherListeFreelancers();

// // function 2 lorsuqe le clicl il faut afficher les details de freelencer (bio, compétences, projets, tarifs, avis).
///////////////////////////////////////////////////////
async function affichierDeatils(){
    const data = await getData();
    const detailSection = document.getElementById("details-section");
    const freelanceSection = document.getElementsByClassName("section-freelance")[0];
    
    const buttons = document.querySelectorAll(".btn-primary");

       function getDetailsById(data, id){
                for(const element of data){
                   if(String(element.id) === String(id)){
                     console.log(element.name);
                     console.log(element.specialization);
                     console.log(element.rating);

                     detailSection.innerHTML = `
                                            <div class="container-fluid p-3 bg-light">
                                                <div class="card shadow-lg rounded">
                                                    <div class="row g-0">
                                                        <div class="col-md-4 text-center my-auto p-3">
                                                            <img src="${element.profile_picture}" class="img-fluid rounded-circle border border-2" alt="${element.name}" style="max-width: 350px;">
                                                        </div>
                                                        <div class="col-md-8">
                                                            <div class="card-body">
                                                                <h2 class="card-title">${element.name}</h2>
                                                                <p class="card-text"><strong>Spécialisation :</strong> ${element.specialization}</p>
                                                                <p class="card-text"><strong>Note :</strong> ${element.rating}</p>
                                                                <p class="card-text"><strong>Bio :</strong> ${element.bio}</p>
                                                                
                                                                <p class="card-text"><strong>Compétences :</strong></p>
                                                                <ul class="list-group list-group-horizontal flex-wrap mb-2">
                                                                    ${element.competences.map(comp => `<li class="list-group-item m-1">${comp}</li>`).join('')}
                                                                </ul>
                                                            
                                                                <p class="card-text"><strong>Projets :</strong></p>
                                                                <ul class="list-group list-group-flush mb-2">
                                                                    ${element.projets.map(proj => `<li class="list-group-item">${proj}</li>`).join('')}
                                                                </ul>
                                                            
                                                                <p class="card-text"><strong>Avis :</strong></p>
                                                                <ul class="list-group list-group-flush">
                                                                    ${element.avis.map(avis => `<li class="list-group-item">${avis}</li>`).join('')}
                                                                </ul>
                                                            
                                                                <div class="mt-3 d-flex justify-content-end gap-2">
                                                                    <button id="btn-fermer" class="btn btn-danger w-100">Fermer</button>
                                                                    <button id="btn-modifier" class="btn btn-success w-100">Modifier</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            `;

                        detailSection.style.display = "block";

                        freelanceSection.style.display = "none";
                        detailSection.style.display = "block";

                        document.getElementById("btn-fermer").addEventListener("click", function () {
                            detailSection.style.display = "none";
                            freelanceSection.style.display = "";
                        });

                        document.getElementById("btn-modifier").addEventListener("click", function () {
                            // This code pre-fills the form
                            const freelancerEmail = element.email || `${element.name.toLowerCase().replace(/\s/g, '.')}@example.com`;
                            
                            if(username) username.value = element.name;
                            if(email) email.value = freelancerEmail;
                            
                            if(password) password.value = "";
                            if(password2) password2.value = "";
                            
                            // This line is added to track which user is being edited
                            form.dataset.editingId = element.id;
                            
                            // This code clears old errors
                            const inputs = form.querySelectorAll('.input-control');
                            inputs.forEach(input => {
                                input.classList.remove('success', 'error');
                                if(input.querySelector('.error')) {
                                    input.querySelector('.error').innerText = '';
                                }
                            });

                            // This code opens the modal
                            openModal();
                        });
                     
                   }
                }
            }
    

      buttons.forEach(button => {
        button.addEventListener("click", function() {
            const cardId = this.id;
            console.log(cardId);

            // tu pourras ici charger les détails du freelance
            getDetailsById(data.freelancers, cardId);
 
        });    
    });

}

// // function 3  ( je veux pouvoir modifier mon profil via un formulaire avec validation)
async function modifyinfos(id, newUsername, newEmail) {
    const currentData = await getData();
    
    const freelancerIndex = currentData.freelancers.findIndex(f => String(f.id) === String(id));

    if (freelancerIndex > -1) {
        currentData.freelancers[freelancerIndex].name = newUsername;
        currentData.freelancers[freelancerIndex].email = newEmail;
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
        
        console.log("data mchat l local storage");

        document.getElementsByClassName('section-freelance')[0].innerHTML = "";
        afficherListeFreelancers();

        document.getElementById("details-section").style.display = "none";
        document.getElementsByClassName("section-freelance")[0].style.display = "";

    } else {
        console.error("Could not find freelancer to update in localStorage");
    }
}
// js dial modal handeling 


const modalContainer = document.querySelector('.modal-container');
const form = document.getElementById('form');

function openModal() {
    if (modalContainer) {
        modalContainer.classList.add('show-modal');
    }
}

function closeModal() {
    if (modalContainer) {
        modalContainer.classList.remove('show-modal');
    }
}
// form validation using Regex 
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


form.addEventListener('submit', e => {
    e.preventDefault(); 

    // Check if inputs are valid
    if (validateInputs()) {
        const newUsername = username.value.trim();
        const newEmail = email.value.trim();
        const idToEdit = form.dataset.editingId;

        modifyinfos(idToEdit, newUsername, newEmail);
        
        closeModal();
        delete form.dataset.editingId;
    } else {
        console.log("Form is invalid, modal stays open.");
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    let isValid = true; 

    if(usernameValue === '') {
        setError(username, 'Username is required');
        isValid = false; 
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
        isValid = false; 
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        isValid = false; 
    } else {
        setSuccess(email);
    }


    if (passwordValue !== '' || password2Value !== '') {
        if(passwordValue === '') {
            setError(password, 'Password is required');
            isValid = false;
        } else if (passwordValue.length < 8 ) {
            setError(password, 'Password must be at least 8 character.');
            isValid = false;
        } else {
            setSuccess(password);
        }

        if(password2Value === '') {
            setError(password2, 'Please confirm your password');
            isValid = false;
        } else if (password2Value !== passwordValue) {
            setError(password2, "Passwords doesn't match");
            console.log(isValid);
            isValid = false;
        } else {
            setSuccess(password2);
        }
    } else {
    
        setSuccess(password);
        setSuccess(password2);
    }

    return isValid; 
};




// // function 4 (fonction pour  filtrer les freelances par spécialité (Développeur Web, Designer, Rédacteur, etc.).)
// function (){













// }