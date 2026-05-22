    const msg = "echo Sorry, that path doesn't exist.";
    const out = document.getElementById('type');
    let i = 0;
    (function tick(){
      if(i <= msg.length){
        out.textContent = msg.slice(0, i++);
        setTimeout(tick, 35);
      }
    })();