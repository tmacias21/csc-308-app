const myFunctions = require("./sample-functions.js");

test("Testing sum -- success", () => {
  const target = 30;
  const result = myFunctions.sum(12, 18);
  expect(target).toBe(result);
});

test("Testing div -- success", () => {
  const target = 3;
  const result = myFunctions.div(12, 4);
  expect(target).toBe(result);
});

test("Testing div -- zero division", () => {
  const target = Infinity;
  const result = myFunctions.div(10, 0);
  expect(target).toBe(result);
});

test("Testing containsNumbers -- no numbers", () => {
  const target = false;
  const result = myFunctions.containsNumbers("hello world");
  expect(target).toBe(result);
});

test("Testing containsNumbers -- with numbers", () => {
  const target = true;
  const result = myFunctions.containsNumbers("abc123");
  expect(target).toBe(result);
});

test("Testing containsNumbers -- mixed text with spaces", () => {
  const target = false;
  const result = myFunctions.containsNumbers("abc def");
  expect(target).toBe(result);
});

//Following the TDD model was challenging. I'm used to writing code first and then test
// ing it. I had to think about the tests first and then write the code to make the tests pass.
// It took me more time than I thought it would, but this approach is beneificial when
// designing a feature that can deal with weird inputs. 