// // function 1 pour lister les freelencer(son photo, specialisation , leur moyenne)charge depuis json
async function getData() {
    const freelance = await fetch('../data/freelence.json')
    const dataFreeelance = await freelance.json()
    return dataFreeelance
}
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
                        <p style = "color: red;" class="card-text">${element.specialization}</p>
                        <span style = "display: block; margin-bottom: 20px">${element.rating}</span>
                        <a href="" class="btn btn-primary">Afficher details</a>
                    </div>
                </div>
            `;
        }
        cardParent.innerHTML = card
        
        filterBySpecialty()
    }

    main()
    
}
afficherListeFreelancers()

// // function 2 lorsuqe le clicl il faut afficher les details de freelencer (bio, compétences, projets, tarifs, avis).
///////////////////////////////////////////////////////
function affichierDeatils(freelencer) {

    const detailSection = document.getElementById("details-section");

    detailSection.innerHTML = `
        <div class="card-detail">
                    <img src="${freelencer.img}" alt="${freelncer.nom}">
                    <h2>${freelencer.nom}</h2>
                    <p><strong>Spécialisation : </strong>${freelencer.specialisation}</p>
                    <p><strong>moyenne : </strong>${freelencer.moyenne}</p>
                    <p><strong>bio : </strong>${freelencer.bio}</p>
                    <p><strong>projets : </strong>${freelencer.projets}</p>
                    <p><strong>avis : </strong>${freelencer.avis}</p>
                    <button id="btn-modifer">Modifier</button>
                    <button id="btn-fermer">Fermer</button>
                    
         </div>
        `
    detailSection.style.display = "block"

    document.getElementById("btn-fermer").addEventListener("click", function () {
        detailSection.style.display = "none";
    })



}
// // function 3  ( je veux pouvoir modifier mon profil via un formulaire avec validation)
// function (){


// }


// // function 4 (fonction pour  filtrer les freelances par spécialité (Développeur Web, Designer, Rédacteur, etc.).)
function filterBySpecialty() {
    let list = document.getElementById('ul-list')
    let specialisation = document.querySelectorAll('p.card-text')

    list.addEventListener('click', function(event){
        let selected = event.target.textContent

        specialisation.forEach(element => {
            let card = element.closest('.card')
            card.style.display = "block"

            if (selected !== "All") {
                if (element.textContent != selected) {
                card.style.display = "none"
                }
            }
        });
    });
}