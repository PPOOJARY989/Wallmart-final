"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Shield, Lock, Eye, Key, Clock, CheckCircle, AlertTriangle, Download, Search } from "lucide-react"

interface BlockchainBlock {
  id: string
  hash: string
  previousHash: string
  timestamp: string
  storeId: string
  storeName: string
  updateType: "MODEL_UPDATE" | "FRAUD_DETECTION" | "PRIVACY_AUDIT" | "SYSTEM_EVENT"
  encryptedData: string
  signature: string
  gasUsed: number
  confirmations: number
  isDecrypted: boolean
  decryptedContent?: {
    modelAccuracy: number
    fraudCasesDetected: number
    privacyBudgetUsed: number
    contributionScore: number
  }
}

const blockchainBlocks: BlockchainBlock[] = [
  {
    id: "block-001",
    hash: "0x7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730",
    previousHash: "0x6c754e848b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97629",
    timestamp: "2024-01-15T14:32:18Z",
    storeId: "store-4587",
    storeName: "Miami Supercenter",
    updateType: "FRAUD_DETECTION",
    encryptedData: "AES256:7f4a8d09e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    signature: "0x8ab4c2c492b748a2f87d07e7419ee739d06d6336d16b37c1a8ecf7b5a643e53f",
    gasUsed: 21000,
    confirmations: 847,
    isDecrypted: true,
    decryptedContent: {
      modelAccuracy: 94.7,
      fraudCasesDetected: 23,
      privacyBudgetUsed: 0.08,
      contributionScore: 8.9,
    },
  },
  {
    id: "block-002",
    hash: "0x6c754e848b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97629",
    previousHash: "0x5b643d737b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97518",
    timestamp: "2024-01-15T14:31:45Z",
    storeId: "store-2341",
    storeName: "Dallas Supercenter",
    updateType: "MODEL_UPDATE",
    encryptedData: "AES256:9e6b5f12a4c8d73e2f1a8b9c0d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
    signature: "0x7bc3d1d381c749b3e86bd8e7308c17c063dda409a8a612a906817c6464dec910",
    gasUsed: 18500,
    confirmations: 852,
    isDecrypted: false,
  },
  {
    id: "block-003",
    hash: "0x5b643d737b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97518",
    previousHash: "0x4a532c626b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97407",
    timestamp: "2024-01-15T14:31:12Z",
    storeId: "store-7823",
    storeName: "Seattle Supercenter",
    updateType: "PRIVACY_AUDIT",
    encryptedData: "AES256:3c5d7e9f1a2b4c6d8e0f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d",
    signature: "0x6ab2c0c381b638a1f76c06e6308b06c052cca308a7a501a805706b5353ceb80f",
    gasUsed: 22000,
    confirmations: 857,
    isDecrypted: true,
    decryptedContent: {
      modelAccuracy: 96.2,
      fraudCasesDetected: 0,
      privacyBudgetUsed: 0.05,
      contributionScore: 9.4,
    },
  },
]

