// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

interface INFTContractTemplate {
  function creator() external view returns (address);

  function addController(address) external;

  function removeController(address) external;

  function setDevCut(uint) external;

  function withdraw(address) external;

  function pauseMint() external;

  function unpauseMint() external;
}
