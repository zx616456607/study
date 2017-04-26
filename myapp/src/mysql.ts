let my      = require('mysql');
let mysqlConfig={
    host     : 'zhangxuan.jimob.com.cn',
    port     :  3306,
    user     : 'root',
    //password : 'jmtool321',
    database : 'zhangxuan'
};
export class Mysql{
    conn:any;
    constructor(dbstr){
        this.conn = my.createPool(dbstr);
    }
    async query(sql:string):Promise<any[]>{
        return await this.queryInner(sql);
    }
    async queryInner(sql:string):Promise<any[]>{

        return new Promise<any[]>((resolve,reject)=>{
            this.conn.query(sql,function (err, rows) {
                if(err){
                    console.log('mysql error:',JSON.stringify(err));
                    reject(err)
                }else{
                    resolve(rows)
                }
            })
        })
    }
}
export let mysql=new Mysql(mysqlConfig);