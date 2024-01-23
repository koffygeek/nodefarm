const fs = require("fs");

const http = require("http");

const url = require("url")

const port = 4600

const replaceTemplate = (template,item) =>{

    let output = template.replace(/{%PRODUCTNAME%}/g,item.productName)

            output = output.replace(/{%IMAGE%}/g, item.image);
            output = output.replace(/{%QUANTITY%}/g, item.quantity);
            output = output.replace(/{%PRICE%}/g, item.price);
            output = output.replace(/{%FROM%}/g, item.from);
            output = output.replace(/{%NUTRIENTS%}/g, item.nutrients);
            output = output.replace(/{%DESCRIPTION%}/g, item.description);

            if(!item.organic){
            output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

        }

return output;

}

const templateOverview =  fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/card.html`,'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');

const data =  fs.readFileSync('./dev-data/data.json','utf-8');

let dataObjc = JSON.parse(data)

// console.log(dataObjc)


const server = http.createServer((request,response)=>{
   const pathName = request.url
   if(pathName === '/' || pathName === '/overview'){

    response.writeHead(200,{
        "Content-type" : "text-html",
    })

        const cardHtml = dataObjc.map(el => replaceTemplate(templateCard,el)).join('')

        // console.log(cardHtml)

        const output = templateOverview.replace("{%CARD%}",cardHtml)

    response.end(output)


   }else if (pathName === '/product'){
    response.writeHead(200,{
        "Content-type" : "type-json"
    })

    response.end(templateProduct)


   }else{
    response.writeHead(404,{
        "Content-type" : "text-html"
    })
    response.end("<h1>Page not Found!!</h1>")
   }
})
server.listen(port,()=>{
    console.log(`server is listening in port : ${port} !`)
})