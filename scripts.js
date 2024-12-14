const content = {
    header: {
        name: "Nesru Abbamilki",
        tagline: "Web Developer, Designer",
        image: "nesru.jpg",
    },
    sections: [
        {
            id: "bio",
            title: "About Me",
            content: "Write about yourself here.",
        },
        {
            id: "experience",
            title: "Work Experience",
            content: "Add details about your professional experience here.",
        },
        {
            id: "education",
            title: "Education",
            content: "Describe your educational background here.",
        },
        {
            id: "activity",
            title: "Activity",
            content: " ", 
        },
        {
            id: "contact-section",
            title: "Contact",
        },
    ],
    footer: {
        text: "&copy; 2024 Nesru Abbamilki | Built with ❤️ for future opportunities.",
    },
};

function loadContent(key, fallback) {
    const savedContent = localStorage.getItem(key);
    return savedContent !== null ? savedContent : fallback;
}

function saveContent(key, value) {
    localStorage.setItem(key, value);
}

function persistContent() {
    if (!localStorage.getItem("content")) {
        localStorage.setItem("content", JSON.stringify(content));
    }
}

function getPersistedContent() {
    const persisted = localStorage.getItem("content");
    return persisted ? JSON.parse(persisted) : content;
}

function buildMain() {
    const main = document.getElementById("main");
    const contentData = getPersistedContent();

    const sectionHTML = contentData.sections
        .filter((section) => section.id !== "contact-section")
        .map((section) => {
            const sectionContent = loadContent(section.id, section.content);
            return `
                <section id="${section.id}">
                    <h2>${section.title}</h2>
                    <div class="content-area" 
                         contenteditable="false" 
                         oninput="saveContent('${section.id}', this.innerHTML)">
                        ${sectionContent}
                    </div>
                </section>
            `;
        })
        .join("");

    main.innerHTML = sectionHTML;
}

function buildHeader() {
    const header = document.getElementById("header");
    const contentData = getPersistedContent();

    header.innerHTML = `
        <div class="profile">
            <img src="${loadContent("header-image", contentData.header.image)}" alt="Profile Photo" class="profile-photo">
            <h1>${loadContent("header-name", contentData.header.name)}</h1>
            <p class="tagline">${loadContent("header-tagline", contentData.header.tagline)}</p>
        </div>
    `;
}

function buildNav() {
    const nav = document.getElementById("nav");
    const contentData = getPersistedContent();

    nav.innerHTML = `
        <ul>
            ${contentData.sections.map(
                (section) => `<li><a href="#${section.id}">${section.title}</a></li>`
            ).join("")}
        </ul>
    `;
}

function buildFooter() {
    const footer = document.getElementById("footer");
    const contentData = getPersistedContent();

    footer.innerHTML = `
        <p>${loadContent("footer-text", contentData.footer.text)}</p>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    persistContent();

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                if (this.getAttribute("href") === "#activity") {
                    const fileInput = document.getElementById("file-upload");
                    const textArea = document.getElementById("activity-content");
                    fileInput.focus();
                    textArea.focus();
                }
            }
        });
    });

    buildHeader();
    buildNav();
    buildMain();
    buildFooter();
});

function enableEditMode() {
    const correctCode = "1234"; 
    const codePopup = document.getElementById("codePopup");
    const editCodeInput = document.getElementById("editCode");
    const confirmCodeButton = document.getElementById("confirmCodeButton");
    const cancelPopupButton = document.getElementById("cancelPopupButton");

    codePopup.style.display = "block";

    confirmCodeButton.addEventListener("click", () => {
        const userCode = editCodeInput.value;
        if (userCode === correctCode) {
            document.querySelectorAll(".content-area").forEach((element) => {
                element.contentEditable = "true";
                element.style.border = "1px dashed #ccc"; 
            });
            alert("Edit mode enabled!");
            codePopup.style.display = "none";
        } else {
            alert("Incorrect code. Action canceled.");
        }
    });

    cancelPopupButton.addEventListener("click", () => {
        codePopup.style.display = "none"; 
    });
}

document.getElementById("editModeButton").addEventListener("click", enableEditMode);
