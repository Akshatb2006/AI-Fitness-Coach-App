import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useSpeech } from './hooks/useSpeech';
import fitnessAPI from './services/api';
import { INITIAL_USER_DATA } from './utils/constants';

import { Header } from './components/Header';
import { Welcome } from './components/steps/Welcome';
import { BasicInfo } from './components/steps/BasicInfo';
import { FitnessGoals } from './components/steps/FitnessGoals';
import { DietHealth } from './components/steps/DietHealth';
import { PlanDisplay } from './components/steps/PlanDisplay';
import { Loading } from './components/common/Loading';
import { ImageModal } from './components/ImageModal';

const FitnessApp = () => {
  const { theme } = useTheme();
  const { speaking, speak, stop } = useSpeech();

  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState(INITIAL_USER_DATA);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [loadingStages, setLoadingStages] = useState([
    { label: 'Generating Workout Plan...', active: false, done: false },
    { label: 'Creating Diet Plan...', active: false, done: false },
    { label: 'Preparing Tips...', active: false, done: false },
    { label: 'Finding Motivation...', active: false, done: false }
  ]);

  const [imageModal, setImageModal] = useState({
    isOpen: false,
    item: null,
    imageUrl: null,
    loading: false
  });

  const updateUser = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const hasSavedPlan = () => {
    return !!localStorage.getItem('fitnessPlan');
  };

  const loadSavedPlan = () => {
    const saved = localStorage.getItem('fitnessPlan');
    if (saved) {
      const { userData: u, plan: p } = JSON.parse(saved);
      setUserData(u);
      setPlan(p);
      setStep(4);
    }
  };

  const savePlan = () => {
    localStorage.setItem('fitnessPlan', JSON.stringify({
      userData,
      plan,
      savedAt: new Date().toISOString()
    }));
    alert('Plan saved successfully!');
  };

  const generatePlan = async () => {
    setLoading(true);
    setStep(4);

    const stages = [...loadingStages];
    
    for (let i = 0; i < stages.length; i++) {
      stages[i].active = true;
      setLoadingStages([...stages]);
      await new Promise(r => setTimeout(r, 800));
      stages[i].active = false;
      stages[i].done = true;
      setLoadingStages([...stages]);
    }

    try {
      const result = await fitnessAPI.generatePlan(userData);
      setPlan(result);
    } catch (error) {
      console.error('Error generating plan:', error);
      alert('Failed to generate plan. Please try again.');
      setStep(3);
    } finally {
      setLoading(false);
      setLoadingStages(stages.map(s => ({ ...s, active: false, done: false })));
    }
  };

  const handleExportPDF = async () => {
    setExportLoading(true);
    try {
      const blob = await fitnessAPI.exportPDF(userData, plan);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fitness-plan-${userData.name || 'user'}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      const content = `AI FITNESS COACH PLAN\n\nGenerated for: ${userData.name}\n\n${JSON.stringify(plan, null, 2)}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fitness-plan-${userData.name || 'user'}.txt`;
      a.click();
    } finally {
      setExportLoading(false);
    }
  };

  const handleImageGeneration = async (name, type) => {
    setImageModal({ isOpen: true, item: { name, type }, imageUrl: null, loading: true });

    try {
      const result = await fitnessAPI.generateImage(name, type);
      setImageModal(prev => ({ ...prev, imageUrl: result.imageUrl, loading: false }));
    } catch (error) {
      console.error('Image generation error:', error);
      const seed = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
      const fallbackUrl = `https://picsum.photos/seed/${seed}/400/300`;
      setImageModal(prev => ({ ...prev, imageUrl: fallbackUrl, loading: false }));
    }
  };

  const closeImageModal = () => {
    setImageModal({ isOpen: false, item: null, imageUrl: null, loading: false });
  };

  const startOver = () => {
    stop();
    setStep(0);
    setPlan(null);
    setUserData(INITIAL_USER_DATA);
  };

  const renderStep = () => {
    if (step === 4 && loading) {
      return <Loading stages={loadingStages} />;
    }

    switch (step) {
      case 0:
        return (
          <Welcome
            onNext={() => setStep(1)}
            onLoadSaved={loadSavedPlan}
            hasSavedPlan={hasSavedPlan()}
          />
        );
      case 1:
        return (
          <BasicInfo
            userData={userData}
            updateUser={updateUser}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        );
      case 2:
        return (
          <FitnessGoals
            userData={userData}
            updateUser={updateUser}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        );
      case 3:
        return (
          <DietHealth
            userData={userData}
            updateUser={updateUser}
            onBack={() => setStep(2)}
            onGenerate={generatePlan}
            loading={loading}
          />
        );
      case 4:
        return (
          <PlanDisplay
            plan={plan}
            speaking={speaking}
            onSpeak={speak}
            onExportPDF={handleExportPDF}
            onSave={savePlan}
            onRegenerate={generatePlan}
            onStartOver={startOver}
            onExerciseClick={(name) => handleImageGeneration(name, 'exercise')}
            onMealClick={(name) => handleImageGeneration(name, 'food')}
            exportLoading={exportLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        {renderStep()}
      </main>
      <ImageModal
        isOpen={imageModal.isOpen}
        onClose={closeImageModal}
        item={imageModal.item}
        imageUrl={imageModal.imageUrl}
        loading={imageModal.loading}
      />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <FitnessApp />
  </ThemeProvider>
);

export default App;
