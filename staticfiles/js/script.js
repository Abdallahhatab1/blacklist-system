

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


// Aiهذه الدالة كاملة بستخدام ال
function getCookie(name) {
    let cookies = document.cookie.split(";");
    for (let cookie of cookies) {
        if (cookie.trim().startsWith(name + "=")) {
            return cookie.split("=")[1];
        }
    }
};

let csrftoken = getCookie("csrftoken");
let timeoutMessage;
async function getBlacklistResponse() {
    removeMessage();

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















