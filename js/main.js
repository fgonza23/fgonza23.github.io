$(function () {
  'use strict';

  var nav = $('#main-nav');
  var menu = $('.nav-menu');

  // Smooth scroll for in-page links
  $('a[href^="#"]').on('click', function (e) {
    var hash = this.hash;
    var target = $(hash);
    if (!target.length) return;

    e.preventDefault();
    $('a').removeClass('active');
    $(this).addClass('active');
    if ($(window).width() < 992) menu.slideUp();

    $('html, body').stop().animate({ scrollTop: target.offset().top - 80 }, 500, 'swing', function () {
      history.replaceState(null, '', hash);
    });
  });

  // Show the navbar once the visitor scrolls past the top of the header
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 200) {
      nav.slideDown(700);
    } else {
      nav.slideUp(700);
    }
  });

  // Mobile menu toggle
  $('.responsive').on('click', function () {
    menu.slideToggle();
  });

  // Rotating titles in the header
  $('.typed').typed({
    strings: ['a Technical Problem Solver.', 'an AI Builder.', 'a Community Builder, Full Stack.', 'Francisco Gonzalez.'],
    typeSpeed: 100,
    loop: true
  });

  // Skills carousel
  $('.services-carousel').owlCarousel({
    autoplay: true,
    loop: true,
    margin: 20,
    dots: true,
    nav: false,
    responsive: { 0: { items: 1 }, 768: { items: 2 }, 900: { items: 4 } }
  });
});
