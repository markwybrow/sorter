const chai = require('chai');
const assert = chai.assert;
const sorted = require('../sorted');
const tmpList = [
	{
		name: 'Andy',
		payeeType: 'BPAY',
		primary: false
	},
	{
		name: 'John',
		payeeType: 'BPAY',
		primary: false
	},
	{
		name: 'Mary',
		payeeType: 'LINKED',
		primary: false
	},
	{
		name: 'Zachary',
		payeeType: 'LINKED',
		primary: true
	},
	{
		name: 'Henry',
		payeeType: 'BPAY',
		primary: true
	}
     ]
describe('sort payeeList by following rules: ', function () {
	it('should return an error message if no data is sent', function () {
		try {
			sorted.payeeSort([]);
		}
		catch (err) {
			assert.equal(err.message, "Error: No data to sort");
		}
	});
	it('should order the list so the primary payee(s) will be grouped 1st in sorted list', function () {
		var lists = tmpList;
		var testResult = sorted.payeeSort(lists);
		//console.log( "test: ", testResult.sortedPayeeList);
		assert.equal(testResult.sortedPayeeList[0]['primary'], true);
		// assert.equal(testResult.length, 0);
	});
	it('should order the list so the payeeType is Ordered by LINKED, PAY_ANYONE, BPAY', function () {
		var unsortedlist = [
			{ name: 'Mary', payeeType: 'BPAY', primary: false },			 
			{ name: 'Mary', payeeType: 'PAY_ANYONE', primary: false },
			{ name: 'Mark', payeeType: 'BPAY', primary: false },			 
			{ name: 'Mary', payeeType: 'LINKED', primary: false	}, 
			{ name: 'Mary', payeeType: 'PAY_ANYONE', primary: false },			 
			{ name: 'Mark', payeeType: 'LINKED', primary: false	}
			];
		var testResult = sorted.payeeSort(unsortedlist);
		//console.log( "test: ", testResult.sortedPayeeList);
		assert.equal(testResult.sortedPayeeList[0]['payeeType'], 'LINKED');
		assert.equal(testResult.sortedPayeeList[1]['payeeType'], 'LINKED');
		assert.equal(testResult.sortedPayeeList[2]['payeeType'], 'PAY_ANYONE');
		assert.equal(testResult.sortedPayeeList[3]['payeeType'], 'PAY_ANYONE');
		assert.equal(testResult.sortedPayeeList[4]['payeeType'], 'BPAY');
	});
	
	it('should order the list so the name alphanumeric but keep its payeeType & primary order preference', function () {
		var unsortedlist = [
			{ name: 'Andrew', payeeType: 'BPAY', primary: false },			 
			{ name: 'Mary', payeeType: 'PAY_ANYONE', primary: true },
			{ name: 'Mark', payeeType: 'BPAY', primary: false },			 
			{ name: 'Belinda', payeeType: 'LINKED', primary: true	}, 
			{ name: 'Jackson', payeeType: 'PAY_ANYONE', primary: false },			 
			{ name: 'Bentley', payeeType: 'LINKED', primary: false	}
			];
		var testResult = sorted.payeeSort(unsortedlist);

		assert.equal(testResult.sortedPayeeList[0]['payeeType'], 'LINKED');
		assert.equal(testResult.sortedPayeeList[0]['primary'], true);
		assert.equal(testResult.sortedPayeeList[0]['name'], 'Belinda');
		assert.equal(testResult.sortedPayeeList[1]['payeeType'], 'PAY_ANYONE');
		assert.equal(testResult.sortedPayeeList[2]['payeeType'], 'LINKED');
		assert.equal(testResult.sortedPayeeList[3]['payeeType'], 'PAY_ANYONE');
		assert.equal(testResult.sortedPayeeList[4]['payeeType'], 'BPAY');
		assert.equal(testResult.sortedPayeeList[4]['name'], 'Andrew');
		assert.equal(testResult.sortedPayeeList[5]['name'], 'Mark');
	});
	
	// We can have more here ...
});