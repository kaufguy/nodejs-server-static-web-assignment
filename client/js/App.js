import StockController from './modules/stock/StockController.js'
import StockView from './modules/stock/StockView.js'
import StockModel from './modules/stock/StockModel.js'
import StockService from './services/StockService.js'

import '../css/style.scss'

const model = new StockModel();
const view = new StockView(model);
const stockService = new StockService();
const controller = new StockController(model, view, stockService);

const startFillItemsButton = document.getElementById("start-fill-items-button");
startFillItemsButton.addEventListener("click", (evt)=>{
    const itemsNumber = parseFloat(document.getElementById("start-items-number").value);
    if (!isNaN(itemsNumber))
    {
        controller.fillItems(itemsNumber)
    }
});