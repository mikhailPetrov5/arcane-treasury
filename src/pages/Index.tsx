import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Wallet, 
  Shield, 
  TrendingUp, 
  Users, 
  Plus,
  Eye,
  Settings,
  BarChart3
} from "lucide-react";

const Index = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  const [activeTab, setActiveTab] = useState("overview");

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-8">
              <Building2 className="mx-auto h-24 w-24 text-purple-400 mb-4" />
              <h1 className="text-6xl font-bold text-white mb-4">
                Arcane Treasury
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                A next-generation decentralized treasury management platform with FHE encryption and advanced security features.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-4">Connect Your Wallet</h2>
              <p className="text-gray-300 mb-6">
                Connect your wallet to access the treasury management platform
              </p>
              <ConnectButton />
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <Shield className="mx-auto h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">FHE Encryption</h3>
                <p className="text-gray-300">Fully Homomorphic Encryption for sensitive data protection</p>
              </div>
              <div className="text-center">
                <Users className="mx-auto h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Multi-Vault</h3>
                <p className="text-gray-300">Organize assets across different treasury vaults</p>
              </div>
              <div className="text-center">
                <TrendingUp className="mx-auto h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
                <p className="text-gray-300">Real-time performance metrics and insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Arcane Treasury</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Connected
            </Badge>
            <ConnectButton />
          </div>
        </div>

        {/* Wallet Info */}
        <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Wallet className="h-5 w-5 mr-2" />
              Wallet Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-300">Address</p>
                <p className="text-white font-mono text-sm">{address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Balance</p>
                <p className="text-white font-semibold">
                  {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Loading...'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Network</p>
                <p className="text-white">Sepolia Testnet</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-lg border-white/20">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="vaults" className="text-white data-[state=active]:bg-purple-600">
              <Building2 className="h-4 w-4 mr-2" />
              Vaults
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-white data-[state=active]:bg-purple-600">
              <TrendingUp className="h-4 w-4 mr-2" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="governance" className="text-white data-[state=active]:bg-purple-600">
              <Users className="h-4 w-4 mr-2" />
              Governance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Assets</CardTitle>
                  <Building2 className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">3,902.45 ETH</div>
                  <p className="text-xs text-green-400">+12.5% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Active Vaults</CardTitle>
                  <Shield className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">3</div>
                  <p className="text-xs text-gray-400">All vaults operational</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">25</div>
                  <p className="text-xs text-gray-400">Across all vaults</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Welcome to Arcane Treasury</CardTitle>
                <CardDescription className="text-gray-300">Your decentralized treasury management platform is ready</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Building2 className="mx-auto h-16 w-16 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Treasury Management Platform</h3>
                  <p className="text-gray-300 mb-6">
                    Manage your digital assets with advanced security features and FHE encryption.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Vault
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Eye className="h-4 w-4 mr-2" />
                      View Documentation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vaults" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Treasury Vaults</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Vault
              </Button>
            </div>
            
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-8">
                <div className="text-center">
                  <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Vaults Created Yet</h3>
                  <p className="text-gray-400 mb-6">Create your first treasury vault to get started</p>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Vault
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Transaction History</h2>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-8">
                <div className="text-center">
                  <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Transactions Yet</h3>
                  <p className="text-gray-400">Transaction history will appear here once you start using the platform</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Governance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Active Proposals</CardTitle>
                  <CardDescription className="text-gray-300">Vote on current proposals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-400">No active proposals</p>
                    <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                      Create Proposal
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Voting Power</CardTitle>
                  <CardDescription className="text-gray-300">Your governance participation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-300">Total Voting Power</p>
                      <p className="text-2xl font-bold text-white">1,250 votes</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Proposals Voted</p>
                      <p className="text-lg font-semibold text-white">0</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Participation Rate</p>
                      <p className="text-lg font-semibold text-green-400">0%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
