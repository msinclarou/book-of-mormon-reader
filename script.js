let items = []; // chapters + verses
let index = 0;
let chapterSelect = null;
let chapterIndices = [];

fetch("scripture.txt")
    .then(res => res.text())
    .then(data => {
        parseScripture(data);
        const savedIndex = Number.parseInt(localStorage.getItem("bomReaderIndex"), 10);
        if (Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < items.length) {
            index = savedIndex;
        }
        setupChapterSelect();
        displayItem();
    });

function parseScripture(text) {
    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

    let currentChapter = "";
    let currentVerse = "";

    for (let line of lines) {
        // Chapter header
        if (line.startsWith("#")) {
            if (currentVerse) {
                items.push(currentVerse);
                currentVerse = "";
            }
            currentChapter = line.substring(1).trim();
            items.push({ type: "chapter", text: currentChapter });
        }
        // New verse (starts with a number)
        else if (/^\d+/.test(line)) {
            if (currentVerse) {
                items.push(currentVerse);
            }
            currentVerse = line;
        }
        // Continuation of verse
        else {
            currentVerse += " " + line;
        }
    }

    if (currentVerse) {
        items.push(currentVerse);
    }
}

function displayItem() {
    const display = document.getElementById("line");
    const item = items[index];

    if (item.type === "chapter") {
        display.innerText = item.text;
        display.style.fontWeight = "bold";
        display.style.fontSize = "26px";
    } else {
        display.innerText = item;
        display.style.fontWeight = "normal";
        display.style.fontSize = "20px";
    }

    localStorage.setItem("bomReaderIndex", index.toString());
    updateChapterSelect();
}

function nextLine() {
    if (index < items.length - 1) {
        index++;
        displayItem();
    }
}

function prevLine() {
    if (index > 0) {
        index--;
        displayItem();
    }
}

function setupChapterSelect() {
    chapterSelect = document.getElementById("chapter-select");
    if (!chapterSelect) {
        return;
    }

    chapterIndices = items
        .map((item, itemIndex) => (item.type === "chapter" ? { index: itemIndex, text: item.text } : null))
        .filter(Boolean);

    chapterSelect.innerHTML = "";
    for (const chapter of chapterIndices) {
        const option = document.createElement("option");
        option.value = chapter.index.toString();
        option.textContent = chapter.text;
        chapterSelect.appendChild(option);
    }

    chapterSelect.addEventListener("change", event => {
        const selectedIndex = Number.parseInt(event.target.value, 10);
        if (Number.isInteger(selectedIndex)) {
            index = selectedIndex;
            displayItem();
        }
    });

    updateChapterSelect();
}

function updateChapterSelect() {
    if (!chapterSelect || chapterIndices.length === 0) {
        return;
    }

    const chapterIndex = findCurrentChapterIndex(index);
    if (chapterIndex !== null) {
        chapterSelect.value = chapterIndex.toString();
    }
}

function findCurrentChapterIndex(startIndex) {
    for (let i = startIndex; i >= 0; i -= 1) {
        if (items[i].type === "chapter") {
            return i;
        }
    }
    return null;
}
