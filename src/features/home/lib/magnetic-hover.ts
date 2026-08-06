export const magneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
  const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
  el.style.transition = "none";
  el.style.transform = `translate(${x}px, ${y}px)`;
};

export const magneticLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const el = e.currentTarget;
  el.style.transition = "transform .4s cubic-bezier(.16,1,.3,1)";
  el.style.transform = "translate(0,0)";
};
