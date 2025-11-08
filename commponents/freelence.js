

  async function getData() {
        const freelance = await fetch('../data/freelence.json')
        const dataFreeelance = await freelance.json()
        return dataFreeelance
    }

// // function 1 pour lister les freelencer(son photo, specialisation , leur moyenne)charge depuis json
function afficherListeFreelancers() {
    async function main() {
        const data = await getData()
    
        let cardParent = document.getElementsByClassName('section-freelance')[0]
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
        cardParent.innerHTML = card
        affichierDeatils()
    }
     main()
     

}

afficherListeFreelancers()

// // function 2 lorsuqe le clicl il faut afficher les details de freelencer (bio, compétences, projets, tarifs, avis).
///////////////////////////////////////////////////////
async function affichierDeatils(){
    const data = await getData()
    const detailSection = document.getElementById("details-section");
    const freelanceSection = document.getElementsByClassName("section-freelance")[0];
    
    const buttons = document.querySelectorAll(".btn-primary");

       function getDetailsById(data, id){
                for(const element of data){
                   if(String(element.id) === String(id)){
                     console.log(element.name) 
                     console.log(element.specialization) 
                     console.log(element.rating) 

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
                                                            
                                                                <div class="mt-3 d-flex justify-content-end">
                                                                    <button id="btn-fermer" class="btn btn-danger w-100 gap-10">Fermer</button>
                                                                    <button id="btn-fermer" class="btn btn-success w-100">Modifier</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            `;

                        detailSection.style.display = "block"

                        freelanceSection.style.display = "none";
                        detailSection.style.display = "block";

                        document.getElementById("btn-fermer").addEventListener("click", function () {
                            detailSection.style.display = "none";
                            freelanceSection.style.display = "";
                        })
                     
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
// function (){





// // function 4 (fonction pour  filtrer les freelances par spécialité (Développeur Web, Designer, Rédacteur, etc.).)
// function (){













// }
// js dial modal handeling 

const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('Close');
const modalContainer = document.querySelector('.modal-container');

openBtn.addEventListener('click', () => {
    modalContainer.classList.add('show-modal');
});

// Event listener to close the modal
closeBtn.addEventListener('click', () => {
    modalContainer.classList.remove('show-modal');
});

// Optional: Close modal by clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
        modalContainer.classList.remove('show-modal');
    }
});


// form validation using Regex 
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
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

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

};

