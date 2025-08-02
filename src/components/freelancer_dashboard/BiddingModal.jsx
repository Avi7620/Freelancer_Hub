import React, { useState } from "react";
import {
  X,
  DollarSign,
  Clock,
  FileText,
  Send,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import API from "../../services/api";

const BiddingModal = ({ project, isOpen, onClose }) => {
  const [bidData, setBidData] = useState({
    bidAmount: "",
    deliveryDays: "",
    proposal: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setBidData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getAuthToken = () => {
    return localStorage.getItem("token"); // Assuming token is stored with this key
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Get JWT token from localStorage
    const token = getAuthToken();
    if (!token) {
      setError("Authentication required. Please login again.");
      setIsSubmitting(false);
      return;
    }

    // Prepare data according to BidSubmissionDto
    const submissionData = {
      ProjectId: project.id,
      Proposal: bidData.proposal,
      Amount: parseFloat(bidData.bidAmount),
      DeliveryDays: parseInt(bidData.deliveryDays),
    };

    try {
      const response = await API.post(
        "/freelancer/bids/submit",
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
          setBidData({
            bidAmount: "",
            deliveryDays: "",
            proposal: "",
          });
        }, 2000);
      } else {
        throw new Error(response.data?.message || "Failed to submit bid");
      }
    } catch (err) {
      setSubmitStatus("error");
      // Handle different error scenarios
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 401) {
          setError("Session expired. Please login again.");
        } else if (err.response.status === 400) {
          setError(
            err.response.data?.message || "You Already bid this project !!!"
          );
        } else {
          setError(err.response.data?.message || "Failed to submit bid");
        }
      } else if (err.request) {
        // Request was made but no response
        setError("Network error. Please check your connection.");
      } else {
        // Other errors
        setError(err.message || "An error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Submit Your Bid</h2>
            <p className="text-gray-400 mt-1">
              {project?.title || project?.name || "Project"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitStatus === "success" ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Bid Submitted Successfully!
              </h3>
              <p className="text-gray-400">
                Your proposal has been sent to the client. You'll be notified of
                any updates.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5" />
                    <span>
                      {error || "Failed to submit bid. Please try again."}
                    </span>
                  </div>
                </div>
              )}

              {/* Project Info */}
              <div className="bg-gray-700 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-sm font-bold text-white">
                    {project?.companyName
                      ? `${project.companyName.charAt(0)}${
                          project.companyName.charAt(1) || ""
                        }`
                      : "P"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {project?.title || project?.name || "Untitled Project"}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {project?.companyName ||
                        project?.client ||
                        "Unknown Client"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  {project?.description || "No description available"}
                </p>
                <div className="flex items-center space-x-4 mt-3 text-sm">
                  <span className="text-emerald-400 font-semibold">
                    Budget: $
                    {project?.budget ? project.budget.toLocaleString() : "TBD"}
                  </span>
                  <span className="text-gray-400">
                    Due:{" "}
                    {project?.deadline ||
                      project?.endDate ||
                      project?.dueDate ||
                      "TBD"}
                  </span>
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
                    min="1"
                    max="1000000"
                    step="0.01"
                    value={bidData.bidAmount}
                    onChange={(e) =>
                      handleInputChange("bidAmount", e.target.value)
                    }
                    placeholder="Enter your bid amount"
                    className="pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 w-full"
                  />
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Enter the total amount you'd like to charge for this project
                  (1 - 1,000,000)
                </p>
              </div>

              {/* Delivery Days */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Delivery Time (in days) *
                </label>
                <div className="relative">
                  <Clock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    required
                    min="1"
                    max="365"
                    value={bidData.deliveryDays}
                    onChange={(e) =>
                      handleInputChange("deliveryDays", e.target.value)
                    }
                    placeholder="Enter days (1-365)"
                    className="pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 w-full"
                  />
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
                    minLength="50"
                    maxLength="2000"
                    value={bidData.proposal}
                    onChange={(e) =>
                      handleInputChange("proposal", e.target.value)
                    }
                    placeholder="Describe your approach, experience, and why you're the best fit for this project..."
                    rows={6}
                    className="pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 w-full resize-none"
                  />
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  Must be between 50 and 2000 characters (
                  {bidData.proposal.length}
                  /2000)
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    Your bid will be visible to the client immediately
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      bidData.proposal.length < 50 ||
                      bidData.proposal.length > 2000 ||
                      !bidData.bidAmount ||
                      !bidData.deliveryDays ||
                      parseFloat(bidData.bidAmount) < 1 ||
                      parseFloat(bidData.bidAmount) > 1000000 ||
                      parseInt(bidData.deliveryDays) < 1 ||
                      parseInt(bidData.deliveryDays) > 365
                    }
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl font-medium flex items-center space-x-2 transition-colors"
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
