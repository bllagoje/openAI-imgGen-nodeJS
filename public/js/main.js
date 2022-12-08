// Form Event Listener:
document.querySelector("#image-form").addEventListener("submit", onSubmit);

// Function onSubmit: 
function onSubmit(e) {
    e.preventDefault();
    // Clear message and image:
    document.querySelector(".msg").textContent = "";
    document.querySelector("#image").src = "";
    // Data from Form:
    let prompt = document.querySelector("#prompt").value;
    let size = document.querySelector("#size").value; 
    // Validation:
    if (prompt === "") {
        alert("Enter Text");
        return;
    }
    generateImageRequest(prompt, size);
};

// Function generateImageRequest():
async function generateImageRequest(prompt, size) {
    try {
        showSpinner();
        // Response:
        const response = await fetch("/openai/generateimage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });
        // If problem exist:
        if (!response.ok) {
            removeSpinner();
            throw new Error("Image could not be generated.");
        }
        // If problem does not exist:
        const data = await response.json();
        // console.log(data);
        // Putting Image in the DOM:
        const imgUrl = data.data;
        document.querySelector("#image").src = imgUrl;
        removeSpinner();
    } catch (error) {
        document.querySelector(".msg").textContent = error;  
    }
};

// --------------------------------------------------------------------------------
// Function showSpinner():
function showSpinner() {
    document.querySelector(".spinner").classList.add("show");
};

// Function removeSpinner():
function removeSpinner() {
    document.querySelector(".spinner").classList.remove("show");
};

