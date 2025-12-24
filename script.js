let text = [];
let index = 0;

fetch("scripture.txt")
    .then(response => response.text())
    .then(data => {
        text = data.split("\n").filter(line => line.trim() !== "");
        updateLine();
    })
    .catch(error => {
        document.getElementById("line").innerText = "Error loading scripture.";
        console.error(error);
    });

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
