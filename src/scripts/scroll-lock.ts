const scrollLocked = document.getElementById("scroll-locked") as HTMLElement;

const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

console.log("Max Scroll: " + maxHeight);

window.scroll(0, 0);

window.addEventListener("scroll", () => {
    let scrollAmount = window.scrollY;
    scrollLocked.style.top = scrollAmount + "px";
    let number = Number(scrollLocked.style.top.split("px")[0]);
    if (number > maxHeight) {
        scrollLocked.style.top = maxHeight + "px";
        window.scroll(0, maxHeight)
    }
});