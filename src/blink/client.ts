import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'repo-website-html-7ks88ax1',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_YleeH-rVY2kHnhMLc7LwGXqnEIhHgr3J',
  authRequired: false,
  auth: { mode: 'managed' },
})
