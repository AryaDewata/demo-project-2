const collection = document.querySelector('#collection .row .twelve .row');
fetch("../data/collection.json")
   .then(response => response.json())
   .then(response => {
      let collectionList = [];
      response.forEach(data => {
         let newCollection = `
         <div class="col-lg-4 mb-5">
            <div class="card" style="width: 30rem;">
               <img src="${data.foto}" class="card-img-top" alt="${data.nama}">
                  <div class="card-body">
                     <h5 class="card-title">${data.nama}</h5>
                     <p class="text-muted">${data.deskripsi}</p>
                  <center>
                     <a target="_blank" data-foto="${data.foto}" data-urlNft="https://wax.api.atomicassets.io/atomicassets/v1/templates/samuraiworld/${data.id}" data-bs-toggle="modal" data-atomUrl="https://wax.atomichub.io/explorer/template/samuraiworld/${data.id}" data-bs-target="#modalDetailNft" class="btn btn-primary lihat-detail" style="color: white;">Details</a>
                  </center>
                  </div>
            </div>
         </div>`
         collectionList.push(newCollection);
      })
      collection.innerHTML = collectionList.join('');
   });
setTimeout(() => {
   let btnDetail;
   const modalDetail = document.querySelector('#modalDetailNft .modal-dialog .modal-content .modal-body');
   btnDetail = document.querySelectorAll('.lihat-detail');
      btnDetail.forEach(e => {
         e.addEventListener('click', function(){
            getData(`${this.dataset.urlnft}`, `${this.dataset.atomurl}`, `${this.dataset.foto}`);
         })
      })
   function getData(url, linkNft, foto){
      fetch(url)
         .then(response => response.json())
         .then(response => {
            if( !response.success ){
               modalDetail.innerHTML = `<div class="alert alert-danger">${response.message}</div>`;
               return false;
            }
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
            <center>
               <img src="${foto}" alt="${name}" style="height: 30%; width: 30%;">
            </center>
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
                  <td>${burnable ? '<i class="fas fa-check" style="color: green;"></i>' : '<i class="fas fa-ban" style="color: red;"></i>'}</td>
               </tr>
               <tr>
                  <td>NFTs Can Be Transferred</td>
                  <td>${transferable ? '<i class="fas fa-check" style="color: green;"></i>' : '<i class="fas fa-ban" style="color: red;"></i>'}</td>
               </tr>
            </table>
            <center>
               <a target="_blank" href="${linkNft}"><button class="btn btn-warning" style="font-size: 20px; width: 200px;">Buy / Make Offer</button></a>
            </center>`
         })
      }
}, 200)