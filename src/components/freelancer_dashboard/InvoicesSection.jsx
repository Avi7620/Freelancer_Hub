import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Send,
  Copy,
  MoreHorizontal,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Mail,
  CreditCard,
  TrendingUp,
  User,
  Building
} from 'lucide-react';

const InvoicesSection = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  const invoices = [
    {
      id: 'INV-001',
      clientName: 'TechFlow Inc.',
      clientEmail: 'billing@techflow.com',
      projectName: 'SaaS Dashboard Redesign',
      amount: 4500,
      status: 'Paid',
      issueDate: '2024-12-15',
      dueDate: '2025-01-15',
      paidDate: '2024-12-20',
      description: 'UI/UX Design Services - Phase 2',
      items: [
        { description: 'UI Design', quantity: 40, rate: 75, amount: 3000 },
        { description: 'UX Research', quantity: 20, rate: 75, amount: 1500 }
      ],
      statusColor: 'bg-green-500',
      statusIcon: CheckCircle2
    },
    {
      id: 'INV-002',
      clientName: 'StartupLab',
      clientEmail: 'finance@startuplab.io',
      projectName: 'Mobile App UI Kit',
      amount: 3200,
      status: 'Sent',
      issueDate: '2025-01-01',
      dueDate: '2025-01-31',
      paidDate: null,
      description: 'Mobile UI Kit Development',
      items: [
        { description: 'UI Components', quantity: 32, rate: 100, amount: 3200 }
      ],
      statusColor: 'bg-blue-500',
      statusIcon: Mail
    },
    {
      id: 'INV-003',
      clientName: 'RetailPro',
      clientEmail: 'accounts@retailpro.com',
      projectName: 'E-commerce Platform',
      amount: 6800,
      status: 'Overdue',
      issueDate: '2024-11-15',
      dueDate: '2024-12-15',
      paidDate: null,
      description: 'Full-stack Development Services',
      items: [
        { description: 'Frontend Development', quantity: 50, rate: 80, amount: 4000 },
        { description: 'Backend Development', quantity: 35, rate: 80, amount: 2800 }
      ],
      statusColor: 'bg-red-500',
      statusIcon: AlertTriangle
    },
    {
      id: 'INV-004',
      clientName: 'Creative Studio',
      clientEmail: 'billing@creativestudio.com',
      projectName: 'Brand Identity Package',
      amount: 2100,
      status: 'Draft',
      issueDate: '2025-01-10',
      dueDate: '2025-02-10',
      paidDate: null,
      description: 'Brand Identity Design Services',
      items: [
        { description: 'Logo Design', quantity: 15, rate: 90, amount: 1350 },
        { description: 'Brand Guidelines', quantity: 10, rate: 75, amount: 750 }
      ],
      statusColor: 'bg-gray-500',
      statusIcon: FileText
    },
    {
      id: 'INV-005',
      clientName: 'Digital Agency',
      clientEmail: 'payments@digitalagency.com',
      projectName: 'Website Optimization',
      amount: 1800,
      status: 'Paid',
      issueDate: '2024-12-01',
      dueDate: '2025-01-01',
      paidDate: '2024-12-28',
      description: 'SEO and Performance Optimization',
      items: [
        { description: 'SEO Optimization', quantity: 12, rate: 100, amount: 1200 },
        { description: 'Performance Audit', quantity: 8, rate: 75, amount: 600 }
      ],
      statusColor: 'bg-green-500',
      statusIcon: CheckCircle2
    }
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || invoice.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusOptions = [
    { value: 'all', label: 'All Invoices' },
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const totalRevenue = invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'Sent').reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'Overdue').reduce((sum, inv) => sum + inv.amount, 0);

  const InvoiceCard = ({ invoice }) => (
    <div className="bg-gray-800 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="font-semibold text-white text-lg">{invoice.id}</h3>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${invoice.statusColor} bg-opacity-20 text-white`}>
                <invoice.statusIcon className="w-3 h-3 mr-1" />
                {invoice.status}
              </div>
            </div>
            <p className="text-gray-400 text-sm">{invoice.clientName}</p>
            <p className="text-gray-500 text-xs">{invoice.projectName}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">${invoice.amount.toLocaleString()}</div>
            <button className="p-2 text-gray-400 hover:text-white transition-colors mt-2">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-4">{invoice.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <div className="text-gray-400">Issue Date</div>
            <div className="font-semibold text-white">{invoice.issueDate}</div>
          </div>
          <div>
            <div className="text-gray-400">Due Date</div>
            <div className="font-semibold text-white">{invoice.dueDate}</div>
          </div>
          {invoice.paidDate && (
            <>
              <div>
                <div className="text-gray-400">Paid Date</div>
                <div className="font-semibold text-green-400">{invoice.paidDate}</div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">{invoice.clientEmail}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors" title="View">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-emerald-400 transition-colors" title="Edit">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors" title="Download">
              <Download className="w-4 h-4" />
            </button>
            {invoice.status === 'Draft' && (
              <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors" title="Send">
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <p className="text-gray-400 mt-1">Manage your invoices and track payments</p>
        </div>
        <button 
          onClick={() => setShowNewInvoice(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Invoice</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">${totalRevenue.toLocaleString()}</h3>
            <p className="text-gray-400 text-sm">Total Revenue</p>
            <p className="text-emerald-400 text-xs mt-1">Paid invoices</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <Mail className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">${pendingAmount.toLocaleString()}</h3>
            <p className="text-gray-400 text-sm">Pending Payment</p>
            <p className="text-blue-400 text-xs mt-1">Sent invoices</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <XCircle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">${overdueAmount.toLocaleString()}</h3>
            <p className="text-gray-400 text-sm">Overdue Amount</p>
            <p className="text-red-400 text-xs mt-1">Requires attention</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 w-64"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredInvoices.map(invoice => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No invoices found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* New Invoice Modal */}
      {showNewInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Create New Invoice</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Client Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Client Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="client@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Project name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
                  <input
                    type="date"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Invoice description..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">Invoice Items</label>
                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-300">
                    <div className="col-span-5">Description</div>
                    <div className="col-span-2">Quantity</div>
                    <div className="col-span-2">Rate</div>
                    <div className="col-span-2">Amount</div>
                    <div className="col-span-1"></div>
                  </div>
                  <div className="grid grid-cols-12 gap-4">
                    <input
                      type="text"
                      className="col-span-5 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Service description"
                    />
                    <input
                      type="number"
                      className="col-span-2 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="1"
                    />
                    <input
                      type="number"
                      className="col-span-2 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                    <div className="col-span-2 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-400">
                      $0.00
                    </div>
                    <button className="col-span-1 text-red-400 hover:text-red-300">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <button className="mt-4 text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax (0%):</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-white border-t border-gray-700 pt-2">
                      <span>Total:</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-end space-x-4">
              <button
                onClick={() => setShowNewInvoice(false)}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Save Draft
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Create & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesSection;