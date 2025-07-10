
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    
        if (navLinks.classList.contains("show")) {
            hamburger.style.display = "hidden";
        } else {
            hamburger.style.display = "visible"; 
        }
    });

     document.addEventListener("click", (event) => {
        const target = event.target;
        if (
            navLinks.classList.contains("show") && // sidebar open
            target !== navLinks &&                   // clicked NOT on sidebar itself
            !navLinks.contains(target) &&            // clicked NOT inside sidebar
            target !== hamburger &&                   // clicked NOT on hamburger
            !hamburger.contains(target)               // clicked NOT inside hamburger
        ) {
            navLinks.classList.remove("show");
            hamburger.style.display = "visible";
        }
    });

});