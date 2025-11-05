
import '../data/freelence.json';

async function getText(file) {
  let x = await fetch(file);
  let y = await x.text();
  let w = JSON.parse(y);
  console.log(w.firstname);
}





// // function 1 pour lister les freelencer(son photo, specialisation , leur moyenne)charge depuis json
// function (){


// }



// // function 2 lorsuqe le clicl il faut afficher les details de freelencer (bio, compétences, projets, tarifs, avis).
function affichierDeatils(freelencer){

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
        detailSection.style.display="block"

        document.getElementById("btn-fermer").addEventListener("click", function(){
            detailSection.style.display="none";
        })


    
}




// // function 3  ( je veux pouvoir modifier mon profil via un formulaire avec validation)
// function (){


// }


// // function 4 (fonction pour  filtrer les freelances par spécialité (Développeur Web, Designer, Rédacteur, etc.).)
// function (){


// }