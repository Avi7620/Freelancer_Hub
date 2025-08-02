import React, { useState } from 'react';
import {
  X,
  DollarSign,
  Calendar,
  Clock,
  FileText,
  Paperclip,
  Send,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

const BiddingModal = ({ project, isOpen, onClose }) => {
  const [bidData, setBidData] = useState({
    bidAmount: '',
    deliveryTime: '',
    deliveryUnit: 'days',
    proposal: '',
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (field, value) => {
    setBidData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
        setBidData({
          bidAmount: '',
          deliveryTime: '',
          deliveryUnit: 'days',
          proposal: '',
          attachments: []
        });
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Submit Your Bid</h2>
            <p className="text-gray-400 mt-1">{project?.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Bid Submitted Successfully!</h3>
              <p className="text-gray-400">Your proposal has been sent to the client. You'll be notified of any updates.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Info */}
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">
                    {project?.clientAvatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{project?.name}</h3>
                    <p className="text-gray-400 text-sm">{project?.client}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{project?.description}</p>
                <div className="flex items-center space-x-4 mt-3 text-sm">
                  <span className="text-emerald-400 font-semibold">Budget: ${project?.budget?.toLocaleString()}</span>
                  <span className="text-gray-400">Due: {project?.dueDate}</span>
                </div>
              </div>

              {/* Bid Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Bid Amount *
                </label>
                <div className="relative">
                  <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    required
                    value={bidData.bidAmount}
                    onChange={(e) => handleInputChange('bidAmount', e.target.value)}
                    placeholder="Enter your bid amount"
                    className="pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 w-full"
                  />
                </div>
                <p className="text-gray-500 text-xs mt-1">Enter the total amount you'd like to charge for this project</p>
              </div>

              {/* Delivery Time */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Delivery Time *
                </label>
                <div className="flex space-x-3">
                  <div className="relative flex-1">
                    <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      required
                      value={bidData.deliveryTime}
                      onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                      placeholder="Enter time"
                      className="pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 w-full"
                    />
                  </div>
                  <select
                    value={bidData.deliveryUnit}
                    onChange={(e) => handleInputChange('deliveryUnit', e.target.value)}
                    className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>

              {/* Proposal */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Proposal *
                </label>
                <div className="relative">
                  <FileText className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <textarea
                    required
                    value={bidData.proposal}
                    onChange={(e) => handleInputChange('proposal', e.target.value)}
                    placeholder="Describe your approach, experience, and why you're the best fit for this project..."
                    rows={6}
                    className="pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 w-full resize-none"
                  />
                </div>
                <p className="text-gray-500 text-xs mt-1">Minimum 100 characters recommended</p>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Your bid will be visible to the client immediately</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-2 rounded-xl font-medium flex items-center space-x-2 transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Bid</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiddingModal;