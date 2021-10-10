// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

//This contract dispenses a fixed amount of fund to the authorised addresses after elapsing 
//a certain amount of time 
contract KnoxHiveVault is Context, Ownable {

    IERC20 public _token;
    mapping(address=>bool) _authorisedBeneficiaries;
    mapping(address => uint256) _allowances;
    mapping(address => uint256) _lastWithdrawAt;
    uint256 private _timeInterval=600; // 30 days
    uint256 private _startTime;

    //constructor
    constructor(IERC20 token) Ownable() {
        _token = token;
        _startTime = block.timestamp;
    }

    function allocateMonthlyFunds(uint256 amount, address beneficiary)external onlyOwner() returns (bool){
        require(amount> 0, "KnoxhiveVault: Allowance amount must be more than zero");
        require(address(0) != beneficiary, "KnoxhiveVault: Beneficiary address cannot be zero address");
        _authorisedBeneficiaries[beneficiary] = true;
        _allowances[beneficiary] = amount;
        return true;
    }

    function withdrawAllocatedFunds(uint256 amount) external returns(bool){
        require(_authorisedBeneficiaries[_msgSender()], "KnoxhiveVault: You are not authorised to withdraw funds");
        require(_allowances[_msgSender()]>=amount,"KnoxhiveVault: Requested amount is more then allowed amount");

        if(_lastWithdrawAt[_msgSender()] > 0){ //beneficiary has requested funds in past
            require(block.timestamp - _lastWithdrawAt[_msgSender()] >=_timeInterval, "KnoxhiveVault: Funds cannot be released at this moment.");
            _token.transfer(_msgSender(), amount);
            _lastWithdrawAt[_msgSender()] = block.timestamp;
            return true;
        }else{  //beneficiary requesting funds for the first time
            require(block.timestamp - _startTime >= _timeInterval, "KnoxhiveVault: Funds cannot be released at this moment.");
            _token.transfer(_msgSender(), amount);
            _lastWithdrawAt[_msgSender()] = block.timestamp;
            return true;
        }
    }
}
