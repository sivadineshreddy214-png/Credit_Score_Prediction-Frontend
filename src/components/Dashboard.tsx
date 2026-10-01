import React, { useState } from 'react';
import { PredictionRecord, ActiveTab } from '../types';
import { useAuth } from '../services/auth';
import { 
  Home, 
  Calculator, 
  Info, 
  Mail, 
  UserCircle, 
  LogOut, 
  LogIn, 
  History, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface DashboardProps {
  records: PredictionRecord[];
  setActiveTab: (tab: ActiveTab) => void;
  onSelectRecord?: (record: PredictionRecord) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  records,
  setActiveTab,
  onSelectRecord
}) => {
  const { user, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<'overview' | 'profile'>('overview');
  const [isReduced, setIsReduced] = useState<boolean>(false);

  const latestRecord = records[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Side Navigation Bar (Extend & Reduce) */}
        <aside 
          className={`${
            isReduced ? 'lg:w-20' : 'lg:w-64 xl:w-72'
          } w-full bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xs transition-all duration-300 shrink-0`}
        >
          {/* Header & Extend/Reduce Toggle */}
          {isReduced ? (
            <div className="flex flex-col items-center pb-3 mb-3 border-b border-slate-100 gap-2">
              <button
                onClick={() => setIsReduced(false)}
                title="Extend sidebar menu"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors shadow-2xs"
                aria-label="Extend sidebar"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
              <div 
                className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs"
                title={user ? user.name : 'Guest User'}
              >
                {user ? user.name.slice(0, 2).toUpperCase() : 'G'}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 px-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs shrink-0">
                  {user ? user.name.slice(0, 2).toUpperCase() : 'G'}
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {user ? user.name : 'Guest User'}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {user ? user.email : 'Not signed in'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsReduced(true)}
                title="Reduce sidebar menu"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
                aria-label="Reduce sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>
          )}

          {!isReduced && (
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Navigation
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1">
            {/* 1. Home Page */}
            <button
              onClick={() => setActiveTab('home')}
              title="Home Page"
              className={`w-full flex items-center ${
                isReduced ? 'justify-center p-2.5' : 'justify-start gap-3 px-3 py-2.5'
              } rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left`}
            >
              <Home className="w-4 h-4 text-slate-500 shrink-0" />
              {!isReduced && <span className="truncate">Home Page</span>}
            </button>

            {/* 2. Credit Score Prediction */}
            <button
              onClick={() => setActiveTab('predict')}
              title="Credit Score Prediction"
              className={`w-full flex items-center ${
                isReduced ? 'justify-center p-2.5' : 'justify-start gap-3 px-3 py-2.5'
              } rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left`}
            >
              <Calculator className="w-4 h-4 text-slate-500 shrink-0" />
              {!isReduced && <span className="truncate">Credit Score Prediction</span>}
            </button>

            {/* 3. About */}
            <button
              onClick={() => setActiveTab('about')}
              title="About"
              className={`w-full flex items-center ${
                isReduced ? 'justify-center p-2.5' : 'justify-start gap-3 px-3 py-2.5'
              } rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left`}
            >
              <Info className="w-4 h-4 text-slate-500 shrink-0" />
              {!isReduced && <span className="truncate">About</span>}
            </button>

            {/* 4. Contact Us */}
            <button
              onClick={() => setActiveTab('contact')}
              title="Contact Us"
              className={`w-full flex items-center ${
                isReduced ? 'justify-center p-2.5' : 'justify-start gap-3 px-3 py-2.5'
              } rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left`}
            >
              <Mail className="w-4 h-4 text-slate-500 shrink-0" />
              {!isReduced && <span className="truncate">Contact Us</span>}
            </button>

            {/* Divider */}
            <div className="pt-2 pb-1 border-t border-slate-100 my-2">
              {!isReduced && (
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                  Account & Overview
                </span>
              )}
            </div>

            {/* Credit History & Overview */}
            <button
              onClick={() => setCurrentView('overview')}
              title="Credit History & Overview"
              className={`w-full flex items-center ${
                isReduced ? 'justify-center p-2.5' : 'justify-start gap-3 px-3 py-2.5'
              } rounded-xl text-xs font-semibold transition-colors text-left ${
                currentView === 'overview'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <History className="w-4 h-4 text-indigo-600 shrink-0" />
              {!isReduced && <span className="truncate">Credit History & Overview</span>}
            </button>

            {/* 5. Profile */}
            <button
              onClick={() => {
                if (!user) {
                  setActiveTab('signin');
                } else {
                  setCurrentView('profile');
                }
              }}
              title="Profile"
              className={`w-full flex items-center ${
                isReduced ? 'justify-center p-2.5' : 'justify-start gap-3 px-3 py-2.5'
              } rounded-xl text-xs font-semibold transition-colors text-left ${
                currentView === 'profile'
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <UserCircle className="w-4 h-4 text-slate-500 shrink-0" />
              {!isReduced && <span className="truncate">Profile</span>}
            </button>

            {/* 6. Login / Logout */}
            <div className="pt-2 border-t border-slate-100 mt-2">
              {user ? (
                <button
                  onClick={() => signOut()}
                  title="Logout"
                  className={`w-full flex items-center ${
                    isReduced ? 'justify-center p-2.5' : 'justify-start gap-3 px-3 py-2.5'
                  } rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left`}
                >
                  <LogOut className="w-4 h-4 text-rose-500 shrink-0" />
                  {!isReduced && <span className="truncate">Logout</span>}
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('signin')}
                  title="Login"
                  className={`w-full flex items-center ${
                    isReduced ? 'justify-center p-2.5' : 'justify-start gap-3 px-3 py-2.5'
                  } rounded-xl text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors text-left`}
                >
                  <LogIn className="w-4 h-4 text-indigo-600 shrink-0" />
                  {!isReduced && <span className="truncate">Login</span>}
                </button>
              )}
            </div>
          </nav>

          {/* Quick Footer Extend/Reduce Toggle Pill */}
          <div className="pt-3 mt-3 border-t border-slate-100">
            <button
              onClick={() => setIsReduced(!isReduced)}
              title={isReduced ? 'Extend sidebar menu' : 'Reduce sidebar menu'}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              {isReduced ? (
                <ChevronRight className="w-4 h-4 text-slate-500" />
              ) : (
                <>
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reduce Menu</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 min-w-0 w-full space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {currentView === 'profile' ? 'My Profile' : 'Credit Overview & Past Checks'}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentView === 'profile'
                  ? 'Review your account details and security settings'
                  : 'See how your credit standing is tracking and view past reports'}
              </p>
            </div>

            <button
              onClick={() => setActiveTab('predict')}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-2 shadow-2xs self-start sm:self-auto"
            >
              <Calculator className="w-4 h-4" />
              <span>Check Credit Score Now</span>
            </button>
          </div>

          {/* VIEW 1: Overview and Recent Checks */}
          {currentView === 'overview' && (
            <div className="space-y-6">
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <span className="text-xs font-semibold text-slate-500">Credit Checks Done</span>
                  <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                    {records.length}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">Saved on your device</p>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <span className="text-xs font-semibold text-slate-500">Latest Standing</span>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {latestRecord ? (
                      latestRecord.result.prediction === 2 ? 'Good Credit' :
                      latestRecord.result.prediction === 1 ? 'Average Credit' : 'Needs Work'
                    ) : 'No Data'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {latestRecord ? 'Based on latest financial details' : 'Run a check to see results'}
                  </p>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <span className="text-xs font-semibold text-slate-500">Card Utilization</span>
                  <p className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                    {latestRecord ? `${latestRecord.inputs.Credit_Utilization_Ratio}%` : 'N/A'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {latestRecord ? (
                      latestRecord.inputs.Credit_Utilization_Ratio <= 30
                        ? 'Healthy usage (under 30%)'
                        : 'High usage (try to lower)'
                    ) : 'Recommended: under 30%'}
                  </p>
                </div>
              </div>

              {/* Table of past checks */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-400" />
                    <h3 className="text-sm font-bold text-slate-900">Past Credit Assessments</h3>
                  </div>
                  <span className="text-xs text-slate-400">Total: {records.length}</span>
                </div>

                {records.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-xs text-slate-500 mb-4">You have not checked any credit scores yet.</p>
                    <button
                      onClick={() => setActiveTab('predict')}
                      className="px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    >
                      Check Your Credit Score →
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                          <th className="py-2.5 px-3">Date & Time</th>
                          <th className="py-2.5 px-3">Result</th>
                          <th className="py-2.5 px-3">Poor Chance</th>
                          <th className="py-2.5 px-3">Average Chance</th>
                          <th className="py-2.5 px-3">Good Chance</th>
                          <th className="py-2.5 px-3">Monthly Income</th>
                          <th className="py-2.5 px-3">Card Usage</th>
                          <th className="py-2.5 px-3 text-right">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {records.map((rec) => (
                          <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                              {rec.timestamp}
                            </td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                                rec.result.prediction === 2
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : rec.result.prediction === 1
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}>
                                {rec.result.prediction === 2 ? 'Good' : rec.result.prediction === 1 ? 'Average' : 'Needs Work'}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-mono tabular-nums text-slate-600">
                              {Math.round(rec.result.probabilities['0'] * 100)}%
                            </td>
                            <td className="py-3 px-3 font-mono tabular-nums text-slate-600">
                              {Math.round(rec.result.probabilities['1'] * 100)}%
                            </td>
                            <td className="py-3 px-3 font-mono tabular-nums text-slate-600">
                              {Math.round(rec.result.probabilities['2'] * 100)}%
                            </td>
                            <td className="py-3 px-3 font-mono tabular-nums text-slate-700">
                              ${rec.inputs.Monthly_Inhand_Salary.toLocaleString()}
                            </td>
                            <td className="py-3 px-3 font-mono tabular-nums text-slate-700">
                              {rec.inputs.Credit_Utilization_Ratio}%
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                onClick={() => {
                                  if (onSelectRecord) onSelectRecord(rec);
                                  setActiveTab('predict');
                                }}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                              >
                                View Report →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Tips for Better Score */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Simple Tips to Improve Your Credit Score
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-1">1. Keep Card Usage Low</strong>
                    Aim to use less than 30% of your total credit limit on each card.
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-1">2. Pay On Time Always</strong>
                    Set up automatic bill pay so you never miss a monthly installment.
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <strong className="text-slate-900 block mb-1">3. Limit New Applications</strong>
                    Avoid applying for multiple credit cards or loans in a short timeframe.
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* VIEW 2: Profile */}
          {currentView === 'profile' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              {user ? (
                <>
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <span className="inline-block mt-1 text-[11px] px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded-full border border-emerald-200">
                        Active Account
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block mb-1 font-semibold">Account ID</span>
                      <span className="font-mono text-slate-800">{user.id}</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block mb-1 font-semibold">Sign-In Method</span>
                      <span className="text-slate-800 capitalize font-medium">{user.provider}</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block mb-1 font-semibold">Member Since</span>
                      <span className="text-slate-800">
                        {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block mb-1 font-semibold">Saved Reports</span>
                      <span className="text-slate-800 font-mono font-bold">{records.length} records</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
                    <button
                      onClick={() => signOut()}
                      className="px-4 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                    >
                      Sign Out of Account
                    </button>
                    <button
                      onClick={() => setActiveTab('predict')}
                      className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Check Credit Score
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <UserCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-900">Sign in to view your profile</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4">
                    Create an account or log in to manage your saved credit checks and personalized settings.
                  </p>
                  <button
                    onClick={() => setActiveTab('signin')}
                    className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    Log In Now
                  </button>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
