// contract auto verification (works in etherscan)
const { run } = require("hardhat")

async function verify(contractAddress, args) {
    console.log("Verifying Contract.....")

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("This is a verified contract")
        } else {
            console.log(error)
        }
    }
}

module.exports = {
    verify,
}
