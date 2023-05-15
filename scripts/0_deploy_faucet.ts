import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { Fetatoken } from '../artifacts/ts'

const deployFaucet: DeployFunction<Settings> = async (
  deployer: Deployer,
  network: Network<Settings>
): Promise<void> => {
  const issueTokenAmount = network.settings.issueTokenAmount
  const result = await deployer.deployContract(Fetatoken, {
    issueTokenAmount: issueTokenAmount,
    initialFields: {
      symbol: Buffer.from('FETA', 'utf8').toString('hex'),
      name: Buffer.from('Fetatoken', 'utf8').toString('hex'),
      decimals: 18n,
      supply: issueTokenAmount,
      balance: issueTokenAmount
    }
  })
  console.log('Fetatoken contract id: ' + result.contractInstance.contractId)
  console.log('Fetatoken contract address: ' + result.contractInstance.address)
}

export default deployFaucet
