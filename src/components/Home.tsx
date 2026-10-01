import React from 'react';
import { ActiveTab, CreditScoreInput } from '../types';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sliders, 
  Lock, 
  BarChart3,
  HelpCircle,
  TrendingUp,
  CreditCard,
  DollarSign
} from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectPreset?: (preset: CreditScoreInput) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, onSelectPreset }) => {
  const features = [
    {
      title: 'Clear Credit Ratings',
      description: 'Quickly find out if your credit is Good, Average, or Needs Work, along with your exact score likelihood.',
      icon: ShieldCheck
    },
    {
      title: '8 Essential Financial Details',
      description: 'We focus on what truly matters: your monthly income, debts, savings, card usage, and bill payment habits.',
      icon: Sliders
    },
    {
      title: 'Honest & Transparent Breakdown',
      description: 'See exactly why you received your rating, and which areas have the biggest impact on your score.',
      icon: BarChart3
    },
    {
      title: 'Simple Actionable Advice',
      description: 'Get helpful suggestions on how to lower debts and improve your score for future loans and credit cards.',
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-4 pb-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3.5 py-1 mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            Fast, Secure, & Private Credit Health Checker
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Understand Your Credit Score in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Plain Words</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Check where your credit stands today based on your real income and monthly spending. Get an instant, clear breakdown with zero confusing financial jargon.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('predict')}
              className="px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2"
            >
              <span>Check My Credit Score</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className="px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-2 shadow-xs"
            >
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>How Scoring Works</span>
            </button>
          </div>

          {/* Highlights */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <p className="text-2xl font-bold font-mono tabular-nums text-slate-900">8</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Simple Financial Questions</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono tabular-nums text-slate-900">3 Tiers</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Good, Average, or Poor</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono tabular-nums text-slate-900">Instant</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Results in Seconds</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono tabular-nums text-slate-900">100%</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Private & Transparent</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Features Breakdown */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <p className="text-xs font-semibold text-indigo-600 tracking-wider uppercase">What Goes Into Your Score</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">The 8 Details That Shape Your Rating</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Lenders look at your real payment habits and debt levels, not personal background. Here is what we check:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Monthly Take-Home Pay', type: 'Dollars ($)', desc: 'What you bring home each month after taxes' },
            { label: 'Monthly Loan Payments', type: 'Dollars ($)', desc: 'Car loans, student loans, or personal installments' },
            { label: 'Total Unpaid Debt', type: 'Dollars ($)', desc: 'Remaining balance you currently owe across all loans' },
            { label: 'Credit Card Usage', type: 'Percentage (%)', desc: 'How much of your credit limit you are using' },
            { label: 'Late Payments', type: 'Number', desc: 'How many times bill payments were past due' },
            { label: 'Money Left Over', type: 'Dollars ($)', desc: 'Savings or funds left in your account at month end' },
            { label: 'New Credit Checks', type: 'Number', desc: 'Recent times you applied for cards or loans' },
            { label: 'Loan Payment vs Income', type: 'Ratio (%)', desc: 'Portion of your monthly income that goes to debt' },
          ].map((vector) => (
            <div key={vector.label} className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">{vector.label}</span>
                <span className="text-[11px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{vector.type}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{vector.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Simple 3-step banner */}
      <section className="max-w-6xl mx-auto px-4 pb-4">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Quick & Easy
            </span>
            <h2 className="text-2xl font-bold mt-2 mb-3">
              How Your Credit Check Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Checking your standing takes less than a minute and won't affect your real credit file:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-xs font-bold text-indigo-300">Step 1</p>
                <p className="text-xs text-white font-medium mt-0.5">Enter Your Numbers</p>
                <p className="text-[11px] text-slate-400 mt-1">Provide your income, loan payments, and card balances.</p>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-xs font-bold text-indigo-300">Step 2</p>
                <p className="text-xs text-white font-medium mt-0.5">Instant Check</p>
                <p className="text-[11px] text-slate-400 mt-1">Our smart calculation evaluates your debt and habits.</p>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <p className="text-xs font-bold text-indigo-300">Step 3</p>
                <p className="text-xs text-white font-medium mt-0.5">Clear Results & Tips</p>
                <p className="text-[11px] text-slate-400 mt-1">See if your credit is Good, Average, or Needs Work.</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('predict')}
              className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
            >
              <span>Check My Credit Score Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
