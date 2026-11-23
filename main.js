const heading = document.querySelector("#myh1");
const paragraph = document.querySelector("#myParagraph");
const statusMessage = document.querySelector("#statusMessage");
const themeButton = document.querySelector("#themeButton");
const highlightButton = document.querySelector("#highlightButton");
const countButton = document.querySelector("#countButton");
const studentForm = document.querySelector("#studentForm");
const studentNameInput = document.querySelector("#studentName");
const studentList = document.querySelector("#studentList");

let students = ["Evans", "John", "Mary", "Jane"];

function setStatus(message) {
    statusMessage.textContent = message;
}

function createIconSvg() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M3 6h18M8 6V3h8v3M19 6l-1 15H6L5 6M10 10v7M14 10v7");
    svg.appendChild(path);
    return svg;
}

function renderStudents() {
    studentList.replaceChildren();

    students.forEach((student, index) => {
        const listItem = document.createElement("li");
        const nameSpan = document.createElement("span");
        const removeButton = document.createElement("button");

        nameSpan.textContent = student;
        removeButton.type = "button";
        removeButton.className = "remove-button";
        removeButton.dataset.index = String(index);
        removeButton.appendChild(createIconSvg());
        const removeText = document.createElement("span");
        removeText.textContent = "Remove";
        removeButton.appendChild(removeText);
        removeButton.setAttribute("aria-label", `Remove ${student}`);

        listItem.append(nameSpan, removeButton);
        studentList.appendChild(listItem);
    });
}

heading.style.color = "#1a73e8";
heading.style.textAlign = "center";
paragraph.style.textAlign = "justify";

themeButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    themeButton.querySelector("span").textContent = isDark
        ? "Switch to light theme"
        : "Switch to dark theme";
    setStatus(isDark ? "Dark theme enabled." : "Light theme enabled.");
});

highlightButton.addEventListener("click", () => {
    const isHighlighted = paragraph.classList.toggle("highlight");
    highlightButton.querySelector("span").textContent = isHighlighted
        ? "Remove paragraph highlight"
        : "Highlight paragraph";
    setStatus(isHighlighted ? "Paragraph highlighted." : "Highlight removed.");
});

countButton.addEventListener("click", () => {
    setStatus(`There are ${students.length} student${students.length === 1 ? "" : "s"}.`);
});

studentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = studentNameInput.value.trim();
    if (!name) {
        setStatus("Please enter a student name.");
        studentNameInput.focus();
        return;
    }

    students.push(name);
    renderStudents();
    studentForm.reset();
    studentNameInput.focus();
    setStatus(`${name} was added.`);
});

studentList.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".remove-button");
    if (!removeButton) {
        return;
    }

    const index = Number(removeButton.dataset.index);
    const removedStudent = students[index];
    students.splice(index, 1);
    renderStudents();
    setStatus(`${removedStudent} was removed.`);
});

renderStudents();