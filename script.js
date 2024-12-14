function saveContent() {
    const content = {
        tags: document.querySelector("#tags pre").innerHTML,
        attributes: document.querySelector("#attributes pre").innerHTML,
        examples: document.querySelector("#examples").innerHTML,
    };
    localStorage.setItem("htmlCheatSheetContent", JSON.stringify(content));
}

function loadContent() {
    const savedContent = JSON.parse(localStorage.getItem("htmlCheatSheetContent"));
    if (savedContent) {
        document.querySelector("#tags pre").innerHTML = savedContent.tags;
        document.querySelector("#attributes pre").innerHTML = savedContent.attributes;
        document.querySelector("#examples").innerHTML = savedContent.examples;
    }
}

function makeEditable() {
    const correctCode = "1234"; 
    const editButton = document.getElementById("editButton");
    const editCodeInput = document.getElementById("editCode");

   
    editCodeInput.style.display = "none";

   
    editButton.addEventListener("click", () => {
        if (editCodeInput.style.display === "none") {
            editCodeInput.style.display = "inline"; 
        } else {
            const userCode = editCodeInput.value;

           
            if (userCode === correctCode) {
              
                document.querySelector("#tags pre").setAttribute("contenteditable", "true");
                document.querySelector("#attributes pre").setAttribute("contenteditable", "true");

                document.querySelectorAll("#examples pre, #examples h3").forEach((code) => {
                    code.setAttribute("contenteditable", "true");
                });

                alert("Edit mode enabled!"); 
                editCodeInput.style.display = "none"; 
                editCodeInput.value = ""; 
            } else {
                alert("Incorrect code. Action canceled.");
            }
        }
    });
}



document.addEventListener("DOMContentLoaded", () => {
   

    makeEditable();  

    loadContent();

   
    document.body.addEventListener("input", () => {
        saveContent();
    });
});

