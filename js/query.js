let btnDetail;
// let xhr = new XMLHttpRequest();

// fetch('https://wax.api.atomicassets.io/atomicassets/v1/schemas?collection_name=samuraiworld&collcetion_whitelist=samuraiworld&page=1&limir=100&order=desc&sort=created')
//    .then(response => response.json())
//    .then(response => {
//       response.data.forEach(data => {
          
//          fetch(`https://wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=samuraiworld&schema_name=${data.schema_name}&has_assets=true&collection_whitelist=samuraiworld&page=1&limit=100&order=desc&sort=created`)
//             .then(response => response.json())
//             .then(response => {
//                let template = '';
//                if(response.data.length > 0){
//                   response.data.forEach(data => {
//                      let ID = data.template_id;
//                      let title = data.name;
//                      let deskripsi = data.immutable_data.description;
//                      let img = `https://ipfs.atomichub.io/ipfs/${data.immutable_data.img}`;
//                      console.log(img);
//                      // let img = `https://resizer.atomichub.io/images/v1/preview?ipfs=${data.immutable_data.img}&size=370`
//                      let atomUrl = `https://wax.atomichub.io/explorer/template/samuraiworld/${ID}`
//                      let urlNft = `https://wax.api.atomicassets.io/atomicassets/v1/templates/samuraiworld/${ID}`
//                      template += `
//                            <div class="col-lg-4 mb-5">
//                               <div class="card" style="width: 30rem;">
//                                  <img src="${img}" class="card-img-top" alt="${title}">
//                                     <div class="card-body">
//                                        <h5 class="card-title">${title}</h5>
//                                        <p class="text-muted">${deskripsi}</p>
//                                        <center>
//                                        <!-- <a target="_blank" href="https://wax.atomichub.io/explorer/template/samuraiworld/454593" class="btn btn-primary" style="color: white;">Details</a> -->
//                                        <a target="_blank" data-atomUrl="${atomUrl}" data-urlNft="${urlNft}" data-bs-toggle="modal" data-bs-target="#modalDetailNft" class="btn btn-primary lihat-detail" style="color: white;">Details</a>
//                                        </center>
//                                     </div>
//                               </div>
//                            </div>`
//                         })


//                   document.querySelector('#collection .row .row').innerHTML = template;
//                   btnDetail = document.querySelectorAll('.lihat-detail');
//                   btnDetail.forEach(e => {
//                      e.addEventListener('click', function(){
//                         getData(`${this.dataset.urlnft}`, `${this.dataset.atomurl}`);
//                      })
//                   })
//                }
//             })
//    })
// }) 
btnDetail = document.querySelectorAll('.lihat-detail');
   btnDetail.forEach(e => {
      e.addEventListener('click', function(){
         console.log(this.dataset.urlnft)
         getData(`${this.dataset.urlnft}`, `${this.dataset.atomurl}`);
      })
   })
let modalDetail = document.querySelector('#modalDetailNft .modal-dialog .modal-content .modal-body');
function getData(url, linkNft){
   fetch(url)
      .then(response => response.json())
      .then(response => {
         let schema = response.data.schema.schema_name;
         let name = response.data.name;
         let issuedSupply = response.data.issued_supply;
         let author = response.data.collection.author;
         let collection = response.data.collection.collection_name;
         let burnable = response.data.is_burnable;
         let transferable = response.data.is_transferable;
         let MaxSupply = response.data.max_supply;
         let fee = response.data.collection.market_fee;
         let templateID = response.data.template_id;
         modalDetail.innerHTML = `
         <table class="table table-striped">
            <tr>
               <td>Collection</td>
               <td><a target="_blank" href="https://wax.atomichub.io/explorer/collection/samuraiworld">${collection}</a></td>
            </tr>
            <tr>
               <td>Name</td>
               <td>${name}</td>
            </tr>
            <tr>
               <td>Schema</td>
               <td><a target="_blank" href="https://wax.atomichub.io/explorer/schema/samuraiworld/${schema}">${schema}</td>
            </tr>
            <tr>
               <td>Author</td>
               <td><a target="_blank" href="https://wax.atomichub.io/profile/${author}">${author}</a></td>
            <tr>
               <td>Issued Supply</td>
               <td>${issuedSupply}</td>
            </tr>
            <tr>
               <td>Max Supply</td>
               <td>${MaxSupply}</td>
            </tr>
            <tr>
               <td>Market Fee</td>
               <td>${fee * 100}%</td>
            </tr>
            <tr>
               <td>Template ID</td>
               <td>${templateID}</td>
            </tr>
            <tr>
               <td>NFTs Can Be Burned</td>
               <td>${burnable}</td>
            </tr>
            <tr>
               <td>NFTs Can Be Transferred</td>
               <td>${transferable}</td>
            </tr>
         </table>
         <center><a target="_blank" href="${linkNft}"><button class="btn btn-warning" style="font-size: 20px; width: 200px;">Buy / Make Offer</button></a></center>
         `
      })
}