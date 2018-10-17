(function(){
    var loader = document.getElementById('loading');
    var mytab = document.getElementById('showtable');
    var mybut = document.getElementById('setbuttons');
    
    show = function(){
      loader.style.display = "block";
      mytab.style.display = "none";
      mybut.style.display = "none";
      setTimeout(hide, 7000);
    },

    hide = function(){
      loader.style.display = "none";
      mytab.style.display = "block";
      mybut.style.display = "block";
    };
  show();
})();