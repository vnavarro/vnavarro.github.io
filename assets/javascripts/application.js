// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require jquery.hammer



$(document).ready(function() {

  /* affix the navbar after scroll below header */
  $('#nav').affix({
    offset: {
      top: $('header').height()-$('#nav').height()
    }
  });

  /* highlight the top nav as scrolling occurs */
  $('body').scrollspy({ target: '#nav' })

  /* smooth scrolling for scroll to top */
  $('.scroll-top').click(function(){
    $('body,html').animate({scrollTop:0},1000);
  })

  /* smooth scrolling for nav sections */
  $('#nav .navbar-nav li>a').click(function(){
    var link = $(this).attr('href');
    var posi = $(link).offset().top;
    $('body,html').animate({scrollTop:posi},700);
  });

});

function click_project_first(){
  if(div_toogle('#games','#apps')){
    $('.project-btn-first').addClass('project-btn-first-selected');
    $('.project-btn-mid').removeClass('project-btn-mid-selected');
  }
}

function click_project_mid(){
  if(div_toogle('#apps','#games')){
    $('.project-btn-mid').addClass('project-btn-mid-selected');
    $('.project-btn-first').removeClass('project-btn-first-selected');
  }
}

function div_toogle(id_down,id_up){
  if($(id_up).css('display') == 'block') return false;

  $(id_down).fadeOut({complete: function(){
        $(id_up).fadeIn("slow");
        refresh_scrollspy();
      }})
  return true;
}

function refresh_scrollspy(){
  $('body').each(function () {
    var $spy = $(this).scrollspy('refresh')
  })
}
