import { useState, useEffect } from "react";
import { ethers, utils } from "ethers";
import abi from "./contracts/Decentram.json";

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [customerAddress, setCustomerAddress] = useState(null);
  const [inputValue, setInputValue] = useState({ title: "", description: "" });
  const [postCount, setPostCount] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const contractAddress = "0xe6F03e5345faA72147B753B0170902a49fb2FC31";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCustomerAddress(accounts[0]);
        setIsWalletConnected(true);
        console.log("Account connected to " + customerAddress);
      } else {
        setError("Please install wallet to use out app");
        console.log("Failed to connect");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPostCount = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const _postCount = await contract.postCount();
        setPostCount(_postCount);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a wallet to use this app.");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  }

  const getPost = async (id) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const _post = await contract.posts(id);
        const _reaction = await contract.reactionOf(id);

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

        return post;
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a wallet to use this app.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reactOnPost = async (id, like) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const singer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          singer
        );

        const reaction = like ? "like" : "dislike";

        const txn = await contract.reactOnPost(id, like);
        console.log("Reacting on the post");
        await txn.wait();
        console.log(`You ${reaction}d on the post.`);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a wallet to use this app.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div></div>;
}

export default App;
