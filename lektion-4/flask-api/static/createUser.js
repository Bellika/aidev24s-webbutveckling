document.getElementById("userForm").addEventListener("submit", async function(event) {
    event.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const response = await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })

    const result = await response.json()
    document.getElementById("message").textContent = result.message || "User Created!"
})