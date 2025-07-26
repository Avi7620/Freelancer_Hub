import React, { useState } from 'react';
import { User, Briefcase, Star, Upload, Check, ArrowLeft, ArrowRight, Mail, Lock, Phone, MapPin, Globe, DollarSign, Calendar } from 'lucide-react';

const categories = [
  'Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design',
  'Content Writing', 'Digital Marketing', 'Data Science', 'Video Editing',
  'Photography', 'Translation', 'Virtual Assistant', 'Consulting'
];

const skillSuggestions = [
  'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
  'Figma', 'Photoshop', 'Illustrator', 'WordPress', 'Shopify',
  'SEO', 'Google Ads', 'Facebook Ads', 'Content Creation',
  'Video Production', 'Animation', 'Copywriting', 'Translation'
];

const FreelancerSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    phone: '', country: '', city: '', title: '', description: '',
    experience: '', hourlyRate: '', availability: '', skills: [],
    categories: [], portfolio: [], agreeToTerms: false
  });

  const totalSteps = 4;

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        break;
      case 2:
        if (!formData.title.trim()) newErrors.title = 'Professional title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        else if (formData.description.length < 50) newErrors.description = 'Description must be at least 50 characters';
        if (!formData.experience) newErrors.experience = 'Experience level is required';
        if (!formData.hourlyRate.trim()) newErrors.hourlyRate = 'Hourly rate is required';
        else if (parseFloat(formData.hourlyRate) < 5 || parseFloat(formData.hourlyRate) > 500) newErrors.hourlyRate = 'Hourly rate must be between $5 and $500';
        if (!formData.availability) newErrors.availability = 'Availability is required';
        break;
      case 3:
        if (formData.categories.length === 0) newErrors.categories = 'Please select at least one category';
        if (formData.skills.length === 0) newErrors.skills = 'Please add at least one skill';
        break;
      case 4:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const previousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const resetForm = () => {
    setFormData({
      firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
      phone: '', country: '', city: '', title: '', description: '',
      experience: '', hourlyRate: '', availability: '', skills: [],
      categories: [], portfolio: [], agreeToTerms: false
    });
    setCurrentStep(1);
    setSuccess(false);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Replace with real API call, e.g.:
      // await fetch('/api/freelancer-signup', {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      setSuccess(true);
    } catch (error) {
      setErrors({ submit: 'Failed to create account. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const addSkill = (skill) => {
    if (!formData.skills.includes(skill)) {
      updateFormData('skills', [...formData.skills, skill]);
    }
  };

  const removeSkill = (skill) => {
    updateFormData('skills', formData.skills.filter(s => s !== skill));
  };

  const toggleCategory = (category) => {
    const updated = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category];
    updateFormData('categories', updated);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = files.filter(file => file.size <= maxSize).slice(0, 5);
    
    if (files.some(file => file.size > maxSize)) {
      setErrors(prev => ({ ...prev, portfolio: 'Some files exceed 10MB limit' }));
    } else {
      updateFormData('portfolio', validFiles);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Freelancer Hub!</h2>
          <p className="text-gray-600 mb-6">
            Your account has been successfully created. We'll review your profile and get back to you within 24 hours.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
            <button
              onClick={resetForm}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join as a Freelancer</h1>
          <p className="text-gray-600 text-lg">Start your journey with thousands of clients worldwide</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4" role="progressbar" aria-label="Sign-up progress">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                  aria-current={step === currentStep ? 'step' : undefined}
                >
                  {step}
                </div>
                {step < totalSteps && (
                  <div className={`w-24 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Personal Info</span>
            <span>Professional</span>
            <span>Skills & Portfolio</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <User className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your first name"
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    />
                    {errors.firstName && <p id="firstName-error" className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your last name"
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    />
                    {errors.lastName && <p id="lastName-error" className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
                      <Lock className="w-4 h-4 inline mr-1" />
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Create a password"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    {errors.password && <p id="password-error" className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Confirm your password"
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                    />
                    {errors.confirmPassword && <p id="confirmPassword-error" className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="phone">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your phone number"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="country">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Country
                    </label>
                    <select
                      id="country"
                      value={formData.country}
                      onChange={(e) => updateFormData('country', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.country}
                      aria-describedby={errors.country ? 'country-error' : undefined}
                    >
                      <option value="">Select your country</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="IN">India</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.country && <p id="country-error" className="text-red-500 text-sm mt-1">{errors.country}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="city">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateFormData('city', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your city"
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? 'city-error' : undefined}
                    />
                    {errors.city && <p id="city-error" className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <Briefcase className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Professional Information</h2>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="title">Professional Title</label>
                  <input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g. Full Stack Developer, UI/UX Designer"
                    aria-invalid={!!errors.title}
                    aria-describedby={errors.title ? 'title-error' : undefined}
                  />
                  {errors.title && <p id="title-error" className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="description">Professional Description</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell clients about your experience, skills, and what makes you unique..."
                    maxLength={500}
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.description.length}/500 characters (minimum 50)</p>
                  {errors.description && <p id="description-error" className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="experience">Experience Level</label>
                    <select
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => updateFormData('experience', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.experience ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-invalid={!!errors.experience}
                      aria-describedby={errors.experience ? 'experience-error' : undefined}
                    >
                      <option value="">Select experience level</option>
                      <option value="entry">Entry Level (0-2 years)</option>
                      <option value="intermediate">Intermediate (2-5 years)</option>
                      <option value="expert">Expert (5+ years)</option>
                    </select>
                    {errors.experience && <p id="experience-error" className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="hourlyRate">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Hourly Rate (USD)
                    </label>
                    <input
                      id="hourlyRate"
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => updateFormData('hourlyRate', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.hourlyRate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="25"
                      min="5"
                      max="500"
                      aria-invalid={!!errors.hourlyRate}
                      aria-describedby={errors.hourlyRate ? 'hourlyRate-error' : undefined}
                    />
                    {errors.hourlyRate && <p id="hourlyRate-error" className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="availability">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Availability
                  </label>
                  <select
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => updateFormData('availability', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.availability ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={!!errors.availability}
                    aria-describedby={errors.availability ? 'availability-error' : undefined}
                  >
                    <option value="">Select availability</option>
                    <option value="full-time">Full-time (40+ hours/week)</option>
                    <option value="part-time">Part-time (20-40 hours/week)</option>
                    <option value="project">Project-based</option>
                    <option value="weekends">Weekends only</option>
                  </select>
                  {errors.availability && <p id="availability-error" className="text-red-500 text-sm mt-1">{errors.availability}</p>}
                </div>
              </div>
            )}

            {/* Step 3: Skills & Portfolio */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <Star className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Skills & Portfolio</h2>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Categories</label>
                  <p className="text-sm text-gray-600 mb-3">Select the categories that best describe your services (max 3)</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => toggleCategory(category)}
                        disabled={!formData.categories.includes(category) && formData.categories.length >= 3}
                        className={`p-3 text-sm rounded-lg border transition-all ${
                          formData.categories.includes(category)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                        aria-pressed={formData.categories.includes(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  {errors.categories && <p className="text-red-500 text-sm mt-2">{errors.categories}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="skills">Skills</label>
                  <p className="text-sm text-gray-600 mb-3">Add skills relevant to your services</p>
                  
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {formData.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                            aria-label={`Remove ${skill}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    {skillSuggestions
                      .filter(skill => !formData.skills.includes(skill))
                      .slice(0, 12)
                      .map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => addSkill(skill)}
                          className="p-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          + {skill}
                        </button>
                      ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      id="skills"
                      type="text"
                      placeholder="Add custom skill"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const skill = e.target.value.trim();
                          if (skill && !formData.skills.includes(skill)) {
                            addSkill(skill);
                            e.target.value = '';
                          } else if (formData.skills.includes(skill)) {
                            setErrors(prev => ({ ...prev, skills: 'Skill already added' }));
                          }
                        }
                      }}
                      aria-describedby={errors.skills ? 'skills-error' : undefined}
                    />
                  </div>
                  {errors.skills && <p id="skills-error" className="text-red-500 text-sm mt-2">{errors.skills}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="portfolio">
                    <Upload className="w-4 h-4 inline mr-1" />
                    Portfolio (Optional)
                  </label>
                  <p className="text-sm text-gray-600 mb-3">Upload samples of your work (Images, PDFs - max 5 files, 10MB each)</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                    <input
                      id="portfolio"
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      className="hidden"
                      onChange={handleFileUpload}
                      aria-describedby={errors.portfolio ? 'portfolio-error' : undefined}
                    />
                    <button
                      type="button"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={(e) => {
                        const input = e.currentTarget.parentElement?.querySelector('input[type="file"]');
                        input?.click();
                      }}
                    >
                      Choose Files
                    </button>
                  </div>
                  {errors.portfolio && <p id="portfolio-error" className="text-red-500 text-sm mt-2">{errors.portfolio}</p>}
                  {formData.portfolio.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Selected files:</p>
                      <ul className="space-y-1">
                        {formData.portfolio.map((file, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="flex-1">{file.name}</span>
                            <span className="text-gray-400 ml-2">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <Check className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                      <p className="text-sm text-gray-600">{formData.firstName} {formData.lastName}</p>
                      <p className="text-sm text-gray-600">{formData.email}</p>
                      <p className="text-sm text-gray-600">{formData.city}, {formData.country}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Professional</h3>
                      <p className="text-sm text-gray-600">{formData.title}</p>
                      <p className="text-sm text-gray-600">${formData.hourlyRate}/hour</p>
                      <p className="text-sm text-gray-600">{formData.availability}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.categories.map((category) => (
                        <span key={category} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.slice(0, 10).map((skill) => (
                        <span key={skill} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                      {formData.skills.length > 10 && (
                        <span className="text-gray-500 text-sm">+{formData.skills.length - 10} more</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Terms and Conditions</h3>
                  <div className="text-sm text-gray-600 mb-4 max-h-32 overflow-y-auto">
                    <p className="mb-2">By creating an account, you agree to:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Provide accurate and truthful information</li>
                      <li>Maintain professional conduct with clients</li>
                      <li>Deliver quality work as promised</li>
                      <li>Pay applicable service fees</li>
                      <li>Comply with our community guidelines</li>
                    </ul>
                  </div>
                  
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                      className="mt-1"
                      aria-describedby={errors.agreeToTerms ? 'agreeToTerms-error' : undefined}
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.agreeToTerms && <p id="agreeToTerms-error" className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>}
                </div>
                {errors.submit && <p className="text-red-500 text-sm mt-2">{errors.submit}</p>}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={previousStep}
                disabled={currentStep === 1}
                className="flex items-center px-6 py-3 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 transition-colors"
                aria-label="Previous step"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  aria-label="Next step"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50"
                  aria-label="Create account"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerSignup;