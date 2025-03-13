import figlet from "figlet"

// Basic bun http web server
const server = Bun.serve({
    port: 3000,
    fetch(req) {
        const body = figlet.textSync("drx")
        return new Response(body)
    }
})

console.log(`Server Running`)