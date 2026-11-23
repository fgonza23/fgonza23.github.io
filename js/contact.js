// Contact form.
// GitHub Pages is static hosting and can't run server code, so messages are
// relayed by FormSubmit (https://formsubmit.co), which emails them to the
// address in the form's action URL. Field validation uses the browser's
// built-in checks (required, type="email", minlength).
$(function () {
  'use strict';

  var form = $('.contact-form');
  var btn = form.find('.btn-send');
  var sent = $('#sendmessage');
  var failed = $('#errormessage');

  function field(name) {
    return form.find('[name="' + name + '"]').val();
  }

  form.on('submit', function (e) {
    e.preventDefault();

    var email = field('email');
    var subject = field('subject');
    var message = field('message');

    function fail() {
      var to = form.attr('action').split('/').pop();
      var mailto = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(message);
      sent.removeClass('show');
      failed
        .html('Sorry, the message could not be sent. Please email me at <a href="' + mailto + '">' + to + '</a>.')
        .addClass('show');
    }

    btn.prop('disabled', true).text('Sending...');

    $.ajax({
      type: 'POST',
      url: form.attr('action'),
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        name: field('name'),
        email: email,
        _replyto: email,
        _subject: 'Website contact: ' + subject,
        message: message,
        _template: 'table',
        _honey: field('_honey')
      }),
      success: function (res) {
        if (res && String(res.success) === 'true') {
          failed.removeClass('show');
          sent.text('Your message has been sent. Thank you!').addClass('show');
          form[0].reset();
        } else {
          fail();
        }
      },
      error: fail,
      complete: function () {
        btn.prop('disabled', false).text('Send message');
      }
    });
  });
});
