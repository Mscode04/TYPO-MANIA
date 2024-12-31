// Disable right-click context menu
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.key === "F12" || 
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J")) || 
        (event.ctrlKey && event.key === "U")) {
        event.preventDefault();
    }
});

// Detect and prevent developer tools usage
setInterval(function() {
    if (window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100) {
        alert("Inspecting is disabled on this site!");
        window.close();
    }
}, 1000);