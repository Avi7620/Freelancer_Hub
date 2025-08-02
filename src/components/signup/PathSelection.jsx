import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Users, Briefcase, Star, Shield, Clock, Award, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

const PathSelection = () => {
  const [selectedPath, setSelectedPath] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Path
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select how you'd like to use our platform to get started with your
            personalized experience
          </p>
        </div>

        {/* Path Selection Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Hire Freelancers Card */}
            <div
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                selectedPath === 'client'
                  ? 'border-green-500 ring-4 ring-green-100'
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => setSelectedPath('client')}
            >
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                  Hire Freelancers
                </h2>
                
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  Find and hire talented professionals for your projects. Access a global pool of skilled freelancers.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-700">
                    <Star className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0" />
                    <span>Access to top-rated freelancers</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Shield className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                    <span>Secure payment protection</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0" />
                    <span>24/7 project support</span>
                  </div>
                </div>
              </div>

              {selectedPath === 'client' && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              )}
            </div>

            {/* Work as Freelancer Card */}
            <div
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
                selectedPath === 'freelancer'
                  ? 'border-blue-500 ring-4 ring-blue-100'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedPath('freelancer')}
            >
              <div className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                  Work as Freelancer
                </h2>
                
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  Showcase your skills and find exciting projects. Build your freelance career with flexible opportunities.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-700">
                    <Award className="w-4 h-4 text-amber-500 mr-3 flex-shrink-0" />
                    <span>Build your professional reputation</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Shield className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    <span>Guaranteed payment security</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0" />
                    <span>Flexible working hours</span>
                  </div>
                </div>
              </div>

              {selectedPath === 'freelancer' && (
                <div className="absolute top-4 right-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </button>

              
            <button
              type="button"
              disabled={!selectedPath}
              className={`flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedPath
                  ? selectedPath === 'client'
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
            <Link to={selectedPath === 'client'?'/client-signup':'/freelancer-signup'}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathSelection;