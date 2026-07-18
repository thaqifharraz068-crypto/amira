// Mengambil elemen daripada HTML
const wishForm = document.getElementById('wishForm');
const wishesContainer = document.getElementById('wishesContainer');

//1. Fungsi Hantar Ucapan ke Firebase
wishForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('guestName').value.trim();
  const message = document.getElementById('guestName').value.trim();
  if(name && message) {
    // Menyimpan data ke dalam laluan 'ucapamn' di Firebase Database
    database.ref('ucapan').push({
      nama: name,
      ucapan: message,
      masa: Date.now()
    }).then(() => {
      // Reset borang selepas berjaya hantar
      wishForm.reset():
    }).catch((error) => {
      alert("Gagal menghantar ucapan. Sila cuba lagi.");
      console.error(error);
    });
  }
});
// 2. Fungsi Membaca Ucapan Secara Realtime dari Firebase
database.ref('ucapan').on('value', (snapshot) => {
  wishesContiner.innerHTML = ''; // Kosongkan bekas kontenaterlebih dahulu
  const data = snapshot.val();
  if (!data) {
    wishesContainer.innerHTML = '<p class="loading">Belum ada ucapan lagi. Jadilah yang pertama!</p>';
    return;
  }
  // Tukar objek database kepada senarai (array) dan susun mengikut masa terbaru di atas
  const wishesList = Object.keys(data).map(key => data[key]);
  wishesList.sort((a, b) => b.masa);
  //Paparkan setiap ucapan dalam bentuk kad HTML
  wishesList.forEach(item => {
    const card = document.createElement('div');
    card.className = 'wish-card';
    card.innerHTML = '
      <div class="wish-name">${escapHTML(item.nama)}</div>
      <p class="wish-text">${escapeHTML(item.ucapan)}</p>
    ';
    wishesContainer.appendChild(card);
});
});
// Fungsi keselamatanuntuk mengelakkan kod hasad daripada tetamu (XSS Protection)
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g,
       tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
                     }
