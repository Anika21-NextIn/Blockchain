pragma solidity ^0.5.0;

/**
 * The fir contract does this and that...
 */
contract Fir {

	string public name;
	uint public accountCount = 0;

	struct FirContent {
		string nid;
		string firstName;
		string lastName;
		string content;
	}

	mapping (string => FirContent) firs;

	function addFir(string memory _nid, string memory _firstName, string memory _lastName, string memory _content) public {
		firs[_nid] = FirContent({
			nid: _nid,
			firstName: _firstName,
			lastName: _lastName,
			content: _content
		});
	}


	
	constructor() public {
		name = "Sajib"; 
	}
	
}
