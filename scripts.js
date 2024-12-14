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
            content: [ "I can communicate between server and client using HTML/CSS, Java scripts, IOT, and C++ programming language. I also have teamwork, communication, and leadership experiences during collaboration.",
                       "Work ethics and attitude: I am goal-focused so I am determined.",
                      "In my previous job, I had to work independently with little supervision and assistance. Our industry operates in a fast-paced environment, where its speed is relative to the demand of customers, When things became very fast-paced and employees were absent, I worked hard to finish the job on time. Thus, my supervisor often thanked me, which I consider a celebration of my strong work ethic.",

                     "I am committed to professional development and regularly participate in software development to stay at the forefront of drafting technology."
                 ],
        },
        {
            id: "experience",
            title: "Work Experience",
            content: ["Cargill",
                       "Apr 2023 - Present 1 year 9 months",

                       "Alberta, Canada.",

                   "At Cargill,I was responsible for scaling products and transporting them to the elevator for shipment. My duties included measuring the products accurately and working with teams to ensure everything was prepared on time for dispatch. This job required strong attention to detail and teamwork to keep things running smoothly"
                ]
           
        },
        
        {
            id: "education",
            title: "Education",
            content:[ "Bow Valley College",
                     "Diploma of Education Software Development",
                     "2024 - 2026.",
            ]
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
            const fontSize = section.style?.fontSize || "calc(10px + 0.5vw)"; // Default font size if not specified
            return `
                <section id="${section.id}">
                    <h2>${section.title}</h2>
                    <div class="content-area" 
                         contenteditable="false" 
                         style="font-size: ${fontSize};" 
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
        <button id="editButton">Edit</button>
        <input type="text" id="editCode" placeholder="Enter code here" style="display: none;">
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
    enableEditMode();
});

function enableEditMode() {
    const correctCode = "1234"; 
    const editButton = document.getElementById("editButton");
    const editCodeInput = document.getElementById("editCode");

  
    editCodeInput.style.display = "none";

  
    editButton.addEventListener("click", function() {
       
        if (editCodeInput.style.display === "none") {
            editCodeInput.style.display = "inline"; 
        } else {
            const userCode = editCodeInput.value.trim(); 

            if (userCode === correctCode) {
                
                document.querySelectorAll(".content-area").forEach((element) => {
                    element.contentEditable = "true";
                    element.style.border = "1px dashed #ccc"; 
                    element.style.backgroundColor = "#fff"; 
                });

               
                alert("Edit mode enabled!");

                editCodeInput.style.display = "none"; 
                editCodeInput.value = ""; 
            } else {
              
                alert("Incorrect code. Try again.");
            }
        }
    });
}


