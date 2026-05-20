const categories = [
  { slug: 'engineering', name: 'Engineering', icon: '⚙️', count: 0 },
  { slug: 'polytechnic', name: 'Polytechnic', icon: '🔧', count: 0 },
  { slug: 'arts-and-science', name: 'Arts and Science', icon: '🎨', count: 0 },
  { slug: 'nursing', name: 'Nursing', icon: '🏥', count: 0 },
  { slug: 'research', name: 'Research Jobs', icon: '🔬', count: 0 },
  { slug: 'school', name: 'School Jobs', icon: '🏫', count: 0 },
  { slug: 'management', name: 'MBA Faculty Jobs', icon: '📊', count: 0 },
  { slug: 'pharmacy', name: 'Pharmacy', icon: '💊', count: 0 },
  { slug: 'law', name: 'Law', icon: '⚖️', count: 0 },
  { slug: 'architecture', name: 'Architecture', icon: '🏗️', count: 0 },
];

const designations = [
  'Vice Chancellor', 'Dean', 'Director', 'Principal', 'HOD',
  'Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'
];

const states = [
  'Andhra Pradesh', 'Tamil Nadu', 'Karnataka', 'Telangana', 'Kerala',
  'Maharashtra', 'Delhi', 'Uttar Pradesh', 'Gujarat', 'Rajasthan',
  'West Bengal', 'Madhya Pradesh', 'Punjab', 'Haryana', 'Bihar'
];

