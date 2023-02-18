const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("RoboPunksNFT", function () {
    let roboPunksNFTFactory, roboPunksNFT

    beforeEach(async function () {
        roboPunksNFTFactory = await ethers.getContractFactory("RoboPunksNFT")
        roboPunksNFT = await roboPunksNFTFactory.deploy()
        await roboPunksNFT.deployed()
    })

    it("Initial public mint should be false", async function () {
        const expectedValue = false
        const result = await roboPunksNFT.isPublicMintEnabled()
        assert.equal(result, expectedValue)
    })

    it("only owner should able to toggle public mint", async () => {
        const user = (await ethers.getSigners())[1]
        const userConnectedRoboPunk = await roboPunksNFT.connect(user)
        await expect(userConnectedRoboPunk.togglePublicMint(true)).to.be
            .reverted
    })

    it("owner should able to toggele public mint", async () => {
        const expectedValue = true
        const tx = await roboPunksNFT.togglePublicMint(true)
        await tx.wait(1)

        const result = await roboPunksNFT.isPublicMintEnabled()
        assert.equal(result, expectedValue)
    })
})
