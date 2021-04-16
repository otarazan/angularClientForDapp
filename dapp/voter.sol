pragma solidity >=0.7.0 <0.9.0;

contract Voter {


    uint[] public votes=[0,0];
    mapping (address => bool) hasVoted;


    function vote(uint option) public {
        require(0 <= option, "Invalid option");
        //require(!hasVoted[msg.sender], "Account has already voted");

        hasVoted[msg.sender] = true;
        votes[option] = votes[option] + 1;
    }

  
    function getVotes() public view returns (uint[] memory) {
        return votes;
    }
    
    function remove() public {
        address payable addr = payable(address(msg.sender));
        selfdestruct(addr);
    }
}