const jobs = [
  {
    id: 1, title: 'Associate Professor & Assistant Professor in Computer Science',
    institution: 'Navarasam Arts and Science College for Women', city: 'Erode', state: 'Tamil Nadu',
    category: 'arts-and-science', designation: 'Associate Professor', type: 'walk-in',
    description: 'Navarasam Arts and Science College for Women, Erode invites applications for the post of Associate Professor and Assistant Professor in the Department of Computer Science. Candidates with NET/SET qualification and Ph.D. in relevant discipline are preferred.',
    qualifications: 'Ph.D. in Computer Science or related field. NET/SET qualified. Minimum 5 years of teaching experience for Associate Professor.',
    salary: 'As per UGC norms', experience: '3-8 years', vacancies: 3,
    postedDate: '2026-05-19', deadline: '2026-06-15', featured: true,
    contact: { email: 'hr@navarasam.edu.in', phone: '04294-225000', website: 'www.navarasam.edu.in' }
  },
  {
    id: 2, title: 'CSE HOD at New Horizon College of Engineering',
    institution: 'New Horizon College of Engineering', city: 'Bengaluru', state: 'Karnataka',
    category: 'engineering', designation: 'HOD', type: 'regular',
    description: 'New Horizon College of Engineering, Bengaluru is looking for a dynamic Head of Department for Computer Science & Engineering. The ideal candidate should have strong academic credentials and administrative experience.',
    qualifications: 'Ph.D. in CSE with minimum 15 years of experience including 5 years in administrative role. Strong publication record.',
    salary: '₹1,50,000 - ₹2,50,000 per month', experience: '15+ years', vacancies: 1,
    postedDate: '2026-05-18', deadline: '2026-06-10', featured: true,
    contact: { email: 'careers@newhorizon.edu.in', phone: '080-25726700', website: 'www.newhorizonindia.edu' }
  },
  {
    id: 3, title: 'Professor / Associate Professor / Assistant Professor in ECE',
    institution: 'Bheema Institute of Technology and Science', city: 'Adoni, Kurnool', state: 'Andhra Pradesh',
    category: 'engineering', designation: 'Professor', type: 'regular',
    description: 'Bheema Institute of Technology and Science invites applications from qualified candidates for faculty positions in Electronics & Communication Engineering department at all levels.',
    qualifications: 'B.E/B.Tech and M.E/M.Tech in ECE. Ph.D. preferred. NET/SET qualification desirable.',
    salary: 'As per AICTE norms', experience: '0-15 years', vacancies: 5,
    postedDate: '2026-05-18', deadline: '2026-06-20', featured: false,
    contact: { email: 'principal@bits-adoni.ac.in', phone: '08512-252233', website: 'www.bits-adoni.ac.in' }
  },
  {
    id: 4, title: 'Faculty Recruitment at Remo International College',
    institution: 'Remo International College', city: 'Alandur', state: 'Tamil Nadu',
    category: 'arts-and-science', designation: 'Assistant Professor', type: 'regular',
    description: 'Remo International College, Alandur is recruiting faculty across multiple departments including Mathematics, Physics, Chemistry, English, and Computer Science.',
    qualifications: 'Post Graduate degree with NET/SET. Ph.D. holders preferred. Experience in outcome-based education.',
    salary: 'Competitive salary', experience: '2-10 years', vacancies: 8,
    postedDate: '2026-05-17', deadline: '2026-06-05', featured: false,
    contact: { email: 'hr@remocollege.ac.in', phone: '044-22341234', website: 'www.remocollege.ac.in' }
  },
  {
    id: 5, title: 'Walk-in Interview for Assistant Professors at Mohamed Sathak Academy of Architecture',
    institution: 'Mohamed Sathak A.J. Academy of Architecture', city: 'Chennai', state: 'Tamil Nadu',
    category: 'architecture', designation: 'Assistant Professor', type: 'walk-in',
    description: 'Mohamed Sathak A.J. Academy of Architecture, approved by COA Delhi and affiliated to Anna University Chennai, invites applications for Assistant Professor / Associate Professor positions. Walk-in interview on 26.05.2026 at 9:30 AM.',
    qualifications: 'PG Specialization in Architecture, Digital Architecture, Conservation, Urban Design, Planning, Sustainability, Interior Design & Landscape.',
    salary: 'As per AICTE & Anna University Norms', experience: '0-5 years', vacancies: 4,
    postedDate: '2026-05-20', deadline: '2026-05-26', featured: true,
    contact: { email: 'admin@msajaarch-edu.in', phone: '99400 04501', website: 'www.msajaarch-edu.in' }
  },
  {
    id: 6, title: 'Ajeenkya DY Patil University Wanted Professor/Associate Professor/Assistant Professor',
    institution: 'Ajeenkya DY Patil University', city: 'Pune', state: 'Maharashtra',
    category: 'engineering', designation: 'Professor', type: 'regular',
    description: 'Ajeenkya DY Patil University, Pune is hiring faculty for multiple engineering departments including CSE, Mechanical, Civil, and Electronics.',
    qualifications: 'Ph.D. in relevant discipline. Active research profile with publications in SCI/Scopus journals.',
    salary: '₹80,000 - ₹2,00,000 per month', experience: '5-20 years', vacancies: 12,
    postedDate: '2026-05-17', deadline: '2026-06-30', featured: true,
    contact: { email: 'recruitment@adypu.edu.in', phone: '020-67440100', website: 'www.adypu.edu.in' }
  },
  {
    id: 7, title: 'Administrative Officer, Warden, Civil Supervisor Jobs',
    institution: 'Velammal Institute of Technology', city: 'Chennai', state: 'Tamil Nadu',
    category: 'engineering', designation: 'Director', type: 'regular',
    description: 'Velammal Institute of Technology, Chennai invites applications for non-teaching positions including Administrative Officer, Warden, and Civil Supervisor.',
    qualifications: 'Relevant degree with administrative experience. MBA/MCA preferred for Administrative Officer role.',
    salary: 'Negotiable based on experience', experience: '5-15 years', vacancies: 3,
    postedDate: '2026-05-16', deadline: '2026-06-10', featured: false,
    contact: { email: 'admin@velammal.edu.in', phone: '044-26810202', website: 'www.velammal.edu.in' }
  },
  {
    id: 8, title: 'Faculty Recruitment 2026 at Sri Shakthi Institute of Engineering and Technology',
    institution: 'Sri Shakthi Institute of Engineering and Technology', city: 'Coimbatore', state: 'Tamil Nadu',
    category: 'engineering', designation: 'Assistant Professor', type: 'regular',
    description: 'Sri Shakthi Institute of Engineering and Technology, L&T Bypass, Coimbatore invites applications for Assistant Professor positions across all departments.',
    qualifications: 'M.E./M.Tech with Ph.D. or Ph.D. pursuing. GATE/NET qualified candidates preferred.',
    salary: 'As per AICTE norms + incentives', experience: '0-5 years', vacancies: 15,
    postedDate: '2026-05-16', deadline: '2026-06-25', featured: false,
    contact: { email: 'careers@srist.org', phone: '0422-2669911', website: 'www.srist.org' }
  },
  {
    id: 9, title: 'Teaching and Non-Teaching Staff Recruitment',
    institution: 'Sri Vidhya College of Arts and Science', city: 'Virudhunagar', state: 'Tamil Nadu',
    category: 'arts-and-science', designation: 'Lecturer', type: 'regular',
    description: 'Sri Vidhya College of Arts and Science, Virudhunagar invites applications for Teaching and Non-Teaching positions in various departments.',
    qualifications: 'Post Graduate with NET/SET for Teaching. Relevant qualification for Non-Teaching roles.',
    salary: 'As per norms', experience: '0-8 years', vacancies: 10,
    postedDate: '2026-05-15', deadline: '2026-06-15', featured: false,
    contact: { email: 'info@srividhya.ac.in', phone: '04562-263311', website: 'www.srividhya.ac.in' }
  },
  {
    id: 10, title: 'Faculty Required at Bearys Institute of Technology',
    institution: 'Bearys Institute of Technology', city: 'Mangalore', state: 'Karnataka',
    category: 'engineering', designation: 'Assistant Professor', type: 'regular',
    description: 'Bearys Institute of Technology, Mangalore requires Assistant Professors for CSE, ISE, ECE, Mechanical, and Civil Engineering departments.',
    qualifications: 'M.Tech with good academic record. Ph.D. pursuing candidates encouraged to apply.',
    salary: '₹40,000 - ₹75,000 per month', experience: '0-5 years', vacancies: 7,
    postedDate: '2026-05-14', deadline: '2026-06-05', featured: false,
    contact: { email: 'hr@bearysit.ac.in', phone: '0824-2261070', website: 'www.bearysit.ac.in' }
  },
  {
    id: 11, title: 'Junior Research Fellow (JRF) in Biotechnology',
    institution: 'Indian Institute of Technology Madras', city: 'Chennai', state: 'Tamil Nadu',
    category: 'research', designation: 'Lecturer', type: 'regular',
    description: 'IIT Madras invites applications for Junior Research Fellow position in the Department of Biotechnology under a SERB-funded project on computational biology.',
    qualifications: 'M.Sc./M.Tech in Biotechnology, Bioinformatics, or related field with GATE/NET qualification.',
    salary: '₹31,000 + HRA per month', experience: '0-2 years', vacancies: 1,
    postedDate: '2026-05-18', deadline: '2026-06-10', featured: false,
    contact: { email: 'biotech@iitm.ac.in', phone: '044-22574100', website: 'www.iitm.ac.in' }
  },
  {
    id: 12, title: 'Senior Research Fellow (SRF) in Materials Science',
    institution: 'National Institute of Technology Warangal', city: 'Warangal', state: 'Telangana',
    category: 'research', designation: 'Lecturer', type: 'regular',
    description: 'NIT Warangal invites applications for SRF position in the Department of Materials Science under a DST-funded project on advanced nanomaterials.',
    qualifications: 'M.Tech in Materials Science/Metallurgy with 2 years research experience. Publications preferred.',
    salary: '₹35,000 + HRA per month', experience: '2-4 years', vacancies: 2,
    postedDate: '2026-05-17', deadline: '2026-06-08', featured: false,
    contact: { email: 'mse@nitw.ac.in', phone: '0870-2462000', website: 'www.nitw.ac.in' }
  },
  {
    id: 13, title: 'Nursing Faculty - Professor and Associate Professor',
    institution: 'Sri Ramachandra Institute of Higher Education', city: 'Chennai', state: 'Tamil Nadu',
    category: 'nursing', designation: 'Professor', type: 'regular',
    description: 'Sri Ramachandra Faculty of Nursing invites applications for Professor and Associate Professor positions in Medical-Surgical Nursing, Paediatric Nursing, and Community Health Nursing.',
    qualifications: 'M.Sc. Nursing with Ph.D. 10+ years experience for Professor. INC registration mandatory.',
    salary: '₹1,00,000 - ₹2,00,000 per month', experience: '8-20 years', vacancies: 4,
    postedDate: '2026-05-16', deadline: '2026-06-20', featured: false,
    contact: { email: 'nursing.recruitment@sriramachandra.edu.in', phone: '044-24768027', website: 'www.sriramachandra.edu.in' }
  },
  {
    id: 14, title: 'Principal - Polytechnic College',
    institution: 'Government Polytechnic College', city: 'Vijayawada', state: 'Andhra Pradesh',
    category: 'polytechnic', designation: 'Principal', type: 'regular',
    description: 'Government Polytechnic College, Vijayawada invites applications for the post of Principal. The position requires a strong academic and administrative leader.',
    qualifications: 'Ph.D. with First Class M.E./M.Tech. Minimum 15 years teaching experience with 5 years in Polytechnic.',
    salary: 'As per AICTE Pay Scale (Level 14)', experience: '15+ years', vacancies: 1,
    postedDate: '2026-05-15', deadline: '2026-06-30', featured: false,
    contact: { email: 'gpc.vjw@ap.gov.in', phone: '0866-2474600', website: 'gptcvjw.ap.gov.in' }
  },
  {
    id: 15, title: 'MBA Faculty - Marketing and Finance',
    institution: 'Christ University', city: 'Bengaluru', state: 'Karnataka',
    category: 'management', designation: 'Associate Professor', type: 'regular',
    description: 'Christ University, Bengaluru is hiring faculty for the School of Management with specialization in Marketing and Finance.',
    qualifications: 'Ph.D. in Management (Marketing/Finance). FPM from IIMs preferred. Active case study researcher.',
    salary: 'Competitive (CTC 12-25 LPA)', experience: '5-15 years', vacancies: 3,
    postedDate: '2026-05-19', deadline: '2026-06-30', featured: true,
    contact: { email: 'hr@christuniversity.in', phone: '080-40129100', website: 'www.christuniversity.in' }
  },
];

