/* Global */
	$(function(){
		set_mask();
		calculator_options();
	});
	function set_mask(){
		$('#calculator_phone').mask('80000000000');
		$('#callback_phone').mask('80000000000');
		$('#request_phone').mask('80000000000');
		$('#feedback_phone').mask('80000000000');
	}
/* /Global */
/* Video Quality */
	$('#show_video_quality').on('click',function(){
		$('#video_quality').fadeToggle();
	});
	$('#show_cctv_video').on('click',function(){
		$('#cctv_quality').fadeIn();
		$('#hd_quality').hide();
		$('#fullhd_quality').hide();
		$('#quadhd_quality').hide();
	});
	$('#show_hd_video').on('click',function(){
		$('#hd_quality').fadeIn();
		$('#cctv_quality').hide();
		$('#fullhd_quality').hide();
		$('#quadhd_quality').hide();
	});
	$('#show_fullhd_video').on('click',function(){
		$('#fullhd_quality').fadeIn();
		$('#hd_quality').hide();
		$('#cctv_quality').hide();
		$('#quadhd_quality').hide();
	});
	$('#show_quadhd_video').on('click',function(){
		$('#quadhd_quality').fadeIn();
		$('#fullhd_quality').hide();
		$('#hd_quality').hide();
		$('#cctv_quality').hide();
	});
/* /Video Quality */
/* Modal */
	/* FeedBack */
		$('#feedback_form').on('submit',function(){
			var name = $('#feedback_name').val();
			var phone = $('#feedback_phone').val();
			var message = $('#feedback_message').val();
			
			if(name.length < 4){
				$('#feedback_name').focus();
				return false;
			}
			if(phone.length < 11){
				$('#feedback_phone').focus();
				return false;
			}
			
			$.ajax({
				url: '/ajax/modal/send_feedback.php',
				type: 'POST',
				data: {name: name, phone: phone, message: message},
				beforeSend: function(){
					$('#feedback_form').hide();
					$('#modal_feedback .progress').show();
				},
				complete: function(){
					$('#modal_feedback .progress').hide();
				},
				success: function(){
					$('#modal_feedback .alert-success').fadeIn();
				},
				error: function(){
					$('#modal_feedback .alert-danger').fadeIn();
				}
			});
		});
	/* /FeedBack */
	/* Phone */
		$('#callback_form').on('submit',function(){
			var name = $('#callback_name').val();
			var phone = $('#callback_phone').val();
			var time = $('#callback_time').val();
			
			if(name.length < 4){
				$('#callback_name').focus();
				return false;
			}
			if(phone.length < 11){
				$('#callback_phone').focus();
				return false;
			}
			
			$.ajax({
				url: '/ajax/modal/send_callback.php',
				type: 'POST',
				data: {name: name, phone: phone, time: time},
				beforeSend: function(){
					$('#callback_form').hide();
					$('#modal_callback .progress').show();
				},
				complete: function(){
					$('#modal_callback .progress').hide();
				},
				success: function(){
					$('#modal_callback .alert-success').fadeIn();
				},
				error: function(){
					$('#modal_callback .alert-danger').fadeIn();
				}
			});
		});
	/* /Phone */
	/* Request */
		$('#request_form').on('submit',function(){
			var name = $('#request_name').val();
			var phone = $('#request_phone').val();
			var type = $('select#request_type').val();
			//var extra = $('#request_extra').val();
			
			if(name.length < 4){
				$('#request_name').focus();
				return false;
			}
			if(phone.length < 11){
				$('#request_phone').focus();
				return false;
			}
			
			$.ajax({
				url: '/ajax/modal/send_request.php',
				type: 'POST',
				data: {name: name, phone: phone, type: type},
				beforeSend: function(){
					$('#request_form').hide();
					$('#modal_request .progress').show();
				},
				complete: function(){
					$('#modal_request .progress').hide();
				},
				success: function(){
					$('#modal_request .alert-success').fadeIn();
				},
				error: function(){
					$('#modal_request .alert-danger').fadeIn();
				}
			});
		});
	/* /Request */
