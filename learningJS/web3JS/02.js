import  { Web3 } from  'web3'
async function init(){
    try {
        const web3 =  new Web3(ethRPC)

    } catch (err) {
        

        console.log('Web3.JS 报错！！11',err)
    }

}
init()