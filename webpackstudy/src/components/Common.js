import 'whatwg-fetch';
export function fetchJson(url,opt) {
    if (opt && opt.data){
        opt.headers = {"Content-Type" : "application/json"};
        opt.body = JSON.stringify(opt.data);
        delete opt.data;
    }
    if (opt && opt.query){
        url += '?' + toQuery(opt.query);
        delete opt.query;
    }
    opt.headers = _.extend(opt.headers,{},{
        //'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
    });
    opt.mode = 'cors';//用于跨域
    //opt.credentials = 'same-origin';//用于发送cookie
    opt.cache = 'default';//用于缓存
    opt.method = opt.method || (opt.body ? "POST" : "GET");
    return new Promise((resolve, reject)=>{
        let handleErr = err=> {
            err = typeof err == 'string' ? err : JSON.stringify(err);
            if (err.indexOf('ECONNREFUSED') >= 0) {
                alert('网络连接错误');
            } else if (err.indexOf('ServiceUnavailableError') >= 0) {
                alert('网络超时');
            } else {
                alert('网络错误');
                console.log('error fetching:', url);
            }
            reject(err);
        };
        fetch(`http://localhost:3000${url}`,opt).then(r=>{
            if(r.ok){
                r.json().then(data=>{
                    resolve(data);
                },handleErr)
            }else {
                r.text().then(handleErr,handleErr);
            }
        },handleErr)
    })
}
export function toQuery(obj) {
    let str = "";
    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
}