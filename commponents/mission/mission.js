

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
        
        // console.log(datamission);
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

async function filtrageMission(){

  const datamission = await getMissions();
  const sectionMission = document.getElementById("section-mission");


  // const sectionFiltrage = document.getElementsByClassName("section-filtrage")[0];
  const sectionFiltrage = document.getElementsByClassName("section-filtrage")[0];

  let titreNonRdouble = [...new Set(datamission.map(element => element.title))];

  // console.log(titreNonRdouble);
 
titreNonRdouble.map(elt =>console.log(elt.title))

  sectionFiltrage.innerHTML = `
  <button class="btn btn-success col-2 ml-1" id="filtrer">Filtrer</button>
    <select class="col-8" id="selection-value">
      <option disabled selected>Par Technologie</option>
      ${titreNonRdouble.map(title => `<option >${title}</option>`)}
    </select>

    
  `;

 const valueSelectionner = document.getElementById("selection-value");
 const btnFiltere = document.getElementById("filtrer");
  

  btnFiltere.addEventListener("click", function() {
                const valeurChoisie = valueSelectionner.value;

                if(valeurChoisie == "Par Technologie"){
                  alert("veuillez selectionr une technologie a rechercher ");
                  return;
                }
              
                const missionFilters = datamission.filter(mission => mission.title === valeurChoisie)
                console.log(missionFilters);
              
              
                  sectionMission.innerHTML = missionFilters.map(mission => `
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
                    `)
  })

  

  }
filtrageMission()





