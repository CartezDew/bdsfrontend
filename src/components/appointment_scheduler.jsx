/*
 * APPOINTMENT SCHEDULER COMPONENT
 * 
 * TROUBLESHOOTING NOTES - Duplicate ID Issue (Resolved)
 * ===================================================
 * 
 * ISSUE: "Schedule Consultation" buttons were not working - could not find appointment-scheduler element
 * 
 * ROOT CAUSE: Duplicate DOM IDs causing element selection conflicts
 * - OfficeHoursLocations.jsx had: <div id="appointment-scheduler">
 * - AppointmentScheduler.jsx had: <div id="appointment-scheduler">
 * - This created invalid HTML (duplicate IDs) and prevented querySelector from working properly
 * 
 * SYMPTOMS:
 * - console.log showed "Scheduler element found: null"
 * - Buttons appeared to do nothing when clicked
 * - Both direct scroll and state-based navigation failed
 * 
 * SOLUTION: Remove duplicate ID from AppointmentScheduler component
 * - Keep id="appointment-scheduler" only in OfficeHoursLocations.jsx wrapper
 * - Remove id="appointment-scheduler" from this component's root div
 * - Use only className="appointment-scheduler" for styling
 * 
 * PREVENTION: 
 * - Never use the same ID in parent and child components
 * - IDs must be unique across the entire DOM
 * - Use classes for styling, IDs only for unique element identification
 * - When wrapping components, ensure only one element has the target ID
 * 
 * RELATED FILES:
 * - src/components/OfficeHoursLocations.jsx (keeps the ID)
 * - src/components/appointment_scheduler.jsx (removed duplicate ID)
 * - src/components/GetStarted.jsx (scrolls to #appointment-scheduler)
 * - src/components/NavbarMobile.jsx (scrolls to #appointment-scheduler)
 * - src/App.jsx (handles state-based navigation to appointment-scheduler)
 * 
 * Last Updated: [Current Date]
 */

import React, { useState, useRef, useEffect } from 'react';
import '../styles/appointment_scheduler.css';
import CustomSelect from './CustomSelect';

const AppointmentScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [consultationDuration, setConsultationDuration] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: service, 2: date, 3: time, 4: contact, 5: files, 6: finalize
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '___-___-____'
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [animationsTriggered, setAnimationsTriggered] = useState(false);
  const [showDisabledButtonNote, setShowDisabledButtonNote] = useState(false);
  const [contactErrorShown, setContactErrorShown] = useState(false);
  const [consentErrorShown, setConsentErrorShown] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const stripeCheckoutUrl = 'https://buy.stripe.com/test_1234567890abcdef';
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardFirstName, setCardFirstName] = useState('');
  const [cardLastName, setCardLastName] = useState('');
  const [cardZip, setCardZip] = useState('');
  const [paymentError, setPaymentError] = useState('');

  const fileInputRef = useRef(null);
  const schedulerRef = useRef(null);
  const formRef = useRef(null);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationsTriggered) {
            setAnimationsTriggered(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (schedulerRef.current) {
      observer.observe(schedulerRef.current);
    }

    return () => observer.disconnect();
  }, [animationsTriggered]);

  // Business hours configuration
  const businessHours = {
    start: 9, // 9 AM
    end: 17, // 5 PM
    timeSlotDuration: 30, // 30 minutes
  };

  // Service options
  const serviceOptions = {
    individual: [
      { label: 'Personal Tax Return', value: 'individual-tax-returns' },
      { label: 'Bookkeeping', value: 'individual-bookkeeping' },
      { label: 'Compliance', value: 'individual-compliance' },
      { label: 'Reporting', value: 'individual-reporting' },
      { label: 'Tax Extensions', value: 'individual-tax-extensions' },
      { label: 'Tax Notices', value: 'individual-tax-notices' },
    ],
    business: [
      { label: 'Business Tax Return', value: 'business-tax-returns' },
      { label: 'Payroll Services', value: 'business-payroll' },
      { label: 'Bookkeeping', value: 'business-bookkeeping' },
      { label: 'Compliance', value: 'business-compliance' },
      { label: 'Reporting', value: 'business-reporting' },
      { label: 'Tax Extensions', value: 'business-tax-extensions' },
      { label: 'Advisory', value: 'business-advisory' },
      { label: 'Tax Notices', value: 'business-tax-notices' },
    ]
  };

  // Consultation duration options with pricing
  const consultationDurationOptions = [
    { label: '(30 Min) Consultation - $75', value: '30min', price: 75 },
    { label: '(1 Hour) Consultation - $150', value: '1hour', price: 150 }
  ];

  // Validation functions
  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.');
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
    e.preventDefault();
    
    if (!validateContactInfo()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      // Reset form
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedService('');
      setConsultationDuration('');
      setReferralSource('');
      setUploadedFiles([]);
      setContactInfo({ firstName: '', lastName: '', email: '', phone: '___-___-____' });
      setCurrentStep(1);
      setErrors({});
    }, 2000);
  };

  // Handle disabled button click
  const handleDisabledButtonClick = () => {
    setShowDisabledButtonNote(true);
    // Hide the note after 3 seconds
    setTimeout(() => {
      setShowDisabledButtonNote(false);
    }, 3000);
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

  const getStepTitle = (step) => {
    switch (step) {
      case 1: return 'Service';
      case 2: return 'Date';
      case 3: return 'Time';
      case 4: return 'Contact';
      case 5: return 'Files';
      case 6: return 'Finalize';
      default: return '';
    }
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Compute the first contact error without mutating state
  const getFirstContactError = () => {
    if (!contactInfo.firstName.trim()) {
      return { field: 'firstName', message: 'First name is required' };
    }
    if (!contactInfo.lastName.trim()) {
      return { field: 'lastName', message: 'Last name is required' };
    }
    if (!contactInfo.email.trim()) {
      return { field: 'email', message: 'Email is required' };
    }
    if (!validateEmail(contactInfo.email)) {
      return { field: 'email', message: 'Please enter a valid email address' };
    }
    if (!contactInfo.phone.trim()) {
      return { field: 'phone', message: 'Phone number is required' };
    }
    if (!validatePhone(contactInfo.phone)) {
      return { field: 'phone', message: 'Please enter a valid phone number' };
    }
    return null;
  };

  return (
    <div 
      id="appointment-scheduler"
      ref={schedulerRef}
      className={`appointment-scheduler ${animationsTriggered ? 'animate-in' : ''} ${currentStep === 6 ? 'at-finalize' : ''}`}
    >
      <div className={`scheduler-header ${animationsTriggered ? 'animate-in' : ''}`}>
        <h3>Schedule Your Consultation</h3>
        <p>Choose a time that fits your schedule to discuss your needs</p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="scheduler-form">
        {/* Progress Indicator */}
        <div className={`progress-indicator ${animationsTriggered ? 'animate-in' : ''}`}>
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${animationsTriggered ? 'animate-in' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Service</span>
          </div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${animationsTriggered ? 'animate-in' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Date</span>
          </div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${animationsTriggered ? 'animate-in' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Time</span>
          </div>
          <div className={`progress-step ${currentStep >= 4 ? 'active' : ''} ${animationsTriggered ? 'animate-in' : ''}`}>
            <span className="step-number">4</span>
            <span className="step-label">Contact</span>
          </div>
          <div className={`progress-step ${currentStep >= 5 ? 'active' : ''} ${animationsTriggered ? 'animate-in' : ''}`}>
            <span className="step-number">5</span>
            <span className="step-label">Files</span>
          </div>
          <div className={`progress-step ${currentStep >= 6 ? 'active' : ''} ${animationsTriggered ? 'animate-in' : ''}`}>
            <span className="step-number">6</span>
            <span className="step-label">Finalize</span>
          </div>
        </div>

        {/* Compact segmented progress for very small screens (<=450px) */}
        <div className={`progress-compact ${animationsTriggered ? 'animate-in' : ''}`}>
          <div className="progress-compact-header">{`Step ${currentStep} of 6 — ${getStepTitle(currentStep)}`}</div>
          <div className="segmented-progress" aria-hidden="true">
            {[1,2,3,4,5,6].map((n) => (
              <div
                key={n}
                className={`segment ${currentStep > n ? 'complete' : ''} ${currentStep === n ? 'current' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div className={`form-section ${animationsTriggered ? 'animate-in' : ''}`}>
            <h4>Select Your Service</h4>
            <div className={`form-group ${animationsTriggered ? 'animate-in' : ''}`}>
                                      <label htmlFor="service" className="required-field">Service Type</label>
              <CustomSelect
                id="service"
                placeholder="Select a service"
                value={selectedService}
                onChange={(val) => setSelectedService(val)}
                required
                options={[
                  { label: 'Individual Services', options: serviceOptions.individual },
                  { label: 'Business Services', options: serviceOptions.business },
                ]}
              />
            </div>
            
            <div className={`form-group ${animationsTriggered ? 'animate-in' : ''}`}>
              <label htmlFor="consultationDuration" className="required-field">Consultation Duration</label>
              <CustomSelect
                id="consultationDuration"
                placeholder="Select a duration"
                value={consultationDuration}
                onChange={(val) => setConsultationDuration(val)}
                required
                options={consultationDurationOptions}
              />
              {consultationDuration && (
                <div className="consultation-summary">
                  <span className="consultation-duration">
                    {consultationDuration === '30min' ? '30 Minute Consultation' : '1 Hour Consultation'}
                  </span>
                  <span className="consultation-price">
                    ${consultationDuration === '30min' ? '75' : '150'}
                  </span>
                </div>
              )}
            </div>
            
            <div className={`form-group ${animationsTriggered ? 'animate-in' : ''}`}>
              <label htmlFor="referralSource" className="required-field">How did you find us?</label>
              <CustomSelect
                id="referralSource"
                placeholder="Select how you found us"
                value={referralSource}
                onChange={(val) => setReferralSource(val)}
                required
                options={[
                  'Returning Client',
                  'Walk-in',
                  'Referral',
                  'Word-of-mouth',
                  'Google Search',
                  'Facebook',
                  'LinkedIn',
                  'Instagram',
                  'Networking Event',
                  'Other',
                ]}
              />
            </div>
            
            <div className="form-actions">
              {showDisabledButtonNote && (!selectedService || !consultationDuration || !referralSource) && (
                <div className="disabled-button-note">
                  Please complete all required fields to continue
                </div>
              )}
              <button
                type="button"
                className={`next-btn ${(!selectedService || !consultationDuration || !referralSource) ? 'disabled' : ''}`}
                onClick={() => {
                  if (selectedService && consultationDuration && referralSource) {
                    setCurrentStep(2);
                  } else {
                    handleDisabledButtonClick();
                  }
                }}
              >
                Continue to Date Selection
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date Selection */}
        {currentStep === 2 && (
          <div className={`form-section ${animationsTriggered ? 'animate-in' : ''}`}>
            <h4>Select Date</h4>
            
            <div className={`calendar-container ${animationsTriggered ? 'animate-in' : ''}`}>
              <div className={`calendar-header ${animationsTriggered ? 'animate-in' : ''}`}>
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

              <div className={`calendar-grid ${animationsTriggered ? 'animate-in' : ''}`}>
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
                      className={`calendar-day ${animationsTriggered ? 'animate-in' : ''} ${
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
              
              {/* Go Back Button */}
              <div className="calendar-actions">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="go-back-btn"
                  aria-label="Go back to service selection"
                >
                  <span className="back-arrow">←</span>
                  <span className="back-text">Go Back</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Time Selection */}
        {currentStep === 3 && selectedDate && (
          <div className={`form-section ${animationsTriggered ? 'animate-in' : ''}`}>
            <h4>Select Time for {formatDate(selectedDate)}</h4>
            
            <div className="time-slots">
              <div className={`time-grid ${animationsTriggered ? 'animate-in' : ''}`}>
                {availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`time-slot ${animationsTriggered ? 'animate-in' : ''} ${
                      selectedTime && selectedTime.getTime() === slot.getTime() ? 'selected' : ''
                    }`}
                    onClick={() => handleTimeSelect(slot)}
                  >
                    {formatTime(slot)}
                  </button>
                ))}
              </div>
              
              {/* Go Back Button */}
              <div className="time-actions">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="go-back-btn time-go-back"
                  aria-label="Go back to date selection"
                >
                  <span className="back-arrow">←</span>
                  <span className="back-text">Go Back</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact Information */}
        {currentStep === 4 && (
          <div className={`form-section ${animationsTriggered ? 'animate-in' : ''}`}>
            <h4>Contact Information</h4>
            <p>Please provide your contact details to confirm your appointment</p>
            
            <div className={`form-row ${animationsTriggered ? 'animate-in' : ''}`}>
              <div className={`form-group ${animationsTriggered ? 'animate-in' : ''}`}>
                                        <label htmlFor="firstName" className="required-field">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={contactInfo.firstName}
                  onChange={(e) => handleContactChange('firstName', e.target.value)}
                  className={errors.firstName ? 'error' : ''}
                  required
                />
              </div>

              <div className={`form-group ${animationsTriggered ? 'animate-in' : ''}`}>
                                        <label htmlFor="lastName" className="required-field">Last Name</label>
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

            <div className={`form-row ${animationsTriggered ? 'animate-in' : ''}`}>
              <div className={`form-group ${animationsTriggered ? 'animate-in' : ''}`}>
                                        <label htmlFor="email" className="required-field">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className={errors.email ? 'error' : ''}
                  required
                />
              </div>

              <div className={`form-group ${animationsTriggered ? 'animate-in' : ''}`}>
                                        <label htmlFor="phone" className="required-field">Phone Number</label>
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
              {contactErrorShown && (() => {
                const firstErr = getFirstContactError();
                return firstErr ? (
                  <div className="single-error-message" style={{ marginBottom: '0.75rem' }}>
                    {firstErr.message}
                  </div>
                ) : null;
              })()}

              <button
                type="button"
                onClick={() => {
                  setContactErrorShown(true);
                  const firstErr = getFirstContactError();
                  const isValid = !firstErr;
                  if (isValid) {
                    setErrors({});
                    setContactErrorShown(false);
                    setCurrentStep(5);
                  } else {
                    setErrors({ [firstErr.field]: firstErr.message });
                    handleDisabledButtonClick();
                  }
                }}
                aria-disabled={!!getFirstContactError()}
                className={`next-btn ${getFirstContactError() ? 'disabled' : ''}`}
              >
                Continue to File Upload
              </button>

              {/* Go Back Button - Below Continue button */}
              <div className="contact-actions">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="go-back-btn contact-go-back"
                  aria-label="Go back to time selection"
                >
                  <span className="back-arrow">←</span>
                  <span className="back-text">Go Back</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: File Upload */}
        {currentStep === 5 && (
          <div className={`form-section ${animationsTriggered ? 'animate-in' : ''}`}>
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
            <div className={`form-group ${animationsTriggered ? 'animate-in' : ''}`}>
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

            {/* Consent Checkbox */}
            <div className={`consent-section ${animationsTriggered ? 'animate-in' : ''}`}>
              <div className="consent-checkbox">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consentChecked}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setConsentChecked(checked);
                    if (checked) {
                      setCurrentStep(6);
                    }
                  }}
                  required
                />
                <label htmlFor="consent" className="consent-label">
                  I authorize BDS Talent Group to collect, use, and process my personal and tax information for the purpose of performing the services requested. I certify that all information supplied is accurate and complete to the best of my knowledge.
                </label>
              </div>
              {!consentChecked && consentErrorShown && (
                <div className="consent-error">
                  You must agree to the consent terms before proceeding.
                </div>
              )}
            </div>

            <div className="form-actions">
              {/* Quick hint if submit is disabled */}
              {consentErrorShown && (!selectedService || !consultationDuration || !selectedDate || !selectedTime || !consentChecked) && (
                <div className="disabled-button-note" style={{ marginBottom: '0.75rem' }}>
                  {`To submit, complete: ${[
                    !selectedService ? 'Service' : null,
                    !consultationDuration ? 'Consultation Duration' : null,
                    !selectedDate ? 'Date' : null,
                    !selectedTime ? 'Time' : null,
                    !consentChecked ? 'Consent' : null,
                  ].filter(Boolean).join(', ')}`}
                </div>
              )}
              <button
                type="button"
                className={`next-btn ${!consentChecked ? 'disabled' : ''}`}
                aria-disabled={!consentChecked}
                onClick={() => {
                  if (!consentChecked) {
                    setConsentErrorShown(true);
                    return;
                  }
                  setCurrentStep(6);
                }}
              >
                Finalize Payment
              </button>
            </div>

            {/* Go Back Button - Below form actions */}
            <div className="contact-actions">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="go-back-btn contact-go-back"
                aria-label="Go back to contact information"
              >
                <span className="back-arrow">←</span>
                <span className="back-text">Go Back</span>
              </button>
            </div>
          </div>
        )}

        {/* Submit Button - Only show on final step */}
        {currentStep === 6 && (
          <div className={`form-section ${animationsTriggered ? 'animate-in' : ''}`}>
            <h4>Finalize Consultation</h4>
            <div className={`form-group ${animationsTriggered ? 'animate-in' : ''}`}>
              <label htmlFor="paymentMethod" className="required-field">Payment Method</label>
              <div className="payment-methods" id="paymentMethod">
                <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={() => setPaymentMethod('stripe')}
                  />
                  Pay with Stripe
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', opacity: .6 }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  Enter card details on site (demo only)
                </label>
              </div>
            </div>

            {paymentMethod === 'stripe' && (
              <div className={`form-group ${animationsTriggered ? 'animate-in' : ''}`}>
                <a
                  href={stripeCheckoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="upload-btn"
                  onClick={() => setPaymentConfirmed(true)}
                >
                  Proceed to Stripe Checkout
                </a>
                {paymentConfirmed && (
                  <div className="disabled-button-note" style={{ marginTop: '.5rem' }}>
                    Payment confirmed for {consultationDuration === '30min' ? '$75' : '$150'} (simulated)
                  </div>
                )}
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className={`form-group ${animationsTriggered ? 'animate-in' : ''}`}>
                <label className="required-field">Name</label>
                <div className="form-row">
                  <div className="form-group">
                    <input id="cardFirstName" type="text" className="message-input" value={cardFirstName} onChange={(e) => { setCardFirstName(e.target.value); setPaymentConfirmed(false); }} placeholder="First Name" aria-label="First Name" />
                  </div>
                  <div className="form-group">
                    <input id="cardLastName" type="text" className="message-input" value={cardLastName} onChange={(e) => { setCardLastName(e.target.value); setPaymentConfirmed(false); }} placeholder="Last Name" aria-label="Last Name" />
                  </div>
                </div>

                <label className="required-field" style={{ marginTop: '.75rem' }}>Card Details</label>
                <input type="text" placeholder="Card Number" className="message-input" value={cardNumber} onChange={(e) => { setCardNumber(e.target.value); setPaymentConfirmed(false); }} style={{ marginTop: '.5rem' }} />
                <div className="form-row" style={{ marginTop: '.5rem' }}>
                  <input type="text" placeholder="MM/YY" className="message-input" value={cardExpiry} onChange={(e) => { setCardExpiry(e.target.value); setPaymentConfirmed(false); }} />
                  <input type="text" placeholder="CVC" className="message-input" value={cardCvc} onChange={(e) => { setCardCvc(e.target.value); setPaymentConfirmed(false); }} />
                </div>
                <div className="form-group" style={{ marginTop: '.5rem' }}>
                  <label htmlFor="cardZip" className="required-field">Postal Code</label>
                  <input id="cardZip" type="text" className="message-input" value={cardZip} onChange={(e) => { setCardZip(e.target.value); setPaymentConfirmed(false); }} placeholder="Postal Code" />
                </div>
                {paymentError && <div className="error-message" style={{ marginTop: '.25rem' }}>{paymentError}</div>}
                <button type="button" className="next-btn" style={{ marginTop: '.75rem', marginBottom: '1rem' }} onClick={() => {
                  if (!cardFirstName.trim() || !cardLastName.trim() || !cardZip.trim() || !cardNumber.trim() || !cardExpiry.trim() || !cardCvc.trim()) {
                    setPaymentError('Please complete all card details');
                    setPaymentConfirmed(false);
                    return;
                  }
                  setPaymentError('');
                  setPaymentConfirmed(true);
                }}>
                  Save Card (Demo)
                </button>
                {paymentConfirmed && (
                  <div className="disabled-button-note" style={{ marginTop: '.5rem' }}>
                    Card saved (demo). You can now schedule.
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              className={`submit-btn ${animationsTriggered ? 'animate-in' : ''} ${!selectedDate || !selectedTime || !selectedService || !consultationDuration || !consentChecked || !paymentConfirmed ? 'disabled' : ''}`}
              aria-disabled={!selectedDate || !selectedTime || !selectedService || !consultationDuration || !consentChecked || !paymentConfirmed ? 'true' : 'false'}
              title={!selectedService || !consultationDuration || !selectedDate || !selectedTime || !consentChecked || !paymentConfirmed ? 'Complete all required fields (Service, Consultation Duration, Date, Time, Consent, Payment)' : ''}
              onClick={() => {
                if (!selectedDate || !selectedTime || !selectedService || !consultationDuration || !consentChecked || !paymentConfirmed) {
                  setConsentErrorShown(true);
                  return;
                }
                formRef.current && formRef.current.requestSubmit();
              }}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
            </button>

            {/* Go Back Button - Below schedule button */}
            <div className="contact-actions">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="go-back-btn contact-go-back"
                aria-label="Go back to file upload"
              >
                <span className="back-arrow">←</span>
                <span className="back-text">Go Back</span>
              </button>
            </div>
          </div>
        )}

      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className={`success-modal show`} onClick={(e) => e.stopPropagation()}>
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
