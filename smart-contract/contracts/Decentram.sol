// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Decentram {
    uint64 postCount = 0;
    mapping(uint64 => Post) public posts;
    mapping(uint64 => mapping(address => int8)) reactionsOfPost;

    struct Post {
        uint64 id;
        address owner;
        string title;
        string description;
        uint32 likes;
        uint32 dislikes;
        uint256 postTime;
    }

    event NewPost(uint64 indexed id, address owner);
    event Reaction(uint64 indexed id, address reactor, bool like);

    modifier isPostExist(uint64 _id) {
        require(_id > 0 && _id <= postCount, "No Post is found by this id.");
        _;
    }

    function createPost(string memory _title, string memory _description) external {
        postCount++;
        posts[postCount] = Post(postCount, msg.sender, _title, _description, 0, 0, block.timestamp);

        emit NewPost(postCount, msg.sender);
    }

    function reactOnPost(uint64 _id, bool _like) isPostExist(_id) external {
        // User can react only for one time
        require(reactionsOfPost[_id][msg.sender] == 0);

        if(_like) {
            posts[_id].likes++;
            reactionsOfPost[_id][msg.sender] = 1;
        } else {
            posts[_id].dislikes++;
            reactionsOfPost[_id][msg.sender] = -1;
        } 

        emit Reaction(_id, msg.sender, _like);
    }

    function reactionOf(uint64 _id) isPostExist(_id) public view returns(int8) {
        return reactionsOfPost[_id][msg.sender];
    }
}