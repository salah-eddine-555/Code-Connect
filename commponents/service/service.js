

// function pour fetche data de services 

async function getServices(){
    const services = await fetch('../../data/service.json');
    const dataservice = await  services.json();

    return dataservice;
}





//=============== user story1 

async function afficherServices(){
    const sectionService = document.getElementsByClassName("section-services")[0];
    const dataservice = await getServices();

    console.log(dataservice);

    let cardService = '';

    for(service of dataservice){
        cardService += `
            <div class="col-4  text-center mt-5">
            <div class="card service-card d-flex flex-column bg-light rounded-30">
               <h5 class="card-title">${service.category}</h5>
               <p class="card-text mt-2">${service.description}</p>
                <h6 class="card-subtitle mb-2 text muted"> </h6>
               <div class="mt-auto pb-3">
                <span class="badge  bg-secondary p-2">${service.delivery_days} days</span>
                <span class="badge  bg-success p-2"> ${service.price} ${service.currency}</span>
               </div>
            </div>
        </div>
        `
    }
    sectionService.innerHTML = cardService;

    


}

afficherServices();















/////////////////// user story  2
















////////////// userstory 3










///////////// user story 4