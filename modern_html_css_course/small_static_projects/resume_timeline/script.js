const items = document.querySelectorAll('#timeline .item');

const isInViewport = el => {
  const rect = el.getBoundingClientRect();
  const elementShownTop = rect.top >= 0;
  const elementShownLeft = rect.left >= 0;
  const innerHeight = (window.innerHeight || document.documentElement.clientHeight);
  const innerWidth = (window.innerWidth || document.documentElement.clientWidth);
  const elementShownBottom = rect.bottom <= innerHeight;
  const elementShownRight = rect.right <= innerWidth;

  return (elementShownTop && elementShownLeft && elementShownBottom && elementShownRight);
};

const addClass = () =>
  items.forEach(item => {
    if (isInViewport(item)) {
      item.classList.add('show');
    }
  });

// Events
window.addEventListener('load', addClass);
window.addEventListener('resize', addClass);
window.addEventListener('scroll', addClass);
