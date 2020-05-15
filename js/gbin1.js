$(document).ready(function(){
	$('#gbin1form').sisyphus({
		customKeyPrefix: 'gb',
		timeout: 10,
		onSave: function() {
			$('#log').html('Auto saved for 10 seconds ...').fadeIn().delay(2000).fadeOut();
		},
		onRestore: function() {
			$('#log').html('Auto restored content').fadeIn();
		},
		onRelease: function() {
			$('#log').html('Auto clear content').fadeIn();
		}
	});
	
	$('#post').click(function (e){
		var name = $('#gbname').val();
		var comment = $('#gbcomments').val();
		$('<div class="new"><span class="name">' + name + '</span><div class="comment">' + comment + '</div></div>').appendTo($('#content')).fadeIn();
		e.preventDefault();
	});
});