pragma solidity ^0.4.24;

import "./DappToken.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract DappTokenCrowdsale is TimedCrowdsale, CappedCrowdsale, RefundableCrowdsale, Ownable() {

    constructor(uint openingTime, uint closingTime, uint rate, address wallet, ERC20 token, uint hardCapInWei, uint softCapInWei) 
        Crowdsale(rate, wallet, token)
        TimedCrowdsale(openingTime, closingTime) 
        CappedCrowdsale(hardCapInWei)
        RefundableCrowdsale(softCapInWei) public {
            require(softCapInWei < hardCapInWei);
            currentRound = 0;
            isRoundActive = false;
    }


    uint public totalTokensForSale;
    uint public tokensForAdvisors;
    uint public tokensForTeam;
    uint public currentRound;
    address public myowner;
    bool public isRoundActive;
    
    /* uint public totalTokens;
    uint public totalSupply;
    
    uint public totalAdvisorsTokens;
    uint public totalAdvisorsSupply;
    
    uint public totalTeamTokens;
    uint public totalTeamSupply; */
    
    struct Details {
        string userType;
        uint tokenBalance;
        uint etherBalance;
        uint freezeTime;
    }
    mapping (address => Details) tokenOwners;
   
    struct Statistic {
        uint roundNumber;
        uint roundEther;
        uint roundTotalSupply;
        uint roundBonus;
        uint roundHardCap;
        uint roundSoftCap;
        uint roundStartTime;
        uint roundDuration;
    }
    

    //Statistic[] public rounds; 
    mapping(uint => Statistic) rounds;
    

    /*function withdrawUserEther() public {
        require(isSale == false && totalEthers < softCapICO);
        address user = msg.sender;
        user.transfer(tokenOwners[user].etherBalance *1 ether);
    }*/
    
    /*function withdrawOwnerEther() public onlyOwner{
       require(totalEthers >= softCapICO);
        msg.sender.transfer(totalEthers * 1 ether);
    }*/
    function getCurrentRound() public returns (uint) {
        return currentRound;
    }

    function startRound(uint rhardCap) public onlyOwner{
        require(isOpen());
        currentRound++;
        rounds[currentRound].roundStartTime = now;
        isRoundActive = true;
        
        rounds[currentRound].roundNumber = currentRound;
        rounds[currentRound].roundHardCap = rhardCap;
        rounds[currentRound].roundEther = 0;
    }

    function returnStatistics(uint roundno) public constant onlyOwner returns (uint, uint, uint, uint, uint, uint){
        
       return (rounds[roundno].roundNumber, rounds[roundno].roundHardCap, rounds[roundno].roundStartTime, rounds[roundno].roundDuration, rounds[roundno].roundEther, rounds[roundno].roundTotalSupply);
    }
    
    function endRound() public {
        isRoundActive = false;
        rounds[currentRound].roundDuration = now - rounds[currentRound].roundStartTime;

        if(rounds[currentRound].roundEther < rounds[currentRound].roundSoftCap){
            
        }
       // rounds.push(Statistic());
    }


    function () public payable {
        
        if(hasClosed()){
            return finalize();
        }
        require(isRoundActive == true);
        buyTokens(msg.sender);
        
        /*tokenOwners[msg.sender].userType = "User";
        tokenOwners[msg.sender].weiBalance += msg.value;
        tokenOwners[msg.sender].tokenBalance += tokens;
        tokenOwners[msg.sender].freezeTime = closingTime + 30 days;
        
        rounds[currentRound].roundTotalSupply += tokens;
        rounds[currentRound].roundEther +=  msg.value;
        
        totalTokens += tokens;
        totalEthers += convertToEther;
        
        balances[msg.sender] = safeAdd(balances[msg.sender], tokens);
        _totalSupply = safeAdd(_totalSupply, tokens);
        Transfer(address(0), msg.sender, tokens); */
        
        
        if(rounds[currentRound].roundEther >= rounds[currentRound].roundHardCap){
            endRound();
        }
    
    }

    /*function sendTokenToAdvisors(address advisorAddress, uint tokenAmount) public onlyOwner{
        bool success = transfer(advisorAddress, tokenAmount );
        if(success == true){
            tokenOwners[advisorAddress].userType = "Advisor";
            tokenOwners[advisorAddress].etherBalance = 0;
            tokenOwners[advisorAddress].tokenBalance += tokenAmount;
            tokenOwners[advisorAddress].freezeTime = closingTime + 365 days;    
        }
        
    }
    function sendTokenToTeam(address teamAddress, uint tokenAmount) public onlyOwner{
        bool success = transfer(teamAddress, tokenAmount );
        if(success == true){
            tokenOwners[teamAddress].userType = "Team";
            tokenOwners[teamAddress].etherBalance = 0;
            tokenOwners[teamAddress].tokenBalance += tokenAmount;
            tokenOwners[teamAddress].freezeTime = closingTime + 365 days;    
        }
        
}*/


}