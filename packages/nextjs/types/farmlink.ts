export interface User {
  address: string;
  email?: string;
  role: "farmer" | "investor" | null;
  isVetted: boolean;
  ensName?: string;
}

export interface Project {
  id: string;
  address: string;
  title: string;
  description: string;
  farmer: string;
  farmerENS?: string;
  goal: bigint;
  totalPledged: bigint;
  fundingDeadline: number;
  seasonStartDate: number;
  milestones: Milestone[];
  status: "funding" | "in-progress" | "completed" | "failed";
  createdAt: number;
  documentCID?: string;
}

export interface Milestone {
  id: number;
  description: string;
  percentage: number;
  amount: bigint;
  status: "pending" | "submitted" | "completed";
  proofCID?: string;
  completedAt?: number;
}

export interface Investment {
  projectAddress: string;
  investor: string;
  amount: bigint;
  timestamp: number;
  claimed: boolean;
}

export interface FarmerApplication {
  name: string;
  bio: string;
  farmLocation: string;
  documentCID: string;
  status: "pending" | "approved" | "rejected";
}
