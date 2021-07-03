const FIR = artifacts.require("./FIR.sol");

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('FIR', ([deployar, police, person]) => {
	let fir 

	before(async () => {
		fir = await FIR.deployed()
	})

	describe('deployment', async () => {
		it('Deploys Successfully', async () => {
			const address = await fir.address
			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})

		it('Has a name', async () => {
			const name = await fir.name()
			assert.equal(name, 'Sajib')
		})
	})



	describe('SignUp', async () => {
		let result, accountCount
		before(async () => {
			result = await fir.SignUp('Shahria', 'Sajib', '12312312', 'This is my first case', { from: person } )
			accountCount = await fir.accountCount()
		})

		it('SignedUp', async () => {
			
			assert.equal(accountCount, 1)
			// console.log(result.logs)
			const event = result.logs[0].args
			assert.equal(event.ID.toNumber(), accountCount.toNumber(), 'Id is correct')
			assert.equal(event.NID , '12312312' , 'NID is correct')
			assert.equal(event.FirstName , 'Shahria' , 'First Name is correct')
			assert.equal(event.LastName , 'Sajib' , 'Last Name is correct')
			assert.equal(event.client , person , 'Ether Address is correct')
			assert.equal(event.argument , 'This is my first case' , 'argument is correct')

			// FAILURE: Product must have a First Name
			await await fir.SignUp('', 'Shahria', '12312312', { from: person }).should.be.rejected;
			// FAILURE: Product must have a Last Name
			await await fir.SignUp('Sajib', '', '12312312', { from: person }).should.be.rejected;
			// FAILURE: Product must have a NID No
			await await fir.SignUp('Shahria', 'Sajib', 'NID', { from: person }).should.be.rejected;

		})


		it('CaseFiles', async () => {
			
			const account = await fir.accounts(accountCount)
			assert.equal(account.ID.toNumber(), accountCount.toNumber(), 'Id is correct')
			assert.equal(account.NID , '12312312' , 'NID is correct')
			assert.equal(account.FirstName , 'Shahria' , 'First Name is correct')
			assert.equal(account.LastName , 'Sajib' , 'Last Name is correct')
			assert.equal(account.client , person , 'Ether Address is correct')
			assert.equal(account.argument , 'This is my first case' , 'argument is correct')
		})
		it('UpdateCase', async () => {
			//Updated Successfully
			result = await fir.updateCase(accountCount, {from: police})

			//Check Logs
			console.log(result.logs)
			const event = result.logs[0].args
			assert.equal(event.ID.toNumber(), accountCount.toNumber(), 'Id is correct')
			assert.equal(event.NID , '12312312' , 'NID is correct')
			assert.equal(event.FirstName , 'Shahria' , 'First Name is correct')
			assert.equal(event.LastName , 'Sajib' , 'Last Name is correct')
			assert.equal(event.client , police , 'Ether Address is correct')
			assert.equal(event.argument , 'This Case is updated' , 'argument is correct')
		})



	})
})