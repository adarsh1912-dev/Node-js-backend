// creating a simple storage app from scratch
import http from 'http'
import { readdir } from 'fs/promises'
import fs from 'node:fs';


const server = http.createServer(async (req, res) => {
    const itemsList = await readdir('./storage');
    let dynamicHtml = '';
    itemsList.forEach(item => {
       dynamicHtml += `<li> <a href="/${item}"> ${item}> </a> </li>\n` 
    });

    console.log('file sent');
    console.log(req.url);

    // res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if(req.url === '/'){
        res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project</title>
</head>
<body>
    
    <h1>Hello World</h1>
    <ul>
        ${dynamicHtml}
    </ul>
</body>
</html>
`);

}
else if(req.url === '/favicon.ico'){
    console.log('favicon');
}
else{
    const readSream = fs.createReadStream(`./storage${req.url}`);
    res.setHeader('Content-Disposition', 'inline');
    // res.setHeader('Content-Type', 'video/mp4')
    readSream.pipe(res); 
}

});


server.listen(4000, '0.0.0.0', () => {
    console.log(`Server is listening on http://localhost:4000`);
});