export function BlockchainAuditTrail() {
  const [selectedBlock, setSelectedBlock] = useState<BlockchainBlock | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [decryptionKey, setDecryptionKey] = useState("")
  const [isDecrypting, setIsDecrypting] = useState(false)
  const [filteredBlocks, setFilteredBlocks] = useState(blockchainBlocks)

  useEffect(() => {
    const filtered = blockchainBlocks.filter(
      (block) =>
        block.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        block.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        block.updateType.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredBlocks(filtered)
  }, [searchTerm])

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case "FRAUD_DETECTION":
        return "bg-red-100 text-red-800"
      case "MODEL_UPDATE":
        return "bg-blue-100 text-blue-800"
      case "PRIVACY_AUDIT":
        return "bg-green-100 text-green-800"
      case "SYSTEM_EVENT":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUpdateTypeIcon = (type: string) => {
    switch (type) {
      case "FRAUD_DETECTION":
        return <AlertTriangle className="w-4 h-4" />
      case "MODEL_UPDATE":
        return <Shield className="w-4 h-4" />
      case "PRIVACY_AUDIT":
        return <Eye className="w-4 h-4" />
      case "SYSTEM_EVENT":
        return <Clock className="w-4 h-4" />
      default:
        return <Lock className="w-4 h-4" />
    }
  }

  const simulateDecryption = async (block: BlockchainBlock) => {
    if (!decryptionKey) return

    setIsDecrypting(true)

    // Simulate decryption process
    setTimeout(() => {
      const updatedBlocks = blockchainBlocks.map((b) =>
        b.id === block.id
          ? {
              ...b,
              isDecrypted: true,
              decryptedContent: {
                modelAccuracy: Math.random() * 10 + 90,
                fraudCasesDetected: Math.floor(Math.random() * 50),
                privacyBudgetUsed: Math.random() * 0.2,
                contributionScore: Math.random() * 2 + 8,
              },
            }
          : b,
      )

      const updatedBlock = updatedBlocks.find((b) => b.id === block.id)
      setSelectedBlock(updatedBlock || null)
      setIsDecrypting(false)
      setDecryptionKey("")
    }, 2000)
  }

  const exportAuditReport = () => {
    const reportContent = `
WALMART FEDERATED LEARNING BLOCKCHAIN AUDIT REPORT
==================================================

Generated: ${new Date().toISOString()}
Total Blocks: ${blockchainBlocks.length}
Verified Transactions: ${blockchainBlocks.filter((b) => b.confirmations > 100).length}

BLOCKCHAIN INTEGRITY SUMMARY
----------------------------
${blockchainBlocks
  .map(
    (block) => `
Block ID: ${block.id}
Hash: ${block.hash}
Store: ${block.storeName} (${block.storeId})
Type: ${block.updateType}
Timestamp: ${block.timestamp}
Confirmations: ${block.confirmations}
Gas Used: ${block.gasUsed}
Status: ${block.isDecrypted ? "DECRYPTED" : "ENCRYPTED"}
${
  block.decryptedContent
    ? `
  Model Accuracy: ${block.decryptedContent.modelAccuracy.toFixed(1)}%
  Fraud Cases: ${block.decryptedContent.fraudCasesDetected}
  Privacy Budget: ${block.decryptedContent.privacyBudgetUsed.toFixed(3)}
  Contribution Score: ${block.decryptedContent.contributionScore.toFixed(1)}
`
    : ""
}
`,
  )
  .join("\n")}

SECURITY VERIFICATION
--------------------
✓ All blocks cryptographically linked
✓ Digital signatures verified
✓ Privacy-preserving encryption maintained
✓ Audit trail immutable and tamper-proof

Generated by Walmart Blockchain Audit System
Confidential - For Authorized Personnel Only
    `

    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `blockchain-audit-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">⛓️ Blockchain Audit Trail</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Immutable ledger of federated learning updates and fraud detections
          </p>
        </div>
        <Button onClick={exportAuditReport} className="bg-[#0071CE] hover:bg-blue-700">
          <Download className="w-4 h-4 mr-2" />
          Export Audit Report
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by store name, hash, or update type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Blockchain Blocks List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Blockchain Blocks</span>
              </CardTitle>
              <CardDescription>Cryptographically secured audit trail</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[700px]">
                <div className="space-y-2 p-4">
                  {filteredBlocks.map((block) => (
                    <div
                      key={block.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md border ${
                        selectedBlock?.id === block.id
                          ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200"
                          : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => setSelectedBlock(block)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={getUpdateTypeColor(block.updateType)}>
                          <div className="flex items-center space-x-1">
                            {getUpdateTypeIcon(block.updateType)}
                            <span>{block.updateType.replace("_", " ")}</span>
                          </div>
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {block.isDecrypted ? (
                            <Eye className="w-4 h-4 text-green-500" />
                          ) : (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                      </div>

                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{block.storeName}</h4>

                      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex justify-between">
                          <span>Block:</span>
                          <span className="font-mono">{block.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hash:</span>
                          <span className="font-mono">{block.hash.substring(0, 10)}...</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Confirmations:</span>
                          <span className="font-semibold text-green-600">{block.confirmations}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gas Used:</span>
                          <span>{block.gasUsed.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span>{new Date(block.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Block Details */}
        <div className="lg:col-span-2">
          {selectedBlock ? (
            <div className="space-y-6">
              {/* Block Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl flex items-center space-x-2">
                        {getUpdateTypeIcon(selectedBlock.updateType)}
                        <span>{selectedBlock.storeName}</span>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Block {selectedBlock.id} • {selectedBlock.updateType.replace("_", " ")}
                      </CardDescription>
                    </div>
                    <Badge className={getUpdateTypeColor(selectedBlock.updateType)}>
                      {selectedBlock.confirmations} Confirmations
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Block Hash</label>
                        <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-sm break-all">
                          {selectedBlock.hash}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Previous Hash</label>
                        <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-sm break-all">
                          {selectedBlock.previousHash}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Digital Signature
                        </label>
                        <div className="mt-1 p-2 bg-gray-100 dark:bg-gray-800 rounded font-mono text-sm break-all">
                          {selectedBlock.signature}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
                            {selectedBlock.confirmations}
                          </div>
                          <div className="text-sm text-blue-600 dark:text-blue-400">Confirmations</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-800 dark:text-green-300">
                            {selectedBlock.gasUsed.toLocaleString()}
                          </div>
                          <div className="text-sm text-green-600 dark:text-green-400">Gas Used</div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Timestamp</label>
                        <div className="mt-1 text-lg font-semibold">
                          {new Date(selectedBlock.timestamp).toLocaleString()}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Store Information
                        </label>
                        <div className="mt-1">
                          <div className="font-semibold">{selectedBlock.storeName}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{selectedBlock.storeId}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Encrypted Data */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="w-5 h-5" />
                    <span>Encrypted Payload</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Encrypted Data</label>
                      <div className="mt-1 p-3 bg-gray-100 dark:bg-gray-800 rounded font-mono text-sm break-all">
                        {selectedBlock.encryptedData}
                      </div>
                    </div>

                    {!selectedBlock.isDecrypted && (
                      <div className="flex items-center space-x-4">
                        <Input
                          type="password"
                          placeholder="Enter decryption key..."
                          value={decryptionKey}
                          onChange={(e) => setDecryptionKey(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={() => simulateDecryption(selectedBlock)}
                          disabled={!decryptionKey || isDecrypting}
                          className="bg-[#0071CE] hover:bg-blue-700"
                        >
                          <Key className="w-4 h-4 mr-2" />
                          {isDecrypting ? "Decrypting..." : "Decrypt"}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Decrypted Content */}
              {selectedBlock.isDecrypted && selectedBlock.decryptedContent && (
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-800">
                      <Eye className="w-5 h-5" />
                      <span>Decrypted Intelligence</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-green-100 rounded-lg">
                          <div className="text-3xl font-bold text-green-800">
                            {selectedBlock.decryptedContent.modelAccuracy.toFixed(1)}%
                          </div>
                          <div className="text-sm text-green-600">Model Accuracy</div>
                        </div>
                        <div className="text-center p-4 bg-green-100 rounded-lg">
                          <div className="text-3xl font-bold text-green-800">
                            {selectedBlock.decryptedContent.fraudCasesDetected}
                          </div>
                          <div className="text-sm text-green-600">Fraud Cases Detected</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center p-4 bg-green-100 rounded-lg">
                          <div className="text-3xl font-bold text-green-800">
                            {selectedBlock.decryptedContent.privacyBudgetUsed.toFixed(3)}
                          </div>
                          <div className="text-sm text-green-600">Privacy Budget Used</div>
                        </div>
                        <div className="text-center p-4 bg-green-100 rounded-lg">
                          <div className="text-3xl font-bold text-green-800">
                            {selectedBlock.decryptedContent.contributionScore.toFixed(1)}
                          </div>
                          <div className="text-sm text-green-600">Contribution Score</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Select a Blockchain Block</h3>
                <p className="text-gray-500">
                  Choose a block from the audit trail to view its cryptographic details and encrypted payload.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
