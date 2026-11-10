let locks = 0

/** Reference-counted body scroll lock, shared by the mobile menu and the lightbox. */
export function lockScroll(): void {
  locks += 1
  if (locks === 1) document.body.style.overflow = 'hidden'
}

export function unlockScroll(): void {
  locks = Math.max(0, locks - 1)
  if (locks === 0) document.body.style.overflow = ''
}
