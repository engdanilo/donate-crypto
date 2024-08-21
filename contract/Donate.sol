// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

contract DonateCrypto {

    struct Campaign {
        address author;
        string title;
        string description;
        string videoUrl;
        string imageUrl;
        uint256 balance;
        bool active;
    }

    uint256 public fee = 100;//wei
    mapping(uint256 => Campaign) public campaigns; //id => campanha
    address campaignOwner;
    uint256 nextId = 0;

    constructor(){
        campaignOwner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == campaignOwner, "You don't have permission.");
        _;
    }

    function addCampaign(string calldata title, string calldata description, string calldata videoUrl, string calldata imageUrl) public {
        Campaign memory newCampaign;
        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.videoUrl = videoUrl;
        newCampaign.imageUrl = imageUrl;
        newCampaign.active = true;
        newCampaign.author = campaignOwner;
        nextId++;
        campaigns[nextId] = newCampaign;

    }

    function donate(uint256 id) public payable {
        require(msg.value > 0, "You must send a donation value > 0.");
        require(campaigns[id].active == true, "Cannot donate to this campaign.");
        campaigns[id].balance += msg.value;

    }

    function withdraw(uint256 id) public onlyOwner{
        Campaign memory campaign = campaigns[id];
        require(campaign.active == true, "This campaign is closed");
        require(campaign.balance > fee, "This campaign does not have enough balance.");

        address payable recipient = payable(campaignOwner);
        recipient.call{value: campaign.balance - fee}("");
        campaigns[id].active = false;
    }
}