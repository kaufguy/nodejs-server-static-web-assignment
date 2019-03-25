import {Subscriber} from '../../common/Subscriber.js'

export default class StockView {
    constructor(model){
        this.model = model;
        this.init();
    }

    init(){
        this.createSubscribers();
        this.createHandlers();
        this.wire();
        this.render();
    }

    createSubscribers()
    {
        this.addStockSubscriber = new Subscriber(this);
        this.deleteStockSubscriber = new Subscriber(this);
        this.updateStockSubscriber = new Subscriber(this);
        this.submitStockSubscriber = new Subscriber(this);
    }

    createHandlers() {
        this.addStockButtonHandler = this.addStockButton.bind(this);
        this.deleteStockButtonHandler = this.deleteStockButton.bind(this);
        this.updateStockHandler = this.updateStock.bind(this);
        this.submitStockHandler = this.submitStock.bind(this);
        this.stockAddedHandler = this.stockAdded.bind(this);
        this.stockDeletedHandler = this.stockDeleted.bind(this);
        this.stockUpdatedHandler = this.stockUpdated.bind(this);
        this.recommendationUpdatedHandler = this.recommendationUpdated.bind(this);
    }

    wire() {
        this.form = document.getElementById("stock-form");
        this.form.addEventListener("submit",this.submitStockHandler);
        this.addStockkButton = document.getElementById("add-stock-button");
        this.addStockkButton.addEventListener("click",this.addStockButtonHandler);
        this.model.stockAddedSubscriber.attach(this.stockAddedHandler);
        this.model.stockDeletedSubscriber.attach(this.stockDeletedHandler);
        this.model.stockUpdatedSubscriber.attach(this.stockUpdatedHandler);
        this.model.recommendationUpdatedSubscriber.attach(this.recommendationUpdatedHandler);
    }

    addStockButton() {
        this.addStockSubscriber.notify();
    }

    deleteStockButton(id) {
        this.deleteStockSubscriber.notify(id);
    }

    submitStock(e) {
        this.submitStockSubscriber.notify();
        e.preventDefault();
    }

    updateStock(id) {
        const dateInput = document.getElementById(`stock-item-date-${id}`);
        const date = new Date(dateInput.value + 'Z')
        const valueInput = document.getElementById(`stock-item-value-${id}`);
        const value = parseFloat(valueInput.value);
        if (!isNaN(date) && !isNaN(value)) {
            const stock = {
                id,
                value,
                date
            }
            this.updateStockSubscriber.notify(stock);
        }
    }

    createStockElement(stock, recommendation) {
        const div = document.createElement('div');
        div.setAttribute("id", `stock-item-${stock.id}`);
        div.className +=` stock-item`;
        if (recommendation)
        {
            if (recommendation.buy && new Date(recommendation.buy.date) - stock.date === 0 && recommendation.buy.value === stock.value)
            {
                div.className +=` buy-stock`;
            }
            else if (recommendation.sell && new Date(recommendation.sell.date) - stock.date === 0 && recommendation.sell.value === stock.value)
            {
                div.className +=` sell-stock`;
            }
        }
        div.innerHTML =
               `<input type="number" id="stock-item-value-${stock.id}" value="${stock.value}"/>
                <input id="stock-item-date-${stock.id}" type="datetime-local" value="${stock.date.toISOString().slice(0, -1)}"/>
                <input type="button" id="delete-stock-button-${stock.id}" value="Delete Stock">`
        return div;
    }

    createRecommendationElement(recommendation) {
        const div = document.createElement('div');
        if (recommendation)
        {
            if (!recommendation.revenue > 0)
            {
                div.innerHTML = 'Do Not Buy';
            }
            else {
                div.innerHTML =
                    `<span class="buy-stock">Buy Value: ${recommendation.buy.value}</span>
                     <span class="sell-stock">Sell Value: ${recommendation.sell.value}</span>
                     <span>Revenue: ${recommendation.revenue}</span>`
            }
        }
        return div;
    }

    render(){
        const stocks = this.model.getStockArray();
        if (stocks.length > 0)
        {
            const recommendation = this.model.getRecommendation();
            const stockForm = document.getElementById("stock-form");
            const recommendationContainer = document.getElementById("recommendation-container");
            stockForm.innerHTML = '';
            stocks.forEach((stock)=>{
                const element = this.createStockElement(stock, recommendation);
                stockForm.appendChild(element);
            })
            stockForm.innerHTML += `<input type="submit">`;
            recommendationContainer.innerHTML = '';
            const element = this.createRecommendationElement(recommendation);
            recommendationContainer.appendChild(element);
            this.wireStocks(stocks);
            document.getElementById(`start-view`).style.display = 'none';
            document.getElementById(`edit-view`).style.display = 'flex';
        }
        else {
            document.getElementById(`start-view`).style.display = 'flex';
            document.getElementById(`edit-view`).style.display = 'none';
        }
    }

    wireStocks(stocks)
    {
        stocks.forEach((stock)=>{
            this.attachToDelete(stock.id);
            this.attachToChange(stock.id);
        })
    }

    attachToChange(id)
    {
        document.getElementById(`stock-item-date-${id}`).addEventListener("change", ()=> {this.updateStockHandler(id)});
        document.getElementById(`stock-item-value-${id}`).addEventListener("change", ()=> {this.updateStockHandler(id)});
    }

    attachToDelete(id)
    {
        document.getElementById(`delete-stock-button-${id}`).addEventListener("click", ()=>{this.deleteStockButtonHandler(id)});
    }

    stockAdded() {
        this.render();
    }

    stockDeleted() {
        this.render();
    }

    stockUpdated() {
        this.render();
    }

    recommendationUpdated() {
        this.render();
    }
};