// Smooth scroll, resume click-tracking (local), and simple UI feedback
document.addEventListener('DOMContentLoaded', function(){
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  function getDownloads(){ return parseInt(localStorage.getItem('resumeDownloads')||'0',10); }
  function getOpens(){ return parseInt(localStorage.getItem('resumeOpens')||'0',10); }
  function updateCounts(){
    document.querySelectorAll('.download-count').forEach(function(el){
      el.textContent = 'Downloaded ' + getDownloads() + ' times';
    });
    document.querySelectorAll('.open-count').forEach(function(el){
      el.textContent = 'Opened ' + getOpens() + ' times';
    });
  }

  updateCounts();

  function showToast(msg){
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    // small delay for transition
    setTimeout(function(){ t.classList.add('visible'); }, 10);
    setTimeout(function(){ t.classList.remove('visible'); setTimeout(function(){ t.remove(); }, 220); }, 2900);
  }

  // Track resume-related links by data-action attribute
  document.querySelectorAll('a[data-action]').forEach(function(a){
    a.addEventListener('click', function(e){
      var action = a.getAttribute('data-action');
      if(action === 'download-resume'){
        var v = getDownloads() + 1;
        localStorage.setItem('resumeDownloads', String(v));
        updateCounts();
        showToast('Resume download recorded (local)');
      } else if(action === 'open-resume'){
        var v = getOpens() + 1;
        localStorage.setItem('resumeOpens', String(v));
        updateCounts();
      }
      // allow default navigation (links open in new tab)
    });
  });

});
