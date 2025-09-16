import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Shield, 
  Lock, 
  Users, 
  Zap, 
  Code, 
  ArrowLeft,
  ExternalLink,
  FileText,
  Key,
  Database,
  Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";

const Documentation = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "FHE Encryption",
      description: "Fully Homomorphic Encryption ensures sensitive data remains encrypted during on-chain computations",
      details: "All treasury balances, voting data, and transaction amounts are encrypted using advanced FHE algorithms"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Multi-Vault Management",
      description: "Create and manage multiple segregated treasuries for different purposes",
      details: "Organize funds across development, operations, emergency reserves, and other categories"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Governance System",
      description: "Decentralized governance with encrypted voting and proposal management",
      details: "Members can create proposals, vote on fund allocations, and execute decisions securely"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Analytics",
      description: "Monitor treasury performance with encrypted analytics and insights",
      details: "Track fund flows, voting patterns, and treasury health without compromising privacy"
    }
  ];

  const technicalSpecs = [
    {
      category: "Blockchain",
      items: [
        "Ethereum Sepolia Testnet",
        "FHEVM Integration",
        "Smart Contract: ArcaneTreasury.sol",
        "Gas Optimization"
      ]
    },
    {
      category: "Frontend",
      items: [
        "React 18 + TypeScript",
        "Vite Build System",
        "Tailwind CSS + Shadcn/UI",
        "RainbowKit Wallet Integration"
      ]
    },
    {
      category: "Security",
      items: [
        "FHE Encryption (euint32, ebool)",
        "Multi-signature Support",
        "Encrypted Voting System",
        "Audit Trail"
      ]
    },
    {
      category: "Governance",
      items: [
        "Proposal Creation & Voting",
        "Threshold-based Execution",
        "Member Management",
        "Voting Periods"
      ]
    }
  ];

  const apiEndpoints = [
    {
      method: "createTreasury",
      description: "Create a new treasury vault with FHE encryption",
      parameters: ["name", "description", "initialDeposit", "threshold", "votingPeriod", "memberLimit"],
      returns: "uint256 treasuryId"
    },
    {
      method: "depositFunds",
      description: "Deposit encrypted funds into a treasury",
      parameters: ["treasuryId", "amount", "proof"],
      returns: "void"
    },
    {
      method: "createProposal",
      description: "Create a governance proposal with encrypted data",
      parameters: ["treasuryId", "description", "amount", "recipient", "votingDuration"],
      returns: "uint256 proposalId"
    },
    {
      method: "voteOnProposal",
      description: "Cast an encrypted vote on a proposal",
      parameters: ["proposalId", "vote", "proof"],
      returns: "void"
    },
    {
      method: "executeProposal",
      description: "Execute a passed proposal",
      parameters: ["proposalId"],
      returns: "void"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <Logo size="md" showText={true} />
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="xl" showText={false} />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Arcane Treasury Documentation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive guide to the next-generation decentralized treasury management platform with FHE encryption
          </p>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-white/10 backdrop-blur-lg border-white/20">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">
              <BookOpen className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="features" className="text-white data-[state=active]:bg-purple-600">
              <Shield className="h-4 w-4 mr-2" />
              Features
            </TabsTrigger>
            <TabsTrigger value="technical" className="text-white data-[state=active]:bg-purple-600">
              <Code className="h-4 w-4 mr-2" />
              Technical
            </TabsTrigger>
            <TabsTrigger value="api" className="text-white data-[state=active]:bg-purple-600">
              <Database className="h-4 w-4 mr-2" />
              API Reference
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-2xl">What is Arcane Treasury?</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  A revolutionary decentralized platform for secure treasury management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-300 leading-relaxed">
                  Arcane Treasury is a cutting-edge decentralized platform designed for secure and private management of digital assets. 
                  Leveraging Fully Homomorphic Encryption (FHE), it ensures that sensitive financial data remains encrypted even during 
                  on-chain computations, providing unparalleled privacy and security for guild funds, DAOs, and other collective treasuries.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Key Benefits</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        Complete privacy for sensitive financial data
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        Decentralized governance with encrypted voting
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        Multi-vault organization for different purposes
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        Real-time analytics without compromising privacy
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Use Cases</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        DAO treasury management
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        Gaming guild funds
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        Investment club treasuries
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        Corporate fund management
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-white">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">{feature.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicalSpecs.map((spec, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Key className="h-5 w-5 mr-2 text-purple-400" />
                      {spec.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {spec.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-gray-300">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Smart Contract Architecture</CardTitle>
                <CardDescription className="text-gray-300">
                  Core contract structure and FHE integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">ArcaneTreasury.sol</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Main contract implementing FHE-enabled treasury management
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Database className="h-4 w-4 mr-2" />
                        <span>FHE Types: euint32, ebool, externalEuint32</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Shield className="h-4 w-4 mr-2" />
                        <span>Encrypted Storage: balances, votes, thresholds</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Governance: proposals, voting, execution</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-8">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Smart Contract Methods</CardTitle>
                <CardDescription className="text-gray-300">
                  Available functions for interacting with the treasury system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="bg-slate-800/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">{endpoint.method}</h4>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                          {endpoint.returns}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">{endpoint.description}</p>
                      <div className="space-y-2">
                        <p className="text-gray-400 text-sm font-medium">Parameters:</p>
                        <div className="flex flex-wrap gap-2">
                          {endpoint.parameters.map((param, paramIndex) => (
                            <Badge key={paramIndex} variant="outline" className="border-gray-600 text-gray-300">
                              {param}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Integration Examples</CardTitle>
                <CardDescription className="text-gray-300">
                  Code examples for common operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Creating a Treasury</h4>
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`const treasuryId = await contract.createTreasury(
  "Development Fund",
  "Funds for project development",
  ethers.parseEther("10.0"),
  ethers.parseEther("1.0"),
  7 * 24 * 60 * 60, // 7 days
  10
);`}
                    </pre>
                  </div>
                  
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Voting on a Proposal</h4>
                    <pre className="text-gray-300 text-sm overflow-x-auto">
{`await contract.voteOnProposal(
  proposalId,
  encryptedVote,
  voteProof
);`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <Logo size="sm" showText={false} />
            <span className="text-gray-400">Arcane Treasury</span>
          </div>
          <p className="text-gray-500 text-sm">
            Built with FHE encryption for maximum privacy and security
          </p>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
