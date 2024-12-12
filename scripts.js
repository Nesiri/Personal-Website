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

// Function to clear all saved content in localStorage
function clearAllSavedContent() {
    localStorage.clear(); // Removes everything stored in localStorage
}

// Function to load content from localStorage or fallback to default
function loadContent(key, fallback) {
    const savedContent = localStorage.getItem(key);
    return savedContent !== null ? savedContent : fallback;
}

// Function to save content to localStorage
function saveContent(key, value) {
    localStorage.setItem(key, value);
}

// Function to build dynamic sections
function buildMain() {
    const main = document.getElementById("main");

    // Build all sections except the contact section
    const sectionHTML = content.sections
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

// Build dynamic header and footer
function buildHeader() {
    const header = document.getElementById("header");
    header.innerHTML = `
        <div class="profile">
            <img src="${loadContent("header-image", content.header.image)}" alt="Profile Photo" class="profile-photo">
            <h1>${loadContent("header-name", content.header.name)}</h1>
            <p class="tagline">${loadContent("header-tagline", content.header.tagline)}</p>
        </div>
    `;
}

function buildNav() {
    const nav = document.getElementById("nav");
    nav.innerHTML = `
        <ul>
            ${content.sections.map(
                (section) => `<li><a href="#${section.id}">${section.title}</a></li>`
            ).join("")}
        </ul>
    `;
}

function buildFooter() {
    const footer = document.getElementById("footer");
    footer.innerHTML = `
        <p>${loadContent("footer-text", content.footer.text)}</p>
    `;
}



// Smooth scrolling and focus on Activity section
document.addEventListener("DOMContentLoaded", () => {
    // Attach click events to navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                // Focus Activity section
                if (this.getAttribute("href") === "#activity") {
                    const fileInput = document.getElementById("file-upload");
                    const textArea = document.getElementById("activity-content");
                    fileInput.focus();
                    textArea.focus();
                }
            }
        });
    });

    // Build all sections
    buildHeader();
    buildNav();
    buildMain();
    buildFooter();
});

// Function to enable edit mode with code verification
function enableEditMode() {
    const correctCode = "1234"; // Replace with your secret code
    const codePopup = document.getElementById("codePopup");
    const editCodeInput = document.getElementById("editCode");
    const confirmCodeButton = document.getElementById("confirmCodeButton");
    const cancelPopupButton = document.getElementById("cancelPopupButton");

    // Show the popup modal
    codePopup.style.display = "block";

    // Function to handle code verification
    confirmCodeButton.addEventListener("click", () => {
        const userCode = editCodeInput.value;
        if (userCode === correctCode) {
            // Proceed with enabling edit mode after verification
            document.querySelectorAll(".content-area").forEach((element) => {
                element.contentEditable = "true";
                element.style.border = "1px dashed #ccc"; // Visual indicator for editable
            });
            alert("Edit mode enabled!");
            // Close the popup modal
            codePopup.style.display = "none";
        } else {
            alert("Incorrect code. Action canceled.");
        }
    });

    // Close the modal when cancel is clicked
    cancelPopupButton.addEventListener("click", () => {
        codePopup.style.display = "none"; // Hide the popup without making changes
    });
}

// Event listener for enabling edit mode on button click
document.getElementById("editModeButton").addEventListener("click", enableEditMode);


















