// Mengambil elemen daripada HTML
const wishForm = document.getElementById('wishForm');
const wishesContainer = document.getElementById('wishesContainer');

// 1. Fungsi Hantar Ucapan ke Firebase
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
            alert("Gagal menghantar ucapan. Sila cuba lagi.");
            console.error(error);
        });
    }
});

// 2. Fungsi Membaca Ucapan Secara Realtime dari Firebase
database.ref('ucapan').on('value', (snapshot) => {
    wishesContainer.innerHTML = ''; // Kosongkan bekas kontena
    
    const data = snapshot.val();
    
    if (!data) {
        wishesContainer.innerHTML = '<p class="loading">Belum ada ucapan lagi. Jadilah yang pertama!</p>';
        return;
    }

    // Paparkan ucapan
    Object.keys(data).forEach(key => {
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
