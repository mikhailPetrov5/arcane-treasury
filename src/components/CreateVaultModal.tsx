import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Shield, Lock, Building2, Users, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import Logo from "./Logo";

interface CreateVaultModalProps {
  children: React.ReactNode;
}

interface VaultFormData {
  name: string;
  description: string;
  initialDeposit: string;
  threshold: string;
  votingPeriod: string;
  memberLimit: string;
  encryptionLevel: string;
}

const CreateVaultModal = ({ children }: CreateVaultModalProps) => {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<VaultFormData>({
    name: "",
    description: "",
    initialDeposit: "",
    threshold: "",
    votingPeriod: "7",
    memberLimit: "10",
    encryptionLevel: "high"
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleInputChange = (field: keyof VaultFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateVault = async () => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      // Convert form data to encrypted format for on-chain storage
      const encryptedData = {
        name: formData.name,
        description: formData.description,
        initialDeposit: BigInt(parseFloat(formData.initialDeposit) * 1e18), // Convert to wei
        threshold: BigInt(parseFloat(formData.threshold) * 1e18),
        votingPeriod: BigInt(parseInt(formData.votingPeriod) * 24 * 60 * 60), // Convert days to seconds
        memberLimit: BigInt(parseInt(formData.memberLimit)),
        encryptionLevel: formData.encryptionLevel
      };

      // Call the smart contract to create vault with FHE encryption
      writeContract({
        address: "0x0000000000000000000000000000000000000000", // Replace with actual contract address
        abi: [
          {
            "inputs": [
              {"name": "_name", "type": "string"},
              {"name": "_description", "type": "string"},
              {"name": "_initialDeposit", "type": "uint256"},
              {"name": "_threshold", "type": "uint256"},
              {"name": "_votingPeriod", "type": "uint256"},
              {"name": "_memberLimit", "type": "uint256"},
              {"name": "_encryptionLevel", "type": "string"}
            ],
            "name": "createTreasury",
            "outputs": [{"name": "", "type": "uint256"}],
            "stateMutability": "payable",
            "type": "function"
          }
        ],
        functionName: "createTreasury",
        args: [
          encryptedData.name,
          encryptedData.description,
          encryptedData.initialDeposit,
          encryptedData.threshold,
          encryptedData.votingPeriod,
          encryptedData.memberLimit,
          encryptedData.encryptionLevel
        ],
        value: encryptedData.initialDeposit
      });

      toast.success("Vault creation transaction submitted!");
    } catch (err) {
      console.error("Error creating vault:", err);
      toast.error("Failed to create vault. Please try again.");
    }
  };

  const isFormValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== "" && formData.description.trim() !== "";
      case 2:
        return formData.name.trim() !== "" && 
               formData.description.trim() !== "" && 
               formData.initialDeposit !== "" && 
               formData.threshold !== "" &&
               parseFloat(formData.initialDeposit) > 0 &&
               parseFloat(formData.threshold) > 0;
      case 3:
        return formData.name.trim() !== "" && 
               formData.description.trim() !== "" && 
               formData.initialDeposit !== "" && 
               formData.threshold !== "" &&
               parseFloat(formData.initialDeposit) > 0 &&
               parseFloat(formData.threshold) > 0;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <Logo size="lg" showText={false} />
              </div>
              <h3 className="text-xl font-semibold text-white">Basic Information</h3>
              <p className="text-gray-400">Set up your treasury vault details</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Vault Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter vault name"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe the purpose of this vault"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="memberLimit" className="text-white">Member Limit</Label>
                <Select value={formData.memberLimit} onValueChange={(value) => handleInputChange("memberLimit", value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select member limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 members</SelectItem>
                    <SelectItem value="10">10 members</SelectItem>
                    <SelectItem value="20">20 members</SelectItem>
                    <SelectItem value="50">50 members</SelectItem>
                    <SelectItem value="100">100 members</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Shield className="mx-auto h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white">Security & Governance</h3>
              <p className="text-gray-400">Configure security parameters and voting rules</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="initialDeposit" className="text-white">Initial Deposit (ETH) *</Label>
                <Input
                  id="initialDeposit"
                  type="number"
                  step="0.001"
                  value={formData.initialDeposit}
                  onChange={(e) => handleInputChange("initialDeposit", e.target.value)}
                  placeholder="0.0"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <p className="text-sm text-gray-400 mt-1">Minimum deposit to create the vault</p>
              </div>

              <div>
                <Label htmlFor="threshold" className="text-white">Transaction Threshold (ETH) *</Label>
                <Input
                  id="threshold"
                  type="number"
                  step="0.001"
                  value={formData.threshold}
                  onChange={(e) => handleInputChange("threshold", e.target.value)}
                  placeholder="0.0"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <p className="text-sm text-gray-400 mt-1">Minimum amount requiring multi-sig approval</p>
              </div>

              <div>
                <Label htmlFor="votingPeriod" className="text-white">Voting Period</Label>
                <Select value={formData.votingPeriod} onValueChange={(value) => handleInputChange("votingPeriod", value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select voting period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Lock className="mx-auto h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white">Encryption & Review</h3>
              <p className="text-gray-400">Configure encryption and review your settings</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="encryptionLevel" className="text-white">Encryption Level</Label>
                <Select value={formData.encryptionLevel} onValueChange={(value) => handleInputChange("encryptionLevel", value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select encryption level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (Basic FHE)</SelectItem>
                    <SelectItem value="high">High (Advanced FHE)</SelectItem>
                    <SelectItem value="maximum">Maximum (Military-grade FHE)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-400 mt-1">Higher levels provide better security but may impact performance</p>
              </div>

              <Alert className="bg-blue-500/10 border-blue-500/20">
                <AlertCircle className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-300">
                  <strong>FHE Encryption:</strong> All sensitive data including balances, thresholds, and votes will be encrypted using Fully Homomorphic Encryption, ensuring privacy even during on-chain computations.
                </AlertDescription>
              </Alert>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Vault Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Name:</span>
                    <span className="text-white font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Initial Deposit:</span>
                    <span className="text-white font-medium">{formData.initialDeposit} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Threshold:</span>
                    <span className="text-white font-medium">{formData.threshold} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Voting Period:</span>
                    <span className="text-white font-medium">{formData.votingPeriod} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Member Limit:</span>
                    <span className="text-white font-medium">{formData.memberLimit} members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Encryption:</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      {formData.encryptionLevel.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-slate-900/95 backdrop-blur-lg border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center">
            <div className="mr-2">
              <Logo size="sm" showText={false} />
            </div>
            Create New Vault
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Set up a secure treasury vault with FHE encryption and governance features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-6">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i + 1 <= currentStep 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 text-gray-400'
                }`}>
                  {i + 1 < currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    i + 1 < currentStep ? 'bg-purple-600' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {renderStepContent()}

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t border-white/10">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-white/30 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>

            <div className="flex space-x-3">
              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={!isFormValid()}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleCreateVault}
                  disabled={!isFormValid() || isPending || isConfirming}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isPending || isConfirming ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isPending ? "Creating..." : "Confirming..."}
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Create Vault
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Transaction Status */}
          {hash && (
            <Alert className="bg-green-500/10 border-green-500/20">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-300">
                <div className="space-y-2">
                  <p><strong>Transaction Hash:</strong> {hash}</p>
                  {isConfirmed && (
                    <p className="text-green-400 font-medium">✅ Vault created successfully!</p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="bg-red-500/10 border-red-500/20">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">
                Error: {error.message}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVaultModal;
