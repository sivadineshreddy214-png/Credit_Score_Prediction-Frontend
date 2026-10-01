export interface CreditScoreInput {
  Monthly_Inhand_Salary: number;
  Total_EMI_per_month: number;
  Outstanding_Debt: number;
  Credit_Utilization_Ratio: number;
  Num_of_Delayed_Payment: number;
  Monthly_Balance: number;
  Num_Credit_Inquiries: number;
  EMI_to_Income: number;
}

export interface PredictionResponse {
  prediction: 0 | 1 | 2;
  probabilities: {
    '0': number;
    '1': number;
    '2': number;
    [key: string]: number;
  };
}

export interface PredictionRecord {
  id: string;
  timestamp: string;
  inputs: CreditScoreInput;
  result: PredictionResponse;
  label: 'Poor' | 'Standard' | 'Good';
  scoreTier: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: 'password' | 'google';
  createdAt: string;
}

export type ActiveTab = 'home' | 'predict' | 'dashboard' | 'specs' | 'about' | 'contact' | 'signin' | 'signup';
