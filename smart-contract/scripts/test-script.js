const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Decentram = await hre.ethers.getContractFactory("Decentram");
  const decentram = await Decentram.deploy();

  const createPostTx = await decentram.createPost("title", "description");
  await createPostTx.wait();

  const _post = await decentram.posts(1);

  const reactOnPostTx = await decentram.reactOnPost(1, true);
  await reactOnPostTx.wait();

  const _reaction = await decentram.reactionOf(1);

  const formatPostTime = (postTime) => {
    const _options = {
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var _postTime = new Date(parseInt(postTime.toString()) * 1000);
    _postTime = _postTime.toLocaleString("en-US", _options);

    return _postTime;
  };


  const post = {
    id: parseInt(_post[0].toString()),
    owner: _post[1],
    title: _post[2],
    description: _post[3],
    likes: _post[4],
    dislikes: _post[5],
    postTime: formatPostTime(_post[6]),
    reaction: _reaction,
  };

  console.log(post);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
