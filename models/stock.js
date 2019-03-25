const findMaxRevenue = exports.findMaxRevenue = function(stockArray){
  const res = {
    buy: null,
    sell: null,
    revenue: null
  }
  let min = currentMax = null;
  const array = [...stockArray];
  array.sort((a,b)=>{
    return a.date - b.date;
  });
  array.forEach((stock)=>{
    if (min === null || stock.value < min)
    {
      min = stock.value
      res.buy = stock;
    }
    const newMax = stock.value - min;
    if (currentMax === null || newMax > currentMax)
    {
        currentMax = newMax;
        res.sell = stock;
        res.revenue = newMax;
    }
  });
  // if there is no revenue, dont provide buy and sell stocks
  if (res.revenue < 1)
  {
    res.buy = null;
    res.sell = null;
  }
  return res;
}

exports.recommend = function(array, cb) {
  const stockArray = array.map((stock)=>{
      return {
          value: parseFloat(stock.value),
          date: new Date(stock.date)
      }
  });
  const res = findMaxRevenue(stockArray);
  cb(null, res)
}