// Transactional email via Resend. Fully gated on env: if RESEND_API_KEY
// or NOTIFY_EMAIL are unset, all send calls become no-ops. That keeps
// local dev quiet and means missing config never breaks a request handler.
//
// Resend's free tier requires "from" to be on a verified domain OR to use
// the onboarding sandbox "onboarding@resend.dev" (which can only send to
// the email you signed up with). Set EMAIL_FROM to the address you want
// to appear as sender. EMAIL_REPLY_TO is optional.

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

function isConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL);
}

function fromAddress() {
  return process.env.EMAIL_FROM || 'TopFaculty <onboarding@resend.dev>';
}

async function send({ to, subject, html, text, replyTo }) {
  if (!isConfigured()) return { skipped: true };

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text,
        reply_to: replyTo || process.env.EMAIL_REPLY_TO || undefined,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.error('[email] Resend rejected send', response.status, body);
      return { ok: false, status: response.status };
    }
    return { ok: true };
  } catch (err) {
    console.error('[email] Resend send failed', err);
    return { ok: false, error: String(err) };
  }
}

function escapeHtml(input) {
  return String(input ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function kv(label, value) {
  if (value === undefined || value === null || value === '') return '';
  return `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 12px;color:#0f172a;font-size:14px;">${escapeHtml(value)}</td></tr>`;
}

function wrap(title, rows, footer = '') {
  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f8fafc;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
    <tr><td style="padding:20px 24px;background:#0b1f33;color:#fff;">
      <div style="font-weight:700;font-size:16px;">TopFaculty</div>
      <div style="margin-top:4px;font-size:13px;opacity:0.85;">${escapeHtml(title)}</div>
    </td></tr>
    <tr><td style="padding:16px 0;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows}</table>
    </td></tr>
    ${footer ? `<tr><td style="padding:16px 24px;background:#f1f5f9;color:#475569;font-size:12px;">${footer}</td></tr>` : ''}
  </table>
</body></html>`;
}

// ---------------------------------------------------------------------------
// Public helpers — one per submission type. Each is fire-and-forget; failures
// are logged but never thrown so a Resend hiccup doesn't break the user's
// submission flow.
// ---------------------------------------------------------------------------

export async function notifyJobSubmission(job) {
  if (!isConfigured()) return;
  const rows = [
    kv('Title', job.title),
    kv('Institution', job.institution),
    kv('Location', `${job.city || ''}, ${job.state || ''}`),
    kv('Category', job.category),
    kv('Designation', job.designation),
    kv('Vacancies', job.vacancies),
    kv('Salary', job.salary),
    kv('Deadline', job.deadline),
    kv('Contact email', job.contact_email || job.contactEmail),
    kv('Contact phone', job.contact_phone || job.contactPhone),
    kv('Status', job.status),
  ].join('');
  await send({
    to: process.env.NOTIFY_EMAIL,
    subject: `New job submission: ${job.title}`,
    html: wrap('New job submission', rows, 'Sign in to /admin to review and publish.'),
    text: `New job submission: ${job.title} at ${job.institution}. Sign in to /admin to publish.`,
  });
}

export async function notifyCandidateSignup(candidate) {
  if (!isConfigured()) return;
  const rows = [
    kv('Name', candidate.name),
    kv('Email', candidate.email),
    kv('Phone', candidate.phone),
    kv('Preferred location', candidate.preferred_location || candidate.preferredLocation),
    kv('Research area', candidate.research_area || candidate.researchArea),
    kv('Experience', candidate.experience),
    kv('Visibility', candidate.visibility),
  ].join('');
  await send({
    to: process.env.NOTIFY_EMAIL,
    subject: `New candidate: ${candidate.name}`,
    html: wrap('New candidate profile', rows),
    text: `${candidate.name} (${candidate.email}) registered as a candidate.`,
  });
}

export async function notifyCollegeSignup(college) {
  if (!isConfigured()) return;
  const rows = [
    kv('Institution', college.college_name || college.collegeName),
    kv('Email', college.email),
    kv('Website', college.website),
    kv('Authorized person', college.authorized_person || college.authorizedPerson),
    kv('Mobile', college.mobile),
    kv('State', college.state),
    kv('Hiring category', college.hiring_category || college.hiringCategory),
  ].join('');
  await send({
    to: process.env.NOTIFY_EMAIL,
    subject: `New college: ${college.college_name || college.collegeName}`,
    html: wrap('New institution profile', rows, 'Verification pending. Open /admin to follow up.'),
    text: `${college.college_name || college.collegeName} registered as an institution.`,
  });
}

export async function notifyReview(review) {
  if (!isConfigured()) return;
  const rows = [
    kv('Institution', review.institution),
    kv('Relation', review.relation),
    kv('Overall', `${review.overall_rating || review.overallRating} / 5`),
    kv('Status', review.status || 'pending_moderation'),
  ].join('');
  await send({
    to: process.env.NOTIFY_EMAIL,
    subject: `New review: ${review.institution}`,
    html: wrap('New review', rows, 'Moderate at /admin before publishing.'),
    text: `New review for ${review.institution}.`,
  });
}

export async function notifyServiceRequest(req) {
  if (!isConfigured()) return;
  const rows = [
    kv('Service type', req.service_type || req.serviceType),
    kv('Institution', req.institution),
    kv('Contact person', req.contact),
    kv('Email', req.email),
    kv('Mobile', req.mobile),
  ].join('');
  const description = escapeHtml(req.requirement || '').slice(0, 1000);
  const rowsWithReq = `${rows}<tr><td colspan="2" style="padding:12px 12px 4px 12px;color:#64748b;font-size:13px;">Requirement</td></tr><tr><td colspan="2" style="padding:0 12px 12px 12px;color:#0f172a;font-size:14px;line-height:1.5;">${description}</td></tr>`;
  await send({
    to: process.env.NOTIFY_EMAIL,
    subject: `Lead: ${req.service_type || req.serviceType} — ${req.institution}`,
    html: wrap('New premium-service lead', rowsWithReq, 'Reply within 24 hours for best conversion.'),
    text: `Service request from ${req.institution} (${req.email}).`,
    replyTo: req.email,
  });
}

export async function notifyContactMessage(message) {
  if (!isConfigured()) return;
  const rows = [
    kv('From', `${message.name} <${message.email}>`),
    kv('Subject', message.subject),
  ].join('');
  const body = escapeHtml(message.message || '');
  const rowsWithBody = `${rows}<tr><td colspan="2" style="padding:12px;color:#64748b;font-size:13px;">Message</td></tr><tr><td colspan="2" style="padding:0 12px 12px 12px;color:#0f172a;font-size:14px;line-height:1.5;white-space:pre-wrap;">${body}</td></tr>`;
  await send({
    to: process.env.NOTIFY_EMAIL,
    subject: `Contact form: ${message.subject}`,
    html: wrap('Contact form submission', rowsWithBody),
    text: `${message.name} <${message.email}>: ${message.subject}\n\n${message.message}`,
    replyTo: message.email,
  });
}

export async function welcomeSubscriber(email) {
  if (!isConfigured()) return;
  await send({
    to: email,
    subject: 'Welcome to TopFaculty job alerts',
    html: wrap(
      'You are subscribed',
      `<tr><td style="padding:12px 16px;color:#0f172a;font-size:14px;line-height:1.6;">Thanks for subscribing to TopFaculty. We will email you a short digest of the freshest faculty, research, and FDP opportunities. You can unsubscribe at any time by replying with the word UNSUBSCRIBE.</td></tr>`,
    ),
    text: 'Thanks for subscribing to TopFaculty job alerts.',
  });
}
