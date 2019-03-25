import HttpClient from './HttpClient.js'

export default class StockService extends HttpClient{

    constructor() {
        super();
    }

    async recommend(data) {
        return await this.post('/api/stock/recommend', {items:data});
    }
}