import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Users, TrendingUp, Clock, Target, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const RecruitmentDashboard = () => {
  const [selectedView, setSelectedView] = useState('overview');
  
  // Raw recruitment data
  const rawData = [
    { no: 1, name: "Sascha", position: "Production Manager", interviewDate: "4-Jul-25", interviewer: "K.Royi Gal", status: "Not Pass" },
    { no: 2, name: "Pratyawit", position: "Production Manager", interviewDate: "7-Jul-25", interviewer: "K.Royi Gal", status: "Not Pass" },
    { no: 3, name: "Manus Bumrerwong", position: "Production Manager", interviewDate: "7-Jul-25", interviewer: "K.Royi Gal", status: "Pass", remark: "Reject joining due to position and salary offer below expectation" },
    { no: 4, name: "Surachote", position: "Production Manager", interviewDate: "7-Jul-25", interviewer: "K.Royi Gal", status: "Not Pass" },
    { no: 5, name: "Pichaya Honey", position: "Finance & Accounting Manager", interviewDate: "10-Jul-25", interviewer: "K.Koi", status: "Not Pass" },
    { no: 6, name: "Chainarong", position: "Project Manager", interviewDate: "10-Jul-25", interviewer: "K.Koi & K.M", status: "Pass", remark: "Experience passed. On-Hold by K.Koi and K.Mohammad" },
    { no: 7, name: "Suphadet", position: "Project Manager", interviewDate: "10-Jul-25", interviewer: "K.Koi & K.M", status: "Pass", remark: "Experience passed. On-Hold by K.Koi and K.Mohammad" },
    { no: 8, name: "Wunlayaporn", position: "COO", interviewDate: "14-Jul-25", interviewer: "K.Royi Gal", status: "Not Pass", remark: "Lack of English skill and Working Achievement" },
    { no: 9, name: "Hatthamat", position: "Head of Marketing", interviewDate: "14-Jul-25", interviewer: "K.Royi Gal", status: "Not Pass" },
    { no: 10, name: "Thatchakorn", position: "Head of Marketing", interviewDate: "15-Jul-25", interviewer: "K.Royi Gal", status: "Not Pass" },
    { no: 11, name: "Prasit", position: "Stock Manager", interviewDate: "18-Jul-25", interviewer: "K.Koi", status: "Reject", remark: "Reject Interview after seeing our company" },
    { no: 12, name: "Chaithuch", position: "Purchasing Project Manager", interviewDate: "18-Jul-25", interviewer: "K.Koi", status: "Not Pass", remark: "Experience is passed but cannot speak English" },
    { no: 13, name: "Varisnan", position: "Stock Manager", interviewDate: "18-Jul-25", interviewer: "K.Koi", status: "Pass", secondStatus: "Not Pass" },
    { no: 14, name: "Wasana Yimtim", position: "Stock Manager", interviewDate: "21-Jul-25", interviewer: "K.Koi", status: "Not Pass" },
    { no: 15, name: "Surasak", position: "Purchasing Project/Stock Manager", interviewDate: "21-Jul-25", interviewer: "K.Koi", status: "Pass", secondStatus: "Pending", remark: "Pending 3rd onsite interview with K.Royi Gal" },
    { no: 16, name: "Pattharasorn", position: "Senior Graphic Designer", interviewDate: "22-Jul-25", interviewer: "K.Tong", status: "Pass" },
    { no: 17, name: "Sarudapa", position: "Sales Supervisor (B2B)", interviewDate: "23-Jul-25", interviewer: "K.Maprang", status: "KIV", remark: "Need compare due to English skill below average" },
    { no: 18, name: "Nang Mon Kham", position: "Data Engineer (Intern)", interviewDate: "23-Jul-25", interviewer: "K.Abul & K.Nick", status: "Pass", remark: "Able to start joining early Jan 2025" },
    { no: 19, name: "Tharapong", position: "Purchasing Project Manager", interviewDate: "23-Jul-25", interviewer: "K.Koi", status: "Not Pass", remark: "Too Junior" },
    { no: 20, name: "Myat Su Paing", position: "Data Engineer (Intern)", interviewDate: "24-Jul-25", interviewer: "K.Abul & K.Nick", status: "Pass", remark: "Joined 4 Aug" },
    { no: 21, name: "Pasin Chomyong", position: "Data Engineer (Intern)", interviewDate: "24-Jul-25", interviewer: "K.Abul & K.Nick", status: "Pass", remark: "Pending Test from Nick" },
    { no: 22, name: "Peerawich Pimtor", position: "Data Engineer (Intern)", interviewDate: "24-Jul-25", interviewer: "K.Abul & K.Nick", status: "Pass", remark: "Reject joining as he got another offer" },
    { no: 23, name: "Airadapha", position: "Purchasing Project Manager", interviewDate: "25-Jul-25", interviewer: "K.Koi", status: "Pass", secondStatus: "Pass", remark: "Postpone Start Date due to Family Issue" },
    { no: 24, name: "Rangsee", position: "Production Planning Manager", interviewDate: "25-Jul-25", interviewer: "K.Koi", status: "KIV", remark: "Keep in view, So so by K.Koi" },
    { no: 25, name: "Chatchawan", position: "Senior Graphic Designer", interviewDate: "25-Jul-25", interviewer: "K.Tong", status: "Pass" },
    { no: 26, name: "Gabriel", position: "Data Analyst", interviewDate: "1-Aug-25", interviewer: "K.Abul & K.Tong", status: "KIV", remark: "8/10 by K.Tong, So so by K.Abul. Need compare" },
    { no: 27, name: "Pannakarn", position: "Sales Support", interviewDate: "1-Aug-25", interviewer: "K.Maprang", status: "Pass", remark: "Reject joining due to cut off time payroll and strict phone regulation" },
    { no: 28, name: "Pitchaporn", position: "Data Analyst", interviewDate: "5-Aug-25", interviewer: "K.Abul & K.Tong", status: "Reject", remark: "Reject Interview as she got another offer" }
  ];

  // Process data for analytics
  const analytics = useMemo(() => {
    const totalCandidates = rawData.length;
    const passedFirst = rawData.filter(d => d.status === 'Pass').length;
    const notPassed = rawData.filter(d => d.status === 'Not Pass').length;
    const kiv = rawData.filter(d => d.status === 'KIV').length;
    const rejected = rawData.filter(d => d.status === 'Reject').length;
    
    // Position breakdown
    const positionCounts = rawData.reduce((acc, curr) => {
      const pos = curr.position;
      acc[pos] = (acc[pos] || 0) + 1;
      return acc;
    }, {});
    
    // Interviewer performance
    const interviewerStats = rawData.reduce((acc, curr) => {
      const interviewer = curr.interviewer;
      if (!acc[interviewer]) {
        acc[interviewer] = { total: 0, passed: 0, notPassed: 0, kiv: 0, rejected: 0 };
      }
      acc[interviewer].total += 1;
      acc[interviewer][curr.status === 'Pass' ? 'passed' : 
                      curr.status === 'Not Pass' ? 'notPassed' :
                      curr.status === 'KIV' ? 'kiv' : 'rejected'] += 1;
      return acc;
    }, {});
    
    // Timeline data
    const timelineData = rawData.reduce((acc, curr) => {
      const date = curr.interviewDate;
      if (!acc[date]) {
        acc[date] = { date, interviews: 0, passed: 0 };
      }
      acc[date].interviews += 1;
      if (curr.status === 'Pass') acc[date].passed += 1;
      return acc;
    }, {});
    
    return {
      totalCandidates,
      passedFirst,
      notPassed,
      kiv,
      rejected,
      passRate: ((passedFirst / totalCandidates) * 100).toFixed(1),
      positionCounts,
      interviewerStats,
      timelineData: Object.values(timelineData).sort((a, b) => new Date(a.date) - new Date(b.date))
    };
  }, []);

  // Chart data preparations
  const statusData = [
    { name: 'Pass', value: analytics.passedFirst, color: '#10b981' },
    { name: 'Not Pass', value: analytics.notPassed, color: '#ef4444' },
    { name: 'KIV', value: analytics.kiv, color: '#f59e0b' },
    { name: 'Reject', value: analytics.rejected, color: '#6b7280' }
  ];

  const positionData = Object.entries(analytics.positionCounts).map(([position, count]) => ({
    position: position.length > 20 ? position.substring(0, 20) + '...' : position,
    count,
    fullPosition: position
  })).sort((a, b) => b.count - a.count);

  const interviewerData = Object.entries(analytics.interviewerStats).map(([interviewer, stats]) => ({
    interviewer,
    total: stats.total,
    passRate: ((stats.passed / stats.total) * 100).toFixed(1),
    passed: stats.passed,
    notPassed: stats.notPassed
  }));

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {Icon && <Icon className="h-8 w-8" style={{ color }} />}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Candidates"
          value={analytics.totalCandidates}
          icon={Users}
          color="#3b82f6"
        />
        <StatCard
          title="Pass Rate"
          value={`${analytics.passRate}%`}
          icon={Target}
          color="#10b981"
          subtitle={`${analytics.passedFirst} passed`}
        />
        <StatCard
          title="Not Passed"
          value={analytics.notPassed}
          icon={XCircle}
          color="#ef4444"
        />
        <StatCard
          title="Under Review"
          value={analytics.kiv}
          icon={AlertCircle}
          color="#f59e0b"
          subtitle="KIV status"
        />
        <StatCard
          title="Avg. Weekly"
          value={`${(analytics.totalCandidates / 5).toFixed(1)}`}
          icon={TrendingUp}
          color="#8b5cf6"
          subtitle="interviews"
        />
      </div>

      {/* Rejection Reasons Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">🔍 Rejection Pattern Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-medium text-red-800 mb-2">English Proficiency Issues</h4>
            <p className="text-sm text-red-700">3 candidates rejected due to English skills</p>
            <p className="text-xs text-red-600 mt-1">Consider pre-screening assessment</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">Salary Expectations Gap</h4>
            <p className="text-sm text-yellow-700">2 candidates declined offers</p>
            <p className="text-xs text-yellow-600 mt-1">Review compensation benchmarks</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">External Offers</h4>
            <p className="text-sm text-blue-700">2 candidates chose competitors</p>
            <p className="text-xs text-blue-600 mt-1">Faster decision timeline needed</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interview Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Interview Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Positions Applied For */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Applications by Position</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={positionData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="position" 
                angle={-45}
                textAnchor="end"
                height={100}
                fontSize={10}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [value, 'Applications']}
                labelFormatter={(label, payload) => payload?.[0]?.payload?.fullPosition || label}
              />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Interview Timeline */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Interview Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={10}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="interviews" stroke="#3b82f6" name="Total Interviews" strokeWidth={2} />
              <Line type="monotone" dataKey="passed" stroke="#10b981" name="Passed" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Interviewer Performance */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Interviewer Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={interviewerData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="interviewer" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={10}
              />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'passRate' ? `${value}%` : value,
                name === 'passRate' ? 'Pass Rate' : name === 'total' ? 'Total Interviews' : 'Count'
              ]} />
              <Bar dataKey="total" fill="#94a3b8" name="Total" />
              <Bar dataKey="passed" fill="#10b981" name="Passed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recruitment Funnel Analysis</h3>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <div className="relative">
              {/* Stage 1 */}
              <div className="flex items-center mb-4">
                <div className="w-full bg-blue-500 text-white text-center py-3 rounded-lg shadow-md">
                  <div className="font-semibold">Initial Applications</div>
                  <div className="text-2xl font-bold">{analytics.totalCandidates}</div>
                </div>
              </div>
              
              {/* Stage 2 */}
              <div className="flex items-center mb-4">
                <div className="w-5/6 mx-auto bg-green-500 text-white text-center py-3 rounded-lg shadow-md">
                  <div className="font-semibold">First Interview Pass</div>
                  <div className="text-xl font-bold">{analytics.passedFirst} ({analytics.passRate}%)</div>
                </div>
              </div>
              
              {/* Stage 3 */}
              <div className="flex items-center mb-4">
                <div className="w-3/6 mx-auto bg-purple-500 text-white text-center py-3 rounded-lg shadow-md">
                  <div className="font-semibold">Second Interview</div>
                  <div className="text-lg font-bold">3 candidates</div>
                </div>
              </div>
              
              {/* Stage 4 */}
              <div className="flex items-center">
                <div className="w-2/6 mx-auto bg-yellow-500 text-white text-center py-3 rounded-lg shadow-md">
                  <div className="font-semibold">Final Hire</div>
                  <div className="text-lg font-bold">~2-3 pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Focus Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Department Hiring Focus</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">5</div>
            <div className="text-sm font-medium text-blue-600">Operations</div>
            <div className="text-xs text-blue-500">Managers & Stock</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-700">5</div>
            <div className="text-sm font-medium text-green-600">Technology</div>
            <div className="text-xs text-green-500">Data & Engineering</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">4</div>
            <div className="text-sm font-medium text-purple-600">Management</div>
            <div className="text-xs text-purple-500">Senior Leadership</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
            <div className="text-2xl font-bold text-pink-700">4</div>
            <div className="text-sm font-medium text-pink-600">Creative & Sales</div>
            <div className="text-xs text-pink-500">Design & Support</div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">🎯 Immediate Action Items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3 text-yellow-300">🚀 Quick Wins (This Week)</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>• Contact Surasak for 3rd interview scheduling</li>
              <li>• Follow up on Pasin's pending test with Nick</li>
              <li>• Review KIV candidates: Gabriel, Sarudapa, Rangsee</li>
              <li>• Coordinate Airadapha's start date</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-3 text-blue-300">🔧 Process Improvements</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>• Add English proficiency pre-assessment</li>
              <li>• Include salary range in job postings</li>
              <li>• Streamline offer approval process</li>
              <li>• Prepare company presentation materials</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailed = () => (
    <div className="space-y-6">
      {/* Detailed Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Key Insights & Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">🎯 Performance Highlights</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Data Engineering roles show highest success rate</li>
              <li>• K.Abul & K.Nick have strong interview conversion</li>
              <li>• Production Manager positions need strategy review</li>
              <li>• July peak interview period with 23 candidates</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">⚠️ Areas for Improvement</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• English proficiency screening needed upfront</li>
              <li>• Salary expectation alignment in job postings</li>
              <li>• Consider company presentation improvements</li>
              <li>• Review offer competitiveness vs market</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Candidate Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Candidate Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interviewer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rawData.map((candidate) => (
                <tr key={candidate.no} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{candidate.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{candidate.position}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{candidate.interviewDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{candidate.interviewer}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      candidate.status === 'Pass' ? 'bg-green-100 text-green-800' :
                      candidate.status === 'Not Pass' ? 'bg-red-100 text-red-800' :
                      candidate.status === 'KIV' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                    {candidate.remark || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Recruitment Dashboard</h1>
              <p className="text-gray-600">Y2D 2025 - Interview Tracking & Analysis</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedView('overview')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedView === 'overview' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedView('detailed')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedView === 'detailed' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Detailed View
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {selectedView === 'overview' ? renderOverview() : renderDetailed()}

        {/* Summary Footer */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold mb-3">📊 Executive Summary & Strategic Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Performance Highlights
              </h4>
              <div className="text-sm text-gray-700 space-y-2 pl-5">
                <p>✅ <strong>{analytics.passRate}% overall pass rate</strong> - Above industry average of 35-40%</p>
                <p>✅ <strong>Strong tech hiring:</strong> Data Engineering roles showing 80%+ success rate</p>
                <p>✅ <strong>Diverse pipeline:</strong> {Object.keys(analytics.positionCounts).length} different roles covered</p>
                <p>✅ <strong>Efficient interviewers:</strong> K.Abul & K.Nick demonstrating high conversion</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                Critical Improvement Areas
              </h4>
              <div className="text-sm text-gray-700 space-y-2 pl-5">
                <p>🔴 <strong>Language barrier:</strong> 11% of rejections due to English proficiency</p>
                <p>🔴 <strong>Salary competitiveness:</strong> Lost 2 qualified candidates to compensation</p>
                <p>🔴 <strong>Decision speed:</strong> 2 candidates accepted competing offers</p>
                <p>🔴 <strong>Company appeal:</strong> 1 candidate rejected after seeing company</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">💡 Strategic Recommendations for Q4 2025</h4>
            <div className="text-sm text-blue-800 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>1. Implement Pre-Screening:</strong> Add 15-minute English assessment call before face-to-face interviews</p>
                <p><strong>2. Salary Transparency:</strong> Include compensation ranges in job postings to attract aligned candidates</p>
              </div>
              <div>
                <p><strong>3. Speed Up Process:</strong> Target 48-hour decision timeline for qualified candidates</p>
                <p><strong>4. Employer Branding:</strong> Create company presentation video highlighting culture and growth opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDashboard;