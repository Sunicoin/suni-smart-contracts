 module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  await deploy("SuniExchange", {
    from: deployer,
    log: true,
    deterministicDeployment: false
  })
}

module.exports.tags = ["SuniExchange"]
module.exports.dependencies = ["SuniswapFactory", "SuniswapRouter02"]
