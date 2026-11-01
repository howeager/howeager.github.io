// Build previews with real buttons; use a native dialog for keyboard and focus handling.
const imageDialog = document.createElement('dialog');
imageDialog.className = 'image-dialog';
imageDialog.setAttribute('aria-labelledby', 'preview-title');
imageDialog.innerHTML = '<div class="dialog-top"><span id="preview-title">Image preview</span><button class="dialog-close" type="button" autofocus>Close ×</button></div><img alt=""><p></p><a target="_blank" rel="noopener noreferrer">Open original image ↗</a>';
document.body.append(imageDialog);
imageDialog.querySelector('button').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => {
  if (event.target !== imageDialog) return;
  const bounds = imageDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) imageDialog.close();
});
imageDialog.addEventListener('close', () => { document.body.style.overflow = ''; });

document.querySelectorAll('[data-viewer]').forEach(placeholder => {
  const src = new URL(placeholder.dataset.viewer, location.href).href;
  const caption = placeholder.dataset.caption || '';
  const filename = decodeURIComponent(new URL(src).pathname.split('/').pop());
  const figure = document.createElement('figure');
  figure.className = 'img-viewer-figure';
  if (['left', 'right'].includes(placeholder.dataset.float)) figure.classList.add(`img-viewer-float--${placeholder.dataset.float}`);
  if (placeholder.hasAttribute('data-compact')) figure.classList.add('img-viewer-figure--compact');
  const frame = document.createElement('div');
  frame.className = 'img-viewer';
  const header = document.createElement('div');
  header.className = 'img-viewer-header';
  header.textContent = filename;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'image-open';
  button.setAttribute('aria-label', `Enlarge image: ${caption || filename}`);
  const image = document.createElement('img');
  image.src = src;
  image.alt = caption || filename;
  image.loading = 'lazy';
  button.append(image);
  button.addEventListener('click', () => {
    const preview = imageDialog.querySelector('img');
    preview.src = src;
    preview.alt = image.alt;
    imageDialog.querySelector('p').textContent = caption;
    imageDialog.querySelector('a').href = src;
    imageDialog.showModal();
    document.body.style.overflow = 'hidden';
  });
  frame.append(header, button);
  figure.append(frame);
  if (caption) {
    const figcaption = document.createElement('figcaption');
    figcaption.className = 'img-viewer-caption';
    figcaption.textContent = caption;
    figure.append(figcaption);
  }
  placeholder.replaceWith(figure);
});
