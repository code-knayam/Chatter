$(document).ready( function(){

  $('#send_message').click(function(){
    var message = $('#message_input').val();
    sendMessage(message);
    $('#message_input').val("");
  });

});


function insertMessage(name, message){
  $('.last_message').removeClass('last_message');
  $('.message_container').append('<p class="message last_message">' + '<span class="message_sender">'+ name + ' : </span>' + '<span class="message_content">' + message + '</span></p>');
  bringToTop();
}
function insertBroadcast(data){
  $('.message_container').append('<p class="broadcast_message">'+ data + ' Connected </p>');
}
function bringToTop() {
		$('.message_container').animate({scrollTop: $('.last_message').offset().top },100);
	}
