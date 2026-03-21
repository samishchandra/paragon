/**
 * Show a brief toast notification for copy actions.
 * Creates a temporary DOM element that auto-removes after 1.5s.
 * Adapts styling to dark/light mode.
 */
export function showCopyToast(message: string) {
  const existing = document.querySelector('.copy-md-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'copy-md-toast';
  toast.textContent = message;
  const isDark = document.documentElement.classList.contains('dark');
  toast.style.cssText = `position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:${isDark ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)'};color:${isDark ? '#e5e5e5' : '#333'};padding:10px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:99999;box-shadow:0 4px 12px rgba(0,0,0,0.15);border:1px solid ${isDark ? '#3a3a3a' : '#e5e5e5'};animation:sortToastIn 0.2s ease;`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'sortToastOut 0.2s ease forwards';
    setTimeout(() => toast.remove(), 200);
  }, 1500);
}
