import React from 'react';
import { ActiveTab } from '../types';
import { ShieldCheck, Database, Layers, ArrowRight, HeartHandshake, CheckCircle } from 'lucide-react';

interface AboutProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const About: React.FC<AboutProps> = ({ setActiveTab }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Title */}
      <div>
        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
          How It Works
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">
          Understanding Your Credit Score
        </h1>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Learn how our scoring tool looks at your income, debt, and payment history to give you a clear, honest credit health check.
        </p>
      </div>

      {/* Origin & Categories */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">What We Compare Against</h2>
            <p className="text-xs text-slate-500">Based on thousands of real consumer financial habits</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Our tool compares your financial habits with standard credit benchmarks. Borrowers are grouped into three simple, easy-to-understand categories:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs font-bold text-rose-700 block">Needs Work</span>
            <p className="text-xs text-slate-500 mt-1">
              High credit card balances, multiple missed due dates, or little money left at the end of the month.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs font-bold text-blue-700 block">Average Credit</span>
            <p className="text-xs text-slate-500 mt-1">
              Normal payment habits with manageable debts and balanced monthly savings.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs font-bold text-emerald-700 block">Good Credit</span>
            <p className="text-xs text-slate-500 mt-1">
              Very low credit card usage, on-time bill payments, and strong savings habits.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Steps Journey */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Simple 4-Step Journey
          </span>
          <h2 className="text-xl font-bold mt-1">From Your Information to Clear Results</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <span className="text-indigo-400 font-bold block mb-1">1. Enter Details</span>
            <p className="text-slate-300 leading-relaxed">
              You provide 8 simple numbers regarding your salary, loan payments, and bills.
            </p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <span className="text-indigo-400 font-bold block mb-1">2. Secure Calculation</span>
            <p className="text-slate-300 leading-relaxed">
              Your numbers are safely processed without storing or selling personal details.
            </p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <span className="text-indigo-400 font-bold block mb-1">3. Benchmark Check</span>
            <p className="text-slate-300 leading-relaxed">
              We check your card usage, loan share, and payment records against healthy guidelines.
            </p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <span className="text-indigo-400 font-bold block mb-1">4. Easy-to-Read Report</span>
            <p className="text-slate-300 leading-relaxed">
              Get an instant rating, chances breakdown, and tips to improve your credit health.
            </p>
          </div>
        </div>
      </section>

      {/* Ethics & Fairness */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Fair & Unbiased for Everyone</h2>
            <p className="text-xs text-slate-500">We never look at personal demographics</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          We believe credit assessment must always be fair. Our scoring engine does not ask for or look at age, gender, race, or where you live. Your score is based only on your genuine ability to manage debt and pay your monthly bills on time.
        </p>

        <div className="pt-2">
          <button
            onClick={() => setActiveTab('predict')}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-2"
          >
            <span>Check My Credit Standing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
