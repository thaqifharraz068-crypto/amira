const wishForm = document.getElementById('wishForm');
const wishesContainer = document.getElementById('wishesContainer');

// 1. Fungsi Menghantar Ucapan Ke Firebase
wishForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('guestName').value.trim();
    const message = document.getElementById('guestMessage').value.trim();

    if (name && message) {
        database.ref('ucapan').push({
            nama: name,
            ucapan: message,
            masa: Date.now()
        }).then(() => {
            wishForm.reset();
        }).catch((error) => {
            alert("Gagal menghantar ucapan. Sila semak sambungan internet.");
            console.error(error);
        });
    }
});

// 2. Fungsi Mengambil Dan Memaparkan Ucapan Secara Live
database.ref('ucapan').on('value', (snapshot) => {
    wishesContainer.innerHTML = ''; 
    
    const data = snapshot.val();
    
    if (!data) {
        wishesContainer.innerHTML = '<p class="loading">Belum ada ucapan lagi. Jadilah yang pertama!</p>';
        return;
    }

    // Susun susunan ucapan supaya yang terbaru berada di atas sekali
    const keys = Object.keys(data).reverse();
    
    keys.forEach(key => {
        const item = data[key];
        const card = document.createElement('div');
        card.className = 'wish-card';
        card.innerHTML = `
            <div class="wish-name">${item.nama}</div>
            <p class="wish-text">${item.ucapan}</p>
        `;
        wishesContainer.appendChild(card);
    });
});
