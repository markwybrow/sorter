/**
 * Created by samithafernando on 13/4/17.
 */
// Setup
// mocha.setup('bdd');
//const expect = chai.expect

const List = require('./payeeList.js');

/* RULES: return by order below
// 1) sort by primary 
// 2) groupd by payeeType
			a) Linked
			b) Pay_Anyone
			c) Bpay
// 3) lastly order by name alphanumeric	
*/
//////////////////////////////////////////////////////////
// Start module

'use strict';
let list;
list = list || List.payeeList;

console.log("using this unsorted list: ", list);	
function payeeSort(list) {

	if( !list || list.length < 1) {
		throw new Error( "Error: No data to sort" );
	}
	
	const isPrimaryUser = [];
	const isNotPrimaryUser = [];
	const payeePrimaryList = [isPrimaryUser, isNotPrimaryUser];
	
////////////////////////////////////////////////////
	const sortPrimaryUsers = (item) => {
		if (item.primary) {
			isPrimaryUser.push(item);
		}
		else {
			isNotPrimaryUser.push(item);
		}
	};
	const sortByKey = (key) => {
		let sortby = key;
		return (a, b) => {
			if (a[sortby] < b[sortby]) {
				return -1;
			}
			if (a[sortby] > b[sortby]) {
				return 1;
			}
			return 0;
		}
	};
	const groupByPayeeType = (payee) => {
		if (payee.payeeType === "LINKED") {
			payee['groupkey'] = 1;
		}
		if (payee.payeeType === "PAY_ANYONE") {
			payee['groupkey'] = 2;
		}
		if (payee.payeeType === "BPAY") {
			payee['groupkey'] = 3;
		}
		return payee;
	};
	const removeAddedKey = (listItem) => {
		if (listItem.groupkey) {
			delete listItem.groupkey;
		}
		return listItem;
	};
	const sortByName = sortByKey('name');
	const sortByPayeeType = sortByKey('groupkey');
//////////////////////////////////////////////////////
	list.map(function (item) {
		return sortPrimaryUsers(item);
	});
	payeePrimaryList.forEach(function (payeeListGroup) {
		if (!Array.isArray(payeePrimaryList)) return;
		payeeListGroup.map(function (payee) {
			return groupByPayeeType(payee);
		})
		payeeListGroup.sort(sortByName);
		payeeListGroup.sort(sortByPayeeType);
		payeeListGroup.map(removeAddedKey);
	})
	let sortedPayeeList = payeePrimaryList[0].concat(payeePrimaryList[1])
	
	return {
		sortedPayeeList
	}
};


console.log(" - Payee Sorted List: -> \n\n", payeeSort(list), " \n\n\t\t\t\t\t\t Last run:---", new Date());
if (typeof exports !== 'undefined'){ exports.payeeSort = payeeSort } // for Node Mocha test
