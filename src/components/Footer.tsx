import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white font-mono text-xs">
                CS
              </div>
              <span>CreditScore<span className="text-indigo-600">.AI</span></span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              A simple and private way to check your credit health, see where you stand, and learn practical steps to improve your rating.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-3">Pages</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-slate-900 transition-colors">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('predict')} className="hover:text-slate-900 transition-colors">
                  Check Credit Score
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-slate-900 transition-colors">
                  Dashboard & History
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-slate-900 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-slate-900 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-3">Ratings & Standards</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <span className="text-slate-400">Ratings:</span> Good, Average, Needs Work
              </li>
              <li>
                <span className="text-slate-400">Questions:</span> 8 Simple Details
              </li>
              <li>
                <span className="text-slate-400">Privacy:</span> 100% Confidential
              </li>
              <li>
                <span className="text-slate-400">Speed:</span> Instant Calculation
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 tracking-wider uppercase mb-3">Our Promise</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              We never ask for your Social Security Number, and checking your score here will never hurt your credit file.
            </p>
            <div className="mt-3">
              <button 
                onClick={() => setActiveTab('contact')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Send Us a Question →
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 CreditScore.AI. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Fair & Unbiased</span>
            <span aria-hidden="true">·</span>
            <span>Private & Secure</span>
            <span aria-hidden="true">·</span>
            <button onClick={() => setActiveTab('contact')} className="hover:underline">Contact Support</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
