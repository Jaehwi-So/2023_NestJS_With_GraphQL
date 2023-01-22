const p = (x, y) => {
    return new Promise((resolve, reject) => {
        const result = x + y;
        resolve(result);
    });
};

const p2 = async (x, y) => {
    const result = x + y;
    return result;
};

p2(1000, 3000)
.then((x) => {
    console.log(x);
});

const p3 = () => {
    return new Promise((resolve, reject) => {
        const success = true;   //성공 Or 실패
        setTimeout(() => {
            if(success){
                resolve("Complate");
            }
            else{
                reject(new Error("Error Reason"));
            }     
        }, 3000);
    });
}


const main = async () => {
    const out = await timeOut();
    console.log('End');
    
    p3()
    .then((x) => {
        console.log('Result', x);
    })
    .catch(x => {
        console.log('err', x);
    })
    
    try{
        const res = await p3();
        console.log('Result', res);
    }
    catch(e){
        console.log('err', e);
    }
    


    
}

main();