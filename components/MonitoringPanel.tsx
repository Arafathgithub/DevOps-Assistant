
import React, { useState, useEffect } from 'react';
import { CloudProvider } from '../types';
import { getInitialMetrics, getUpdatedMetrics, MonitoringMetrics } from '../services/mockMonitoringService';

// Reusable component for metric cards
const MetricCard: React.FC<{ title: string; value: string | number; unit: string; color: string }> = ({ title, value, unit, color }) => (
  <div className="bg-slate-800 p-4 rounded-lg">
    <p className="text-sm text-slate-400">{title}</p>
    <p className="text-2xl font-bold text-white">
      <span className={color}>{value}</span>
      <span className="text-lg text-slate-500 ml-1">{unit}</span>
    </p>
  </div>
);

// Reusable component for progress bars
const ProgressBar: React.FC<{ label: string; percentage: number; color: string }> = ({ label, percentage, color }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <span className="text-sm font-medium text-slate-400">{percentage.toFixed(1)}%</span>
    </div>
    <div className="w-full bg-slate-700 rounded-full h-2.5">
      <div className={`${color} h-2.5 rounded-full transition-all duration-500 ease-out`} style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

// Status indicator for services
const StatusIndicator: React.FC<{ status: 'running' | 'degraded' | 'stopped' }> = ({ status }) => {
  const statusConfig = {
    running: { color: 'bg-green-500', text: 'Running' },
    degraded: { color: 'bg-amber-500', text: 'Degraded' },
    stopped: { color: 'bg-red-500', text: 'Stopped' },
  };
  const config = statusConfig[status];
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${config.color}`}></span>
      <span className="text-slate-400 text-sm">{config.text}</span>
    </div>
  );
};


export const MonitoringPanel: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<CloudProvider>(CloudProvider.AWS);
  const [metrics, setMetrics] = useState<MonitoringMetrics | null>(null);

  useEffect(() => {
    // Set initial data for the selected provider
    setMetrics(getInitialMetrics(selectedProvider));

    // Set up an interval for real-time updates
    const interval = setInterval(() => {
      setMetrics(prevMetrics => {
        if (!prevMetrics) return null;
        return getUpdatedMetrics(prevMetrics);
      });
    }, 2000); // Update every 2 seconds

    // Cleanup interval on component unmount or provider change
    return () => clearInterval(interval);
  }, [selectedProvider]);

  const ProviderButton: React.FC<{ provider: CloudProvider }> = ({ provider }) => (
    <button
      onClick={() => setSelectedProvider(provider)}
      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
        selectedProvider === provider
          ? 'bg-sky-600 text-white'
          : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
      }`}
    >
      {provider}
    </button>
  );

  if (!metrics) {
    return (
      <div className="bg-slate-900/70 backdrop-blur-sm p-6 rounded-lg border border-slate-700 flex items-center justify-center h-full">
        <p className="text-slate-500">Loading metrics...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/70 backdrop-blur-sm p-6 rounded-lg border border-slate-700 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-100">Infrastructure Health</h3>
        <div className="flex items-center gap-2 p-1 bg-slate-800 rounded-lg">
          <ProviderButton provider={CloudProvider.AWS} />
          <ProviderButton provider={CloudProvider.AZURE} />
          <ProviderButton provider={CloudProvider.GCP} />
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <ProgressBar label="CPU Utilization" percentage={metrics.cpu} color="bg-sky-500" />
        <ProgressBar label="Memory Usage" percentage={metrics.memory} color="bg-indigo-500" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <MetricCard title="Network In" value={metrics.networkIn} unit="Mbps" color="text-emerald-400" />
        <MetricCard title="Network Out" value={metrics.networkOut} unit="Mbps" color="text-amber-400" />
      </div>

      <div>
        <h4 className="text-lg font-semibold text-slate-200 mb-3">
            Active Services ({metrics.activeServices.count})
        </h4>
        <div className="space-y-2 bg-slate-800/50 p-3 rounded-lg max-h-40 overflow-y-auto">
          {metrics.activeServices.list.map(service => (
            <div key={service.id} className="flex justify-between items-center">
              <span className="text-slate-300 font-medium">{service.name}</span>
              <StatusIndicator status={service.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
