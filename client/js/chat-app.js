// write code
// call window.chat.init
(function(chat) {
  'use strict';

  var userInfo = {};
  var messageInfo = {};

  chat = chat || (window.chat = {});

  window.chat.init(function messageHandler(data) {



        $('section#messages')
          .append('<p>')
          .find('p:last-child')
            .text(data.username + ' : ' + data.message);
    });

    $('#login').on('submit', function (event){
      event.preventDefault();

      var userName = $('input.username').val() ;

      $.ajax({
        url: '/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({username: userName}),
        success: function userName (data){
          userInfo.username = data.username;
          userInfo.token = data.token;
          $('#login').hide();
          $('#chat').css( "display", "block");

          console.log( data );
        }



      });



    });

    $('#send-message').on('submit', function (event){
      event.preventDefault();

      var msgTxt =  $('input.message').val();

      $.ajax({
        url: '/chat',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({message: msgTxt}),
        headers:
        {
          authorization: userInfo.token
        },
        success: function message (data) {
         messageInfo.message = data.message;
         console.log( data );
        }


      });



    });



  })(window.chat);
