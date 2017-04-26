import {mysql} from './mysql';
import {Request,Response} from 'express';
export * from './mysql';
async function outPutResult(res:Response,cont:any,status?:number){
    if (status == 200) {
        res.header("Content-Type", "application/json; charset=utf-8");
        res.header("Access-Control-Allow-Origin", "*");
        cont = JSON.stringify(cont) + '\n';
    }
    res.status(status).send(cont);
}
async function outPutPromise(res:Response,p:Promise<any>){
    p.then(r=>{
        if(r) outPutResult(res,r,200);
    })
}
export async function handleService(req:Request, res:Response): Promise<any>{
        let b=JSON.parse(req.body);
        outPutPromise(res,InsertData(b));
}
async function QueryData(){
    let rows=await mysql.query(`select * from first`);
    console.log(JSON.stringify(rows));
    return rows;
}
async function InsertData(req){
    await mysql.query(`insert into first (name,age) values ('${req.name}','${req.age}')`);
    return {code:200,msg:'操作成功'}
}