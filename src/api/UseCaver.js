import Caver from 'caver-js';
import CounterABI from '../abi/CounterABI.json';
import {ACCESS_KEY_ID, SECRET_KEY_ID, CONTRACT_ADDR, CHAIN_ID} from '../constants';

const option = {
    headers: [
      {
        name: "Authorization",
        value: "Basic " + Buffer.from(ACCESS_KEY_ID + ':' +  SECRET_KEY_ID).toString("base64")
      },
      {name: "x-chain-id", value: CHAIN_ID}
    ]
  }
  
  const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option))
  const CountContract = new caver.contract(CounterABI, CONTRACT_ADDR);
  
  export const readCount = async () => {
    const _count = await CountContract.methods.count().call();
    console.log(_count);
  }
  
  export const getBalance = (address) => {
    return caver.rpc.klay.getBalance(address).then((res) => {
      const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(res));
      console.log(`Balance: ${balance}`);
      return balance
    })
  }
  
  export const setCount = async (newCount) => {
    try {
      const privatekey = 'PRIVATE_KEY';
      const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
      caver.wallet.add(deployer);
  
      const receipt = await CountContract.methods.setCount(newCount).send({
        from: deployer.address, // address
        gas: "0x4bfd200"
  
      })
      console.log(receipt);
    } catch(e) {
      console.log(`[ERROR_SET_COUNT]${e}`)
    }
  }