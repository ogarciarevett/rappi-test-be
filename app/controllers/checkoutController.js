class CheckoutController {
    constructor(table) {
        this.table = table;
    }

    async removeItem(id) {
        return id;
    }

    async addItem(id) {
        return id;
    }

    async pay({ amount, creditCard }) {
        return { amount, creditCard };
    }
}

module.exports = CheckoutController;
