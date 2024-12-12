// Save content to localStorage
function saveContent() {
    const content = {
        tags: document.querySelector("#tags ul").innerHTML,
        attributes: document.querySelector("#attributes tbody").innerHTML,
        examples: document.querySelector("#examples").innerHTML,
        resources: document.querySelector("#resources ul").innerHTML,
    };
    localStorage.setItem("htmlCheatSheetContent", JSON.stringify(content));
}

// Load content from localStorage
function loadContent() {
    const savedContent = JSON.parse(localStorage.getItem("htmlCheatSheetContent"));
    if (savedContent) {
        document.querySelector("#tags ul").innerHTML = savedContent.tags;
        document.querySelector("#attributes tbody").innerHTML = savedContent.attributes;
        document.querySelector("#examples").innerHTML = savedContent.examples;
        document.querySelector("#resources ul").innerHTML = savedContent.resources;
    }
}

// Add delete functionality
function makeDeletable() {
    const allSections = document.querySelectorAll("#tags ul li, #attributes tbody tr, #examples div, #resources ul li");
    allSections.forEach((item) => {
        if (!item.querySelector(".delete-button")) {
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button";
            deleteButton.style.marginLeft = "10px";
            deleteButton.addEventListener("click", () => {
                item.remove();
                saveContent();
            });
            item.appendChild(deleteButton);
        }
    });
}

// Enable editing for specified sections
function makeEditable() {
    const tagsList = document.querySelectorAll("#tags ul li");
    tagsList.forEach((item) => {
        item.setAttribute("contenteditable", "true");
    });

    const attributesRows = document.querySelectorAll("#attributes tbody tr");
    attributesRows.forEach((row) => {
        row.setAttribute("contenteditable", "true");
    });

    const examplesCode = document.querySelectorAll("#examples pre, #examples h3");
    examplesCode.forEach((code) => {
        code.setAttribute("contenteditable", "true");
    });

    const resourcesList = document.querySelectorAll("#resources ul li");
    resourcesList.forEach((item) => {
        item.setAttribute("contenteditable", "true");
    });
}

// Add buttons to add new content
function addButtons() {
    const tagsSection = document.querySelector("#tags");
    const addTagButton = document.createElement("button");
    addTagButton.textContent = "Add New Tag";
    addTagButton.addEventListener("click", () => {
        const newTag = document.createElement("li");
        newTag.textContent = "New Tag";
        newTag.setAttribute("contenteditable", "true");
        tagsSection.querySelector("ul").appendChild(newTag);
        makeDeletable();
        saveContent();
    });
    tagsSection.appendChild(addTagButton);

    const attributesSection = document.querySelector("#attributes");
    const addAttributeButton = document.createElement("button");
    addAttributeButton.textContent = "Add New Attribute";
    addAttributeButton.addEventListener("click", () => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td contenteditable="true">New Attribute</td>
            <td contenteditable="true">Description</td>
        `;
        attributesSection.querySelector("tbody").appendChild(newRow);
        makeDeletable();
        saveContent();
    });
    attributesSection.appendChild(addAttributeButton);

    const examplesSection = document.querySelector("#examples");
    const addExampleButton = document.createElement("button");
    addExampleButton.textContent = "Add New Example";
    addExampleButton.addEventListener("click", () => {
        const newExample = document.createElement("div");
        newExample.innerHTML = `
            <h3 contenteditable="true">New Example</h3>
            <pre contenteditable="true">&lt;!-- New code example --&gt;</pre>
        `;
        examplesSection.appendChild(newExample);
        makeDeletable();
        saveContent();
    });
    examplesSection.appendChild(addExampleButton);

    const resourcesSection = document.querySelector("#resources");
    const addResourceButton = document.createElement("button");
    addResourceButton.textContent = "Add New Resource";
    addResourceButton.addEventListener("click", () => {
        const newResource = document.createElement("li");
        newResource.innerHTML = `<a href="#" contenteditable="true">New Resource</a>`;
        resourcesSection.querySelector("ul").appendChild(newResource);
        makeDeletable();
        saveContent();
    });
    resourcesSection.appendChild(addResourceButton);
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
    loadContent();
    makeEditable();
    makeDeletable();
    addButtons();

    // Save changes whenever the user edits content
    document.body.addEventListener("input", () => {
        saveContent();
    });
});
