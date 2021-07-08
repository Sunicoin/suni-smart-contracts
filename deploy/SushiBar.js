module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  const sushi = await deployments.get("SuniToken")

  await deploy("SuniBar", {
    from: deployer,
    args: [sushi.address],
    log: true,
    deterministicDeployment: false
  })
}

module.exports.tags = ["SuniBar"]
module.exports.dependencies = ["SuniswapFactory", "SuniswapRouter02", "SuniToken"]
