let allMissions = [];
const sectionMission = document.getElementById("section-mission");
const MISSION_STORAGE_KEY = 'missionData';

async function getMissions(){
    const storedMissions = localStorage.getItem(MISSION_STORAGE_KEY);
    
    if (storedMissions) {
        return JSON.parse(storedMissions);
    } else {
        const mission = await  fetch('../../data/mission.json');
        const datamission = await mission.json();
        localStorage.setItem(MISSION_STORAGE_KEY, JSON.stringify(datamission));
        return datamission;
    }
}

function renderMissions() {
    if (!sectionMission) return;

    let cardMission = '';

    if (allMissions.length === 0) {
        cardMission = '<p class="text-center text-muted">Aucune mission disponible.</p>';
    } else {
        for(const mission of allMissions){
            cardMission += `
                <div class="card mission-card h-100 p-3">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${mission.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${mission.company}</h6>
                        <p class="card-text mt-2">${mission.description}</p>
                        <div class="mt-auto">
                            <span class="badge me-2"><i class="bi bi-geo-alt"></i> ${mission.location}</span>
                            <span class="badge bg-secondary me-2">${mission.duration}</span>
                            <span class="badge bg-success">${mission.budget}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    sectionMission.innerHTML = cardMission;
}

async function initialiserPage(){
    allMissions = await getMissions();
    console.log("Missions chargées:", allMissions);
    renderMissions();
}

initialiserPage();

//====================user story 2

const modalContainer = document.getElementById('mission-modal-container');
const addMissionButton = document.getElementById('add-mission');
const closeModalButton = document.getElementById('close-modal-btn');

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

if (addMissionButton) {
    addMissionButton.addEventListener('click', openModal);
}

if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
}

if (modalContainer) {
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            closeModal();
        }
    });
}

const formulaireMission = document.getElementById('mission-form');
const titre = document.getElementById('title');
const entreprise = document.getElementById('company');
const description = document.getElementById('description');
const lieuEl = document.getElementById('location');
const duree = document.getElementById('duration');
const budget = document.getElementById('budget');

formulaireMission.addEventListener('submit', e => {
    e.preventDefault();

    if (validerFormulaireMission()) {
        const nouvelleMission = {
            id: Date.now(),
            title: titre.value.trim(),
            company: entreprise.value.trim(),
            description: description.value.trim(),
            location: lieuEl.value.trim(),
            duration: duree.value.trim(),
            budget: budget.value.trim()
        };

        allMissions.unshift(nouvelleMission);
        localStorage.setItem(MISSION_STORAGE_KEY, JSON.stringify(allMissions));
        
        renderMissions();
        closeModal();
        formulaireMission.reset();
    } else {
        console.log("Le formulaire est invalide, le modal reste ouvert.");
    }
});

const definirErreur = (element, message) => {
    const controleSaisie = element.parentElement;
    const affichageErreur = controleSaisie.querySelector('.error');

    affichageErreur.innerText = message;
    controleSaisie.classList.add('error');
    controleSaisie.classList.remove('success');
}

const definirSucces = element => {
    const controleSaisie = element.parentElement;
    const affichageErreur = controleSaisie.querySelector('.error');

    affichageErreur.innerText = '';
    controleSaisie.classList.add('success');
    controleSaisie.classList.remove('error');
};

const validerFormulaireMission = () => {
    const valeurTitre = titre.value.trim();
    const valeurEntreprise = entreprise.value.trim();
    const valeurDescription = description.value.trim();
    const valeurLieu = lieuEl.value.trim();
    const valeurDuree = duree.value.trim();
    const valeurBudget = budget.value.trim();
    let estValide = true;

    if (valeurTitre === '') {
        definirErreur(titre, 'Le titre est requis');
        estValide = false;
    } else {
        definirSucces(titre);
    }

    if (valeurEntreprise === '') {
        definirErreur(entreprise, "L'entreprise est requise");
        estValide = false;
    } else {
        definirSucces(entreprise);
    }

    if (valeurDescription === '') {
        definirErreur(description, 'La description est requise');
        estValide = false;
    } else {
        definirSucces(description);
    }

    if (valeurLieu === '') {
        definirErreur(lieuEl, 'La localisation est requise');
        estValide = false;
    } else {
        definirSucces(lieuEl);
    }

    if (valeurDuree === '') {
        definirErreur(duree, 'La durée est requise');
        estValide = false;
    } else {
        definirSucces(duree);
    }

    if (valeurBudget === '') {
        definirErreur(budget, 'Le budget est requis');
        estValide = false;
    } else {
        definirSucces(budget);
    }

    return estValide;
};


async function getMissions(){
    const mission = await  fetch('../../data/mission.json');
    const datamission = await mission.json();
    return datamission
}


//==========================================

function AfficherListesMission(){

    

    async function main(){
        const sectionMission = document.getElementById("section-mission");
        const datamission = await getMissions();
        console.log(datamission);
        let cardMission = '';

        for(mission of datamission){
            cardMission += `
            <div id="missionsContainer" class="row g-4">
                    <div class="card mission-card h-100 p-3">
                            <div class="card-body d-flex flex-column">
                              <h5 class="card-title">${mission.title}</h5>
                              <h6 class="card-subtitle mb-2 text-muted">${mission.company}</h6>
                              <p class="card-text mt-2">${mission.description}</p>

                              <div class="mt-auto">
                                <span class="badge me-2"><i class="bi bi-geo-alt"></i> ${mission.location}</span>
                                <span class="badge bg-secondary me-2">${mission.duration}</span>
                                <span class="badge bg-success">${mission.budget}</span>
                              </div>
                            </div>
                    </div>
            </div>
             `
        }
        sectionMission.innerHTML = cardMission;
    }
            
   
    main()
}
AfficherListesMission()









//====================user story 2












//=============================userStory 3










//========================userStory4 