/* /Modal */
/* Calculator */
	/* Events */
		$('#calculator_next a').on('click',function(){
				$('#calculator_order').fadeToggle();
			});
			
		$('#calculator_options select').on('change',function(){
			calculator_options();
		});
	/* /Events */
	/* Calculator Order */
		$('#calculator_order').on('submit',function(){
			var name = $('#calculator_name').val();
			var phone = $('#calculator_phone').val();
			var count = $('select#calculator_count').val();
			var resolution = $('select#calculator_resolution').val();
			var storage = $('select#calculator_storage').val();
			var total = $('#total_value').html();
			
			if(name.length < 4){
				$('#calculator_name').focus();
				return false;
			}
			if(phone.length < 11){
				$('#calculator_phone').focus();
				return false;
			}
			
			$.ajax({
				url: '/ajax/calculator/send_order.php',
				type: 'POST',
				data: {name: name, phone: phone, count: count, resolution: resolution, storage: storage, total: total},
				beforeSend: function(){
					$('#calculator_order').hide();
					$('#calculator_options').hide();
					$('#calculator .progress').show();
				},
				complete: function(){
					$('#calculator .progress').hide();
				},
				success: function(){
					$('#calculator .alert-success').fadeIn();
				},
				error: function(){
					$('#calculator .alert-danger').fadeIn();
				}
			});
		});
	/* /Calculator Order */
	/* Calculator Options */
		function calculator_options(){
		
			var count_user = $("select#calculator_count").val();
			var resolution_user = $("select#calculator_resolution").val();
			var storage_user = $("select#calculator_storage").val();
			
			var resolution = {
				"hd" : 3325,
				"fullhd" : 5000,
				"quadhd" : 11300
			};
			var storage = {
				"week" : 2060,
				"fortnight" : 2260,
				"month" : 3440
			};
			var delivery = 500;
			var transport = 500;
			var cable = 150 * count_user;
			//var injector = 450 * count_user;
			var power = 205 * count_user;
			
			var recorder = {
				"four" : 4200,
				"eight" : 5000,
				"sixteen" : 8500
			};
			var commutator = {
				"four" : 610,
				"eight" : 930,
				"sixteen" : 2950
			};
			var supply = {
				"two" : 380,
				"four" : 490
			};
			var install = 1500 + (count_user * 1000);
			
			var total = 0;
			
			if(count_user == 1)
			{
				total = ((count_user * resolution[resolution_user]) + recorder["four"] + delivery + transport + cable + power + supply["two"] + install + storage[storage_user]);
			}
			if(count_user >= 2 && count_user <= 4)
			{
				total = ((count_user * resolution[resolution_user]) + recorder["four"] + delivery + transport + cable + power + (Math.ceil(count_user / 3) * supply["four"]) + install + storage[storage_user] + commutator["four"]);
			}
			if(count_user > 4 && count_user <= 8)
			{
				total = ((count_user * resolution[resolution_user]) + recorder["eight"] + delivery + transport + cable + power + (Math.ceil(count_user / 3) * supply["four"]) + install + storage[storage_user] + commutator["eight"]);
			}
			if(count_user > 8 && count_user <= 16)
			{
				total = ((count_user * resolution[resolution_user]) + recorder["sixteen"] + delivery + transport + cable + power + (Math.ceil(count_user / 3) * supply["four"]) + install + storage[storage_user] + commutator["sixteen"]);
			}
			
			$('#total_value').html(total);
		}
	/* /Calculator Options */
/* /Calculator */
/* Computer */
	$('#show_repair_computer').on('click',function(){
		$('#price_repair_computer').fadeToggle();
	});
	$('#show_install_network').on('click',function(){
		$('#price_install_network').fadeToggle();
	});
	$('#show_service_computer').on('click',function(){
		$('#price_service_computer').fadeToggle();
	});
/* /Computer */