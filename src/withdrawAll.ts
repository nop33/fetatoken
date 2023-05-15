import { web3, Project, DUST_AMOUNT } from '@alephium/web3'
import { PrivateKeyWallet } from '@alephium/web3-wallet'
import configuration from '../alephium.config'
import { Fetatoken, Withdraw } from '../artifacts/ts'
import { loadDeployments } from '../artifacts/ts/deployments'

withdrawAll()

async function withdrawAll() {
  web3.setCurrentNodeProvider(configuration.networks.testnet.nodeUrl)
  // Compile the contracts of the project if they are not compiled
  Project.build()

  const signerWallet = new PrivateKeyWallet({
    privateKey: configuration.networks.testnet.privateKeys[0]
  })
  const deployments = loadDeployments('testnet')
  const FetatokenContract = deployments.contracts.Fetatoken

  await Withdraw.execute(signerWallet, {
    initialFields: {
      token: FetatokenContract.contractInstance.contractId
    },
    attoAlphAmount: DUST_AMOUNT * 2n
  })

  const faucet = Fetatoken.at(FetatokenContract.contractInstance.address)
  const state = await faucet.fetchState()
  console.log(JSON.stringify(state.fields, null, '  '))
}
