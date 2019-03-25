const should = require('should')

Stock = require('../../models/stock')

describe('Model Stock', function() {

    const date = new Date('2018-07-20T14:00:00');
    it('findMaxRevenue increasing', function() {
        const stockArray = [{value: 1, date: new Date(date)},{value: 2, date: new Date(date.getTime() + 1*60000)},{value: 3, date: new Date(date.getTime() + 2*60000)}];
        const maxRev = Stock.findMaxRevenue(stockArray);
        (maxRev.buy.date - date).should.eql(0);
        (maxRev.sell.date - new Date(date.getTime() + 2*60000)).should.eql(0);
        maxRev.revenue.should.eql(2);
    })
    it('findMaxRevenue decreasing', function() {
        const stockArray = [{value: 3, date: new Date(date)},{value: 2, date: new Date(date.getTime() + 1*60000)},{value: 1, date: new Date(date.getTime() + 2*60000)}];
        const maxRev = Stock.findMaxRevenue(stockArray);
        (maxRev.buy === null).should.eql(true);
        (maxRev.sell === null).should.eql(true);
        maxRev.revenue.should.eql(0);
    })
    it('findMaxRevenue unsorted dates', function() {
        const stockArray = [{value: 2, date: new Date(date.getTime() + 1*60000)},{value: 3, date: new Date(date.getTime() + 2*60000)}, {value: 1, date: new Date(date)}];
        const maxRev = Stock.findMaxRevenue(stockArray);
        (maxRev.buy.date - date).should.eql(0);
        (maxRev.sell.date - new Date(date.getTime() + 2*60000)).should.eql(0);
        maxRev.revenue.should.eql(2);
    })
    it('findMaxRevenue peakLowFlat', function() {
        const stockArray = [
            {value: 1, date: new Date(date)},
            {value: 2, date: new Date(date.getTime() + 1*60000)},
            {value: 1, date: new Date(date.getTime() + 2*60000)},
            {value: 1, date: new Date(date.getTime() + 3*60000)},
            {value: 1, date: new Date(date.getTime() + 4*60000)}];

        const maxRev = Stock.findMaxRevenue(stockArray);
        (maxRev.buy.date - date).should.eql(0);
        (maxRev.sell.date - new Date(date.getTime() + 1*60000)).should.eql(0);
        maxRev.revenue.should.eql(1);
    })
    it('findMaxRevenue lowPeakFlat', function() {
        const stockArray = [
            {value: 2, date: new Date(date)},
            {value: 1, date: new Date(date.getTime() + 1*60000)},
            {value: 2, date: new Date(date.getTime() + 2*60000)},
            {value: 2, date: new Date(date.getTime() + 3*60000)},
            {value: 2, date: new Date(date.getTime() + 4*60000)}];

        const maxRev = Stock.findMaxRevenue(stockArray);
        (maxRev.buy.date - new Date(date.getTime() + 1*60000)).should.eql(0);
        (maxRev.sell.date - new Date(date.getTime() + 2*60000)).should.eql(0);
        maxRev.revenue.should.eql(1);
    })
    it('findMaxRevenue flat', function() {
        const stockArray = [{value: 1, date: new Date(date)},{value: 1, date: new Date(date.getTime() + 1*60000)},{value: 1, date: new Date(date.getTime() + 2*60000)}];
        const maxRev = Stock.findMaxRevenue(stockArray);
        (maxRev.buy === null).should.eql(true);
        (maxRev.sell === null).should.eql(true);
        maxRev.revenue.should.eql(0);
    })
    it('findMaxRevenue sameDate', function() {
        const stockArray = [{value: 1, date: new Date(date)},{value: 2, date: new Date(date)}];
        const maxRev = Stock.findMaxRevenue(stockArray);
        (maxRev.buy.date - new Date(date)).should.eql(0);
        (maxRev.sell.date - new Date(date)).should.eql(0);
        maxRev.revenue.should.eql(1);
    })
})