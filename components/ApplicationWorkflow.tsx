
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  "About You",
  "The Brand",
  "Vision",
  "Growth",
  "Founder Fit"
];

export const ApplicationWorkflow: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for all form fields
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    email: '',
    location: '',
    businessName: '',
    website: '',
    startDate: '',
    // Step 2
    businessDescription: '',
    businessCategories: [] as string[],
    salesChannels: [] as string[],
    revenue: '',
    // Step 3
    startReason: '',
    proudMoment: '',
    growthBlocker: '',
    seriousMeaning: '',
    // Step 4
    currentGoals: [] as string[],
    fundingHistory: '',
    openToMatch: '',
    // Step 5
    supportNeeds: '',
    learningStyle: '',
    readiness: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData((prev: any) => {
      const currentArray = prev[field] || [];
      if (currentArray.includes(value)) {
        return { ...prev, [field]: currentArray.filter((item: string) => item !== value) };
      } else {
        return { ...prev, [field]: [...currentArray, value] };
      }
    });
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    const API_ENDPOINT = "https://formspree.io/f/xanprwzp";

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        if (data.errors) {
          throw new Error(data.errors.map((err: any) => err.message).join(", "));
        } else {
          throw new Error("Failed to submit application");
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "There was an error submitting your application. Please try again.");
    } finally {
      setIsSubmitting(false);
      window.scrollTo(0, 0);
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all placeholder:text-white/20 rounded-none font-light mt-2";
  const labelClasses = "block text-xs uppercase tracking-widest text-white/70 font-bold mt-6 first:mt-0";
  const radioClasses = "w-4 h-4 text-brand-orange bg-transparent border-white/30 focus:ring-brand-orange focus:ring-offset-brand-dark";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-dark text-white font-body pt-24 pb-20 px-4 md:px-6 relative"
    >
      <div className="fixed inset-0 bg-noise pointer-events-none z-0 mix-blend-overlay opacity-30" />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="mb-12">
            <div className="flex justify-between mb-4 relative">
              {/* Connector Line */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -z-10" />

              {steps.map((step, index) => {
                const stepNum = index + 1;
                const isActive = stepNum === currentStep;
                const isCompleted = stepNum < currentStep;

                return (
                  <div key={index} className="flex flex-col items-center bg-brand-dark px-2">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full border text-xs font-mono transition-colors duration-300 ${isActive ? 'border-brand-orange text-brand-orange bg-brand-orange/10' :
                        isCompleted ? 'border-brand-orange bg-brand-orange text-white' :
                          'border-white/20 text-white/30'
                        }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                    </div>
                    <span className={`mt-2 text-[10px] uppercase tracking-widest hidden md:block ${isActive ? 'text-white' : 'text-white/30'}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="text-center md:hidden">
              <span className="text-xs uppercase tracking-widest text-brand-orange">Section {currentStep}: {steps[currentStep - 1]}</span>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white/5 border border-white/10 p-6 md:p-12 relative backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 mx-auto bg-brand-orange/10 rounded-full flex items-center justify-center border border-brand-orange mb-6">
                  <Check className="w-10 h-10 text-brand-orange" />
                </div>
                <h2 className="font-display font-bold text-3xl text-brand-orange mb-4">Application Submitted!</h2>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  You'll hear from us soon. If you're a fit for Compound, you'll get next steps on what to expect. If not, we'll still point you toward the right resources.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-brand-dark uppercase tracking-widest text-sm transition-colors"
                >
                  Return Home
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-200 text-sm">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    {error}
                  </div>
                )}

                {/* STEP 1: ABOUT YOU */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl mb-8 text-center">Section One: About You</h2>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClasses}>Enter your Full Name</label>
                        <input
                          type="text"
                          className={inputClasses}
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Enter your email *</label>
                        <input
                          type="email"
                          className={inputClasses}
                          placeholder="hello@companyname.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>Enter your Location (City, Province)</label>
                        <input
                          type="text"
                          className={inputClasses}
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>What is your Business name?</label>
                        <input
                          type="text"
                          className={inputClasses}
                          value={formData.businessName}
                          onChange={(e) => handleInputChange('businessName', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>What is your Business website/Instagram?</label>
                        <input
                          type="text"
                          className={inputClasses}
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>When did you start your business?</label>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          {['Just Starting', 'Less than one (1) year ago', '1-3 years ago', '3+ years ago'].map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="radio"
                                name="startDate"
                                className={radioClasses}
                                checked={formData.startDate === opt}
                                onChange={() => handleInputChange('startDate', opt)}
                              />
                              <span className="text-sm text-white/70 group-hover:text-white">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: THE BRAND */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl mb-8 text-center">Section Two: The Brand</h2>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClasses}>Tell us what your business sells</label>
                        <textarea
                          rows={4}
                          className={`${inputClasses} resize-none`}
                          placeholder="Type your message..."
                          value={formData.businessDescription}
                          onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>What industry is your business in? (Select all that apply)</label>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {['Beauty & Skincare', 'Fashion & Accessories', 'Food & Beverage', 'Home & Lifestyle', 'Stationery & Gifting', 'Other'].map(opt => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                className="w-4 h-4 border-white/30 rounded-sm bg-transparent text-brand-orange focus:ring-brand-orange"
                                checked={(formData.businessCategories || []).includes(opt)}
                                onChange={() => handleCheckboxChange('businessCategories', opt)}
                              />
                              <span className="text-sm text-white/70 group-hover:text-white">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className={labelClasses}>Where can customers currently buy your product? (Select all that apply)</label>
                        <div className="grid grid-cols-2 gap-3 mt-3">
                          {['My own website', 'Instagram/Facebook', 'Etsy or Marketplace', 'Retail stores or stockists', 'Pop-up or vendor markets', 'Not yet selling'].map(opt => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                className="w-4 h-4 border-white/30 rounded-sm bg-transparent text-brand-orange focus:ring-brand-orange"
                                checked={(formData.salesChannels || []).includes(opt)}
                                onChange={() => handleCheckboxChange('salesChannels', opt)}
                              />
                              <span className="text-sm text-white/70 group-hover:text-white">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className={labelClasses}>Monthly Revenue (we ask this to understand your stage—not to judge)</label>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          {['Not generating revenue yet', 'Under $1K/month', '$1K-$5K/month', '$5K-$20K/month', '$20K+/month'].map(opt => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="radio"
                                name="revenue"
                                className={radioClasses}
                                checked={formData.revenue === opt}
                                onChange={() => handleInputChange('revenue', opt)}
                              />
                              <span className="text-sm text-white/70 group-hover:text-white">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: VISION & READINESS */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl mb-8 text-center">Section Three: Vision & Readiness</h2>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClasses}>Why did you start your business?</label>
                        <input
                          type="text"
                          className={inputClasses}
                          value={formData.startReason}
                          onChange={(e) => handleInputChange('startReason', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>What's one thing you're proud of so far?</label>
                        <input
                          type="text"
                          className={inputClasses}
                          value={formData.proudMoment}
                          onChange={(e) => handleInputChange('proudMoment', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>What's holding you back from growing faster right now?</label>
                        <input
                          type="text"
                          className={inputClasses}
                          value={formData.growthBlocker}
                          onChange={(e) => handleInputChange('growthBlocker', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>What does "taking your business seriously" look like to you?</label>
                        <textarea
                          rows={4}
                          className={`${inputClasses} resize-none`}
                          placeholder="Type your message..."
                          value={formData.seriousMeaning}
                          onChange={(e) => handleInputChange('seriousMeaning', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: GROWTH POTENTIAL */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl mb-8 text-center">Section Four: Growth Potential</h2>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClasses}>What are your current goals for your business? (Check up to 3)</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                          {['Increase sales', 'Find funding or capital', 'Get into retail', 'Improve my operations/inventory', 'Build a recognizable brand', 'Make this my full-time income', 'Expand product line', 'Collaborate with other brands'].map(opt => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                className="w-4 h-4 border-white/30 rounded-sm bg-transparent text-brand-orange focus:ring-brand-orange"
                                checked={(formData.currentGoals || []).includes(opt)}
                                onChange={() => handleCheckboxChange('currentGoals', opt)}
                              />
                              <span className="text-sm text-white/70 group-hover:text-white">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className={labelClasses}>Have you ever received funding, grants, or investment before?</label>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="fundingHistory"
                              className={radioClasses}
                              checked={formData.fundingHistory === 'Yes'}
                              onChange={() => handleInputChange('fundingHistory', 'Yes')}
                            />
                            <span className="text-sm text-white/70 group-hover:text-white">Yes</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <input
                              type="radio"
                              name="fundingHistory"
                              className={radioClasses}
                              checked={formData.fundingHistory === 'No'}
                              onChange={() => handleInputChange('fundingHistory', 'No')}
                            />
                            <span className="text-sm text-white/70 group-hover:text-white">No</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className={labelClasses}>Are you open to being matched with investors, retailers, or collaborators?</label>
                        <div className="grid grid-cols-3 gap-4 mt-3">
                          {['Yes', 'Maybe, tell me more', 'No'].map(opt => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="radio"
                                name="openToMatch"
                                className={radioClasses}
                                checked={formData.openToMatch === opt}
                                onChange={() => handleInputChange('openToMatch', opt)}
                              />
                              <span className="text-sm text-white/70 group-hover:text-white">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: FOUNDER FIT */}
                {currentStep === 5 && (
                  <div>
                    <h2 className="font-display font-bold text-2xl md:text-3xl mb-8 text-center">Section Five: Founder Fit</h2>
                    <div className="space-y-6">
                      <div>
                        <label className={labelClasses}>What kind of support are you looking for right now?</label>
                        <textarea
                          rows={4}
                          className={`${inputClasses} resize-none`}
                          placeholder="Type your message..."
                          value={formData.supportNeeds}
                          onChange={(e) => handleInputChange('supportNeeds', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClasses}>How do you learn best?</label>
                        <div className="space-y-3 mt-3">
                          {['I like structured programs with clear steps', 'I prefer bite-sized resources I can access on my own time', 'I need accountability and community', 'I just want opportunities, not another course'].map(opt => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                              <input
                                type="radio"
                                name="learningStyle"
                                className={radioClasses}
                                checked={formData.learningStyle === opt}
                                onChange={() => handleInputChange('learningStyle', opt)}
                              />
                              <span className="text-sm text-white/70 group-hover:text-white">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className={labelClasses}>Are you ready to grow—with us in your corner? (This one's just for you)</label>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          {['I\'m curious', 'I\'m committed', 'I\'m coasting but ready to shift'].map(opt => (
                            <label key={opt} className={`flex items-center gap-3 cursor-pointer group ${opt.includes('coasting') ? 'col-span-2' : ''}`}>
                              <input
                                type="radio"
                                name="readiness"
                                className={radioClasses}
                                checked={formData.readiness === opt}
                                onChange={() => handleInputChange('readiness', opt)}
                              />
                              <span className="text-sm text-white/70 group-hover:text-white">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
                  {currentStep > 1 ? (
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white hover:bg-white hover:text-brand-dark uppercase tracking-widest text-sm transition-colors"
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  ) : (
                    <div /> // Spacer
                  )}

                  {currentStep < 5 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-8 py-3 bg-brand-orange text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-orange transition-colors"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3 bg-brand-orange text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-brand-orange transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Submit Application'}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
