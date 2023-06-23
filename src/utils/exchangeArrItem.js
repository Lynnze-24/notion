
const exchangeArrItem = (i1,i2,list) => {
    let a= [...list];
    [a[i1], a[i2]] = [a[i2], a[i1]];
    return a;
}

export default exchangeArrItem
