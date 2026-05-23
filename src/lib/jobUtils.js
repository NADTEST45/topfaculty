const DAY_MS = 24 * 60 * 60 * 1000;

export function formatDate(dateStr, options = {}) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  });
}

export function getDaysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);

  return Math.ceil((target - today) / DAY_MS);
}

export function getDeadlineStatus(deadline) {
  const days = getDaysUntil(deadline);

  if (days < 0) {
    return {
      label: 'Expired',
      tone: 'danger',
      days,
    };
  }

  if (days === 0) {
    return {
      label: 'Closes today',
      tone: 'urgent',
      days,
    };
  }

  if (days <= 7) {
    return {
      label: `${days} day${days === 1 ? '' : 's'} left`,
      tone: 'urgent',
      days,
    };
  }

  return {
    label: `Apply by ${formatDate(deadline)}`,
    tone: 'default',
    days,
  };
}

export function getPostedLabel(postedDate) {
  const days = Math.max(0, Math.floor((Date.now() - new Date(postedDate)) / DAY_MS));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

export function normalizeJobType(type) {
  return type === 'walk-in' ? 'Walk-in' : 'Regular';
}

export function sortJobs(jobs, sort = 'newest') {
  const sorted = [...jobs];

  if (sort === 'deadline') {
    return sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }

  if (sort === 'featured') {
    return sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || new Date(b.postedDate) - new Date(a.postedDate));
  }

  return sorted.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
}

export function getJobFilterSummary(filters = {}) {
  const active = Object.entries(filters).filter(([, value]) => Boolean(value));

  if (!active.length) return 'All academic opportunities';

  return active
    .map(([key, value]) => {
      if (key === 'search') return `"${value}"`;
      if (key === 'category') return String(value).replace(/-/g, ' ');
      return value;
    })
    .join(' · ');
}
