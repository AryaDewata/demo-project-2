let modalDetail = document.querySelector('#modalDetailNft .modal-dialog .modal-content .modal-body');
async function getData(url, linkNft){
   fetch(url)
      .then(response => response.json())
      .then(response => {
         let name = response.data.name;
         let issuedSupply = response.data.issued_supply;
         let author = response.data.collection.author;
         let collection = response.data.collection.collection_name;
         let burnable = response.data.is_burnable;
         let transferable = response.data.is_transferable;
         let MaxSupply = response.data.max_supply;
         let fee = response.data.collection.market_fee;
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
let btnDetail = document.querySelectorAll('.lihat-detail');
btnDetail.forEach(e => {
   e.addEventListener('click', function(){
      getData(`${this.dataset.urlnft}`, `${this.dataset.atomurl}`);
   })
})
