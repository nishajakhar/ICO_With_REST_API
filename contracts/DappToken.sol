pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";

contract DappToken is ERC20, ERC20Detailed, ERC20Pausable {
    constructor(string name, string symbol, uint8 decimals, uint amount)
    ERC20Detailed(name, symbol, decimals) public {
        require(amount > 0);
        _totalSupply = amount.mul(10 ** uint256(decimals));
        _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender , _totalSupply);
    }


    

}
