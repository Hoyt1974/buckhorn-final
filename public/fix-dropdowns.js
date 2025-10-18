(function(){
  // inject styles if not already
  if(!document.querySelector('link[href="/styles.css"]')) {
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = '/styles.css';
    document.head.appendChild(l);
  }

  // helper to remove or hide matching elements
  function strip() {
    var sel = [
      '[role="menu"]', '[role="menuitem"]', '.menu', '.dropdown', '.popover', '.overlay',
      '[aria-haspopup="listbox"]', '.language-selector', '.locale-popup', '[data-testid*="dropdown"]',
      '.popover-panel', '.popover-root', '.menu-panel', '.menu-list'
    ].join(',');
    document.querySelectorAll(sel).forEach(function(el){
      try {
        el.style.display = 'none';
        el.style.pointerEvents = 'none';
        el.style.opacity = '0';
        el.setAttribute('aria-hidden','true');
      } catch(e){}
    });
  }

  // close interactive dropdowns by simulating outside click
  function closeOpen() {
    document.body.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true}));
  }

  // run immediately, then on DOMContentLoaded
  strip();
  closeOpen();
  document.addEventListener('DOMContentLoaded', function(){
    strip();
    closeOpen();
  });

  // watch for dynamically added popovers and remove them
  var mo = new MutationObserver(function(muts){
    muts.forEach(function(m){
      if(m.addedNodes && m.addedNodes.length){
        strip();
        closeOpen();
      }
    });
  });
  mo.observe(document.documentElement || document.body, {childList:true, subtree:true});
})();
