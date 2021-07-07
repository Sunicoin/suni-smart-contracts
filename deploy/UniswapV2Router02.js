const { WETH } = require("@sushiswap/sdk");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const chainId = await getChainId();

  let wethAddress;

  if (chainId === "31337") {
    wethAddress = (await deployments.get("WETH9Mock")).address;
  } else if (chainId in WETH) {
    wethAddress = WETH[chainId].address;
  } else {
    throw Error("No WETH!");
  }

  const factoryAddress = (await deployments.get("SuniswapFactory")).address;

  await deploy("SuniswapRouter02", {
    from: deployer,
    args: [factoryAddress, wethAddress],
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["SuniswapRouter02", "AMM"];
module.exports.dependencies = ["SuniswapFactory", "Mocks"];
