    const bannerWide = [
      "╔══════════════════════════════════════════════════════════╗",
      "║              ROBERTO SALDANA - PORTFOLIO                 ║",
      "╚══════════════════════════════════════════════════════════╝",
      "",
      "Welcome to my terminal-based portfolio!",
      "",
      "About Me:",
      "  Name: Roberto Saldana",
      "  Degree: B.S. in Computer Information Systems (CIS)",
      "  School: Cal Poly Pomona - 4th Year",
      "  CCDC Competitor | Treasurer, Security Operations Club",
      "  Hobbies: Building things with my own two hands; editing goofy videos when time allows",
      "",
      "═══════════════════════════════════════════════════════════",
      ""
    ];
    const bannerNarrow = [
      "╔════════════════════════╗",
      "║  ROBERTO SALDANA       ║",
      "║  PORTFOLIO             ║",
      "╚════════════════════════╝",
      "",
      "Welcome to my terminal portfolio!",
      "",
      "About Me:",
      "  Roberto Saldana",
      "  CIS @ Cal Poly Pomona",
      "  CCDC · SecOps Club",
      "",
      "Type ls for commands.",
      ""
    ];
    const banner = window.matchMedia("(max-width: 640px)").matches ? bannerNarrow : bannerWide;

    const posts = [
      {
        title: "Building a Production-Grade Minecraft Server Nobody Asked For",
        url: "pages/minecraft-server.html",
        date: "2026-05-21"
      }
    ];

    const commands = {
      ls(){
        let html = '<div class="success" style="font-weight:700">Available commands and recent blog posts:</div><br>';
        html += '<div style="margin-left: 16px">';
        html += '<div><span class="success">Commands:</span></div>';
        html += '<div>  help - Show available commands</div>';
        html += '<div>  about - Learn more about me</div>';
        html += '<div>  contact - Get my contact information</div>';
        html += '<div>  open &lt;#|all&gt; - Open a blog post</div>';
        html += '<div>  clear - Clear the terminal</div>';
        html += '<br><div><span class="success">Recent Blog Posts:</span></div>';
        posts.forEach((p,i)=>{
          html += `<div>  <a href="${p.url}" class="blog-post" data-index="${i}">${i+1}. ${p.title}</a> <span style="color:#888">(${p.date})</span></div>`
        });
        html += '</div>';
        return html;
      },
      help(){
        return `<div class="success">Available commands:</div>
          <div style="margin-left:16px">
            <div>ls - List commands and posts</div>
            <div>about - Learn more about me</div>
            <div>contact - Get my contact info</div>
            <div>open &lt;#|all&gt; - Open a post in viewer</div>
            <div>clear - Clear the terminal</div>
          </div>`;
      },
      about(){
        return `<div>
          <div><span class="success">About Roberto Saldana</span></div><br>
          <div>I'm a 4th year CIS student at Cal Poly Pomona, a CCDC competitor,</div>
          <div>and the Treasurer of my university's Security Operations Club.</div>
          <br>
          <div>I love building things with my own two hands and editing goofy videos</div>
          <div>whenever I can carve out the time.</div>
          <br>
          <div>Current Focus:</div>
          <div style="margin-left:16px">
            <div>- Systems Security</div>
            <div>- Security operations & blue-team tooling</div>
            <div>- Competitive readiness (CCDC)</div>
          </div>
        </div>`;
      },
      contact(){
        return `<div>
          <div><span class="success">Contact Information</span></div><br>
          <div>Email: <a href="mailto:robsal03@outlook.com">robsal03@outlook.com</a></div>
          <div>GitHub: <a href="https://github.com/howeager" target="_blank" rel="noopener">github.com/howeager</a></div>
          <div>LinkedIn: <a href="https://www.linkedin.com/in/rob-saldana" target="_blank" rel="noopener">linkedin.com/in/robsal03@outlook.com</a></div>
        </div>`;
      },
      clear(){
        output.innerHTML = '';
        return '';
      },
      open(arg){
        if(!arg){ return `<span class="error">Usage:</span> open &lt;number|all&gt;` }
        if(arg === 'all'){
          openViewer(posts[0].url, posts[0].title);
          return `<span class="success">Opening all posts in sequence… (showing #1)</span>`;
        }
        const idx = Number(arg);
        if(Number.isNaN(idx) || idx < 1 || idx > posts.length){
          return `<span class="error">Invalid index.</span> Type <span class="success">ls</span> to list posts.`;
        }
        openViewer(posts[idx-1].url, posts[idx-1].title);
        return `<span class="success">Opening: ${posts[idx-1].title}</span>`;
      }
    };

    const term = document.getElementById('terminal');
    const output = document.getElementById('output');
    const prompt = document.getElementById('prompt');
    const input = document.getElementById('input');
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const typeDelay = isCoarsePointer ? 0 : 8;
    const lineDelay = isCoarsePointer ? 0 : 24;

    function focusInput(){
      input.focus({ preventScroll: true });
      scrollPromptIntoView();
    }

    function scrollToBottom(){
      const scroll = ()=>{
        term.scrollTop = term.scrollHeight;
      };
      requestAnimationFrame(()=>{
        scroll();
        requestAnimationFrame(scroll);
      });
      setTimeout(scroll, 50);
      if(document.activeElement === input){
        setTimeout(scroll, 150);
      }
    }

    function scrollPromptIntoView(){
      scrollToBottom();
    }

    term.addEventListener('pointerdown', (e)=>{
      if(e.target.closest('a, button, .viewer')) return;
      if(e.target !== input) focusInput();
    });

    if(window.visualViewport){
      window.visualViewport.addEventListener('resize', ()=>{
        if(document.activeElement === input) scrollPromptIntoView();
      });
    }

    let line=0, col=0;
    function typeWriter(){
      if(line < banner.length){
        const current = banner[line];
        if(col < current.length){
          if(col === 0){
            output.insertAdjacentHTML('beforeend', '<span class="banner-line"></span>');
          }
          const lineEl = output.querySelector('.banner-line:last-child');
          if(lineEl) lineEl.textContent += current.charAt(col);
          col++;
          setTimeout(typeWriter, typeDelay);
        }else{
          line++; col=0;
          setTimeout(typeWriter, lineDelay);
        }
      }else{
        if(!isCoarsePointer) focusInput();
        scrollToBottom();
        showToast();
      }
    }

    const history = [];
    let hIndex = -1;

    function printPrompted(commandText, resultHTML){
      const cmdLine = document.createElement('div');
      cmdLine.className = 'line';
      cmdLine.innerHTML = `<span class="user">roberto@cal-poly-pomona</span>:<span class="path">~</span>$ <span class="command">${commandText}</span>`;
      term.insertBefore(cmdLine, prompt);
      if(resultHTML){
        const res = document.createElement('div');
        res.className = 'output';
        res.innerHTML = resultHTML;
        term.insertBefore(res, prompt);
      }
      scrollToBottom();
    }

    function run(raw){
      const txt = raw.trim();
      if(!txt) return;
      const [cmd, ...args] = txt.split(/\s+/);
      const arg = args.join(' ').trim();
      if(typeof commands[cmd] === 'function'){
        const out = commands[cmd](arg);
        if(cmd !== 'clear') printPrompted(raw, out);
      }else{
        printPrompted(raw, `<span class="error">bash: ${cmd}: command not found</span><br>Type 'help' to see available commands.`);
      }
    }

    input.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter'){
        const v = input.value;
        history.unshift(v);
        hIndex = -1;
        run(v);
        input.value = '';
        scrollToBottom();
      }else if(e.key === 'ArrowUp'){
        e.preventDefault();
        if(history.length){
          hIndex = Math.min(hIndex + 1, history.length - 1);
          input.value = history[hIndex] ?? '';
          queueMicrotask(()=> input.setSelectionRange(input.value.length, input.value.length));
        }
      }else if(e.key === 'ArrowDown'){
        e.preventDefault();
        if(history.length){
          hIndex = Math.max(hIndex - 1, -1);
          input.value = hIndex === -1 ? '' : (history[hIndex] ?? '');
          queueMicrotask(()=> input.setSelectionRange(input.value.length, input.value.length));
        }
      }
    });

    // open links in the viewer (touch devices navigate directly — easier on phones)
    document.addEventListener('click', (e)=>{
      const a = e.target.closest('a.blog-post');
      if(!a) return;
      if(isCoarsePointer) return;
      e.preventDefault();
      const idx = Number(a.dataset.index ?? 0);
      const p = posts[idx];
      openViewer(p.url, p.title);
    });

    const viewer = document.getElementById('viewer');
    const viewerTitle = document.getElementById('viewerTitle');
    const viewerContent = document.getElementById('viewerContent');
    const btnClose = document.getElementById('btnClose');

    function openViewer(url, title){
      viewerTitle.textContent = title || 'Untitled';
      viewerContent.innerHTML = '';

      const iframe = document.createElement('iframe');
      iframe.loading = 'eager';
      iframe.src = url;
      viewerContent.appendChild(iframe);

      btnClose.onclick = closeViewer;
      viewer.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeViewer(){
      viewer.classList.remove('show');
      document.body.style.overflow = '';
    }

    input.addEventListener('focus', ()=>{
      toast.classList.remove('show');
      setTimeout(scrollPromptIntoView, 150);
    });

    const toast = document.getElementById('toast');
    const toastClose = document.getElementById('toastClose');
    function showToast(){
      toast.classList.add('show');
      const ms = isCoarsePointer ? 5000 : 8000;
      setTimeout(()=> toast.classList.remove('show'), ms);
    }
    toastClose.addEventListener('click', ()=> toast.classList.remove('show'));

    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && viewer.classList.contains('show')) closeViewer();
    });

    function startBanner(){
      if(isCoarsePointer){
        banner.forEach((text)=>{
          const span = document.createElement('span');
          span.className = 'banner-line';
          span.textContent = text;
          output.appendChild(span);
        });
        scrollToBottom();
        showToast();
        return;
      }
      setTimeout(typeWriter, 400);
    }

    startBanner();