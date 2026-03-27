

const beforeLoadedOverlay = document.querySelector(".beforeLoaded");
const blacklistText = document.querySelector(".blacklist-text");
const messageElement = document.querySelector(".container .message");


window.addEventListener('DOMContentLoaded', async (e) => {
    beforeLoadedOverlay.classList.add("hidden");
});

function addMessage(type, message) {
    messageElement.classList.add("show");
    messageElement.classList.add(type);
    messageElement.textContent = message;
}

function removeMessage() {
    messageElement.classList.remove("show", "success", "error");
}

let csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

let timeoutMessage;
async function getBlacklistResponse() {
    removeMessage();

    console.log("get function...");

    // check_text() اللي بينرسل لدالة POSTهذا طلب ال 
    let res = await fetch("/check-text/", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-CSRFToken": csrftoken
        },
        body: `text=${encodeURIComponent(blacklistText.value)}`
    });

    let data = await res.json();

    addMessage(data.status, data.message)
};















