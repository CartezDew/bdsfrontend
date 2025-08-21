import React, { useState, useRef, useEffect } from 'react';
import '../styles/appointment_scheduler.css';

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: service, 2: date, 3: time, 4: contact, 5: files
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '___-___-____'
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fileInputRef = useRef(null);

  // Business hours configuration
  const businessHours = {
    start: 9, // 9 AM
    end: 17, // 5 PM
    timeSlotDuration: 30, // 30 minutes
  };

  // Service options
  const serviceOptions = {
    individual: [
      'Personal Tax Return',
      'Tax Extension',
      'Tax Planning',
      'Tax Audit Support',
      'Prior Year Returns'
    ],
    business: [
      'Business Tax Return',
      'Bookkeeping',
      'Financial Statements',
      'Compliance',
      'Business Advisory',
      'Audit Support'
    ]
  };

  // Validation functions
  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.com');
  };

  const getEmailErrorMessage = (email) => {
    if (!email.includes('@')) {
      return 'Please enter a valid email address';
    }
    if (!email.includes('.com')) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) return false;
    
    // Check if all digits are the same
    const firstDigit = digits[0];
    return !digits.split('').every(digit => digit === firstDigit);
  };

  // Generate available time slots for a given date
  const generateTimeSlots = (date) => {
    const slots = [];
    const startHour = businessHours.start;
    const endHour = businessHours.end;
    const duration = businessHours.timeSlotDuration;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += duration) {
        const time = new Date(date);
        time.setHours(hour, minute, 0, 0);
        
        // Check if it's a weekend
        if (time.getDay() === 0 || time.getDay() === 6) {
          continue;
        }

        // Check if it's outside business hours
        if (hour < startHour || hour >= endHour) {
          continue;
        }

        slots.push(time);
      }
    }

    return slots;
  };

  // Check if a date is available (not blocked out)
  const isDateAvailable = (date) => {
    const today = new Date();
    const twoMonthsFromNow = new Date();
    twoMonthsFromNow.setMonth(today.getMonth() + 2);

    // Block dates more than 2 months out
    if (date > twoMonthsFromNow) {
      return false;
    }

    // Block weekends
    if (date.getDay() === 0 || date.getDay() === 6) {
      return false;
    }

    // Block past dates
    if (date < today) {
      return false;
    }

    return true;
  };

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push(date);
    }

    return days;
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
      const slots = generateTimeSlots(date);
      setAvailableSlots(slots);
      setCurrentStep(3); // Move to time selection
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      return validTypes.includes(file.type);
    });

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  // Remove uploaded file
  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep(4); // Move to contact information
  };

  // Handle contact info change
  const handleContactChange = (field, value) => {
    let formattedValue = value;
    
    // Format phone number with dashes
    if (field === 'phone') {
      const digits = value.replace(/\D/g, '');
      
      // Fill in the dashes as the user types
      if (digits.length === 0) {
        formattedValue = '___-___-____';
      } else if (digits.length === 1) {
        formattedValue = `${digits}__-___-____`;
      } else if (digits.length === 2) {
        formattedValue = `${digits}_-___-____`;
      } else if (digits.length === 3) {
        formattedValue = `${digits}-___-____`;
      } else if (digits.length === 4) {
        formattedValue = `${digits.slice(0, 3)}-${digits.slice(3)}__-____`;
      } else if (digits.length === 5) {
        formattedValue = `${digits.slice(0, 3)}-${digits.slice(3)}_-____`;
      } else if (digits.length === 6) {
        formattedValue = `${digits.slice(0, 3)}-${digits.slice(3)}-____`;
      } else if (digits.length === 7) {
        formattedValue = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}___`;
      } else if (digits.length === 8) {
        formattedValue = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}__`;
      } else if (digits.length === 9) {
        formattedValue = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}_`;
      } else if (digits.length >= 10) {
        formattedValue = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      }
    }
    
    setContactInfo(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

    // Validate contact information
  const validateContactInfo = () => {
    const newErrors = {};
    
    // Check fields in priority order - only show first error
    if (!contactInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!contactInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!contactInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(contactInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (!contactInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(contactInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log('Form submission started!');
    e.preventDefault();
    
    console.log('Validating contact info...');
    if (!validateContactInfo()) {
      console.log('Contact info validation failed');
      return;
    }

    console.log('Setting submitting state...');
    setIsSubmitting(true);
    
    console.log('Starting simulated API call...');
    // Simulate API call
    setTimeout(() => {
      console.log('API call completed, showing success modal');
      setIsSubmitting(false);
      setShowSuccessModal(true);
      // Reset form
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedService('');
      setUploadedFiles([]);
      setContactInfo({ firstName: '', lastName: '', email: '', phone: '___-___-____' });
      setCurrentStep(1);
      setErrors({});
    }, 2000);
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() - 1);
      return newMonth;
    });
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + 1);
      return newMonth;
    });
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="appointment-scheduler">
      <div className="scheduler-header">
        <h3>Schedule Your Appointment</h3>
        <p>Choose a convenient time for your consultation</p>
      </div>

      <form onSubmit={handleSubmit} className="scheduler-form">
        {/* Progress Indicator */}
        <div className="progress-indicator">
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Service</span>
          </div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Date</span>
          </div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Time</span>
          </div>
          <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
            <span className="step-number">4</span>
            <span className="step-label">Contact</span>
          </div>
          <div className={`progress-step ${currentStep >= 5 ? 'active' : ''}`}>
            <span className="step-number">5</span>
            <span className="step-label">Files</span>
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div className="form-section">
            <h4>Select Your Service</h4>
            <div className="form-group">
              <label htmlFor="service">Service Type *</label>
              <select
                id="service"
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                }}
                className={selectedService ? 'selected' : ''}
                required
              >
                <option value="">Select a service</option>
                <optgroup label="Individual Services">
                  {serviceOptions.individual.map((service, index) => (
                    <option key={`ind-${index}`} value={service}>{service}</option>
                  ))}
                </optgroup>
                <optgroup label="Business Services">
                  {serviceOptions.business.map((service, index) => (
                    <option key={`bus-${index}`} value={service}>{service}</option>
                  ))}
                </optgroup>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="referralSource">How did you find us? *</label>
              <select
                id="referralSource"
                value={referralSource}
                onChange={(e) => setReferralSource(e.target.value)}
                className={referralSource ? 'selected' : ''}
                required
              >
                <option value="">Select how you found us</option>
                <option value="Returning Client">Returning Client</option>
                <option value="Walk-in">Walk-in</option>
                <option value="Referral">Referral</option>
                <option value="Word-of-mouth">Word-of-mouth</option>
                <option value="Google Search">Google Search</option>
                <option value="Facebook">Facebook</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram">Instagram</option>
                <option value="Networking Event">Networking Event</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button
                type="button"
                className="next-btn"
                onClick={() => {
                  if (selectedService && referralSource) {
                    setCurrentStep(2);
                  }
                }}
                disabled={!selectedService || !referralSource}
              >
                Continue to Date Selection
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date Selection */}
        {currentStep === 2 && (
          <div className="form-section">
            <h4>Select Date</h4>
            
            <div className="calendar-container">
              <div className="calendar-header">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="calendar-nav-btn"
                >
                  ‹
                </button>
                <h5>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h5>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="calendar-nav-btn"
                >
                  ›
                </button>
              </div>

              <div className="calendar-grid">
                <div className="calendar-weekdays">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>
                
                <div className="calendar-days">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`calendar-day ${
                        day === null ? 'empty' :
                        !isDateAvailable(day) ? 'unavailable' :
                        selectedDate && day.toDateString() === selectedDate.toDateString() ? 'selected' : 'available'
                      }`}
                      onClick={() => day && handleDateSelect(day)}
                    >
                      {day ? day.getDate() : ''}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Time Selection */}
        {currentStep === 3 && selectedDate && (
          <div className="form-section">
            <h4>Select Time for {formatDate(selectedDate)}</h4>
            
            <div className="time-slots">
              <div className="time-grid">
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`time-slot ${
                      selectedTime && selectedTime.getTime() === slot.getTime() ? 'selected' : ''
                    }`}
                    onClick={() => handleTimeSelect(slot)}
                  >
                    {formatTime(slot)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact Information */}
        {currentStep === 4 && (
          <div className="form-section">
            <h4>Contact Information</h4>
            <p>Please provide your contact details to confirm your appointment</p>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  value={contactInfo.firstName}
                  onChange={(e) => handleContactChange('firstName', e.target.value)}
                  className={errors.firstName ? 'error' : ''}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  value={contactInfo.lastName}
                  onChange={(e) => handleContactChange('lastName', e.target.value)}
                  className={errors.lastName ? 'error' : ''}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  value={contactInfo.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  className={errors.phone ? 'error' : ''}
                  placeholder="___-___-____"
                  maxLength="12"
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              {Object.keys(errors).length > 0 && (
                <div className="single-error-message">
                  {(() => {
                    const firstError = Object.entries(errors)[0];
                    if (firstError) {
                      const [field, message] = firstError;
                      return message;
                    }
                    return '';
                  })()}
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  console.log('Button clicked!');
                  console.log('Current contact info:', contactInfo);
                  const isValid = validateContactInfo();
                  console.log('Validation result:', isValid);
                  if (isValid) {
                    setCurrentStep(5);
                  }
                }}
                className="next-btn"
              >
                Continue to File Upload
              </button>
            </div>
          </div>
        )}

        {/* Step 5: File Upload */}
        {currentStep === 5 && (
          <div className="form-section">
            <h4>Upload Documents (Optional)</h4>
            <p>Upload any relevant documents to help us prepare for your appointment</p>
            
            <div className="file-upload-area">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept=".pdf,.xlsx,.xls,.doc,.docx,.jpg,.jpeg,.png,.gif"
                className="file-input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="upload-btn"
              >
                Choose Files
              </button>
              <span className="file-types">
                Accepted: PDF, Excel, Word, Images
              </span>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="uploaded-files">
                <h5>Uploaded Files:</h5>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="file-item">
                    <span className="file-name">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="remove-file-btn"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Message Section */}
            <div className="form-group">
              <label htmlFor="clientMessage">Anything else to share? (Optional)</label>
              <textarea
                id="clientMessage"
                value={clientMessage}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 100) {
                    setClientMessage(value);
                  }
                }}
                placeholder="Share any additional information or questions..."
                maxLength={100}
                rows={3}
                className="message-input"
              />
              <div className="character-count">
                {clientMessage.length}/100 characters
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="back-btn"
              >
                Back to Contact Info
              </button>
            </div>
          </div>
        )}

        {/* Submit Button - Only show on final step */}
        {currentStep === 5 && (
          <div className="form-section">
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || !selectedDate || !selectedTime || !selectedService}
              onClick={() => console.log('Submit button clicked!')}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
            </button>
          </div>
        )}

      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setShowSuccessModal(false)}
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="success-modal-header">
              <h3>Thank You!</h3>
            </div>
            <div className="success-modal-content">
              <div className="success-icon">✓</div>
              <p className="confirmation-message">
                We will contact you shortly to confirm your appointment details.
              </p>
              <p className="closing-message">
                Thank you and have a great day!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentScheduler;
