import React, { useState, useRef, useEffect } from 'react';
import Footer from './Footer';
import '../styles/getStarted.css';
import '../styles/dropdown_reusable.css';
import CustomSelect from './CustomSelect';
import Image2 from '../assets/Detailed_Services_Images/Image_2.jpg';

const GetStarted = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: service, 2: contact, 3: files
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    einOrSsn: '',
    dateOfBirth: '',
    phone: '___-___-____',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    occupation: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showMouseIndicator, setShowMouseIndicator] = useState(true);

  const fileInputRef = useRef(null);
  const schedulerRef = useRef(null);

  // Basic SEO meta for this route
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Get Started | Schedule Consultation or Upload Documents | BDS Talent Group';
    const ensureMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    ensureMeta('description', 'Get started with BDS Talent Group: securely upload tax documents or schedule a free consultation for bookkeeping, payroll, and advisory services.');
    ensureMeta('robots', 'index,follow');
    // canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', window.location.origin + '/get-started');
    return () => { document.title = prevTitle; };
  }, []);

  // Hide mouse indicator when scheduler comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowMouseIndicator(false);
          } else {
            setShowMouseIndicator(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (schedulerRef.current) {
      observer.observe(schedulerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reveal-on-scroll animations when elements are within 5% of viewport
  useEffect(() => {
    const selectors = [
      '.getstarted-header',
      '.getstarted-progress-indicator',
      '.getstarted-form-section',
      '.getstarted-form-row',
      '.getstarted-form-group',
      '.getstarted-still-unsure-section .getstarted-still-unsure-bento > *',
      '.getstarted-fact',
      '.getstarted-uploaded-files',
      '.getstarted-file-item',
      '.getstarted-consent-section',
      '.getstarted-scheduler'
    ].join(',');

    const elements = Array.from(document.querySelectorAll(selectors));
    elements.forEach(el => el.classList.add('gs-animate'));

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('gs-in-view');
          obs.unobserve(entry.target); // animate once
        }
      })
    }, { threshold: 0.05 });

    elements.forEach(el => io.observe(el));

    return () => io.disconnect();
  }, []);

  // On-load animations for header and FAQ facts
  useEffect(() => {
    const header = document.querySelector('.get-started-header')
    if (header) {
      header.classList.add('gs-fade-in-up')
    }
    const facts = Array.from(document.querySelectorAll('.getstarted-facts-accordion .getstarted-fact'))
    facts.forEach((el, idx) => {
      el.style.setProperty('--gs-delay', `${idx * 120}ms`)
      el.classList.add('gs-fall-in')
    })
  }, [])

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
    return email.includes('@') && email.includes('.');
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) return false;
    
    // Check if all digits are the same
    const firstDigit = digits[0];
    return !digits.split('').every(digit => digit === firstDigit);
  };

  // FAQ toggle function
  const toggleFaq = (faqId) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
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
    
    // Check required fields in priority order - only show first error
    if (!contactInfo.firstName || !contactInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!contactInfo.lastName || !contactInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!contactInfo.einOrSsn || !contactInfo.einOrSsn.trim()) {
      newErrors.einOrSsn = 'EIN or SSN is required';
    } else if (!contactInfo.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!contactInfo.phone || !contactInfo.phone.trim() || contactInfo.phone === '___-___-____') {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(contactInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    } else if (!contactInfo.email || !contactInfo.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(contactInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (!contactInfo.occupation || !contactInfo.occupation.trim()) {
      newErrors.occupation = 'Occupation is required';
    } else if (!contactInfo.streetAddress || !contactInfo.streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required';
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

    console.log('Checking consent...');
    if (!consentChecked) {
      console.log('Consent not checked');
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
      setContactInfo({
        firstName: '',
        lastName: '',
        einOrSsn: '',
        dateOfBirth: '',
        phone: '___-___-____',
        email: '',
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        occupation: ''
      });
      setCurrentStep(1);
      setErrors({});
      setConsentChecked(false);
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
    <>
      <section className="get-started-page">
        <div className="get-started-container">
          <div className="get-started-header">
            <h1>Ready to Start? Upload & Go</h1>
            <p>No scheduling, no waiting. Upload now and we’ll take it from here.</p>
          </div>

          {/* Tiny FAQ Section */}
          <div className="getstarted-faq-section">
            <ul className="getstarted-facts-accordion">
              <li className={`getstarted-fact ${openFaq === 1 ? 'open' : ''}`}>
                <button 
                  type="button"
                  className="getstarted-fact-trigger"
                  aria-expanded={openFaq === 1}
                  aria-controls="getstarted-fact-panel-1"
                  id="getstarted-fact-trigger-1"
                  onClick={() => toggleFaq(1)}
                >
                  <span className="getstarted-chev" aria-hidden></span>
                  <span>Do I need an appointment?</span>
                </button>
                <div
                  id="getstarted-fact-panel-1"
                  role="region"
                  aria-labelledby="getstarted-fact-trigger-1"
                  className="getstarted-fact-panel"
                  style={{ maxHeight: openFaq === 1 ? '100px' : '0' }}
                >
                  <div>
                    <p>No—upload your documents and we'll start.</p>
                  </div>
                </div>
              </li>

              <li className={`getstarted-fact ${openFaq === 2 ? 'open' : ''}`}>
                <button 
                  type="button"
                  className="getstarted-fact-trigger"
                  aria-expanded={openFaq === 2}
                  aria-controls="getstarted-fact-panel-2"
                  id="getstarted-fact-trigger-2"
                  onClick={() => toggleFaq(2)}
                >
                  <span className="getstarted-chev" aria-hidden></span>
                  <span>What happens after I upload?</span>
                </button>
                <div
                  id="getstarted-fact-panel-2"
                  role="region"
                  aria-labelledby="getstarted-fact-trigger-2"
                  className="getstarted-fact-panel"
                  style={{ maxHeight: openFaq === 2 ? '100px' : '0' }}
                >
                  <div>
                    <p>We review your uploaded files and reach out with next steps.</p>
                  </div>
                </div>
              </li>

              <li className={`getstarted-fact ${openFaq === 3 ? 'open' : ''}`}>
                <button 
                  type="button"
                  className="getstarted-fact-trigger"
                  aria-expanded={openFaq === 3}
                  aria-controls="getstarted-fact-panel-3"
                  id="getstarted-fact-trigger-3"
                  onClick={() => toggleFaq(3)}
                >
                  <span className="getstarted-chev" aria-hidden></span>
                  <span>What if I'm missing a form?</span>
                </button>
                <div
                  id="getstarted-fact-panel-3"
                  role="region"
                  aria-labelledby="getstarted-fact-trigger-3"
                  className="getstarted-fact-panel"
                  style={{ maxHeight: openFaq === 3 ? '100px' : '0' }}
                >
                  <div>
                    <p>Upload what you have; we'll request anything else.</p>
                  </div>
                </div>
              </li>

              <li className={`getstarted-fact ${openFaq === 4 ? 'open' : ''}`}>
                <button 
                  type="button"
                  className="getstarted-fact-trigger"
                  aria-expanded={openFaq === 4}
                  aria-controls="getstarted-fact-panel-4"
                  id="getstarted-fact-trigger-4"
                  onClick={() => toggleFaq(4)}
                >
                  <span className="getstarted-chev" aria-hidden></span>
                  <span>Can I add context (additional information)?</span>
                </button>
                <div
                  id="getstarted-fact-panel-4"
                  role="region"
                  aria-labelledby="getstarted-fact-trigger-4"
                  className="getstarted-fact-panel"
                  style={{ maxHeight: openFaq === 4 ? '100px' : '0' }}
                >
                  <div>
                    <p>Yes—use the <strong>"Anything else to share?"</strong> field (100 characters).</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Still Not Sure Section */}
          <div className="getstarted-still-unsure-section">
            <div className="getstarted-still-unsure-bento">
              <div className="getstarted-still-unsure-image-box">
                <img 
                  src={Image2} 
                  alt="Professional consultation scheduling with calendar and team" 
                  loading="lazy" 
                  decoding="async" 
                  sizes="(max-width: 680px) 100vw, 50vw" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="getstarted-still-unsure-content-box">
                <h3>Still unsure?</h3>
                <p>Schedule a free consultation to discuss your specific needs.</p>
              </div>
              <div className="getstarted-still-unsure-button-box">
                <button 
                  type="button" 
                  className="getstarted-consultation-btn"
                  onClick={() => {
                    // TODO: Implement consultation scheduling logic
                    console.log('Schedule consultation clicked');
                  }}
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>

          <div className="get-started-content">
            <div className="getstarted-scheduler" ref={schedulerRef}>
              <div className="getstarted-header">
                <h3>Peace of mind, accounted for—starting now.</h3>
              </div>

              <form onSubmit={handleSubmit} className="getstarted-form">
                {/* Progress Indicator */}
                <div className="getstarted-progress-indicator">
                  <div className={`getstarted-progress-step ${currentStep >= 1 ? 'active' : ''}`}>
                    <span className="getstarted-step-number">1</span>
                    <span className="getstarted-step-label">Service</span>
                  </div>
                  <div className={`getstarted-progress-step ${currentStep >= 2 ? 'active' : ''}`}>
                    <span className="getstarted-step-number">2</span>
                    <span className="getstarted-step-label">Contact</span>
                  </div>
                  <div className={`getstarted-progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                    <span className="getstarted-step-number">3</span>
                    <span className="getstarted-step-label">Files</span>
                  </div>
                </div>

                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <div className="getstarted-form-section">
                    <h4>Select Your Service</h4>
                    <div className="getstarted-form-group" style={{ isolation: 'isolate', zIndex: 1 }}>
                      <label htmlFor="service">Service Type *</label>
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
                    
                    <div className="getstarted-form-group">
                      <label htmlFor="referralSource">How did you find us? *</label>
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
                    
                    <div className="getstarted-form-actions">
                      <button
                        type="button"
                        className="getstarted-next-btn"
                        onClick={() => {
                          if (selectedService && referralSource) {
                            setCurrentStep(2);
                          }
                        }}
                        disabled={!selectedService || !referralSource}
                      >
                        Continue to Contact Information
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                  <div className="getstarted-form-section">
                    <h4>Contact Information</h4>
                    <p>Please provide your contact details to help us prepare your documents</p>
                    <div className="getstarted-form-row">
                      <div className="getstarted-form-group">
                        <label htmlFor="firstName" className="required-field">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          placeholder="First Name"
                          value={contactInfo.firstName}
                          onChange={(e) => handleContactChange('firstName', e.target.value)}
                          className={errors.firstName ? 'getstarted-error' : ''}
                          required
                        />
                        {errors.firstName && <div className="getstarted-field-error">{errors.firstName}</div>}
                      </div>

                      <div className="getstarted-form-group">
                        <label htmlFor="lastName" className="required-field">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          placeholder="Last Name"
                          value={contactInfo.lastName}
                          onChange={(e) => handleContactChange('lastName', e.target.value)}
                          className={errors.lastName ? 'getstarted-error' : ''}
                          required
                        />
                        {errors.lastName && <div className="getstarted-field-error">{errors.lastName}</div>}
                      </div>
                    </div>

                    <div className="getstarted-form-row">
                      <div className="getstarted-form-group">
                        <label htmlFor="einOrSsn" className="required-field">EIN or SSN</label>
                        <input
                          type="text"
                          id="einOrSsn"
                          value={contactInfo.einOrSsn}
                          onChange={(e) => handleContactChange('einOrSsn', e.target.value)}
                          className={errors.einOrSsn ? 'getstarted-error' : ''}
                          required
                          placeholder="must be 9 digits"
                        />
                        {errors.einOrSsn && <div className="getstarted-field-error">{errors.einOrSsn}</div>}
                      </div>

                      <div className="getstarted-form-group">
                        <label htmlFor="dateOfBirth" className="required-field">Date of Birth</label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          value={contactInfo.dateOfBirth}
                          onChange={(e) => handleContactChange('dateOfBirth', e.target.value)}
                          className={errors.dateOfBirth ? 'getstarted-error' : ''}
                          required
                        />
                        {errors.dateOfBirth && <div className="getstarted-field-error">{errors.dateOfBirth}</div>}
                      </div>
                    </div>

                    <div className="getstarted-form-row">
                      <div className="getstarted-form-group">
                        <label htmlFor="phone" className="required-field">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          value={contactInfo.phone}
                          onChange={(e) => handleContactChange('phone', e.target.value)}
                          className={errors.phone ? 'getstarted-error' : ''}
                          placeholder="___-___-____"
                          maxLength="12"
                          required
                        />
                        {errors.phone && <div className="getstarted-field-error">{errors.phone}</div>}
                      </div>

                      <div className="getstarted-form-group">
                        <label htmlFor="occupation" className="required-field">Occupation</label>
                        <input
                          type="text"
                          id="occupation"
                          placeholder="Occupation"
                          value={contactInfo.occupation}
                          onChange={(e) => handleContactChange('occupation', e.target.value)}
                          className={errors.occupation ? 'getstarted-error' : ''}
                          required
                        />
                        {errors.occupation && <div className="getstarted-field-error">{errors.occupation}</div>}
                      </div>
                    </div>

                    <div className="getstarted-form-row">
                      <div className="getstarted-form-group">
                        <label htmlFor="email" className="required-field">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Email Address"
                          value={contactInfo.email}
                          onChange={(e) => handleContactChange('email', e.target.value)}
                          className={errors.email ? 'getstarted-error' : ''}
                          required
                        />
                        {errors.email && <div className="getstarted-field-error">{errors.email}</div>}
                      </div>

                      <div className="getstarted-form-group">
                        <label htmlFor="streetAddress" className="required-field">Street Address</label>
                        <input
                          type="text"
                          id="streetAddress"
                          value={contactInfo.streetAddress}
                          onChange={(e) => handleContactChange('streetAddress', e.target.value)}
                          className={errors.streetAddress ? 'getstarted-error' : ''}
                          placeholder="Address"
                          required
                        />
                        {errors.streetAddress && <div className="getstarted-field-error">{errors.streetAddress}</div>}
                      </div>
                    </div>

                    <div className="getstarted-form-row">
                      <div className="getstarted-form-group">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          value={contactInfo.city}
                          onChange={(e) => handleContactChange('city', e.target.value)}
                          className={errors.city ? 'getstarted-error' : ''}
                          placeholder="City"
                        />
                      </div>

                      <div className="getstarted-form-group">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          id="state"
                          value={contactInfo.state}
                          onChange={(e) => handleContactChange('state', e.target.value)}
                          className={errors.state ? 'getstarted-error' : ''}
                          placeholder="State"
                        />
                      </div>
                    </div>

                    <div className="getstarted-form-row">
                      <div className="getstarted-form-group">
                        <label htmlFor="country">Country</label>
                        <CustomSelect
                          id="country"
                          placeholder="Country"
                          value={contactInfo.country}
                          onChange={(val) => handleContactChange('country', val)}
                          className={errors.country ? 'getstarted-error' : ''}
                          options={[
                            { label: 'United States', value: 'US' },
                            { label: 'Canada', value: 'CA' },
                            { label: 'Mexico', value: 'MX' },
                            { label: 'United Kingdom', value: 'UK' },
                            { label: 'Germany', value: 'DE' },
                            { label: 'France', value: 'FR' },
                            { label: 'Australia', value: 'AU' },
                            { label: 'Japan', value: 'JP' },
                            { label: 'China', value: 'CN' },
                            { label: 'India', value: 'IN' },
                            { label: 'Brazil', value: 'BR' },
                            { label: 'Other', value: 'other' },
                          ]}
                        />
                      </div>

                      <div className="getstarted-form-group">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                          type="text"
                          id="postalCode"
                          value={contactInfo.postalCode}
                          onChange={(e) => handleContactChange('postalCode', e.target.value)}
                          className={errors.postalCode ? 'getstarted-error' : ''}
                          placeholder="Postal Code"
                        />
                      </div>
                    </div>

                    <div className="getstarted-form-actions">
                      {Object.keys(errors).length > 0 && (
                        <div className="getstarted-single-error-message">
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
                          const isValid = validateContactInfo();
                          if (isValid) {
                            setCurrentStep(3);
                          }
                        }}
                        className="getstarted-next-btn"
                      >
                        Continue to File Upload
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: File Upload */}
                {currentStep === 3 && (
                  <div className="getstarted-form-section">
                    <h4>Upload Required Documents</h4>
                    <p>Please upload the following documents to help us prepare your tax documents</p>
                    <p className="getstarted-upload-note"> <strong>To keep your project on schedule:</strong> Upload all requested documents. 
                    If you’re missing something, upload what you have and <strong>add a note—we’ll follow up.</strong>  </p>
                    <div className="getstarted-file-upload-area">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        multiple
                        accept=".pdf,.xlsx,.xls,.doc,.docx,.jpg,.jpeg,.png,.gif"
                        className="getstarted-file-input"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="getstarted-upload-btn"
                      >
                        Choose Files
                      </button>
                      <span className="getstarted-file-types">
                        Accepted: PDF, Excel, Word, Images
                      </span>
                    </div>

                    {/* Uploaded Files List */}
                    {uploadedFiles.length > 0 && (
                      <div className="getstarted-uploaded-files">
                        <h5>Uploaded Files:</h5>
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="getstarted-file-item">
                            <span className="getstarted-file-name">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="getstarted-remove-file-btn"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Required Documents List */}
                    <div className="getstarted-required-docs">
                      <h5>Required Documents:</h5>
                      <ul className="getstarted-docs-list">
                        <li>Social Security Card</li>
                        <li>EIN Files (if applicable)</li>
                        <li>Valid Photo ID (State issued, e.g., Driver's License)</li>
                        <li>W-2 Forms</li>
                        <li>1099 Forms</li>
                        <li>Previous Year Tax Returns</li>
                      </ul>
                    </div>

                    {/* Message Section */}
                    <div className="getstarted-form-group">
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
                        className="getstarted-message-input"
                      />
                      <div className="getstarted-character-count">
                        {clientMessage.length}/100 characters
                      </div>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="getstarted-consent-section">
                      <div className="getstarted-consent-checkbox">
                        <input
                          type="checkbox"
                          id="consent"
                          checked={consentChecked}
                          onChange={(e) => setConsentChecked(e.target.checked)}
                          required
                        />
                        <label htmlFor="consent" className="getstarted-consent-label">
                          I authorize BDS Talent Group to collect, use, and process my personal and tax information for the purpose of performing the services requested. I certify that all information supplied is accurate and complete to the best of my knowledge.
                        </label>
                      </div>
                      {!consentChecked && currentStep === 3 && (
                        <div className="getstarted-consent-error">
                          You must agree to the consent terms before proceeding.
                        </div>
                      )}
                    </div>

                    <div className="getstarted-form-actions">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="getstarted-back-btn"
                      >
                        Back to Contact Info
                      </button>
                    </div>
                  </div>
                )}





                {/* Submit Button - Only show on final step */}
                {currentStep === 3 && (
                  <div className="getstarted-form-section">
                    <button
                      type="submit"
                      className="getstarted-submit-btn"
                      disabled={isSubmitting || !selectedService}
                      onClick={() => console.log('Submit button clicked!')}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Documents'}
                    </button>
                  </div>
                )}

              </form>

              {/* Success Modal */}
              {showSuccessModal && (
                <div className="getstarted-success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
                  <div className="getstarted-success-modal" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="getstarted-modal-close-btn"
                      onClick={() => setShowSuccessModal(false)}
                      aria-label="Close modal"
                    >
                      ×
                    </button>
                    <div className="getstarted-success-modal-header">
                      <h3>Thank You!</h3>
                    </div>
                    <div className="getstarted-success-modal-content">
                      <div className="getstarted-success-icon">✓</div>
                      <p className="getstarted-confirmation-message">
                        We will begin working on your project shortly.
                      </p>
                      <p className="getstarted-closing-message">
                        Thank you and have a great day!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
                  </div>
      </div>
    </section>
    
    {/* Scroll Down Mouse Indicator */}
    {showMouseIndicator && (
      <div className="scroll-mouse-indicator">
        <div className="mouse">
          <svg className="mouse-svg" viewBox="0 0 40 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mouseStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
                <stop offset="100%" stopColor="rgba(255,255,255,0.35)"/>
              </linearGradient>
            </defs>
            {/* Outer body */}
            <rect x="4" y="2" width="32" height="48" rx="16" stroke="url(#mouseStroke)" strokeWidth="1.6" fill="rgba(255,255,255,0.06)" className="mouse-outline"/>
            {/* Subtle split for top area */}
            <line x1="8" y1="18" x2="32" y2="18" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
            {/* Wheel dot animates downward to imply scroll */}
            <circle cx="20" cy="12" r="2.2" className="mouse-wheel-dot" fill="var(--color-sinopia)"/>
          </svg>
        </div>
        <div className="scroll-text">Scroll Down</div>
      </div>
    )}
    
    {/* Footer */}
    <Footer />
  </>
);
};

export default GetStarted;
