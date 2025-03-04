let currentLimit = 5

async function changeLimit(change) {
    currentLimit = Math.max(1, currentLimit + change) 
    try {
        const response = await fetch(`/api/posts?limit=${currentLimit}`)
        
        if (!response.ok) { 
            throw new Error(`HTTP Error! Status: ${response.status}`)
        }

        const posts = await response.json()

        const postList = document.getElementById('post-list')
        postList.innerHTML = '' 
        posts.forEach(post => {
            const li = document.createElement('li')
            li.textContent = post.title
            postList.appendChild(li)
        })
    } catch (error) {
        console.error("Error fetching posts:", error)
    }
}
