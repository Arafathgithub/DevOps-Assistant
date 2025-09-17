
import { CloudProvider } from '../types';

export interface MonitoringMetrics {
  cpu: number;
  memory: number;
  networkIn: number;
  networkOut: number;
  activeServices: {
    count: number;
    list: { id: string, name: string, status: 'running' | 'degraded' | 'stopped' }[];
  };
}

const mockData: Record<CloudProvider, MonitoringMetrics> = {
  [CloudProvider.AWS]: {
    cpu: 76,
    memory: 62,
    networkIn: 128.5,
    networkOut: 45.2,
    activeServices: {
      count: 4,
      list: [
        { id: 'aws-1', name: 'EC2 Instance', status: 'running' },
        { id: 'aws-2', name: 'S3 Bucket', status: 'running' },
        { id: 'aws-3', name: 'RDS Database', status: 'running' },
        { id: 'aws-4', name: 'Lambda Function', status: 'degraded' },
      ],
    },
  },
  [CloudProvider.AZURE]: {
    cpu: 68,
    memory: 75,
    networkIn: 110.1,
    networkOut: 33.8,
    activeServices: {
      count: 3,
      list: [
        { id: 'azure-1', name: 'Virtual Machine', status: 'running' },
        { id: 'azure-2', name: 'Blob Storage', status: 'running' },
        { id: 'azure-3', name: 'SQL Database', status: 'stopped' },
      ],
    },
  },
  [CloudProvider.GCP]: {
    cpu: 55,
    memory: 58,
    networkIn: 95.7,
    networkOut: 50.1,
    activeServices: {
      count: 5,
      list: [
        { id: 'gcp-1', name: 'Compute Engine', status: 'running' },
        { id: 'gcp-2', name: 'Cloud Storage', status: 'running' },
        { id: 'gcp-3', name: 'Cloud SQL', status: 'running' },
        { id: 'gcp-4', name: 'Cloud Functions', status: 'running' },
        { id: 'gcp-5', name: 'BigQuery Dataset', status: 'degraded' },
      ],
    },
  },
};

// Function to get initial data
export const getInitialMetrics = (provider: CloudProvider): MonitoringMetrics => {
  // Return a deep copy to prevent mutation of the original mock data
  return JSON.parse(JSON.stringify(mockData[provider]));
};

// Function to simulate real-time updates
export const getUpdatedMetrics = (currentMetrics: MonitoringMetrics): MonitoringMetrics => {
  const updated = { ...currentMetrics };
  
  // Randomize CPU and Memory slightly
  updated.cpu = Math.max(10, Math.min(95, updated.cpu + (Math.random() - 0.5) * 5));
  updated.memory = Math.max(10, Math.min(95, updated.memory + (Math.random() - 0.5) * 5));

  // Randomize Network
  updated.networkIn = Math.max(20, updated.networkIn + (Math.random() - 0.5) * 10);
  updated.networkOut = Math.max(10, updated.networkOut + (Math.random() - 0.5) * 8);

  return {
    ...updated,
    cpu: parseFloat(updated.cpu.toFixed(1)),
    memory: parseFloat(updated.memory.toFixed(1)),
    networkIn: parseFloat(updated.networkIn.toFixed(1)),
    networkOut: parseFloat(updated.networkOut.toFixed(1)),
  };
};
