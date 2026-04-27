import { useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import PageHero from '../components/PageHero';
import './JobApplicationPage.css';

const jobsData = {
  'senior-civil-engineer': {
    title: 'Senior Civil Engineer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$120,000 - $160,000',
    posted: 'December 15, 2025',
    description: 'We are seeking an experienced Senior Civil Engineer to lead complex infrastructure projects and mentor our growing engineering team.',
    responsibilities: [
      'Lead and manage multiple civil engineering projects from concept through completion',
      'Mentor and provide technical guidance to junior engineers',
      'Prepare detailed engineering calculations, drawings, and specifications',
      'Coordinate with clients, contractors, and regulatory agencies',
      'Conduct site investigations and prepare technical reports',
      'Ensure projects meet quality standards, budget, and schedule requirements',
      'Review and approve design documents and construction plans',
      'Stay current with industry standards and best practices'
    ],
    qualifications: [
      'Bachelor\'s degree in Civil Engineering (Master\'s preferred)',
      'Professional Engineer (PE) license required',
      'Minimum 8 years of civil engineering experience',
      'Experience with AutoCAD, Civil 3D, and other design software',
      'Strong project management and leadership skills',
      'Excellent communication and client interaction abilities',
      'Knowledge of local, state, and federal regulations',
      'Experience with sustainable design practices is a plus'
    ],
    benefits: [
      'Competitive salary and performance bonuses',
      'Comprehensive health, dental, and vision insurance',
      '401(k) with company match',
      'Professional development and continuing education support',
      'Flexible work arrangements',
      'Generous PTO and paid holidays',
      'Relocation assistance available'
    ]
  },
  'architectural-designer': {
    title: 'Architectural Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$75,000 - $95,000',
    posted: 'December 12, 2025',
    description: 'Join our creative design team to work on innovative architectural projects that shape the urban landscape.',
    responsibilities: [
      'Develop architectural designs from concept through construction documentation',
      'Create 3D models and renderings for client presentations',
      'Collaborate with senior architects and project teams',
      'Prepare construction drawings and specifications',
      'Coordinate with consultants and contractors',
      'Participate in design reviews and client meetings',
      'Research building codes and zoning requirements',
      'Assist in project management and coordination'
    ],
    qualifications: [
      'Bachelor\'s or Master\'s degree in Architecture',
      '3-5 years of professional experience',
      'Proficiency in Revit, AutoCAD, SketchUp, and Adobe Creative Suite',
      'Strong design and visualization skills',
      'Knowledge of building codes and construction methods',
      'Excellent presentation and communication skills',
      'Portfolio demonstrating design capabilities',
      'LEED accreditation is a plus'
    ],
    benefits: [
      'Competitive salary and annual bonuses',
      'Health, dental, and vision coverage',
      '401(k) retirement plan with matching',
      'Professional licensing fee reimbursement',
      'Flexible hybrid work model',
      'Creative studio environment',
      'Career advancement opportunities'
    ]
  },
  'project-manager': {
    title: 'Project Manager',
    department: 'Management',
    location: 'London, UK',
    type: 'Full-time',
    salary: '£60,000 - £80,000',
    posted: 'December 10, 2025',
    description: 'Lead diverse construction and design projects from inception to completion, ensuring quality delivery and client satisfaction.',
    responsibilities: [
      'Manage all phases of project delivery',
      'Develop project schedules, budgets, and resource plans',
      'Coordinate multidisciplinary project teams',
      'Monitor project progress and manage changes',
      'Maintain client relationships and manage expectations',
      'Prepare project reports and presentations',
      'Identify and mitigate project risks',
      'Ensure compliance with health and safety regulations'
    ],
    qualifications: [
      'Bachelor\'s degree in Engineering, Architecture, or Construction Management',
      'PMP or equivalent certification preferred',
      'Minimum 5 years of project management experience',
      'Strong leadership and team management skills',
      'Excellent communication and negotiation abilities',
      'Proficiency with project management software',
      'Experience with budget management and cost control',
      'Knowledge of UK building regulations'
    ],
    benefits: [
      'Competitive salary package',
      'Private medical and dental insurance',
      'Pension scheme',
      'Professional development budget',
      'Flexible working options',
      '25 days annual leave plus bank holidays',
      'Season ticket loan'
    ]
  },
  'structural-engineer': {
    title: 'Structural Engineer',
    department: 'Engineering',
    location: 'Dubai, UAE',
    type: 'Full-time',
    salary: 'AED 15,000 - AED 25,000/month',
    posted: 'December 8, 2025',
    description: 'Design innovative structural systems for iconic buildings and infrastructure projects in the Middle East.',
    responsibilities: [
      'Design structural systems for buildings and infrastructure',
      'Perform structural analysis and calculations',
      'Prepare structural drawings and specifications',
      'Review contractor shop drawings and submittals',
      'Conduct site inspections and quality control',
      'Collaborate with architects and MEP engineers',
      'Utilize advanced structural analysis software',
      'Ensure compliance with international codes'
    ],
    qualifications: [
      'Bachelor\'s or Master\'s degree in Structural Engineering',
      'Chartered Engineer status or equivalent',
      '5+ years of structural design experience',
      'Proficiency in ETABS, SAP2000, SAFE, and AutoCAD',
      'Experience with tall building design preferred',
      'Strong analytical and problem-solving skills',
      'Excellent technical documentation abilities',
      'Familiarity with UAE building codes'
    ],
    benefits: [
      'Tax-free salary',
      'Annual flight allowance',
      'Health insurance',
      'Housing allowance',
      'Professional development opportunities',
      '30 days annual leave',
      'End of service gratuity'
    ]
  },
  'interior-designer': {
    title: 'Interior Designer',
    department: 'Design',
    location: 'Singapore',
    type: 'Full-time',
    salary: 'SGD 50,000 - SGD 75,000',
    posted: 'December 5, 2025',
    description: 'Create inspiring interior environments for commercial, hospitality, and residential projects.',
    responsibilities: [
      'Develop interior design concepts and space planning',
      'Create material boards and finish schedules',
      'Prepare detailed design drawings and specifications',
      'Select furniture, fixtures, and equipment',
      'Coordinate with architects and contractors',
      'Manage interior design projects from concept to completion',
      'Present design proposals to clients',
      'Stay current with design trends and materials'
    ],
    qualifications: [
      'Bachelor\'s degree in Interior Design or Architecture',
      '3-6 years of interior design experience',
      'Proficiency in SketchUp, AutoCAD, and Adobe Creative Suite',
      'Strong conceptual and creative skills',
      'Knowledge of furniture and finish materials',
      'Excellent presentation and client communication',
      'Portfolio showcasing completed projects',
      'Experience with hospitality design is a plus'
    ],
    benefits: [
      'Competitive salary',
      'Medical and dental benefits',
      'CPF contributions',
      'Annual bonus',
      'Professional development support',
      'Annual leave and sick leave',
      'Dynamic work environment'
    ]
  },
  'administrative-coordinator': {
    title: 'Administrative Coordinator',
    department: 'Administration',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$50,000 - $65,000',
    posted: 'December 1, 2025',
    description: 'Support our team with administrative coordination and office management.',
    responsibilities: [
      'Coordinate office operations and procedures',
      'Manage calendars and schedule meetings',
      'Handle correspondence and communications',
      'Organize company events and activities',
      'Maintain filing systems and databases',
      'Process invoices and expense reports',
      'Order office supplies and equipment',
      'Provide administrative support to leadership team'
    ],
    qualifications: [
      'Bachelor\'s degree or equivalent experience',
      '2-4 years of administrative experience',
      'Proficiency in Microsoft Office Suite',
      'Excellent organizational and multitasking skills',
      'Strong written and verbal communication',
      'Professional demeanor and appearance',
      'Ability to handle confidential information',
      'Experience in architecture/engineering industry preferred'
    ],
    benefits: [
      'Competitive salary',
      'Health and dental insurance',
      '401(k) with company match',
      'Paid time off',
      'Professional development opportunities',
      'Collaborative work environment',
      'Employee wellness programs'
    ]
  }
};

export default function JobApplicationPage() {
  const { jobSlug } = useParams();
  const navigate = useNavigate();
  const job = jobsData[jobSlug];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedIn: '',
    portfolio: '',
    coverLetter: '',
    resume: null,
    portfolio_file: null,
    startDate: '',
    salary: '',
    referral: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');
  const [portfolioFileName, setPortfolioFileName] = useState('');

  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 });

  if (!job) {
    return (
      <div className="job-application">
        <PageHero 
          title="Job Not Found"
          subtitle="The position you're looking for doesn't exist"
        />
        <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <Link to="/careers" className="back-link">← Back to Careers</Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      if (name === 'resume') {
        setResumeFileName(files[0].name);
      } else if (name === 'portfolio_file') {
        setPortfolioFileName(files[0].name);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Application submitted:', formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="job-application">
      <PageHero 
        title={job.title}
        subtitle={`${job.department} • ${job.location} • ${job.type}`}
      />

      <div className="container">
        <div className="job-application-content">
          {/* Job Details Sidebar */}
          <aside className="job-sidebar">
            <div className="job-details-card">
              <h3>Position Details</h3>
              <div className="detail-item">
                <span className="detail-label">Department</span>
                <span className="detail-value">{job.department}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location</span>
                <span className="detail-value">{job.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Employment Type</span>
                <span className="detail-value">{job.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Salary Range</span>
                <span className="detail-value">{job.salary}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Posted</span>
                <span className="detail-value">{job.posted}</span>
              </div>
            </div>

            <div className="job-share-card">
              <h3>Share This Job</h3>
              <div className="share-buttons">
                <button className="share-btn" aria-label="Share on LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button className="share-btn" aria-label="Share on Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button className="share-btn" aria-label="Share via Email">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="job-main-content">
            {/* Job Description */}
            <section className="job-section">
              <h2>About This Role</h2>
              <p className="job-description">{job.description}</p>
            </section>

            {/* Responsibilities */}
            <section className="job-section">
              <h2>Responsibilities</h2>
              <ul className="job-list">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Qualifications */}
            <section className="job-section">
              <h2>Qualifications</h2>
              <ul className="job-list">
                {job.qualifications.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Benefits */}
            <section className="job-section">
              <h2>Benefits</h2>
              <ul className="job-list benefits-list">
                {job.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Application Form */}
            <section className="application-form-section" ref={formRef}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2>Apply for This Position</h2>
                
                {isSubmitted ? (
                  <motion.div 
                    className="application-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="success-icon">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </div>
                    <h3>Application Submitted Successfully!</h3>
                    <p>Thank you for applying to the {job.title} position. We have received your application and will review it carefully. If your qualifications match our needs, we'll contact you within 2 weeks.</p>
                    <div className="success-actions">
                      <button 
                        className="secondary-btn"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            firstName: '', lastName: '', email: '', phone: '',
                            linkedIn: '', portfolio: '', coverLetter: '',
                            resume: null, portfolio_file: null,
                            startDate: '', salary: '', referral: ''
                          });
                          setResumeFileName('');
                          setPortfolioFileName('');
                        }}
                      >
                        Apply to Another Position
                      </button>
                      <Link to="/careers" className="primary-btn">
                        Back to Careers
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="application-form">
                    <div className="form-section">
                      <h3>Personal Information</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name *</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            placeholder="John"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name *</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="email">Email Address *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john.doe@email.com"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone">Phone Number *</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="linkedIn">LinkedIn Profile</label>
                          <input
                            type="url"
                            id="linkedIn"
                            name="linkedIn"
                            value={formData.linkedIn}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="portfolio">Portfolio Website</label>
                          <input
                            type="url"
                            id="portfolio"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleChange}
                            placeholder="https://yourportfolio.com"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Application Documents</h3>
                      
                      <div className="form-group file-upload-group">
                        <label htmlFor="resume">Resume/CV * (PDF, DOC, DOCX - Max 5MB)</label>
                        <div className="file-upload-wrapper">
                          <input
                            type="file"
                            id="resume"
                            name="resume"
                            onChange={handleFileChange}
                            required
                            accept=".pdf,.doc,.docx"
                            className="file-input"
                          />
                          <label htmlFor="resume" className="file-upload-label">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="17 8 12 3 7 8"/>
                              <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            {resumeFileName || 'Choose file or drag here'}
                          </label>
                        </div>
                        {resumeFileName && (
                          <p className="file-name">Selected: {resumeFileName}</p>
                        )}
                      </div>

                      <div className="form-group file-upload-group">
                        <label htmlFor="portfolio_file">Portfolio (PDF - Max 10MB) - Optional</label>
                        <div className="file-upload-wrapper">
                          <input
                            type="file"
                            id="portfolio_file"
                            name="portfolio_file"
                            onChange={handleFileChange}
                            accept=".pdf"
                            className="file-input"
                          />
                          <label htmlFor="portfolio_file" className="file-upload-label">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="17 8 12 3 7 8"/>
                              <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                            {portfolioFileName || 'Choose file or drag here'}
                          </label>
                        </div>
                        {portfolioFileName && (
                          <p className="file-name">Selected: {portfolioFileName}</p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="coverLetter">Cover Letter *</label>
                        <textarea
                          id="coverLetter"
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleChange}
                          required
                          placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                          rows="6"
                        />
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Additional Information</h3>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="startDate">Available Start Date *</label>
                          <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="salary">Expected Salary</label>
                          <input
                            type="text"
                            id="salary"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="e.g., $100,000 or Negotiable"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="referral">How did you hear about this position?</label>
                        <select
                          id="referral"
                          name="referral"
                          value={formData.referral}
                          onChange={handleChange}
                        >
                          <option value="">Select an option</option>
                          <option value="website">Company Website</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="indeed">Indeed</option>
                          <option value="referral">Employee Referral</option>
                          <option value="recruiter">Recruiter</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => navigate('/careers')}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner"></span>
                            Submitting Application...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                              <polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="form-note">
                      * Required fields. By submitting this application, you agree to our{' '}
                      <Link to="/privacy">Privacy Policy</Link> and consent to the processing of your personal data.
                    </p>
                  </form>
                )}
              </motion.div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

