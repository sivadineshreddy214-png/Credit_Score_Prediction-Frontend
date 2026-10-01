import React, { useState } from 'react';
import { CreditScoreInput, PredictionResponse, PredictionRecord } from '../types';
import { predictCreditScore } from '../services/api';
import { 
  Calculator, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  TrendingUp, 
  TrendingDown, 
  Info,
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface PredictorProps {
  initialValues?: CreditScoreInput;
  onSaveRecord?: (record: PredictionRecord) => void;
  onViewDashboard?: () => void;
}

const DEFAULT_INPUTS: CreditScoreInput = {
  Monthly_Inhand_Salary: 4500,
  Total_EMI_per_month: 320,
  Outstanding_Debt: 1200,
  Credit_Utilization_Ratio: 28.5,
  Num_of_Delayed_Payment: 2,
  Monthly_Balance: 850,
  Num_Credit_Inquiries: 3,
  EMI_to_Income: 0.0711
};

export const Predictor: React.FC<PredictorProps> = ({
  initialValues,
  onSaveRecord,
  onViewDashboard
}) => {
  const [formData, setFormData] = useState<CreditScoreInput>(initialValues || DEFAULT_INPUTS);
  const [errors, setErrors] = useState<Partial<Record<keyof CreditScoreInput, string>>>({});
  const [autoSyncEmiRatio, setAutoSyncEmiRatio] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTime, setLoadingTime] = useState<number>(0);
  const [predictionResult, setPredictionResult] = useState<{
    data: PredictionResponse;
    source: 'live_backend' | 'simulation_fallback';
    latencyMs: number;
    serverMessage?: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState<boolean>(false);

  const updateField = (field: keyof CreditScoreInput, value: number) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (autoSyncEmiRatio && (field === 'Total_EMI_per_month' || field === 'Monthly_Inhand_Salary')) {
        const salary = field === 'Monthly_Inhand_Salary' ? value : next.Monthly_Inhand_Salary;
        const emi = field === 'Total_EMI_per_month' ? value : next.Total_EMI_per_month;
        if (salary > 0) {
          next.EMI_to_Income = Number((emi / salary).toFixed(4));
        }
      }
      return next;
    });

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CreditScoreInput, string>> = {};

    if (formData.Monthly_Inhand_Salary < 0) {
      errs.Monthly_Inhand_Salary = 'Salary must be a positive number';
    }
    if (formData.Total_EMI_per_month < 0) {
      errs.Total_EMI_per_month = 'Loan payments cannot be negative';
    }
    if (formData.Outstanding_Debt < 0) {
      errs.Outstanding_Debt = 'Debt cannot be negative';
    }
    if (formData.Credit_Utilization_Ratio < 0 || formData.Credit_Utilization_Ratio > 100) {
      errs.Credit_Utilization_Ratio = 'Percentage must be between 0% and 100%';
    }
    if (formData.Num_of_Delayed_Payment < 0) {
      errs.Num_of_Delayed_Payment = 'Late payments cannot be negative';
    }
    if (formData.Num_Credit_Inquiries < 0) {
      errs.Num_Credit_Inquiries = 'Credit checks cannot be negative';
    }
    if (formData.EMI_to_Income < 0) {
      errs.EMI_to_Income = 'Ratio cannot be negative';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrorMsg(null);
    setPredictionResult(null);
    setHasSaved(false);

    const timer = setInterval(() => {
      setLoadingTime((t) => t + 1);
    }, 1000);

    try {
      const res = await predictCreditScore(formData);
      setPredictionResult(res);

      if (onSaveRecord) {
        const tierName = res.data.prediction === 2 ? 'Good' : res.data.prediction === 1 ? 'Standard' : 'Poor';
        onSaveRecord({
          id: 'rec_' + Date.now(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
          inputs: { ...formData },
          result: res.data,
          label: tierName,
          scoreTier: tierName === 'Good' ? 'Good Credit' : tierName === 'Standard' ? 'Average Credit' : 'Needs Work'
        });
        setHasSaved(true);
      }
    } catch (err: unknown) {
      setErrorMsg((err as Error)?.message || 'Could not calculate score');
    } finally {
      clearInterval(timer);
      setLoading(false);
      setLoadingTime(0);
    }
  };

  const loadPreset = (presetType: 'prime' | 'standard' | 'poor') => {
    if (presetType === 'prime') {
      setFormData({
        Monthly_Inhand_Salary: 6800,
        Total_EMI_per_month: 420,
        Outstanding_Debt: 800,
        Credit_Utilization_Ratio: 16.5,
        Num_of_Delayed_Payment: 0,
        Monthly_Balance: 1600,
        Num_Credit_Inquiries: 1,
        EMI_to_Income: 0.0618
      });
    } else if (presetType === 'standard') {
      setFormData({
        Monthly_Inhand_Salary: 4200,
        Total_EMI_per_month: 550,
        Outstanding_Debt: 2200,
        Credit_Utilization_Ratio: 33.0,
        Num_of_Delayed_Payment: 3,
        Monthly_Balance: 520,
        Num_Credit_Inquiries: 3,
        EMI_to_Income: 0.131
      });
    } else {
      setFormData({
        Monthly_Inhand_Salary: 2300,
        Total_EMI_per_month: 850,
        Outstanding_Debt: 6500,
        Credit_Utilization_Ratio: 82.0,
        Num_of_Delayed_Payment: 15,
        Monthly_Balance: -80,
        Num_Credit_Inquiries: 8,
        EMI_to_Income: 0.3696
      });
    }
    setErrors({});
    setPredictionResult(null);
  };

  const getTierDetails = (prediction: 0 | 1 | 2) => {
    switch (prediction) {
      case 2:
        return {
          title: 'Good Credit Standing',
          tier: 'Low Risk · Excellent Health',
          color: 'emerald',
          badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          desc: 'Your credit is in great shape! You have low card balances, on-time bill payments, and manageable debts. Lenders are likely to offer you the best interest rates.'
        };
      case 1:
        return {
          title: 'Average Credit Standing',
          tier: 'Moderate Risk · Fair Health',
          color: 'blue',
          badgeClass: 'bg-blue-50 text-blue-800 border-blue-300',
          desc: 'You have a normal consumer credit profile with decent payment habits. Lowering your credit card balances slightly can easily lift you into the Good category.'
        };
      case 0:
      default:
        return {
          title: 'Needs Work',
          tier: 'Elevated Risk · Action Recommended',
          color: 'rose',
          badgeClass: 'bg-rose-50 text-rose-800 border-rose-300',
          desc: 'Your credit profile shows high card balances, multiple late payments, or heavy monthly debts. Following a steady repayment plan will help you rebuild quickly.'
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Private & Free Credit Health Estimator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Check Your Credit Score Standing
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Answer 8 simple questions about your income, monthly debt, and bills to get an instant credit rating and personalized tips.
          </p>
        </div>

        {/* Quick Examples */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl self-start md:self-auto">
          <span className="text-[11px] font-semibold text-slate-500 px-2">Examples:</span>
          <button
            type="button"
            onClick={() => loadPreset('prime')}
            className="px-2.5 py-1 text-xs font-medium bg-white text-emerald-700 rounded-lg shadow-2xs hover:bg-emerald-50 transition-colors"
          >
            Good Credit
          </button>
          <button
            type="button"
            onClick={() => loadPreset('standard')}
            className="px-2.5 py-1 text-xs font-medium bg-white text-blue-700 rounded-lg shadow-2xs hover:bg-blue-50 transition-colors"
          >
            Average Credit
          </button>
          <button
            type="button"
            onClick={() => loadPreset('poor')}
            className="px-2.5 py-1 text-xs font-medium bg-white text-rose-700 rounded-lg shadow-2xs hover:bg-rose-50 transition-colors"
          >
            Needs Work
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <form onSubmit={handlePredict} className="space-y-6">
            
            {/* Section 1: Income & Budget */}
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  1. Income & Monthly Budget
                </span>
                <span className="text-[11px] text-slate-400">Monthly amounts</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Monthly_Inhand_Salary */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monthly Take-Home Salary ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400">$</span>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={formData.Monthly_Inhand_Salary}
                      onChange={(e) => updateField('Monthly_Inhand_Salary', parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2 text-xs font-mono tabular-nums border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  {errors.Monthly_Inhand_Salary && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.Monthly_Inhand_Salary}</p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-1">What you take home after taxes</p>
                </div>

                {/* Monthly_Balance */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Savings / Leftover Money ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400">$</span>
                    <input
                      type="number"
                      step="any"
                      value={formData.Monthly_Balance}
                      onChange={(e) => updateField('Monthly_Balance', parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2 text-xs font-mono tabular-nums border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Money left in your account at month end</p>
                </div>

                {/* Total_EMI_per_month */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Monthly Loan Payments ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400">$</span>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={formData.Total_EMI_per_month}
                      onChange={(e) => updateField('Total_EMI_per_month', parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2 text-xs font-mono tabular-nums border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  {errors.Total_EMI_per_month && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.Total_EMI_per_month}</p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-1">Car loans, personal loans, student debt</p>
                </div>

                {/* EMI_to_Income */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Loan-to-Income Share
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAutoSyncEmiRatio(!autoSyncEmiRatio);
                        if (!autoSyncEmiRatio && formData.Monthly_Inhand_Salary > 0) {
                          updateField('EMI_to_Income', Number((formData.Total_EMI_per_month / formData.Monthly_Inhand_Salary).toFixed(4)));
                        }
                      }}
                      className={`text-[10px] px-1.5 py-0.5 rounded transition-colors ${
                        autoSyncEmiRatio ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      {autoSyncEmiRatio ? 'Auto Calculated' : 'Manual'}
                    </button>
                  </div>
                  <input
                    type="number"
                    step="0.0001"
                    min="0"
                    max="5"
                    value={formData.EMI_to_Income}
                    onChange={(e) => {
                      setAutoSyncEmiRatio(false);
                      updateField('EMI_to_Income', parseFloat(e.target.value) || 0);
                    }}
                    className="w-full px-3 py-2 text-xs font-mono tabular-nums border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    About {(formData.EMI_to_Income * 100).toFixed(0)}% of your salary pays loans
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Credit Cards & Bill Payments */}
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  2. Credit Cards & Payment Habits
                </span>
                <span className="text-[11px] text-slate-400">Payment history</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Outstanding_Debt */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Remaining Debt ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400">$</span>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={formData.Outstanding_Debt}
                      onChange={(e) => updateField('Outstanding_Debt', parseFloat(e.target.value) || 0)}
                      className="w-full pl-7 pr-3 py-2 text-xs font-mono tabular-nums border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  {errors.Outstanding_Debt && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.Outstanding_Debt}</p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-1">Total unpaid balance across all accounts</p>
                </div>

                {/* Credit_Utilization_Ratio */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Credit Card Limit Used (%)
                    </label>
                    <span className="text-xs font-mono font-semibold text-slate-600">
                      {formData.Credit_Utilization_Ratio}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.5"
                    value={formData.Credit_Utilization_Ratio}
                    onChange={(e) => updateField('Credit_Utilization_Ratio', parseFloat(e.target.value) || 0)}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-1"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>0% (Best)</span>
                    <span>30% (Recommended)</span>
                    <span>100% (Full)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Best to keep under 30%</p>
                </div>

                {/* Num_of_Delayed_Payment */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Number of Late Payments
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => updateField('Num_of_Delayed_Payment', Math.max(0, formData.Num_of_Delayed_Payment - 1))}
                      className="px-3 py-2 bg-slate-100 text-slate-700 rounded-l-lg border border-r-0 border-slate-200 text-xs font-bold hover:bg-slate-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={formData.Num_of_Delayed_Payment}
                      onChange={(e) => updateField('Num_of_Delayed_Payment', parseInt(e.target.value) || 0)}
                      className="w-full py-2 text-center text-xs font-mono tabular-nums border-y border-slate-200 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => updateField('Num_of_Delayed_Payment', formData.Num_of_Delayed_Payment + 1)}
                      className="px-3 py-2 bg-slate-100 text-slate-700 rounded-r-lg border border-l-0 border-slate-200 text-xs font-bold hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Times bills were paid past due date</p>
                </div>

                {/* Num_Credit_Inquiries */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Recent Credit Inquiries
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => updateField('Num_Credit_Inquiries', Math.max(0, formData.Num_Credit_Inquiries - 1))}
                      className="px-3 py-2 bg-slate-100 text-slate-700 rounded-l-lg border border-r-0 border-slate-200 text-xs font-bold hover:bg-slate-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={formData.Num_Credit_Inquiries}
                      onChange={(e) => updateField('Num_Credit_Inquiries', parseInt(e.target.value) || 0)}
                      className="w-full py-2 text-center text-xs font-mono tabular-nums border-y border-slate-200 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => updateField('Num_Credit_Inquiries', formData.Num_Credit_Inquiries + 1)}
                      className="px-3 py-2 bg-slate-100 text-slate-700 rounded-r-lg border border-l-0 border-slate-200 text-xs font-bold hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">New card or loan applications in last year</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Calculating Credit Score ({loadingTime}s)...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4" />
                    <span>Calculate My Credit Score</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFormData(DEFAULT_INPUTS);
                  setErrors({});
                  setPredictionResult(null);
                }}
                className="px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Reset Numbers
              </button>
            </div>

            {/* Friendly loading note */}
            {loading && loadingTime > 4 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2.5 text-xs text-amber-800 animate-in fade-in">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Checking cloud database...</p>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    Connecting to the scoring system. This usually takes just a few seconds.
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Output Results Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
              <div className="flex items-center gap-2 font-bold mb-1">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Notice</span>
              </div>
              <p>{errorMsg}</p>
            </div>
          )}

          {predictionResult ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6 animate-in fade-in slide-in-from-bottom-2">
              
              {/* Header and Source */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-500">Your Credit Standing</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                  Verified Analysis
                </span>
              </div>

              {/* Main Badge */}
              {(() => {
                const tier = getTierDetails(predictionResult.data.prediction);
                return (
                  <div className={`p-5 rounded-xl border ${tier.badgeClass}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold tracking-wider uppercase">Estimated Rating</span>
                      <span className="text-xs font-semibold">{tier.tier}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold tracking-tight">{tier.title}</h3>
                    <p className="text-xs mt-3 leading-relaxed opacity-90">{tier.desc}</p>
                  </div>
                );
              })()}

              {/* Chances Breakdown */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">Chances Breakdown</span>
                  <span className="text-[11px] text-slate-400">Total: 100%</span>
                </div>

                <div className="space-y-3">
                  {[
                    { key: '2', label: 'Good Standing', prob: predictionResult.data.probabilities['2'], color: 'bg-emerald-500' },
                    { key: '1', label: 'Average Standing', prob: predictionResult.data.probabilities['1'], color: 'bg-blue-500' },
                    { key: '0', label: 'Needs Improvement', prob: predictionResult.data.probabilities['0'], color: 'bg-rose-500' }
                  ].map((item) => {
                    const pct = Math.round(item.prob * 100);
                    const isWinner = String(predictionResult.data.prediction) === item.key;
                    return (
                      <div key={item.key} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className={isWinner ? 'text-slate-900 font-bold' : 'text-slate-600'}>
                            {item.label} {isWinner && '★'}
                          </span>
                          <span className="font-mono tabular-nums text-slate-700">
                            {pct}% chance
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* What shaped your score */}
              <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs">
                <span className="font-bold text-slate-800 block mb-1">What Influenced Your Score</span>
                
                <div className="flex items-center gap-2">
                  {formData.Credit_Utilization_Ratio > 50 ? (
                    <TrendingDown className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  ) : (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  )}
                  <span className="text-slate-600">
                    Credit card usage is <strong className="font-mono">{formData.Credit_Utilization_Ratio}%</strong> (
                    {formData.Credit_Utilization_Ratio <= 30 ? 'healthy level' : 'higher than recommended'}
                    )
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {formData.Num_of_Delayed_Payment > 2 ? (
                    <TrendingDown className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  ) : (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  )}
                  <span className="text-slate-600">
                    Past late payments: <strong className="font-mono">{formData.Num_of_Delayed_Payment}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="text-slate-600">
                    Debt payments take up <strong className="font-mono">{(formData.EMI_to_Income * 100).toFixed(0)}%</strong> of monthly pay
                  </span>
                </div>
              </div>

              {/* Status footer & Dashboard link */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Calculated in under a second
                </span>
                {hasSaved && onViewDashboard && (
                  <button
                    onClick={onViewDashboard}
                    className="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>View in Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">Ready for Your Score</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto mb-6">
                Fill in your numbers on the left and click "Calculate My Credit Score" to see where you stand.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-left text-xs space-y-1.5 text-slate-600">
                <p className="font-semibold text-slate-800">Possible Ratings:</p>
                <div className="text-[11px] text-slate-500 space-y-1">
                  <p>• <strong>Good:</strong> High chance of best rates & approvals</p>
                  <p>• <strong>Average:</strong> Normal standing, room for improvement</p>
                  <p>• <strong>Needs Work:</strong> High card balances or late payments</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
