import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Inbox,
  LogOut,
  RefreshCw,
  Search,
  Mail,
  Phone,
  Trash2,
  Eye,
  FileSpreadsheet,
  Globe,
  Building,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { brandConfig } from '../config/brand.config';
import { SEOHead } from '../components/common/SEOHead';
import { Badge } from '../components/common/badge';

export interface StoredEnquiry {
  _id: string;
  fullName: string;
  businessOrSchoolName: string;
  email: string;
  phoneNumber?: string;
  serviceRequired: string;
  estimatedBudget?: string;
  projectDescription: string;
  desiredTimeline?: string;
  consent: boolean;
  ipAddress?: string;
  status: 'new' | 'reviewed' | 'responded' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export const AdminDashboard: React.FC = () => {
  const { token, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<StoredEnquiry | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const fetchEnquiries = async () => {
    if (!token) return;
    setIsLoading(true);
    setActionNotice(null);

    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
      const response = await fetch(`${apiBase}/api/admin/enquiries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        logout();
        navigate('/login', { replace: true });
        return;
      }

      const data = await response.json();
      if (data.success && Array.isArray(data.enquiries)) {
        setEnquiries(data.enquiries);
      }
    } catch {
      setActionNotice('Could not connect to server to fetch latest enquiries.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnquiries();
    }
  }, [isAuthenticated]);

  const handleStatusUpdate = async (
    id: string,
    newStatus: 'new' | 'reviewed' | 'responded' | 'archived'
  ) => {
    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
      const res = await fetch(`${apiBase}/api/admin/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setActionNotice(`Enquiry status updated to "${newStatus}".`);
      }
    } catch {
      setActionNotice('Failed to update enquiry status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      return;
    }

    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
      const res = await fetch(`${apiBase}/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e._id !== id));
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry(null);
        }
        setActionNotice('Enquiry deleted successfully.');
      }
    } catch {
      setActionNotice('Failed to delete enquiry.');
    }
  };

  const exportToCSV = () => {
    if (enquiries.length === 0) return;

    const headers = [
      'Date',
      'Name',
      'Business/School',
      'Email',
      'Phone',
      'Service',
      'Budget',
      'Timeline',
      'Status',
      'Description',
    ];

    const rows = enquiries.map((e) => [
      `"${new Date(e.createdAt).toLocaleDateString()}"`,
      `"${e.fullName.replace(/"/g, '""')}"`,
      `"${e.businessOrSchoolName.replace(/"/g, '""')}"`,
      `"${e.email.replace(/"/g, '""')}"`,
      `"${(e.phoneNumber || '').replace(/"/g, '""')}"`,
      `"${e.serviceRequired.replace(/"/g, '""')}"`,
      `"${(e.estimatedBudget || '').replace(/"/g, '""')}"`,
      `"${(e.desiredTimeline || '').replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${e.projectDescription.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Saurabh_Client_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered list
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesStatus =
        statusFilter === 'all' ? true : item.status === statusFilter;

      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.fullName.toLowerCase().includes(q) ||
        item.businessOrSchoolName.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.serviceRequired.toLowerCase().includes(q) ||
        item.projectDescription.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [enquiries, statusFilter, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: enquiries.length,
      new: enquiries.filter((e) => e.status === 'new').length,
      reviewed: enquiries.filter((e) => e.status === 'reviewed').length,
      responded: enquiries.filter((e) => e.status === 'responded').length,
    };
  }, [enquiries]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <Badge variant="amber" size="sm" dot>
            New
          </Badge>
        );
      case 'reviewed':
        return (
          <Badge variant="electric" size="sm">
            Reviewed
          </Badge>
        );
      case 'responded':
        return (
          <Badge variant="emerald" size="sm">
            Responded
          </Badge>
        );
      case 'archived':
        return (
          <Badge variant="outline" size="sm">
            Archived
          </Badge>
        );
      default:
        return (
          <Badge variant="default" size="sm">
            {status}
          </Badge>
        );
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center text-slate-400">
        Loading Founder Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col text-slate-100 font-sans">
      <SEOHead
        title="Enquiries Control Dashboard | Saurabh Sharma"
        description="Private portal for Saurabh Sharma to review incoming client proposals."
        noIndex={true}
      />

      {/* Top Navigation Bar */}
      <header className="bg-navy-900 border-b border-navy-800 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 py-3.5 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={brandConfig.founder.image}
              alt={brandConfig.founder.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-electric-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base sm:text-lg">
                  {brandConfig.founder.name}
                </span>
                <Badge variant="electric" size="sm">
                  Admin
                </Badge>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Client Enquiry Control Center
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 text-xs font-semibold text-slate-300 hover:text-white border border-navy-700 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-electric-400" />
              <span>View Portfolio</span>
            </Link>

            <button
              type="button"
              onClick={fetchEnquiries}
              disabled={isLoading}
              className="p-2 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white border border-navy-700 transition-colors disabled:opacity-50"
              title="Refresh enquiries"
              aria-label="Refresh enquiries"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Action Notice Banner */}
        {actionNotice && (
          <div className="p-3.5 rounded-xl bg-electric-950/70 border border-electric-500/40 text-electric-300 text-xs flex items-center justify-between">
            <span>{actionNotice}</span>
            <button
              type="button"
              onClick={() => setActionNotice(null)}
              className="text-slate-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 border border-navy-800">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
              Total Enquiries
            </span>
            <span className="text-3xl font-black text-white mt-2 block">{stats.total}</span>
            <span className="text-[11px] text-slate-400 mt-1 block">All incoming briefs</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-amber-500/30 bg-amber-950/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                New / Unread
              </span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <span className="text-3xl font-black text-white mt-2 block">{stats.new}</span>
            <span className="text-[11px] text-amber-300/80 mt-1 block">Requires your review</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-navy-800">
            <span className="text-xs font-mono text-electric-400 uppercase tracking-wider block">
              Under Review
            </span>
            <span className="text-3xl font-black text-white mt-2 block">{stats.reviewed}</span>
            <span className="text-[11px] text-slate-400 mt-1 block">Being evaluated</span>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 bg-emerald-950/10">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
              Responded
            </span>
            <span className="text-3xl font-black text-white mt-2 block">{stats.responded}</span>
            <span className="text-[11px] text-emerald-300/80 mt-1 block">Email/WhatsApp dispatched</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-navy-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by client name, email, company, or service..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-navy-950 border border-navy-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-electric-500 transition-colors"
            />
          </div>

          {/* Status Tabs & CSV Export */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-navy-950 p-1 rounded-xl border border-navy-800">
              {['all', 'new', 'reviewed', 'responded', 'archived'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                    statusFilter === tab
                      ? 'bg-electric-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={exportToCSV}
              disabled={enquiries.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-navy-850 hover:bg-navy-800 text-xs font-semibold text-slate-200 border border-navy-700 transition-colors disabled:opacity-40"
              title="Download client enquiries as CSV spreadsheet"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Enquiries Table & List */}
        <div className="glass-panel rounded-3xl border border-navy-800 overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-navy-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Inbox className="w-4 h-4 text-electric-400" />
              <h3 className="font-bold text-white text-sm">
                Client Enquiries ({filteredEnquiries.length})
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Sorted newest first
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-electric-400" />
              Loading enquiries...
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm space-y-2">
              <Inbox className="w-8 h-8 mx-auto text-slate-500" />
              <p>No client enquiries match the selected filter.</p>
              {enquiries.length === 0 && (
                <p className="text-xs text-slate-500">
                  When visitors submit your website's contact form, their briefs will appear here in real time!
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-navy-950/80 text-slate-400 uppercase font-mono text-[11px] border-b border-navy-800">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Client & Organization</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Budget / Timeline</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-850 text-slate-200">
                  {filteredEnquiries.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-navy-900/50 transition-colors group cursor-pointer"
                      onClick={() => setSelectedEnquiry(item)}
                    >
                      <td className="py-3.5 px-4 text-xs font-mono text-slate-400 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white group-hover:text-electric-300 transition-colors">
                          {item.fullName}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-slate-500 flex-shrink-0" />
                          <span>{item.businessOrSchoolName}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge variant="electric" size="sm">
                          {item.serviceRequired}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-300">
                        <div>{item.estimatedBudget || 'Flexible'}</div>
                        <div className="text-slate-400 text-[11px]">
                          {item.desiredTimeline || 'No fixed timeline'}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getStatusBadge(item.status)}
                      </td>

                      <td
                        className="py-3.5 px-4 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedEnquiry(item)}
                            className="p-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 text-slate-300 hover:text-white transition-colors"
                            title="Inspect details"
                            aria-label="Inspect enquiry details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <a
                            href={`mailto:${item.email}?subject=${encodeURIComponent(
                              `Re: ${item.serviceRequired} Enquiry - Saurabh Sharma`
                            )}`}
                            className="p-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 text-electric-400 hover:text-white transition-colors"
                            title="Reply via Email"
                            aria-label="Reply via email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>

                          {item.phoneNumber && (
                            <a
                              href={`https://wa.me/${item.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                `Hi ${item.fullName}, this is Saurabh Sharma regarding your project enquiry for ${item.serviceRequired}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-navy-850 hover:bg-navy-800 text-emerald-400 hover:text-white transition-colors"
                              title="Chat on WhatsApp"
                              aria-label="Chat on WhatsApp"
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDelete(item._id)}
                            className="p-1.5 rounded-lg bg-navy-850 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Delete"
                            aria-label="Delete enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Enquiry Details Modal */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-modal-title"
        >
          <div className="bg-navy-900 border border-navy-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-navy-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getStatusBadge(selectedEnquiry.status)}
                  <span className="text-xs font-mono text-slate-400">
                    ID: {selectedEnquiry._id}
                  </span>
                </div>
                <h3 id="enquiry-modal-title" className="text-xl font-bold text-white">
                  {selectedEnquiry.fullName}
                </h3>
                <p className="text-sm text-electric-400 font-medium">
                  {selectedEnquiry.businessOrSchoolName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800 space-y-1">
                <span className="text-slate-400 block text-xs font-mono">Email Address:</span>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="font-semibold text-electric-400 hover:underline block truncate"
                >
                  {selectedEnquiry.email}
                </a>
              </div>

              <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800 space-y-1">
                <span className="text-slate-400 block text-xs font-mono">Phone / WhatsApp:</span>
                <span className="font-semibold text-white block">
                  {selectedEnquiry.phoneNumber || 'Not provided'}
                </span>
              </div>

              <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800 space-y-1">
                <span className="text-slate-400 block text-xs font-mono">Service Required:</span>
                <span className="font-semibold text-violetAccent-300 block">
                  {selectedEnquiry.serviceRequired}
                </span>
              </div>

              <div className="bg-navy-950 p-3.5 rounded-xl border border-navy-800 space-y-1">
                <span className="text-slate-400 block text-xs font-mono">Budget & Timeline:</span>
                <span className="font-semibold text-white block">
                  {selectedEnquiry.estimatedBudget || 'Flexible'} •{' '}
                  {selectedEnquiry.desiredTimeline || 'Open'}
                </span>
              </div>
            </div>

            {/* Project Brief */}
            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Project Description & Requirements:
              </span>
              <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                {selectedEnquiry.projectDescription}
              </p>
            </div>

            {/* Status Change Selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Update Status:</span>
                {(['new', 'reviewed', 'responded', 'archived'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleStatusUpdate(selectedEnquiry._id, st)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize transition-colors ${
                      selectedEnquiry.status === st
                        ? 'bg-electric-600 text-white'
                        : 'bg-navy-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Action Contact Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=${encodeURIComponent(
                    `Re: ${selectedEnquiry.serviceRequired} - Saurabh Sharma`
                  )}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-electric-600 hover:bg-electric-500 text-white text-xs font-bold transition-colors shadow-md"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                {selectedEnquiry.phoneNumber && (
                  <a
                    href={`https://wa.me/${selectedEnquiry.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi ${selectedEnquiry.fullName}, this is Saurabh Sharma regarding your enquiry for ${selectedEnquiry.serviceRequired}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-md"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
