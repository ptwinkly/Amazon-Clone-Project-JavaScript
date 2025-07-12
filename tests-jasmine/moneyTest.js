import {formatCurrency} from '../scripts/utils/money.js';

// create a test suite
describe('test suite: formatCurrency', () => {

  // create a test
  it('converts cents into dollars', () => {
    // compare value to another
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  // describe can be in a describe
  describe('rounding', () => {
    it('rounds up to the nearest cent', () => {
      expect(formatCurrency(2000.5)).toEqual('20.01');
    });

    it('rounds down to the nearest cent', () => {
      expect(formatCurrency(2000.4)).toEqual('20.00');
    });
  });
  
});