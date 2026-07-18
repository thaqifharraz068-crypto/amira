// Konfigurasi rasmi daripada tab Config Firebase anda
const firebaseConfig = {
    apiKey: "AIzaSyCEycSQL_vA6ut1gChhvfmtITpc8pPaMNk",
    authDomain: "izwan-amira-wedding.firebaseapp.com",
    databaseURL: "https://izwan-amira-wedding-default-rtdb.firebaseio.com",
    projectId: "izwan-amira-wedding",
    storageBucket: "izwan-amira-wedding.firebasestorage.app",
    messagingSenderId: "448660935827",
    appId: "1:448660935827:web:b06d34d7608e8fb3d4e966",
    measurementId: "G-1BJ0HDR8G7"
};

// Memulakan Firebase secara sah menggunakan modul compat
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
