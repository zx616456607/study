import * as express from 'express';
export let app = express();
import * as msvr from './msvr';
let parser:any = require('body-parser');

app.use(parser.json({limit: '50mb'}))
    .use(parser.urlencoded({extended:true,limit: '50mb'}))
    .use(parser.text({type:'text/*',limit: '50mb'}))
    .use(parser.raw({limit: '50mb'}));

app.all('*',handleService);
let server=app.listen(3000,function () {
    console.log('server port 3000')
});
async function handleService(req,res):Promise<any>{
    msvr.handleService(req,res)
}