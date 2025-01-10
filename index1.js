const server = Bun.serve({
    port:8050,
    fetch(req){
       const url = new URL(req.url);

       switch (url.pathname) {
        case "/":
            return new Response('Welcome to the BarterX');
            
        case "/products":
            return new Response('Here are the products up for Sale in BarterX.');
            
        case "/login":
            return new Response("Login to the BarterX");
            
        case "/signup":
            return new Response("Sign up to BarterX");
            
        case "/profile":
            return new Response("Trader Profile");
            
        case "/cart":
            return new Response("Your Shopping Cart is here");
            
        case "/checkout":
            return new Response("Let's start shipping");
            
        case "/orders":
            return new Response("Your Orders are here");
            
        case "/categories":
            return new Response("Browse Categories");
            
        case "/chat":
            return new Response("Your chat with fellow traders");
            
        case "/contact":
            return new Response("Contact us here");
            
        case "/about":
           return new Response(Bun.file("./public1/about1.html"))   
            
        default:
            return new Response("Page not found");
            break;
    }

    }
})

console.log(`Listening on http://localhost:${server.port}`)