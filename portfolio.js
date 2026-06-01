const API_URL = 'http://localhost:3000/api/messages';

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the page from refreshing automatically

    // 📦 Gather the values exactly from your form fields
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // 📡 Shoot the package straight to your active Express backend port
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Server returned an error status');
        }
        return res.json();
    })
    .then(data => {
        alert("🎉 Success! Your message was received securely by your local backend server.");
        document.getElementById('contactForm').reset(); // Clear the form fields cleanly
    })
    .catch(err => {
        console.error("Connection Error:", err);
        alert("Could not connect to the backend server. Make sure node server.js is running!");
    });
});