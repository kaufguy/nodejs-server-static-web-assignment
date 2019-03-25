import StockController from './js/modules/stock/StockController.js'
import StockView from './js/modules/stock/StockView.js'
import StockModel from './js/modules/stock/StockModel.js'
import StockService from './js/services/StockService.js'

import './css/style.scss'

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