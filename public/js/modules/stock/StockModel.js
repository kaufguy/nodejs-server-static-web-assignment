import {Subscriber} from '../../common/Subscriber.js'

export default class StockModel {

    constructor()
    {
        this.stockArray = [];
        this.recommendation = null;
        this.stockAddedSubscriber = new Subscriber(this);
        this.stockDeletedSubscriber = new Subscriber(this);
        this.stockUpdatedSubscriber = new Subscriber(this);
        this.recommendationUpdatedSubscriber = new Subscriber(this);
    }

    addStock(stock) {
        this.stockArray.push({
            value: stock.value,
            date: stock.date,
            id: stock.id
        });
        this.stockAddedSubscriber.notify();
    }

    addStocks(stockArray) {
        this.stockArray = this.stockArray.concat(stockArray);
        this.stockAddedSubscriber.notify();
    }

    deleteStock(id) {
        const index = this.stockArray.findIndex((item)=>{
            return item.id === id;
        });
        if (index > -1) {
            this.stockArray.splice(index, 1);
        }
        this.stockDeletedSubscriber.notify();

    }

    updateStock(updatedStock) {
        const stock = this.stockArray.find((item)=>{
            if (item.id === updatedStock.id){
                return item;
            }
        })
        stock.date = updatedStock.date;
        stock.value = updatedStock.value;
        this.stockUpdatedSubscriber.notify();
    }

    updateRecommendation(recommendation) {
        this.recommendation = recommendation;
        this.recommendationUpdatedSubscriber.notify();
    }

    getStockArray()
    {
        return this.stockArray;
    }

    getRecommendation()
    {
        return this.recommendation;
    }
};