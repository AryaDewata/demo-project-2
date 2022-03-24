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
let formatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
});
function toDigit(angka){
   return formatter.format(String(angka)).split('').slice(1, -3).join('').split(',').join('.');
}
fetch('https://wax.api.atomicassets.io/atomicmarket/v1/stats/graph?symbol=WAX&collection_whitelist=samuraiworld')
   .then(response => response.json())
   .then(response => {
      let dayVolume = response.data.results[1].volume;
      console.log(response)
      dayVolume = (`${toDigit(dayVolume)}`).split('.')[0] + (Number((`${toDigit(dayVolume)}`).split('.')[1][0]) + 1);
      document.querySelector('#dayVol').innerHTML = `<h5 style="color: white"><i class="fas fa-chart-line" style="color: lightgreen"></i> 24h Volume : <span style="color: lightgreen">${dayVolume} WAX</span> ( Yesterday ) </h5>`;
   });
fetch('https://wax.api.atomicassets.io/atomicmarket/v1/stats/sales?symbol=WAX&collection_whitelist=samuraiworld')
   .then(response => response.json())
   .then(response => {
      let totalVolume = response.data.result.volume;
      console.log(response)
      totalVolume = (`${toDigit(totalVolume)}`).split('.')[0] + (Number((`${toDigit(totalVolume)}`).split('.')[1][0]) + 1);
      document.querySelector('#totalVol').innerHTML = `<h5 style="color: white"><i class="fas fa-chart-line" style="color: lightgreen"></i> Total Volume : <span style="color: lightgreen">${totalVolume} WAX</span> ( Now )</h5>`;
   });
