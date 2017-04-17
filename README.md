# Sorting List Method
=====================
by Mark Wybrow

## Usage:
RULES: return by order below

> 	1) sort by primary 
> 	2) groupd by payeeType
>>			a) Linked
>>			b) Pay_Anyone
>>			c) Bpay
> 	3) lastly order by name alphanumeric	

example Object to be filtered

```javascript
const payeeList = [{
		name: "Mary",
		payeeType: 'PAY_ANYONE',
		primary: false,
}, {
		name: "Zachary",
		payeeType: 'BPAY',
		primary: false,
} ...
]

payeeSort(payeeList)


---
### Install:
Open a terminal window & CD into this Directory. 

+ type at prompt: "npm install".

to run the file and see a console print out 

+ "npm start" or "nodemon sorted.js"


_Please feel free to run your own variations of Object literal code!_
---
## Testing:
To run tests simply "npm test" or "mocha test -c" 


>
> any questions please contact Mark on mwybrow@hotmail.com