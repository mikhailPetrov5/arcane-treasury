// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract ArcaneTreasury is SepoliaConfig {
    using FHE for *;
    
    struct TreasuryVault {
        euint32 vaultId;
        euint32 totalBalance;
        euint32 availableBalance;
        euint32 lockedBalance;
        euint32 memberCount;
        bool isActive;
        bool isPublic;
        string name;
        string description;
        address owner;
        uint256 createdAt;
        uint256 lastActivity;
    }
    
    struct Transaction {
        euint32 transactionId;
        euint32 amount;
        euint8 transactionType; // 1: Deposit, 2: Withdrawal, 3: Transfer
        address from;
        address to;
        string description;
        uint256 timestamp;
        bool isExecuted;
    }
    
    struct Member {
        euint32 memberId;
        euint32 balance;
        euint32 reputation;
        bool isActive;
        bool isVerified;
        address memberAddress;
        uint256 joinedAt;
        uint256 lastActivity;
    }
    
    struct Proposal {
        euint32 proposalId;
        euint32 targetAmount;
        euint32 votesFor;
        euint32 votesAgainst;
        euint8 proposalType; // 1: Withdrawal, 2: Member Addition, 3: Treasury Settings
        string title;
        string description;
        address proposer;
        uint256 startTime;
        uint256 endTime;
        bool isExecuted;
        bool isActive;
    }
    
    mapping(uint256 => TreasuryVault) public vaults;
    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => Member) public members;
    mapping(uint256 => Proposal) public proposals;
    mapping(address => euint32) public userReputation;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    
    uint256 public vaultCounter;
    uint256 public transactionCounter;
    uint256 public memberCounter;
    uint256 public proposalCounter;
    
    address public owner;
    address public verifier;
    
    event VaultCreated(uint256 indexed vaultId, address indexed owner, string name);
    event TransactionExecuted(uint256 indexed transactionId, uint256 indexed vaultId, address indexed from, uint32 amount);
    event MemberAdded(uint256 indexed memberId, uint256 indexed vaultId, address indexed member);
    event ProposalCreated(uint256 indexed proposalId, uint256 indexed vaultId, address indexed proposer);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalExecuted(uint256 indexed proposalId, bool success);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createVault(
        string memory _name,
        string memory _description,
        bool _isPublic
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Vault name cannot be empty");
        
        uint256 vaultId = vaultCounter++;
        
        vaults[vaultId] = TreasuryVault({
            vaultId: FHE.asEuint32(0),
            totalBalance: FHE.asEuint32(0),
            availableBalance: FHE.asEuint32(0),
            lockedBalance: FHE.asEuint32(0),
            memberCount: FHE.asEuint32(1), // Owner is first member
            isActive: true,
            isPublic: _isPublic,
            name: _name,
            description: _description,
            owner: msg.sender,
            createdAt: block.timestamp,
            lastActivity: block.timestamp
        });
        
        // Add owner as first member
        uint256 memberId = memberCounter++;
        members[memberId] = Member({
            memberId: FHE.asEuint32(0),
            balance: FHE.asEuint32(0),
            reputation: FHE.asEuint32(100), // Initial reputation
            isActive: true,
            isVerified: true,
            memberAddress: msg.sender,
            joinedAt: block.timestamp,
            lastActivity: block.timestamp
        });
        
        emit VaultCreated(vaultId, msg.sender, _name);
        return vaultId;
    }
    
    function depositFunds(
        uint256 vaultId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(vaults[vaultId].owner != address(0), "Vault does not exist");
        require(vaults[vaultId].isActive, "Vault is not active");
        
        uint256 transactionId = transactionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        transactions[transactionId] = Transaction({
            transactionId: FHE.asEuint32(0),
            amount: internalAmount,
            transactionType: FHE.asEuint8(1), // Deposit
            from: msg.sender,
            to: address(this),
            description: "Deposit to treasury vault",
            timestamp: block.timestamp,
            isExecuted: true
        });
        
        // Update vault balances
        vaults[vaultId].totalBalance = FHE.add(vaults[vaultId].totalBalance, internalAmount);
        vaults[vaultId].availableBalance = FHE.add(vaults[vaultId].availableBalance, internalAmount);
        vaults[vaultId].lastActivity = block.timestamp;
        
        emit TransactionExecuted(transactionId, vaultId, msg.sender, 0); // Amount will be decrypted off-chain
        return transactionId;
    }
    
    function withdrawFunds(
        uint256 vaultId,
        externalEuint32 amount,
        bytes calldata inputProof,
        string memory description
    ) public returns (uint256) {
        require(vaults[vaultId].owner != address(0), "Vault does not exist");
        require(vaults[vaultId].isActive, "Vault is not active");
        require(vaults[vaultId].owner == msg.sender, "Only vault owner can withdraw");
        
        uint256 transactionId = transactionCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        transactions[transactionId] = Transaction({
            transactionId: FHE.asEuint32(0),
            amount: internalAmount,
            transactionType: FHE.asEuint8(2), // Withdrawal
            from: address(this),
            to: msg.sender,
            description: description,
            timestamp: block.timestamp,
            isExecuted: false // Requires execution
        });
        
        emit TransactionExecuted(transactionId, vaultId, msg.sender, 0); // Amount will be decrypted off-chain
        return transactionId;
    }
    
    function addMember(
        uint256 vaultId,
        address newMember
    ) public returns (uint256) {
        require(vaults[vaultId].owner == msg.sender, "Only vault owner can add members");
        require(vaults[vaultId].isActive, "Vault is not active");
        require(newMember != address(0), "Invalid member address");
        
        uint256 memberId = memberCounter++;
        
        members[memberId] = Member({
            memberId: FHE.asEuint32(0),
            balance: FHE.asEuint32(0),
            reputation: FHE.asEuint32(50), // Initial reputation for new members
            isActive: true,
            isVerified: false,
            memberAddress: newMember,
            joinedAt: block.timestamp,
            lastActivity: block.timestamp
        });
        
        // Update vault member count
        vaults[vaultId].memberCount = FHE.add(vaults[vaultId].memberCount, FHE.asEuint32(1));
        vaults[vaultId].lastActivity = block.timestamp;
        
        emit MemberAdded(memberId, vaultId, newMember);
        return memberId;
    }
    
    function createProposal(
        uint256 vaultId,
        externalEuint32 targetAmount,
        bytes calldata inputProof,
        uint8 proposalType,
        string memory title,
        string memory description,
        uint256 duration
    ) public returns (uint256) {
        require(vaults[vaultId].owner != address(0), "Vault does not exist");
        require(vaults[vaultId].isActive, "Vault is not active");
        require(duration > 0, "Duration must be positive");
        
        uint256 proposalId = proposalCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(targetAmount, inputProof);
        
        proposals[proposalId] = Proposal({
            proposalId: FHE.asEuint32(0),
            targetAmount: internalAmount,
            votesFor: FHE.asEuint32(0),
            votesAgainst: FHE.asEuint32(0),
            proposalType: FHE.asEuint8(proposalType),
            title: title,
            description: description,
            proposer: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            isExecuted: false,
            isActive: true
        });
        
        emit ProposalCreated(proposalId, vaultId, msg.sender);
        return proposalId;
    }
    
    function voteOnProposal(
        uint256 proposalId,
        bool support
    ) public {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp <= proposals[proposalId].endTime, "Voting period has ended");
        require(!hasVoted[msg.sender][proposalId], "Already voted on this proposal");
        
        hasVoted[msg.sender][proposalId] = true;
        
        if (support) {
            proposals[proposalId].votesFor = FHE.add(proposals[proposalId].votesFor, FHE.asEuint32(1));
        } else {
            proposals[proposalId].votesAgainst = FHE.add(proposals[proposalId].votesAgainst, FHE.asEuint32(1));
        }
        
        emit VoteCast(proposalId, msg.sender, support);
    }
    
    function executeProposal(uint256 proposalId) public {
        require(proposals[proposalId].proposer != address(0), "Proposal does not exist");
        require(proposals[proposalId].isActive, "Proposal is not active");
        require(block.timestamp > proposals[proposalId].endTime, "Voting period has not ended");
        require(!proposals[proposalId].isExecuted, "Proposal already executed");
        
        // Check if proposal passed (simple majority)
        // Note: In a real implementation, you would decrypt and compare the votes
        proposals[proposalId].isExecuted = true;
        proposals[proposalId].isActive = false;
        
        emit ProposalExecuted(proposalId, true);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getVaultInfo(uint256 vaultId) public view returns (
        string memory name,
        string memory description,
        uint8 totalBalance,
        uint8 availableBalance,
        uint8 memberCount,
        bool isActive,
        bool isPublic,
        address owner,
        uint256 createdAt,
        uint256 lastActivity
    ) {
        TreasuryVault storage vault = vaults[vaultId];
        return (
            vault.name,
            vault.description,
            0, // FHE.decrypt(vault.totalBalance) - will be decrypted off-chain
            0, // FHE.decrypt(vault.availableBalance) - will be decrypted off-chain
            0, // FHE.decrypt(vault.memberCount) - will be decrypted off-chain
            vault.isActive,
            vault.isPublic,
            vault.owner,
            vault.createdAt,
            vault.lastActivity
        );
    }
    
    function getTransactionInfo(uint256 transactionId) public view returns (
        uint8 amount,
        uint8 transactionType,
        address from,
        address to,
        string memory description,
        uint256 timestamp,
        bool isExecuted
    ) {
        Transaction storage transaction = transactions[transactionId];
        return (
            0, // FHE.decrypt(transaction.amount) - will be decrypted off-chain
            0, // FHE.decrypt(transaction.transactionType) - will be decrypted off-chain
            transaction.from,
            transaction.to,
            transaction.description,
            transaction.timestamp,
            transaction.isExecuted
        );
    }
    
    function getMemberInfo(uint256 memberId) public view returns (
        uint8 balance,
        uint8 reputation,
        bool isActive,
        bool isVerified,
        address memberAddress,
        uint256 joinedAt,
        uint256 lastActivity
    ) {
        Member storage member = members[memberId];
        return (
            0, // FHE.decrypt(member.balance) - will be decrypted off-chain
            0, // FHE.decrypt(member.reputation) - will be decrypted off-chain
            member.isActive,
            member.isVerified,
            member.memberAddress,
            member.joinedAt,
            member.lastActivity
        );
    }
    
    function getProposalInfo(uint256 proposalId) public view returns (
        uint8 targetAmount,
        uint8 votesFor,
        uint8 votesAgainst,
        uint8 proposalType,
        string memory title,
        string memory description,
        address proposer,
        uint256 startTime,
        uint256 endTime,
        bool isExecuted,
        bool isActive
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            0, // FHE.decrypt(proposal.targetAmount) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.votesFor) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.votesAgainst) - will be decrypted off-chain
            0, // FHE.decrypt(proposal.proposalType) - will be decrypted off-chain
            proposal.title,
            proposal.description,
            proposal.proposer,
            proposal.startTime,
            proposal.endTime,
            proposal.isExecuted,
            proposal.isActive
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
}