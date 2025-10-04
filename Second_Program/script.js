// Small UI helpers: intercept form submit and show toast feedback
(function(){
  function showToast(message){
    var t = document.getElementById('toast');
    if(!t){
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = message;
    t.classList.add('show');
    clearTimeout(t._hide);
    t._hide = setTimeout(function(){ t.classList.remove('show'); }, 2500);
  }
// to toogle b/t dark and light 
  document.documentElement.setAttribute('data-theme', 'dark');

  function handleForm(e){
    e.preventDefault();
    var form = e.currentTarget;
    // simple validation: check required inputs
    var required = form.querySelectorAll('[required]');
    for(var i=0;i<required.length;i++){
      if(!required[i].value){
        showToast('Please fill required fields');
        required[i].focus();
        return;
      }
    }
    // show success and reset the form
    showToast('Saved — form submitted');
    form.reset();
  }

  document.addEventListener('DOMContentLoaded', function(){
    ['student-form','employee-form','faculty-form'].forEach(function(id){
      var f = document.getElementById(id);
      if(f) f.addEventListener('submit', handleForm);
    });

    // Enable keyboard accessibility for card links (if present)
    document.querySelectorAll('.card a').forEach(function(a){
      a.addEventListener('keydown', function(e){ if(e.key === 'Enter') a.click(); });
    });
  });
})();
