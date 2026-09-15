class StockPortfolio {
  constructor() {
    this.holdings = new Map();
  }

  isEmpty() {
    return this.holdings.size === 0;
  }

  buy(symbol, shares) {
    const currentShares = this.holdings.get(symbol) || 0;
    this.holdings.set(symbol, currentShares + shares);
  }

  sell(symbol, shares) {
    const currentShares = this.holdings.get(symbol) || 0;
    const remainingShares = currentShares - shares;

    if (remainingShares < 0) {
      throw new Error("Not possible to sell this number of shares.");
    }

    if (remainingShares === 0) {
      this.holdings.delete(symbol);
      return;
    }

    this.holdings.set(symbol, remainingShares);
  }

  symbolCount() {
    return this.holdings.size;
  }

  sharesFor(symbol) {
    return this.holdings.get(symbol) || 0;
  }
}

module.exports = StockPortfolio;
