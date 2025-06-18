document.addEventListener("DOMContentLoaded", () => {
    // You can hook up form logic here later
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert(`${form.id === 'loginForm' ? 'Logging in...' : 'Registering...'}`);
        });
    });
});
