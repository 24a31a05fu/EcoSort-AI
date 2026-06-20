import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Download, Loader2 } from 'lucide-react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';

export default function Dashboard() {
  const { token, t } = useApp();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get('/api/report/export', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const contentType = res.headers['content-type'];
      const ext = contentType.includes('pdf') ? 'pdf' : 'html';

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `ecosort_sustainability_report.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Report generation failed.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        <p className="text-sm font-medium text-slate-500">Loading your statistics...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p>Could not retrieve dashboard statistics. Ensure Flask server is running.</p>
      </div>
    );
  }

  const { stats, categoryChartData, timelineChartData, recentHistory } = data;

  return (
    <div className="space-y-8 fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-extrabold font-outfit text-slate-800 dark:text-white">{t('dashboard_title')}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('dashboard_desc')}</p>
        </div>
        <div>
          <button 
            onClick={handleExport} 
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/10 transition-all text-sm flex items-center space-x-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t('export_btn')}</span>
          </button>
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/10 text-center">
          <p className="text-3xl font-extrabold text-emerald-600 font-outfit">{stats.totalScans}</p>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">{t('total_scans')}</p>
        </div>
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/10 text-center">
          <p className="text-3xl font-extrabold text-emerald-600 font-outfit">{stats.recyclableCount}</p>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">{t('recyclables_logged')}</p>
        </div>
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/10 text-center">
          <p className="text-3xl font-extrabold text-emerald-600 font-outfit">{stats.hazardousCount}</p>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">{t('hazardous_logged')}</p>
        </div>
        <div className="glass-card rounded-2xl p-6 border border-emerald-500/10 text-center relative overflow-hidden">
          <p className="text-3xl font-extrabold text-emerald-600 font-outfit">{stats.sustainabilityScore}/100</p>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mt-1">{t('sustainability_score')}</p>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500" style={{ width: `${stats.sustainabilityScore}%` }}></div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Waste Segregation Categories */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-emerald-500/10 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-outfit text-slate-800 dark:text-white mb-4">{t('chart_category_title')}</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryChartData.filter(c => c.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value} items`, props.payload.name]} />
                  <Legend verticalAlign="bottom" height={36} iconSize={10} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Timeline Bar Chart */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-emerald-500/10 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-outfit text-slate-800 dark:text-white mb-4">{t('chart_timeline_title')}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timelineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                  <Tooltip />
                  <Legend iconSize={10} />
                  <Bar dataKey="scans" name="Scans Handled" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="carbon" name="Carbon Saved (kg)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Log History Table */}
      <div className="glass-card rounded-3xl p-6 border border-emerald-500/10 overflow-hidden">
        <h3 className="text-xl font-bold font-outfit text-slate-800 dark:text-white mb-4">{t('history_title')}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr class="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold">
                <th class="py-3 px-4">Item Name</th>
                <th class="py-3 px-4">Category</th>
                <th class="py-3 px-4">Confidence</th>
                <th class="py-3 px-4 text-center">Carbon Offset</th>
                <th class="py-3 px-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/50">
              {recentHistory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-slate-400 dark:text-slate-600">
                    No waste items scanned yet. Head over to Waste AI to test the classifier.
                  </td>
                </tr>
              ) : (
                recentHistory.map((log) => {
                  let badgeColor = 'slate';
                  if (log.category === 'Recyclable Waste') badgeColor = 'blue';
                  else if (log.category === 'Wet Waste') badgeColor = 'green';
                  else if (log.category === 'Hazardous Waste') badgeColor = 'red';
                  else if (log.category === 'E-Waste') badgeColor = 'orange';

                  return (
                    <tr key={log.id} className="hover:bg-slate-500/5 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-700 dark:text-slate-200">{log.item_name}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest
                          ${badgeColor === 'blue' ? 'bg-blue-500/10 text-blue-500' : ''}
                          ${badgeColor === 'green' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                          ${badgeColor === 'slate' ? 'bg-slate-500/10 text-slate-500' : ''}
                          ${badgeColor === 'red' ? 'bg-red-500/10 text-red-500' : ''}
                          ${badgeColor === 'orange' ? 'bg-orange-500/10 text-orange-500' : ''}
                        `}>
                          {log.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-400">{(log.confidence * 100).toFixed(0)}%</td>
                      <td className="py-4 px-4 text-center text-emerald-500 font-semibold">{log.carbon_saved.toFixed(2)} kg</td>
                      <td className="py-4 px-4 text-right text-emerald-500 font-bold font-outfit">+{log.points_earned} GP</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
