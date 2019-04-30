const express = require('express');
const Nightmare = require('nightmare');
const cheerio = require('cheerio');

const app = express();

const nightmare = Nightmare({show: true});
const url = 'https://lms.ibsindia.org/login/index.php';

app.get('/',(req,res)=>{

nightmare
.goto(url)
.wait('body')
.type('input#username.form-control','16stuhh0048')
.type('input#password.form-control','Fst@1234')
.click('button#loginbtn.btn.btn-primary.btn-block.m-t-1')
.wait('div.page-header-headings')
.evaluate(()=>document.querySelector('body').innerHTML)
.end()
.then(response=>{
    res.json(getData(response))
}).catch(err=>{
    console.log(err);
});

let getData = html =>{
    data = [];
    const $ = cheerio.load(html);
    let title = $('h1').text();
    if(title){
        data.push({
            title: title
        })
    }
    else{
        data = "Nothing";
    }
    return data;
}
})





const port = 5000;
app.listen(port, ()=>console.log(
    'Server started!'
));