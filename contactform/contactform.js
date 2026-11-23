jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function() {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;

    // GitHub Pages can't run server code, so messages are relayed by
    // FormSubmit (https://formsubmit.co), which emails them to the address
    // in the form's action URL.
    var form = $(this);
    var btn = form.find('.btn-send');
    var to = 'francisco.gonz0906@gmail.com';
    var subject = form.find('[name="subject"]').val();
    var message = form.find('[name="message"]').val();
    var name = form.find('[name="name"]').val();
    var email = form.find('[name="email"]').val();
    var data = {
      name: name,
      email: email,
      _replyto: email,
      _subject: 'Website contact: ' + subject,
      message: message,
      _template: 'table',
      _honey: form.find('[name="_honey"]').val()
    };

    function fail() {
      $("#sendmessage").removeClass("show");
      $("#errormessage").html('Sorry, the message could not be sent. Please email me at <a href="mailto:' + to +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message) + '">' + to + '</a>.').addClass("show");
    }

    btn.prop('disabled', true).val('Sending...');
    $.ajax({
      type: "POST",
      url: form.attr('action'),
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json",
      headers: { Accept: "application/json" },
      success: function(res) {
        if (res && (res.success === true || res.success === "true")) {
          $("#errormessage").removeClass("show");
          $("#sendmessage").text("Your message has been sent. Thank you!").addClass("show");
          form.find("input[type=text], input[type=email], textarea").val("");
        } else {
          fail();
        }
      },
      error: fail,
      complete: function() { btn.prop('disabled', false).val('Send message'); }
    });
    return false;
  });

});
