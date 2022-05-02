const {expect} = require("chai");
const {ethers} = require("hardhat");

describe('Decentram', () => { 
    it ("Should increase postCount after creating a post", async () => {
        const Decentram = await ethers.getContractFactory('Decentram');
        const decentram = await Decentram.deploy();

        expect(await decentram.postCount()).to.equal(0);

        const createPostTx = await decentram.createPost("title", 'description');
        await createPostTx.wait();

        expect(await decentram.postCount()).to.equal(1);
    });

    it("Should increase likes after react like on a post", async () => {
      const Decentram = await ethers.getContractFactory("Decentram");
      const decentram = await Decentram.deploy();
      
      const createPostTx = await decentram.createPost("title", "description");
      await createPostTx.wait();
      expect((await decentram.posts(1))[4]).to.equal(0);

      const reactOnPostTx = await decentram.reactOnPost(1, true);
      await reactOnPostTx.wait();

      expect((await decentram.posts(1))[4]).to.equal(1);
    });
 }) 