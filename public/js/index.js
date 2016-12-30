$(document).ready( function(){

  $('#send_message').click(function(){
    var message = $('#message_input').val();
    if(message.length !== 0 ){
      sendMessage(message);
      $('#message_input').val("");
    }

  });

});


function insertMessage(name, message){
  $('.last_message').removeClass('last_message');
  var extraClass = "";
  if(name == nickname){
    extraClass = "send_message";
  } else {
    extraClass = "received_message";
  }
  var message_p = '<div class="message last_message ' + extraClass + '">';
  var cloud = '<span class="message_cloud">';
  var message_span_send = '<span class="message_sender">'+ name + ' : </span>';
  var message_span_content = '<span class="message_content">' + message + '</span>';
  var cloud_close = "</span>";
  var message_p_close = '</div>';

  $('.message_container').append(message_p + cloud + message_span_send + message_span_content + cloud_close + message_p_close);

  bringToTop();
}

function insertBroadcast(data, broadcast){
  $('.message_container').append('<p class="broadcast_message">'+ data + broadcast + '</p>');
}

function bringToTop() {
		$('.message_container').animate({scrollTop: $('.last_message').offset().top },100);
	}

  function updateChatterList(data){
    if(data !== nickname){
      $('.recepients_list').append('<li>'+ data + '</li>');
    }
  }

 
