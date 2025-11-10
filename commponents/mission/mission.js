

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





