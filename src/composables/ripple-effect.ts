export default function rippleEffect(e: MouseEvent): void {
  const el = e.currentTarget as HTMLElement;
  const span = document.createElement('span')
  span.classList.add('ripple-effect')
  el.appendChild(span);

  const rect = el.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size/2
  const y = e.clientY - rect.top - size/2
  span.style.width = span.style.height = `${size}px`
  span.style.left = `${x}px`
  span.style.top = `${y}px`
  setTimeout(() => span.remove(), 600)

}
