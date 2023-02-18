const { ethers, network } = require("hardhat")
const { verify } = require("./verify")
require("dotenv").config()

async function main() {
    const roboPunksNFTFactory = await ethers.getContractFactory("RoboPunksNFT")
    console.log("Deploying contract...")
    const roboPunksNFT = await roboPunksNFTFactory.deploy()
    await roboPunksNFT.deployed()
    console.log(`RoboPunksNFT Deployed to : ${roboPunksNFT.address}`)
    // console.log(`Deployer Address :  ${roboPunksNFT.signer.address}`)

    // verify contract
    if (network.config.chainId !== 31337 && process.env.ETHERSCAN_API_KEY) {
        await roboPunksNFT.deployTransaction.wait(6)
        await verify(roboPunksNFT.address, [])
    }

    // contract interactions
    console.log("Contract Details")
    const nftName = await roboPunksNFT.name()
    const nftSymbol = await roboPunksNFT.symbol()
    console.log(`NFT Name : ${nftName}`)
    console.log(`NFT Symbol : ${nftSymbol}`)

    const mintPrice = await roboPunksNFT.mintPrice()
    console.log(
        `Mint Price of NFT : ${ethers.utils.formatEther(mintPrice)} ETH`
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
