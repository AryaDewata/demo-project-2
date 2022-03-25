const BULAN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function timeConvert(num){
   let time = new Date(String(num).slice(0, 10) * 1000);
   let tanggal = time.getDate();
   let bulan = BULAN[time.getMonth()];
   let tahun = time.getFullYear();
   return `${tanggal} ${bulan} ${tahun}`;
}
let modalDetail = document.querySelector('#modalDetailNft .modal-dialog .modal-content .modal-body');
let modalStatistik = document.querySelector('#modalStatistik .modal-dialog .modal-content .modal-body');
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
      let dataVolume = [];
      response.data.results.forEach(e => {
         let waktu = timeConvert(e.time);
         let totalPenjualan = e.sales;
         let volume = Math.ceil(e.volume / 100000000);
         let data = `
            <tr>
               <td>${waktu}</td>
               <td>${totalPenjualan}</td>
               <td>${volume} WAX</td>
            </tr>`
         dataVolume.push(data);
      })
      modalStatistik.innerHTML = `
      <table class="table table-striped">
         <tr>
            <th>Time</th>
            <th>Sales</th>
            <th>Volume</th>
         </tr>
         ${dataVolume.join('')}
      </table>`
      let dayVolume = Math.ceil(response.data.results[response.data.results.length - 1].volume / 100000000);
      document.querySelector('#dayVol').innerHTML = `<h5 style="color: white"><i class="fas fa-chart-line" style="color: lightgreen"></i> 24h Volume : <span style="color: lightgreen">${dayVolume} WAX</span></h5>`;
   });
fetch('https://wax.api.atomicassets.io/atomicmarket/v1/stats/sales?symbol=WAX&collection_whitelist=samuraiworld')
   .then(response => response.json())
   .then(response => {
      let totalVolume = parseInt(response.data.result.volume / 100000000);
      document.querySelector('#totalVol').innerHTML = `<h5 style="color: white"><i class="fas fa-chart-line" style="color: lightgreen"></i> Total Volume : <span style="color: lightgreen">${totalVolume} WAX</span></h5>`;
   });
