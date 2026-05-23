const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VACANCIES_MAX = 999;

function parseVacancies(input) {
  const raw = input === '' || input === undefined || input === null ? 1 : input;
  const n = Number(raw);
  if (!Number.isFinite(n)) return null;
  if (!Number.isInteger(n)) return null;
  if (n < 1 || n > VACANCIES_MAX) return null;
  return n;
}

export function isValidEmail(email) {
  return emailRegex.test(String(email || '').trim());
}

export function sanitizeText(value, maxLength = 500) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
    .slice(0, maxLength);
}

export function validateSubscriber(payload = {}) {
  const email = sanitizeText(payload.email, 254).toLowerCase();

  if (!isValidEmail(email)) {
    return { ok: false, errors: { email: 'Enter a valid email address.' } };
  }

  return { ok: true, data: { email } };
}

export function validateContactMessage(payload = {}) {
  const data = {
    name: sanitizeText(payload.name, 120),
    email: sanitizeText(payload.email, 254).toLowerCase(),
    subject: sanitizeText(payload.subject, 120),
    message: sanitizeText(payload.message, 2000),
  };

  const errors = {};

  if (data.name.length < 2) errors.name = 'Name is required.';
  if (!isValidEmail(data.email)) errors.email = 'Enter a valid email address.';
  if (data.subject.length < 2) errors.subject = 'Subject is required.';
  if (data.message.length < 10) errors.message = 'Message should be at least 10 characters.';

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

export function validateJobSubmission(payload = {}) {
  const requiredFields = [
    'title',
    'institution',
    'city',
    'state',
    'category',
    'designation',
    'description',
    'qualifications',
    'deadline',
    'contactEmail',
  ];

  const data = {
    title: sanitizeText(payload.title, 180),
    institution: sanitizeText(payload.institution, 160),
    city: sanitizeText(payload.city, 90),
    state: sanitizeText(payload.state, 90),
    category: sanitizeText(payload.category, 90),
    designation: sanitizeText(payload.designation, 90),
    type: payload.type === 'walk-in' ? 'walk-in' : 'regular',
    description: sanitizeText(payload.description, 2000),
    qualifications: sanitizeText(payload.qualifications, 1600),
    salary: sanitizeText(payload.salary, 120),
    experience: sanitizeText(payload.experience, 80),
    vacancies: parseVacancies(payload.vacancies),
    deadline: sanitizeText(payload.deadline, 30),
    contactEmail: sanitizeText(payload.contactEmail, 254).toLowerCase(),
    contactPhone: sanitizeText(payload.contactPhone, 40),
    contactWebsite: sanitizeText(payload.contactWebsite, 180),
    featured: Boolean(payload.featured),
  };

  const errors = {};

  requiredFields.forEach((field) => {
    if (!data[field]) errors[field] = 'This field is required.';
  });

  if (!isValidEmail(data.contactEmail)) errors.contactEmail = 'Enter a valid contact email.';
  if (data.vacancies === null) errors.vacancies = 'Vacancies must be a whole number between 1 and 999.';
  if (data.deadline && Number.isNaN(new Date(data.deadline).getTime())) errors.deadline = 'Enter a valid deadline.';

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

export function validateCandidateProfile(payload = {}) {
  const data = {
    name: sanitizeText(payload.name, 120),
    email: sanitizeText(payload.email, 254).toLowerCase(),
    phone: sanitizeText(payload.phone, 40),
    preferredLocation: sanitizeText(payload.preferredLocation, 90),
    education: sanitizeText(payload.education, 500),
    experience: sanitizeText(payload.experience, 120),
    researchArea: sanitizeText(payload.researchArea, 220),
    certifications: sanitizeText(payload.certifications, 500),
    scopusId: sanitizeText(payload.scopusId, 120),
    googleScholarId: sanitizeText(payload.googleScholarId, 120),
    socialLinks: sanitizeText(payload.socialLinks, 800),
    visibility: ['standard', 'premium', 'private'].includes(payload.visibility) ? payload.visibility : 'standard',
  };

  const errors = {};

  if (data.name.length < 2) errors.name = 'Name is required.';
  if (!isValidEmail(data.email)) errors.email = 'Enter a valid email address.';
  if (data.phone.length < 8) errors.phone = 'Enter a valid phone number.';

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

export function validateCollegeProfile(payload = {}) {
  const data = {
    collegeName: sanitizeText(payload.collegeName, 180),
    email: sanitizeText(payload.email, 254).toLowerCase(),
    website: sanitizeText(payload.website, 180),
    authorizedPerson: sanitizeText(payload.authorizedPerson, 140),
    mobile: sanitizeText(payload.mobile, 40),
    established: sanitizeText(payload.established, 20),
    affiliation: sanitizeText(payload.affiliation, 180),
    accreditation: sanitizeText(payload.accreditation, 180),
    state: sanitizeText(payload.state, 90),
    address: sanitizeText(payload.address, 800),
    courses: sanitizeText(payload.courses, 1000),
    departments: sanitizeText(payload.departments, 1000),
    strength: sanitizeText(payload.strength, 120),
    placements: sanitizeText(payload.placements, 1200),
    package: sanitizeText(payload.package, 120),
    hiringCategory: sanitizeText(payload.hiringCategory, 90),
  };

  const errors = {};

  if (data.collegeName.length < 2) errors.collegeName = 'College name is required.';
  if (!isValidEmail(data.email)) errors.email = 'Enter a valid official email.';
  if (data.authorizedPerson.length < 2) errors.authorizedPerson = 'Authorized person is required.';
  if (data.mobile.length < 8) errors.mobile = 'Enter a valid mobile number.';

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

function ratingValue(value) {
  const number = Number(value);
  return Number.isInteger(number) && number >= 1 && number <= 5 ? number : null;
}

export function validateReview(payload = {}) {
  const data = {
    institution: sanitizeText(payload.institution, 180),
    relation: sanitizeText(payload.relation, 90),
    teachingQuality: ratingValue(payload.teachingQuality ?? payload['Teaching quality']),
    salaryRange: ratingValue(payload.salaryRange ?? payload['Salary range']),
    workingEnvironment: ratingValue(payload.workingEnvironment ?? payload['Working environment']),
    benefits: ratingValue(payload.benefits ?? payload.Benefits),
    placements: ratingValue(payload.placements ?? payload.Placements),
    careerGrowth: ratingValue(payload.careerGrowth ?? payload['Career growth']),
    overallRating: ratingValue(payload.overallRating ?? payload['Overall rating']),
    anonymous: payload.anonymous !== false,
    pros: sanitizeText(payload.pros, 1200),
    cons: sanitizeText(payload.cons, 1200),
  };

  const errors = {};

  if (data.institution.length < 2) errors.institution = 'Institution is required.';
  if (data.relation.length < 2) errors.relation = 'Relationship is required.';
  ['teachingQuality', 'salaryRange', 'workingEnvironment', 'benefits', 'placements', 'careerGrowth', 'overallRating'].forEach((field) => {
    if (data[field] === null) errors[field] = 'Rating must be between 1 and 5.';
  });

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}

export function validateServiceRequest(payload = {}) {
  const data = {
    serviceType: sanitizeText(payload.serviceType || payload.activeService, 80),
    institution: sanitizeText(payload.institution, 180),
    contact: sanitizeText(payload.contact, 140),
    email: sanitizeText(payload.email, 254).toLowerCase(),
    mobile: sanitizeText(payload.mobile, 40),
    requirement: sanitizeText(payload.requirement, 2000),
    assets: sanitizeText(payload.assets, 1200),
  };

  const errors = {};

  if (!data.serviceType) errors.serviceType = 'Service type is required.';
  if (data.institution.length < 2) errors.institution = 'Institution is required.';
  if (data.contact.length < 2) errors.contact = 'Contact person is required.';
  if (!isValidEmail(data.email)) errors.email = 'Enter a valid email address.';
  if (data.mobile.length < 8) errors.mobile = 'Enter a valid mobile number.';
  if (data.requirement.length < 10) errors.requirement = 'Requirement should be at least 10 characters.';

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
