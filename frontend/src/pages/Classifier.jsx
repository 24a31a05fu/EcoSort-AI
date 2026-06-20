import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { UploadCloud, Sparkles, AlertTriangle, Cpu, Trash2, Recycle, Smile } from 'lucide-react';

export default function Classifier() {
  const { token, user, setUser, t } = useApp();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      processFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setResult(null); // Clear previous result
    };
    reader.readAsDataURL(selectedFile);
  };

  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await axios.post('/api/classify', formData, { headers });
      setResult(res.data);
      
      // Update global user stats if logged in
      if (res.data.savedToHistory && res.data.userStats && user) {
        setUser({
          ...user,
          points: res.data.userStats.points,
          level: res.data.userStats.level,
          badges: res.data.userStats.badges
        });
      }
    } catch (err) {
      alert('Error analyzing waste. Please ensure server is running.');
    } finally {
      setLoading(false);
    }
  };

  // UI styling variables based on category
  const getCategoryStyles = (category) => {
    switch (category) {
      case 'Recyclable Waste':
        return { color: 'blue', icon: Recycle, gradient: 'from-blue-500 to-blue-600' };
      case 'Wet Waste':
        return { color: 'green', icon: Smile, gradient: 'from-emerald-500 to-green-600' };
      case 'Dry Waste':
        return { color: 'slate', icon: Trash2, gradient: 'from-slate-500 to-slate-600' };
      case 'Hazardous Waste':
        return { color: 'red', icon: AlertTriangle, gradient: 'from-red-500 to-rose-600' };
      case 'E-Waste':
        return { color: 'orange', icon: Cpu, gradient: 'from-orange-500 to-amber-600' };
      default:
        return { color: 'emerald', icon: Smile, gradient: 'from-emerald-500 to-green-600' };
    }
  };

  const catStyles = result ? getCategoryStyles(result.category) : null;
  const CategoryIcon = catStyles ? catStyles.icon : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start fade-in">
      {/* Upload Column */}
      <div className="lg:col-span-7 space-y-6">
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/10">
          <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-800 dark:text-white mb-2">{t('classify_heading')}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{t('classify_desc')}</p>
          
          {/* Drag and Drop Box */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all bg-slate-50/50 dark:bg-slate-950/20 relative group ${
              isDragOver 
                ? 'border-emerald-500 bg-emerald-500/5' 
                : 'border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
            
            {!preview && !loading && (
              <div className="space-y-4" onClick={() => fileInputRef.current.click()}>
                <div className="inline-flex p-4 bg-emerald-500/10 rounded-2xl text-emerald-500 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('drag_drop_text')}</p>
                  <p class="text-xs text-slate-400 mt-1">{t('or_text')}</p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-500/10 cursor-pointer">
                  {t('browse_btn')}
                </button>
              </div>
            )}
            
            {/* Preview container */}
            {preview && !loading && (
              <div className="flex flex-col items-center space-y-4">
                <img 
                  src={preview} 
                  alt="Upload Preview" 
                  className="max-h-64 rounded-xl object-contain shadow-md border border-slate-200 dark:border-slate-800"
                />
                <div className="flex space-x-2">
                  <button 
                    onClick={resetUpload} 
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    Remove
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-emerald-500/15 cursor-pointer"
                  >
                    Analyze Waste
                  </button>
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="py-8 space-y-4">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('scanning_text')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prediction & disposal guide column */}
      <div className="lg:col-span-5">
        {result ? (
          <div className="glass-card rounded-3xl p-6 border border-emerald-500/10 space-y-6 fade-in">
            {/* Header Prediction Info */}
            <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2
                ${result.category === 'Recyclable Waste' ? 'bg-blue-500/10 text-blue-500' : ''}
                ${result.category === 'Wet Waste' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                ${result.category === 'Dry Waste' ? 'bg-slate-500/10 text-slate-500' : ''}
                ${result.category === 'Hazardous Waste' ? 'bg-red-500/10 text-red-500' : ''}
                ${result.category === 'E-Waste' ? 'bg-orange-500/10 text-orange-500' : ''}
              `}>
                {result.category}
              </span>
              <h3 className="text-2xl font-bold font-outfit text-slate-800 dark:text-white">{result.itemName}</h3>
              <p className="text-xs text-slate-400 mt-1">{t('confidence')}: {(result.confidence * 100).toFixed(0)}%</p>
            </div>

            {/* Stats Gained */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">{t('points_earned')}</p>
                <p className="text-xl font-extrabold text-emerald-600 font-outfit">+{result.pointsEarned} GP</p>
              </div>
              <div className="p-3 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">{t('carbon_saved')}</p>
                <p className="text-xl font-extrabold text-emerald-600 font-outfit">{result.carbonSaved} kg</p>
              </div>
            </div>

            {/* Bin Color indicator */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/30 rounded-2xl flex items-center space-x-4 border border-slate-100 dark:border-slate-800">
              <div className={`w-12 h-16 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-md relative
                ${result.category === 'Recyclable Waste' ? 'bg-blue-500' : ''}
                ${result.category === 'Wet Waste' ? 'bg-emerald-500' : ''}
                ${result.category === 'Dry Waste' ? 'bg-slate-500' : ''}
                ${result.category === 'Hazardous Waste' ? 'bg-red-500' : ''}
                ${result.category === 'E-Waste' ? 'bg-orange-500' : ''}
              `}>
                <span className="absolute top-2 w-6 h-1 bg-white/20 rounded-full"></span>
                <span className="absolute bottom-2 w-8 h-1 bg-white/10 rounded-full"></span>
                ♻️
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">{t('bin_color')}</h4>
                <p className={`text-base font-extrabold 
                  ${result.category === 'Recyclable Waste' ? 'text-blue-500' : ''}
                  ${result.category === 'Wet Waste' ? 'text-emerald-500' : ''}
                  ${result.category === 'Dry Waste' ? 'text-slate-500' : ''}
                  ${result.category === 'Hazardous Waste' ? 'text-red-500' : ''}
                  ${result.category === 'E-Waste' ? 'text-orange-500' : ''}
                `}>
                  {result.binColor}
                </p>
              </div>
            </div>

            {/* Disposal Guidance */}
            <div className="space-y-4 text-left">
              <h4 className="text-base font-bold font-outfit text-slate-800 dark:text-white flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                {CategoryIcon && <CategoryIcon className="w-5 h-5 text-emerald-500" />}
                <span>{t('disposal_guide')}</span>
              </h4>
              
              <div className="space-y-2">
                <p className="text-sm">
                  <strong className="text-slate-700 dark:text-slate-200 block mb-0.5">{t('instructions_title')}</strong>
                  <span className="text-slate-500 dark:text-slate-400">{result.instructions}</span>
                </p>
                <p className="text-sm">
                  <strong className="text-slate-700 dark:text-slate-200 block mb-0.5">{t('suggestions_title')}</strong>
                  <span className="text-slate-500 dark:text-slate-400">{result.suggestions}</span>
                </p>
                <p className="text-sm">
                  <strong className="text-slate-700 dark:text-slate-200 block mb-0.5">{t('impact_title')}</strong>
                  <span className="text-slate-500 dark:text-slate-400">{result.environmentalImpact}</span>
                </p>
              </div>
            </div>
            
            {!token && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-600 dark:text-amber-400 text-center">
                <strong>Eco-Tip:</strong> Log in to save this scan to your profile and build your leaderboard position!
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/10 text-center py-16 text-slate-400 dark:text-slate-500">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-slate-300 dark:text-slate-800" />
            <p className="text-sm">Scan an image of waste to see classification, guidance, carbon offset, and earn Green Points.</p>
          </div>
        )}
      </div>
    </div>
  );
}
