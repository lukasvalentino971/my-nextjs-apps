'use client';

import MasterLayout from '@/components/MasterLayout';

export default function DashboardPage() {
  return (
    <MasterLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Welcome to your Dashboard!
            </h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Recent Activity</h3>
                <p className="text-blue-900">No recent activity</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800 mb-2">Statistics</h3>
                <p className="text-green-900">Coming soon</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800 mb-2">Quick Actions</h3>
                <p className="text-purple-900">Available soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
}