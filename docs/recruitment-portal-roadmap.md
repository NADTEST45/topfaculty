# TopFaculty Recruitment Portal Roadmap

This document converts the handwritten planning notes into a structured product and implementation roadmap for TopFaculty.

## Product Vision

TopFaculty should grow from a faculty jobs listing site into an academic professional network and recruitment platform for:

- Faculty candidates and researchers
- Colleges, institutions, and universities
- Admins and internal operations teams
- Premium service buyers for branding, publicity, and recruitment support

The main portal combines job search, college recruitment, scholar networking, reviews, and premium services.

## User Types

### Faculty / Candidate Users

Candidate users can register, maintain a scholar profile, search jobs, apply to openings, network with peers, and review institutions.

Signup:

- Name
- Email
- Phone
- OTP-based verification

Profile / registration details:

- Personal details
- Preferred location
- Education details
- Work experience
- Research interests and teaching areas
- Certifications
- Payment status / subscription plan
- Scopus ID
- SCI index details
- Google Scholar ID
- Resume upload
- Social network links

Expected actions:

- Job search
- Apply to jobs
- Save jobs
- Maintain profile visibility
- Join scholar network
- Review colleges or institutions where eligible

### College / Institution Users

College users represent institutions that post jobs, search candidates, and request premium recruitment or publicity services.

Signup:

- College name
- Email
- Website
- Authorized person name
- Authorized person mobile number
- Email and phone-based login / verification

Registration details:

- College establishment details
- Affiliation
- Accreditation
- Address
- Courses
- Programs
- Departments
- Institution strength
- Affiliated university
- Achievements
- Placement details
- Average package

Expected actions:

- Create job vacancies
- Search candidate profiles
- Manage posted jobs
- Request recruitment consultancy
- Request branding or publicity services
- Subscribe to candidate or scholar access plans

### Admin Users

Admins manage the portal, user access, plans, job listings, services, and marketing operations.

Expected actions:

- User management
- Access management
- Login management
- Payment and feedback review
- Job moderation
- Premium service request handling
- Branding / consultancy operations

## Job Module

### Job Creation

Colleges should be able to create vacancies with:

- Job title
- Number of vacancies
- Role and responsibilities
- Qualification requirements
- Grade or level
- Years of experience
- Benefits
- Salary
- Specific requirements
- Terms and conditions

### Candidate Search

Colleges and admins should be able to search candidates by:

- Designation
- Subject / discipline
- Location
- Experience
- Qualification
- Research profile
- Resume availability
- Scholar IDs
- Subscription or visibility status

## Scholar Network

The scholar network is a social layer for academic users and institutions.

### Scholar Profile Functions

- Add connections
- Accept or remove connections
- Add, modify, or delete friends
- Chat with members
- Create groups
- Add parent organization or institution
- Publish posts
- Publish general, event, and workshop updates
- Add endorsements to profiles
- Report users or content
- Subscribe to college updates

## Reviews And Ratings

Reviews should be allowed only for people related to an institution. Anonymous reviews should be supported.

Review categories:

- Teaching quality
- Salary minimum and maximum
- Working environment
- Benefits
- Placements
- Career growth
- Overall rating
- Pros and cons

## Premium Services

Premium services are paid or request-based offerings layered on top of the free portal.

### Quality Improvement Service

Input fields:

- Contact person
- Email ID
- Mobile number
- OTP verification

Output:

- Display TopFaculty contact details after OTP verification

### Branding / Publicity Service

Internal/admin managed service for colleges or institutions.

Service inputs:

- Institution information
- Photos
- Videos
- YouTube links
- SMS or email campaign details
- Digital marketing requirements

Possible packages:

- Branding
- Publicity
- Broadcast ads
- Scheme or admissions campaigns

### Recruitment Consultancy

Request-based service for colleges needing hiring support.

Input:

- Recruitment request form
- Contact details
- Job requirements
- Preferred candidate profile

### Online Classes / Video

Potential service area for paid courses, faculty development content, workshops, or recorded video programs.

## Main Portal Structure

The handwritten sketches reference a main portal that groups:

- User login
- Access management
- Login management
- Payment
- Feedback
- Brand access, with free and paid modes
- Integrated channels like LinkedIn, Naukri, Glassdoor, and internal TopFaculty services

Suggested dashboard areas:

- LinkedIn-style academic network
- Naukri-style job portal
- Glassdoor-style reviews
- Faculty / professional services
- Branding and consultancy requests

## MVP Implementation Phases

### Phase 1: Recruitment Core

- Keep public job listings
- Expand job creation fields
- Add college registration structure
- Add candidate profile structure
- Add basic candidate search mock UI
- Add service request forms

### Phase 2: Accounts And Access

- Add candidate and college login
- Add OTP-based verification flow
- Add role-based dashboards
- Add access plans for free and premium users
- Add payment status tracking

### Phase 3: Scholar Network

- Add scholar profiles
- Add connections
- Add groups
- Add posts for general updates, events, and workshops
- Add endorsements and reporting

### Phase 4: Reviews

- Add institution review pages
- Restrict reviews to related users
- Add anonymous review option
- Add rating categories and moderation

### Phase 5: Premium Operations

- Add branding request forms
- Add recruitment consultancy request forms
- Add quality improvement service requests
- Add admin workflow for service leads
- Add campaign asset upload and tracking

## Immediate Code Opportunities

The current app already has:

- Public job listing pages
- Category filtering
- Search
- Basic job detail pages
- Admin dashboard
- Admin job creation form
- FDP / conference listings

Recommended next implementation steps:

1. Expand the admin job form to match the vacancy fields from the notes.
2. Add college and candidate registration pages.
3. Add static service request pages for branding, recruitment consultancy, and quality improvement.
4. Add a `/network` page as the first scholar network placeholder.
5. Add a `/reviews` or college review section.
6. Later, replace static data with a database-backed schema and authenticated dashboards.

