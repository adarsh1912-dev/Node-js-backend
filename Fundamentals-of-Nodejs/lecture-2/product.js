function product(...nums){
    return nums.reduce((acc, curr) => curr * acc, 1);
}

console.log(product(2, 3, 4)); 

module.exports = {product};