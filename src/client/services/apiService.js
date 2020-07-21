
const apiService  = {
   
    makePostCall: (options)=>{

        let {url,data} = options;

        return new Promise((resolve,reject)=>{
            fetch(url,{
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                } 
            }).then(response => response.json())
              .then((respData)=>{
                resolve(respData);
            });
        });
    }
}

export default apiService;