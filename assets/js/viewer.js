function ensureLightbox() {
  let lightbox = document.getElementById('img-lightbox');
  if (lightbox) return lightbox;

  lightbox = document.createElement('div');
  lightbox.id = 'img-lightbox';
  lightbox.className = 'img-lightbox';
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="img-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Image preview">
      <button type="button" class="img-lightbox-close" aria-label="Close">×</button>
      <img class="img-lightbox-img" alt="" />
      <p class="img-lightbox-caption"></p>
      <a class="img-lightbox-open-tab" href="#" target="_blank" rel="noopener noreferrer">Open in new tab</a>
    </div>
  `;
  document.body.appendChild(lightbox);

  const close = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  };

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  lightbox.querySelector('.img-lightbox-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) close();
  });

  return lightbox;
}

function openLightbox(src, alt) {
  const lightbox = ensureLightbox();
  const img = lightbox.querySelector('.img-lightbox-img');
  const caption = lightbox.querySelector('.img-lightbox-caption');
  img.src = src;
  img.alt = alt || '';
  caption.textContent = alt || '';
  caption.hidden = !alt;
  const openTab = lightbox.querySelector('.img-lightbox-open-tab');
  openTab.href = src;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.img-lightbox-close').focus();
}

document.querySelectorAll('[data-viewer]').forEach(el => {
  const src = el.dataset.viewer;
  const caption = el.dataset.caption || '';
  const absoluteSrc = new URL(src, window.location.href).href;
  const filename = src.split('/').pop();
  const float = el.dataset.float;
  const compact = el.hasAttribute('data-compact');
  const floatClass = float ? ` img-viewer--float-${float}` : '';
  const compactClass = compact ? ' img-viewer--compact' : '';
  const wrapOpen = float
    ? `<figure class="img-viewer-float img-viewer-float--${float}">`
    : compact
      ? '<figure class="img-viewer-figure img-viewer-figure--compact">'
      : '';
  const wrapClose = float || compact ? '</figure>' : '';
  el.outerHTML = `${wrapOpen}
<div class="img-viewer${floatClass}${compactClass}">
  <div class="img-viewer-header">
    <div class="img-viewer-btns">
      <span class="img-viewer-btn close"></span>
      <span class="img-viewer-btn min"></span>
      <span class="img-viewer-btn max"></span>
    </div>
    <div class="img-viewer-filename">${filename}</div>
    <div class="img-viewer-actions-right">
      <div class="img-viewer-icon" title="Minimize"><svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></svg></div>
      <div class="img-viewer-icon" title="Maximize"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div>
      <div class="img-viewer-icon" title="Close"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
    </div>
  </div>
  <div class="img-viewer-body">
    <img src="${absoluteSrc}" alt="${caption}" loading="lazy" />
  </div>
  <div class="img-viewer-footer">
    <div class="img-viewer-nav">
      <button type="button" class="img-viewer-nav-btn" aria-label="Previous"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg></button>
      <button type="button" class="img-viewer-nav-btn" aria-label="Next"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></button>
    </div>
    <div class="img-viewer-zoom">
      <button type="button" class="img-viewer-zoom-btn" aria-label="Zoom out"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg></button>
      <button type="button" class="img-viewer-zoom-btn" aria-label="Zoom in"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></button>
      <button type="button" class="img-viewer-expand-btn" aria-label="Expand image"><svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></button>
    </div>
  </div>
</div>${caption ? `<figcaption class="img-viewer-caption">${caption}</figcaption>` : ''}${wrapClose}`;
});

document.addEventListener('click', (e) => {
  const expandBtn = e.target.closest('.img-viewer-expand-btn');
  const img = e.target.closest('.img-viewer-body img');
  if (!expandBtn && !img) return;

  const viewerImg = expandBtn
    ? expandBtn.closest('.img-viewer')?.querySelector('.img-viewer-body img')
    : img;
  if (!viewerImg?.src) return;

  e.preventDefault();
  openLightbox(viewerImg.src, viewerImg.alt);
});
