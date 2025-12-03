const arr = [3, 2, [1, 4, [5, 6]]];

const af = (arr,res) => {
    for(let i=0; i<arr.length; i++){
        if(Array.isArray(arr[i])){
            af(arr[i],res);
        }
        else{
            res.push(arr[i]);
        }
    }
};

res = [];

af(arr,res);

console.log(res);