const fdpEvents = [
  { id: 1, title: 'Data-driven Modelling for Mechanical Systems SUMMER SCHOOL 2026', organizer: 'IIT (ISM) Dhanbad', date: '2026-06-15', type: 'Summer School', mode: 'Offline' },
  { id: 2, title: 'Online FDP for Faculty - Research Methodology Workshop', organizer: 'AIITE, ISDC, and Nexus Workshop', date: '2026-06-01', type: 'FDP', mode: 'Online' },
  { id: 3, title: 'Machine Learning Internship 2026', organizer: 'Manuscriptpedia', date: '2026-06-10', type: 'Internship', mode: 'Online' },
  { id: 4, title: 'ANRF-Sponsored Workshop on AI & Robotics', organizer: 'IIIT Sonepat', date: '2026-06-20', type: 'Workshop', mode: 'Hybrid' },
  { id: 5, title: 'Online Short-Term Course on VLSI Design', organizer: 'NIT Warangal', date: '2026-05-28', type: 'Short Course', mode: 'Online' },
  { id: 6, title: 'National Conference on Automation, Robotics, and Mechatronics', organizer: 'Madras Institute of Technology, Anna University', date: '2026-07-05', type: 'Conference', mode: 'Offline' },
  { id: 7, title: 'All India Young Scientists Conclave 2026 - Edition 2.0', organizer: 'Nexus India with AIITE', date: '2026-07-15', type: 'Conference', mode: 'Hybrid' },
  { id: 8, title: '3-Day Fast Track FDP on AI and Machine Learning', organizer: 'SSIET Chennai', date: '2026-06-05', type: 'FDP', mode: 'Offline' },
];

export function getJobs(filters = {}) {
  let result = [...jobs];
  if (filters.category) result = result.filter(j => j.category === filters.category);
  if (filters.designation) result = result.filter(j => j.designation === filters.designation);
  if (filters.state) result = result.filter(j => j.state === filters.state);
  if (filters.type) result = result.filter(j => j.type === filters.type);
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(j => j.title.toLowerCase().includes(q) || j.institution.toLowerCase().includes(q) || j.city.toLowerCase().includes(q) || j.state.toLowerCase().includes(q) || j.description.toLowerCase().includes(q));
  }
  if (filters.featured) result = result.filter(j => j.featured);
  result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  return result;
}

export function getJob(id) { return jobs.find(j => j.id === parseInt(id)); }
export function getFeaturedJobs() { return jobs.filter(j => j.featured); }
export function getCategories() {
  return categories.map(c => ({ ...c, count: jobs.filter(j => j.category === c.slug).length }));
}
export function getDesignations() { return designations; }
export function getStates() { return states; }
export function getFdpEvents() { return fdpEvents; }
export function getRecentJobs(limit = 10) {
  return [...jobs].sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate)).slice(0, limit);
}
