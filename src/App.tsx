/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, CreditScoreInput, PredictionRecord } from './types';
import { AuthProvider } from './services/auth';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Predictor } from './components/Predictor';
import { Dashboard } from './components/Dashboard';
import { PromptsViewer } from './components/PromptsViewer';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { AuthPages } from './components/AuthPages';

const STORAGE_RECORDS_KEY = 'creditscore_user_records';

const SAMPLE_INITIAL_RECORDS: PredictionRecord[] = [
  {
    id: 'rec_demo_1',
    timestamp: 'Today, 10:45 AM',
    inputs: {
      Monthly_Inhand_Salary: 5200,
      Total_EMI_per_month: 420,
      Outstanding_Debt: 1100,
      Credit_Utilization_Ratio: 22.4,
      Num_of_Delayed_Payment: 1,
      Monthly_Balance: 980,
      Num_Credit_Inquiries: 2,
      EMI_to_Income: 0.0807
    },
    result: {
      prediction: 2,
      probabilities: {
        '0': 0.12,
        '1': 0.28,
        '2': 0.60
      }
    },
    label: 'Good',
    scoreTier: 'Tier 2 · Good'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentInputs, setCurrentInputs] = useState<CreditScoreInput | undefined>(undefined);
  const [records, setRecords] = useState<PredictionRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_RECORDS_KEY);
      return stored ? JSON.parse(stored) : SAMPLE_INITIAL_RECORDS;
    } catch {
      return SAMPLE_INITIAL_RECORDS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_RECORDS_KEY, JSON.stringify(records));
    } catch {
      // Ignore storage quota
    }
  }, [records]);

  const handleSaveRecord = (newRecord: PredictionRecord) => {
    setRecords((prev) => [newRecord, ...prev.slice(0, 24)]);
  };

  const handleSelectPreset = (preset: CreditScoreInput) => {
    setCurrentInputs(preset);
  };

  const handleSelectRecord = (record: PredictionRecord) => {
    setCurrentInputs(record.inputs);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1">
          {activeTab === 'home' && (
            <Home
              setActiveTab={setActiveTab}
              onSelectPreset={(preset) => {
                handleSelectPreset(preset);
                setActiveTab('predict');
              }}
            />
          )}

          {activeTab === 'predict' && (
            <Predictor
              initialValues={currentInputs}
              onSaveRecord={handleSaveRecord}
              onViewDashboard={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard
              records={records}
              setActiveTab={setActiveTab}
              onSelectRecord={handleSelectRecord}
            />
          )}

          {activeTab === 'specs' && <PromptsViewer />}

          {activeTab === 'about' && <About setActiveTab={setActiveTab} />}

          {activeTab === 'contact' && <Contact />}

          {activeTab === 'signin' && (
            <AuthPages mode="signin" setActiveTab={setActiveTab} />
          )}

          {activeTab === 'signup' && (
            <AuthPages mode="signup" setActiveTab={setActiveTab} />
          )}
        </main>

        <Footer setActiveTab={setActiveTab} />
      </div>
    </AuthProvider>
  );
}
