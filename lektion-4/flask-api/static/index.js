async function getUsers() {
  try {
      const response = await fetch('/users')
      
      if (!response.ok) { 
          throw new Error(`HTTP Error! Status: ${response.status}`)
      }

      const users = await response.json()

      const userList = document.getElementById('userList')
      userList.innerHTML = '' 
      users.forEach(user => {
          const li = document.createElement('li')
          li.textContent = `Username: ${user.username}`
          userList.appendChild(li)
      })
  } catch (error) {
      console.error("Error fetching users:", error)
  }
}

getUsers()
