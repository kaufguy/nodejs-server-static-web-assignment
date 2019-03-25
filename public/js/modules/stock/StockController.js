const DEFAULT_DATE = new Date('2019-01-01T01:00Z');

export default class StockController {

    constructor(model, view, stockService) {
        this.model = model;
        this.view = view;
        this.stockService = stockService;
        this.currentStockId = -1;

        this.init();
    };

    init(){
        this.createHandlers();
        this.wire();
    }

    createHandlers() {
        this.addStockHandler = this.addStock.bind(this);
        this.deleteStockHandler = this.deleteStock.bind(this);
        this.updateStockHandler = this.updateStock.bind(this);
        this.submitStockHandler = this.submitStock.bind(this);
    }

    wire() {
        this.view.addStockSubscriber.attach(this.addStockHandler);
        this.view.deleteStockSubscriber.attach(this.deleteStockHandler);
        this.view.submitStockSubscriber.attach(this.submitStockHandler);
        this.view.updateStockSubscriber.attach(this.updateStockHandler);
    }

    addStock(sender, value = 0, date = DEFAULT_DATE) {
        this.currentStockId++;
        this.model.addStock({
            value,
            date,
            id: this.currentStockId
        });
        this.model.updateRecommendation(null);
    }

    deleteStock(sender, id) {
        this.model.deleteStock(id);
        this.model.updateRecommendation(null);
    }

    async submitStock() {
        const response = await this.stockService.recommend(this.model.getStockArray());
        this.model.updateRecommendation(response);
    }

    updateStock(sender, stock) {
        this.model.updateStock(stock);
        this.model.updateRecommendation(null);
    }

    fillItems(number)
    {
        const sotckArray = [];
        for (let i=0; i< number; i++)
        {
            this.currentStockId++;
            sotckArray.push({
                value: i,
                date: new Date(DEFAULT_DATE.getTime() + i*60000),
                id: this.currentStockId
            });
        }
        this.model.addStocks(sotckArray);
        this.model.updateRecommendation(null);
    }
}