const text = [
    "I, Nephi, having been born of goodly parents...",
    "Therefore I was taught somewhat in all the learning of my father...",
    "And I make a record of my proceedings in my days...",
    "Yea, I make a record in the language of my father..."
];

let index = 0;

function updateLine() {
    document.getElementById("line").innerText = text[index];
}

function nextLine() {
    if (index < text.length - 1) {
        index++;
        updateLine();
    }
}

function prevLine() {
    if (index > 0) {
        index--;
        updateLine();
    }
}

updateLine();
