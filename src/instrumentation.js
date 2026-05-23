// Next.js instrumentation hook. Loads the right Sentry config per runtime.
// If SENTRY_DSN is unset the configs themselves are no-ops, so this is safe
// to ship without any env var configured.

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  } else if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export async function onRequestError(err, request, context) {
  if (!process.env.SENTRY_DSN) return;
  const Sentry = await import('@sentry/nextjs');
  Sentry.captureRequestError(err, request, context);
}
