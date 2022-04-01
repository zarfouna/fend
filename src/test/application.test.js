import { handleSubmit } from '../client/js/application'
console.log(handleSubmit)

test('the function "handleSubmit()" should exist', () => {
    expect(handleSubmit).toBeDefined();
  });
  test('It should be a function',  () => {
    expect(typeof handleSubmit).toBe("function");
});