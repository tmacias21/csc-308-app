const StockPortfolio = require("./stock-portfolio");

test("starts with no ticker symbols or shares", () => {
  const portfolio = new StockPortfolio();

  expect(portfolio.holdings).toEqual(new Map());
});

test("answers whether it is empty", () => {
  const portfolio = new StockPortfolio();

  expect(portfolio.isEmpty()).toBe(true);
});

test("adds purchased shares to a symbol", () => {
  const portfolio = new StockPortfolio();

  portfolio.buy("GMR", 5);

  expect(portfolio.holdings.get("GMR")).toBe(5);
});

test("subtracts sold shares from a symbol", () => {
  const portfolio = new StockPortfolio();
  portfolio.buy("GMR", 5);

  portfolio.sell("GMR", 2);

  expect(portfolio.holdings.get("GMR")).toBe(3);
});

test("counts unique ticker symbols", () => {
  const portfolio = new StockPortfolio();
  portfolio.buy("GMR", 5);
  portfolio.buy("RBLX", 10);

  expect(portfolio.symbolCount()).toBe(2);
});

test("removes a symbol when all its shares are sold", () => {
  const portfolio = new StockPortfolio();
  portfolio.buy("GMR", 5);

  portfolio.sell("GMR", 5);

  expect(portfolio.holdings.has("GMR")).toBe(false);
  expect(portfolio.symbolCount()).toBe(0);
});

test("answers the shares owned for a symbol", () => {
  const portfolio = new StockPortfolio();
  portfolio.buy("GMR", 5);

  expect(portfolio.sharesFor("GMR")).toBe(5);
  expect(portfolio.sharesFor("RBLX")).toBe(0);
});

test("rejects selling more shares than owned", () => {
  const portfolio = new StockPortfolio();
  portfolio.buy("GMR", 5);

  expect(() => portfolio.sell("GMR", 6)).toThrow(
    "Not possible to sell this number of shares.",
  );
});
