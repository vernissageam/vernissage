$(document).ready(function(){

	// Check Address -- (/companies/first_step.html)
	$('#registered_address').css('opacity',0.5);
	$('#id_registered_address').change(function(){
		if($(this).is(':checked')){
			$('#registered_address').animate({opacity: 1},100);
		}else{
			$('#registered_address').animate({opacity: 0.5},100);
		}
	});
	$('#id_other_address').css('opacity',0.5).prop('readonly',true);
	$('#other_address_checkbox').change(function(){
		if($(this).is(':checked')){
			$('#id_other_address').animate({opacity: 1},100).prop('readonly',false);

		}else{
			$('#id_other_address').animate({opacity: 0.5},100).prop('readonly',true);
		}
	});

	// Check Share Capital -- (/companies/first_step.html)
	$('#default_capital').css('opacity',0.5);
	$('#id_default_capital').change(function(){
		if($(this).is(':checked')){
			$('#default_capital').animate({opacity: 1},100);
		}else{
			$('#default_capital').animate({opacity: 0.5},100);
		}
	});
	$('#id_other_capital').css('opacity',0.5).prop('readonly',true);
	$('#other_capital_checkbox').change(function(){
		if($(this).is(':checked')){
			$('#id_other_capital').animate({opacity: 1},100).prop('readonly',false);

		}else{
			$('#id_other_capital').animate({opacity: 0.5},100).prop('readonly',true);
		}
	});

	// Forms submit
	$('#first_step_finish').click(function(e){
		e.preventDefault();
		var improve_text = $('#improve_text').val();
		$('#id_improve_list').val(improve_text);
		$('#first_step').submit();
	});
	$('#second_step_finish').click(function(e){
		$('#second_step').submit();
	});
	$('#third_step_finish').click(function(e){
		e.preventDefault();
		var improve_text = $('#improve_text').val();
		$('#id_improve_list').val(improve_text);
		$('#third_step').submit();
	});
	$('#fourth_step_finish').click(function(e){
		e.preventDefault();
		var improve_text = $('#improve_text').val();
		$('#id_improve_list').val(improve_text);

		$('#fourth_step').submit();
	});
	$('#send_request').click(function(e){
		e.preventDefault();
		if($('#fourth_step').valid()) {
			if (!confirm('Are you sure that you want to send a request to your employee ?')) {
				return false;
			}
		}
		var improve_text = $('#improve_text').val();
		$('#id_improve_list').val(improve_text);
		$('#hidden_send_request').val('1');
		$('#fourth_step').submit();
	});

	$('#approve_company').click(function(e){
		e.preventDefault();
		if(window.company_type == 'standard'){
			if(!$("input:radio[name='selected_bank']").is(":checked")){
				alert('Please select bank');
				return false;
			}
		}
		if($('#fourth_step').valid()){
			if(!confirm('Are you sure that you want to approve a company ?')){
				return false;
			}
		}
		var improve_text = $('#improve_text').val();
		$('#id_improve_list').val(improve_text);
		$('#hidden_approve_company').val('1');
		$('#fourth_step').submit();
	});
	$('#cor_partner_finish').click(function(e){
		e.preventDefault();
		var improve_text = $('#improve_text').val();
		$('#id_improve_list').val(improve_text);
		$('#cor_partner').submit();
	});
	$('#ind_partner_finish').click(function(e){
		e.preventDefault();
		var improve_text = $('#improve_text').val();
		$('#id_improve_list').val(improve_text);
		$('#ind_partner').submit();
	});
	$('#audit_first_step_finish').click(function(e){
		e.preventDefault();
		var improve_text = $('#improve_text').val();
		$('#id_improve_list').val(improve_text);
		$('#audit_first_step').submit();
	});
	$('#audit_second_step_finish').click(function(e){
		e.preventDefault();
		var improve_text = $('#improve_text').val();
		$('#id_improve_list').val(improve_text);
		$('#audit_second_step').submit();
	});
	$('#audit_third_step_finish').click(function(e){
		e.preventDefault();
		var improve_text = $('#improve_text').val();
		$('#id_improve_list').val(improve_text);
		$('#audit_third_step').submit();
	});





	// Change partners inputs count -- (/companies/first_step.html)
	$('#id_corporate_shareholders_count').on('focus', function(){
		window.old_value = $(this).val();
	}).change(function(){
		generate_partners('corporate_shareholders', $(this).val(), old_value, 'Lorem ipsum input')
	});
	$('#id_individual_shareholders_count').on('focus', function(){
		window.old_value = $(this).val();
	}).change(function(){
		generate_partners('individual_shareholders', $(this).val(), old_value, 'Lorem ipsum input')
	});
	$('#id_corporate_directors_count').on('focus', function(){
		window.old_value = $(this).val();
	}).change(function(){
		generate_partners('corporate_directors', $(this).val(), old_value, 'Lorem ipsum input')
	});
	$('#id_individual_directors_count').on('focus', function(){
		window.old_value = $(this).val();
	}).change(function(){
		generate_partners('individual_directors', $(this).val(), old_value, 'Lorem ipsum input')
	});
	$('#id_card_holders_count').on('focus', function(){
		window.old_value = $(this).val();
	}).change(function(){
		generate_partners('card_holders', $(this).val(), old_value, 'Lorem ipsum input')
	});
	$('#id_individual_secretaries_count').on('focus', function(){
		window.old_value = $(this).val();
	}).change(function(){
		generate_partners('individual_secretaries', $(this).val(), old_value, 'Lorem ipsum input')
	});

	//////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////// AUDIT HANDLERS //////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////
	$('#id_audit_directors_count').on('focus', function(){
		window.old_value = $(this).val();
	}).change(function(){
		generate_audit_partners('id_audit_directors', $(this).val(), window.old_value, 'Lorem ipsum input')
	});
	$('#id_audit_shareholders_count').on('focus', function(){
		window.old_value = $(this).val();
	}).change(function(){
		generate_audit_partners('id_audit_shareholders', $(this).val(), window.old_value, 'Lorem ipsum input')
	});
	$('#id_audit_judicial_representative_count').on('focus', function(){
		window.old_value = $(this).val();
	}).change(function(){
		generate_audit_partners('id_audit_judicial_representative', $(this).val(), window.old_value, 'Lorem ipsum input')
	});
	$('#id_audit_secretaries_count').on('focus', function(){
		window.old_value = $(this).val();
	}).change(function(){
		generate_audit_partners('id_audit_secretaries', $(this).val(), window.old_value, 'Lorem ipsum input')
	});

	// When employee select existing partners list, fill inputs.
	$(document).on("click", "select[id^='audit_new_']", function(click_event) {
		var id = $(this).val();
		var d_partners = window.all_partners;
		for (i in d_partners) {
			console.log(d_partners[i]);
			if (d_partners[i]['id'] == id) {
				$(this).parents(".partner_block_audit").find(".name").val(d_partners[i]['name']);
				$(this).parents(".partner_block_audit").find(".address").val(d_partners[i]['individualpartner__residential_address']);
				$(this).parents(".partner_block_audit").find(".document_no").val(d_partners[i]['individualpartner__document_no']);
				if ($(this).parents(".partner_block").data("type") != d_partners[i]['type']) {
					$(this).parents(".partner_block_audit").find(".id_partner").val("new_" + $(this).parents(".partner_block_audit").find(".name").data("new_id"));
				} else {
				    $(this).parents(".partner_block_audit").find(".id_partner").val(d_partners[i]['id']);
				}
				console.log();
				return;
			}
		}
		// If reaches here, then no one of form window.all_partners selected, so default is selected.
			$(this).parents(".partner_block_audit").find(".name").val('');
			$(this).parents(".partner_block_audit").find(".address").val('');
			$(this).parents(".partner_block_audit").find(".document_no").val('');
			$(this).parents(".partner_block_audit").find(".id_partner").val('');
	});

	$(document).on("focus", "select[id^='audit_new_']", function(click_event) {
		generate_audit_dropdown($(this));
	});
	//////////////////////////// END AUDIT HANDLERS  /////////////////////////////////////

	$(document).on('focus', '.contact_persons, .corporate_shareholders, .individual_shareholders, .corporate_directors, .individual_directors, .individual_secretaries', function() {
		$(this).addClass('on_focus');
	});
	$(document).on('focusout', '.contact_persons, .corporate_shareholders, .individual_shareholders, .corporate_directors, .individual_directors, .individual_secretaries',function() {
		check_unique($(this));
	});

	// DatePicker elements
	$("#id_date_of_birth").datepicker({
		dateFormat: "yy-mm-dd"
	});
	$("#id_registration_date").datepicker({
		dateFormat: "yy-mm-dd"
	});
	$("#id_start_date").datepicker({
		dateFormat: "yy-mm-dd"
	});
	$("#id_review_date").datepicker({
		dateFormat: "yy-mm-dd"
	});

	// Fourth Step (Assets details visible)
	$('#id_is_holding').change(function(){
		if($('#id_is_holding').is(':checked')){
			$('#assets_details_block').css('display','block');
		}else{
			$('#assets_details_block').css('display','none');
		}
	});
	if($('#id_is_holding').is(':checked')) {
		$('#assets_details_block').css('display', 'block');
	}

	// Companies filter in employee page
	new List('companies', {valueNames: [ 'company_name', 'client_name' ]});
	// Employees filter in Admin index page
	new List('employees', {valueNames: [ 'employee_name', 'employee_name' ]});
	// Banks filter in employee page
	new List('bank_accounts', {valueNames: [ 'bank_name', 'client_name' ]});

	// Third Step (removing contacts)

	$(document).on('click', 'span[id^="new_del"]', function() {
		var id = $(this).attr('id').split('new_del_')[1];
			$('#div_new_del_'+id).remove();
			var select_val = $('#id_contact_persons_count').val() - 1;
			$('#id_contact_persons_count').val(select_val);
	});
	$(document).on('click', 'span[id^="exist_del"]', function() {
		var id = $(this).attr('id').split('exist_del_')[1];
		var delete_list = $('#id_delete_list').val();
		$('#id_delete_list').val(String(delete_list)+','+String(id));
		$('#div_exist_del_'+id).remove();
		var select_val = $('#id_contact_persons_count').val() - 1;
		$('#id_contact_persons_count').val(select_val);
	});

	// Third Step (add-Validates)

	$(document).on('focus', '.emails', function() {
		$(this).rules("add", {
			required: true,
			email: true
		});
	});
	$(document).on('focus', '.phone_numbers', function() {
		$(this).rules("add", {
			required: true,
			customPhone: true
		});
	});
	$(document).on('focus', '.names', function() {
		$(this).rules("add", {
			required: true,
		});
	});

	$(".emails").each(function () {
		$(this).rules("add", {
			required: true,
			email: true
		});
	});
	$(".phone_numbers").each(function () {
		$(this).rules("add", {
			required: true,
			customPhone: true
		});
	});
	$(".names").each(function () {
		$(this).rules("add", {
			required: true
		});
	});

	// Drop-Down Change (Select form partners drop-down and get data)

	$(document).on('change', "select[id^='exist_'], select[id^='new_'] ", function() {
		if($(this).val() == 0){
			$(this).parent().parent().find($('.names')).val('');
			$(this).parent().parent().find($('.names')).css('opacity', 1);
		}else{
			var index = $(this).find('option:selected').attr('index');
			$(this).parent().parent().find($('.names')).val($(this).val());
			$(this).parent().parent().find($('.names')).focus();
			$(this).parent().parent().find($('.names')).css('opacity', 0);
		}
	});

	$(document).on('change', "select[id^='person_exist_'], select[id^='person_new_']", function() {
		if($(this).val() == 0){
			$(this).parent().parent().parent().find($('.names')).val('');
			$(this).parent().parent().parent().find($('.emails')).val('');
			$(this).parent().parent().parent().find($('.phone_numbers')).val('');
			$(this).parent().parent().parent().find($('.names')).css('opacity', 1);
		}else{
			var index = $(this).find('option:selected').attr('index');
			$(this).parent().parent().parent().find($('.names')).val($(this).val());
			$(this).parent().parent().parent().find($('.names')).focus();
			$(this).parent().parent().parent().find($('.names')).css('opacity', 0);

			$(this).parent().parent().parent().find($('.emails')).val(window.db_partners[index]['individualpartner__email']);
			$(this).parent().parent().parent().find($('.phone_numbers')).val(window.db_partners[index]['individualpartner__phone_number']);
		}
	});

	$(document).on('focus', "select[id^='exist_'], select[id^='new_']", function() {
		if(window.db_partners)
			generate_dropdown($(this), $(this).val(), false);
		else
			generate_dropdown($(this), $(this).val(), true);

	});

	// Third Step (contact persons count change)

	$('#id_contact_persons_count').on('focus', function(){
		window.old_value = $(this).val();
	}).change(function(){
		var count = $(this).val();
		var block = $('#contact_persons_block').find($('.partner_block'));
		var iter_count;
		var counter = $('.partner_input').last().attr('last')+1 || 0;
		if(count <= window.old_value) {
			block.empty();
			iter_count = count;
		}else{
			iter_count = count - window.old_value;
		}
		for(var i=0; i<iter_count; i++){
			block.append(
				'<div class="partner_input" last='+counter+' id="div_new_del_'+counter+'">' +
					'<label class="formLabel">Contact person<span id="new_del_'+counter+'" class="textBtn del_btn pullRight">Delete</span></label>' +
					'<div class="colRow mb0">'+
						'<div class="formRow col6"><select id="person_new_'+counter+'" class="formControl hasTooltip" data-ttip="Lorem ipsum"></select></div>' +
						'<div class="formRow col6"><input type="text" name="new_contact_persons['+counter+'].name" class="formControl hasTooltip names contact_persons" data-ttip="Lorem ipsum" placeholder="Name Surname"><span class="custom_error help-inline"></span></div>' +
					'</div>'+
					'<div class="colRow mb0">'+
						'<div class="formRow col6"><input type="text" name="new_contact_persons['+counter+'].email" class="formControl hasTooltip emails" data-ttip="Lorem ipsum" placeholder="Email"></div>' +
						'<div class="formRow col6"><input type="text" name="new_contact_persons['+counter+'].phone_number" class="formControl hasTooltip phone_numbers" data-ttip="Lorem ipsum" placeholder="Phone"></div>' +
					'</div>'+
				'</div>');
			generate_persons_dropdown($('#person_new_'+counter));
			counter++;
		}
		window.old_value = count;
	});


	// Start and Finish tasks
	$(document).on('click', '.start_task, .finish_task', function() {
		var new_date = new Date();
		var now = pad(new_date.getDate())+' '+new_date.toLocaleString('en-us', { month: 'long' })+' '+new_date.getFullYear()+' '+pad(new_date.getHours())+':'+pad(new_date.getMinutes());
		var task_id = $(this).attr('task_id');
		var action = $(this).hasClass('start_task') ? 'start' : 'finish';
		var element = $(this);
		$.ajax({
			type:"POST",
			url:"/tasks/change_status/",
			dataType: "json",
			data:({
				task_id: task_id,
				action: action,
				csrfmiddlewaretoken: window.csrf_token
			}),
			success: function(data)
			{
				data = JSON.parse(data);
				if(data){
					if(action == 'start'){
						var task_name = $(element).parent().parent().find($('.task_name')).text() || $('#main_task_name').text();
						$(element).removeClass('start_task').addClass('finish_task').val('Stop');
						$(element).removeClass('start_task btnPrime').addClass('finish_task btnRed').html('').append("<i class='icon2-stop'></i> Stop");
						$(element).parent().parent().find($('.status')).addClass('started_status').html('started');
						$('#task_status').text('Status: started');
						$(element).parent().parent().find($('.start_date')).addClass('started_date').val(now);
						$(element).parent().addClass('started_status');
						$(element).parent().parent().find($('.finish_date')).addClass('finished_date');
						$(element).parent().parent().find($('.spent_time')).html('0 days: 00:00:00');
						$(element).parent().parent().find($('.spent_time')).addClass('task_spent_time')
						$('#header_started_task').show();
						$('#header_task_name').html(task_name);
                		$('#header_finish_task').attr('task_id', task_id);
                		$('#header_spent_time').html('0 days: 00:00:00');
						$('#header_task_status').html('<button id="header_finish_task" task_id='+task_id+' class="btn btnPrime sizeXS finish_task" ><i class="icon2-stop"></i> Stop</button>');
					}else{
						$('.task_spent_time').removeClass('task_spent_time');
						$('#header_spent_time').attr('id', '');
						$('#header_task_status').html('finished');
						$(element).parent().parent().find($('.task_status')).remove();
						$('#task_status').remove();
						$(element).parent().parent().find($('.started_status')).html('finished');
						$('.finished_date').val(now);
						$('#status_time').html("Completed at: <i>"+now+"</li>");
						//$('.started_status').html('finished');
					}
				}else{
					alert('Maybe you already have an opened task?');
				}
			}
	 	});
	});

	//When adding task don't allow to choose company and employee at the same time
	$(document).on('change', "select[id^='task_company'], select[id^='task_employee']", function() {
		chosen_type = $(this).attr('id')
		if(chosen_type=='task_company'){
			$("#task_employee option[value='0']").prop('selected', true);
		}
		if(chosen_type=='task_employee'){
			$("#task_company option[value='0']").prop('selected', true);

		}
	});


	// Ask for a change for FILES
	$('.ask_change_file').click(function(){
		localStorage.setItem("file_id", $(this).attr('file_id'));
		localStorage.setItem("generated_file", $(this).attr('generated_file'));
	});

	$('#send_ask').click(function(){
		var file_id = localStorage.getItem("file_id");
		var generated_file = localStorage.getItem("generated_file");
		var body = $('#ask_change_file').val();
		$.ajax({
			type:"POST",
			url:"/doc/ask_for_change/",
			dataType: "json",
			data:({
				file_id: file_id,
				body: body,
				generated_file: generated_file,
				csrfmiddlewaretoken: window.csrf_token
			}),
			success: function(data)
			{
				$('#ask_change_file').val('');
				$.magnificPopup.close();
			}
	 	});
	});


	// Approve files (by employee)
	$('.approve_file').click(function(e){
		e.preventDefault();
		if(!confirm('are you sure?')){
			return false;
		}
		var element = $(this);
		var file_id = $(this).attr('file_id');
		var generated_file = $(this).attr('generated_file');
		//alert(generated_file)
		$.ajax({
			type:"POST",
			url:"/doc/approve_file/",
			dataType: "json",
			data:({
				file_id: file_id,
				generated_file: generated_file,
				csrfmiddlewaretoken: window.csrf_token
			}),
			success: function(data)
			{
				element.html('Approved');
				element.parent().find('.ask_change_file').remove()
			}
	 	});
	});

	// Pass files by Ajax
	$('.up_files').change(function(){
		var element = $(this);
		var file_name = $(this).attr('name');
		var file_id = $(this).attr('file_id');
		var file_data = $(this).prop("files")[0];

		if(!validate_file(file_data, element, ['jpg','pdf','doc','docx'])){
			return false
		}

		var form_data = new FormData($('#file_form_'+file_id).get(0));
		form_data.append('file_id', file_id);
		form_data.append('file_name', file_name);
		form_data.append("file", file_data);

		$.ajax({
			url: '/doc/upload_file/',
			type: 'POST',
			data:form_data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			success: function(data)
			{
				if(data == true){
					$(element).parent().find($(".file_message")).html('<span class="valid">success uploaded</span>');
				}else{
					$(element).parent().find($(".file_message")).html('<span class="error">error</span>');
				}
			}
		});
	});

	$('.gen_up_files').change(function(){
		var element = $(this);
		var file_type = $(this).attr('file_type');
		var file_company = $(this).attr('file_company');
		var file_partner = $(this).attr('file_partner');
		var file_name = $(this).attr('name');
		var file_data = $(this).prop("files")[0];

		if(!validate_file(file_data, element, ['doc','docx'])){
			return false
		}

		var form_data = new FormData($(this).parent().get(0));
		form_data.append('file_type', file_type);
		form_data.append('file_company', file_company);
		form_data.append('file_partner', file_partner);
		form_data.append('file_name', file_name);
		form_data.append("file", file_data);
		$.ajax({
			url: '/doc/gen_upload_file/',
			type: 'POST',
			data:form_data,
			cache: false,
			dataType: 'json',
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
			success: function(data)
			{
				if(data == true){
					$(element).parent().find($(".file_message")).html('<span class="valid">success uploaded</span>');
				}else{
					$(element).parent().find($(".file_message")).html('<span class="error">error</span>');
				}
			}
		});
	});

	$(".view_details").click(function() {
		var company_id = $(this).attr('company_id');
		$.ajax({
			type: "GET",
			url: "/companies/view_details/"+company_id,
			dataType: "json",
			success: function (data) {
				if(!data)
					return false;

				var company = data['company'][0];
				var contact_person = data['contact_person'];
				var new_date = new Date(company['created']);
				var created = pad(new_date.getDate()) + ' ' + new_date.getMonth() + ' ' + new_date.getFullYear() + ' ' + pad(new_date.getHours()) + ':' + pad(new_date.getMinutes());
				var registered_address = company['firststep__other_address'];
				if (company['firststep__registered_address'])
					registered_address += data['registered_address'];
				$('#detail_name').html(company['name']);
				$('#detail_reg_address').html(registered_address);
				$('#detail_reg_date').html(created);
				$('#detail_var_number').html(data['company'][0]['vat_number']);
				$('#detail_tax_number').html(data['company'][0]['tax_number']);
				if(contact_person[0]){
					$('#contact_email').html(contact_person[0]['email']);
					$('#contact_phone').html(contact_person[0]['phone_number']);
				}
			}
		});
	});

	$(document).on('click', '.new_message', function(){
		var to_user_id = $(this).attr('to_user') || '';
		var thread_id = $(this).attr('thread') || '';
		$('.send_message').attr('to_user', to_user_id);
		$('.send_message').attr('thread', thread_id);
	});

	$(document).on('click', '.send_message', function(){
		var text_message = $(this).parent().find('.new_message_text').val() || $(this).parent().parent().find('.new_message_text').val();
		var thread_id = $(this).attr('thread') || '';
		var to_user_id = $(this).attr('to_user') || '';
		if(!text_message)
			return false;

		$.ajax({
			type:"POST",
			url:"/messages/send_message/",
			dataType: "json",
			data:({
				thread_id: thread_id,
				to_user_id: to_user_id,
				message: text_message,
				csrfmiddlewaretoken: window.csrf_token
			}),
			success: function(data)
			{
				if(!data)
					return alert('Something went wrong!');

				// append new message data
				var date = new Date();
				var new_date = pad(date.getDate()) + ' ' + date.toLocaleString('en-us', {month: 'long'}) + ' ' + date.getFullYear() + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
				var new_message = $('.each_message').first().clone();
				new_message.removeClass().addClass('each_message message_sended');
				new_message.find('.created').text(new_date);
				new_message.find('.message').removeClass('to_message').addClass('self_message').text(text_message);
				new_message.prependTo('#messages_list');

				if(thread_id){
					$('.message_'+thread_id).text(text_message.substring(0,50));
					$('.modified_'+thread_id).html('<i class="icon-calendar"></i> '+new_date);
				}
				$.magnificPopup.close();
				$('.new_message_text').val('')
			}
		});
	});


	// Functions

	function validate_file(file, element, allowed_types){
		var file_name = file.name;
		var ext = file_name.substr(file_name.lastIndexOf('.')+1);

		if($.inArray(ext, allowed_types) == -1){
			$(element).parent().find($(".file_message")).html('<span class="error">file type must be '+allowed_types.join(',')+' </span>');
			return false;
		}
		if(file.size > 20 * 1024 * 1024){
			$(element).parent().find($(".file_message")).html('<span class="error">max file size is 20Mb </span>');
			return false;
		}

		return true;
	}

	function generate_partners(partner ,count, old_count, message){
		var block = $('#'+partner+'_block').find($('.partner_block'));
		var iter_count;

		count = parseInt(count);
		old_count = parseInt(old_count);
		if(count <= old_count) {
			block.empty();
			iter_count = count;
		}else{
			iter_count = count - old_count;
		}

		for(var i=0; i<iter_count; i++){
			if(window.is_corporate_page || (partner != 'corporate_shareholders' && partner != 'individual_shareholders')){
				if(partner != 'card_holders'){
					block.append('<div class="colRow mb0">'+
					'<div class="formRow col6"><select id="new_'+i+'" class="formControl hasTooltip" data-ttip="Lorem ipsum"><option selected value=0>Already registered partners</option></select></div>' +
					'<div class="formRow col6 partner_input"><input type="text" name="'+partner+'[]" class="formControl hasTooltip names '+partner+'" data-ttip="'+message+'" placeholder="Name Surname"><span class="custom_error help-inline"></span></div>'+
					'</div>'
					);
				}else {
					block.append('<div class="colRow mb0">'+
					'<div class="formRow col6"><select id="new_'+i+'" class="formControl hasTooltip" data-ttip="Lorem ipsum"><option selected value=0>Already registered partners</option></select></div>'+
					'<div class="formRow col6 partner_input"><input type="text" name="'+partner+'[]" class="formControl hasTooltip names '+partner+'" data-ttip="'+message+'" placeholder="Name Surname" style="display: none"><span class="custom_error help-inline"></span></div>'+
					'</div>'
					);
				}

				if(window.is_corporate_page){
					generate_dropdown($('#new_' + i), '', false)
				}else{
					generate_dropdown($('#new_' + i), '', true)
				}

			}else{
				block.append('<div class="formRow partner_input"><input type="text" name="'+partner+'[]" class="formControl hasTooltip names '+partner+'" data-ttip="'+message+'" placeholder="Name Surname"><span class="custom_error help-inline"></span></div>');
			}
		}
	 	window.old_value = count;
	}

	function generate_audit_partners(partner ,count, old_count, message){
		var block = $('#'+partner+'_block').find($('.partner_block'));
		var iter_count;
		count = parseInt(count);
		old_count = parseInt(old_count);
		if(count <= old_count) {
			block.empty();
			iter_count = count;
		}else{
			iter_count = count - old_count;
		}
		existings_count = block.find(".partner_block_audit").length;
		window.old_count = window.old_count ? window.old_count : 0;
		for(var i=0; i<iter_count; i++){
			var j = i + window.old_count;
			var b = i + existings_count;
			console.log(block.find(".partner_block_audit").length);
			console.log("B is:  " + b);
			block.append(
				'<div class="partner_block_audit">'+
					'<div class="colRow mb0">'+
						'<div class="formRow col6"><select id="audit_new_' + j + '" class="formControl hasTooltip" data-ttip="Lorem ipsum"><option selected value=0>Already registered partners</option></select></div>' +
						'<div class="formRow col6 partner_input"><input type="text" data-new_id="' + j + '" name="'+partner+'[' + b + '].name" class="formControl hasTooltip name '+partner+'" data-ttip="'+message+'" placeholder="Name Surname"><span class="custom_error help-inline"></span></div>'+
					'</div>' +
					'<div class="colRow mb0">'+
						'<div class="formRow col6 partner_input"><input type="text" data-new_id="' + j + '" name="'+partner+'[' + b + '].address" class="formControl hasTooltip address '+partner+'" data-ttip="'+message+'" placeholder="Address"><span class="custom_error help-inline"></span></div>'+
						'<div class="formRow col6 partner_input"><input type="text" data-new_id="' + j + '" name="'+partner+'[' + b + '].document_no" class="formControl hasTooltip document_no '+partner+'" data-ttip="'+message+'" placeholder="Passport Number"><span class="custom_error help-inline"></span></div>'+
					'</div>' +
					'<input type="hidden" name="'+partner+'[' + b + '].id" class="id_partner" val="new_'+j+'"/>' +
				'</div>'
			);
			generate_audit_dropdown($('#audit_new_' + j));
			$('[data-new_id="' + j + '"]').each(function(){$(this).rules("add", "required")});
			console.log('[data-new_id="' + j + '"]');
			$(document).on('focusout', 'input[data-new_id^="' + j + '"]', function(change_event) {
				// Check if all three fields are filled, then try to get it from all_partners and change, else create new.
				var address = $(this).parents(".partner_block_audit").find(".address").val().trim();
				var document_no = $(this).parents(".partner_block_audit").find(".document_no").val().trim();
				var name =  $(this).parents(".partner_block_audit").find(".name").val().trim();
				if ((name != '') && (address != '') && (document_no != '')) {
					var all_partners = window.all_partners;
					for (i in all_partners) {
						if (all_partners[i]['id'] == "new_" + $(this).data("new_id")) {
							window.all_partners[i]['name'] = name;
							window.all_partners[i]['individualpartner__residential_address'] = address;
							window.all_partners[i]['individualpartner__document_no'] = document_no;
							return;
						}
					}
					window.all_partners[window.all_partners.length] = {
						'id': "new_" + $(this).data("new_id"),
						'name': name,
						'individualpartner__residential_address': address,
						'individualpartner__document_no': document_no
					};
				}
			});
		}
	 	window.old_value = count;
		window.old_count = iter_count + window.old_count;
	}

	function generate_dropdown(element, name, is_data){
		$(element).empty().append('<option selected value=0>Already registered partners</option>');
		if(is_data){
			var input_name = $(element).parent().parent().find($('.names'));
			var data = get_dropdown_data(input_name);
			console.log(input_name);
			for (var i = 0; i < data.length; i++) {
				if(data[i] == name) {
					$(element).append('<option selected=selected index=' + i + ' value="'+data[i]+'">' + data[i] + '</option>');
				}else {
					$(element).append('<option index=' + i + ' value="'+data[i]+'">' + data[i] + '</option>');
				}
			}
		}else {
			for (var i = 0; i < window.db_partners.length; i++) {
				if(window.db_partners[i]['name'] == name) {
					$(element).append('<option selected=selected index=' + i + ' value="'+window.db_partners[i]['name']+'">' + window.db_partners[i]['name'] + '</option>');
				}else {
					$(element).append('<option index=' + i + ' value="'+window.db_partners[i]['name']+'">' + window.db_partners[i]['name'] + '</option>');
				}
			}
		}
	}

	function generate_audit_dropdown(element, name){
		var selected_id = $(element).val();
		$(element).empty().append('<option selected value=0>Already registered partners</option>');
		if (d_partners) {
			var db_partners = window.all_partners;
		} else {
			var db_partners = [];
		}
		for (var i = 0; i < db_partners.length; i++) {
			if (db_partners[i]['id'] == selected_id) {
				$(element).append('<option index=' + i + ' selected value="' + db_partners[i]['id'] + '">' + db_partners[i]['name'] + '</option>');
				return;
			}
			$(element).append('<option index=' + i + ' value="' + db_partners[i]['id'] + '">' + db_partners[i]['name'] + '</option>');
		}
	}

	function generate_persons_dropdown(element){
		$(element).empty().append('<option selected value=0>Already registered partners</option>');
		for (var i = 0; i < window.db_partners.length; i++) {
			$(element).append('<option index='+i+' value="'+window.db_partners[i]['name']+'">'+window.db_partners[i]['name']+'</option>');
		}
	}

	function get_dropdown_data(element){
		var available_partners = [];
		$('.corporate_shareholders, .individual_shareholders').each(function(){
			if($(this).val()) {
				available_partners.push($(this).val());
			}
		});

		if ($(element).hasClass('individual_secretaries')){

			$('.corporate_directors, .individual_directors').each(function(){
				if($(this).val() && $.inArray($(this).val(), available_partners) == -1) {
					available_partners.push($(this).val());
				}
			});
		}
		console.log($(element).hasClass('card_holders'));
		if ($(element).hasClass('card_holders')){
			available_partners = [];
			$('.corporate_directors, .individual_directors, .individual_shareholders').each(function(){
				if($(this).val() && $.inArray($(this).val(), available_partners) == -1) {
					available_partners.push($(this).val());
				}
			});
		}
		return available_partners;
	}

	function check_unique(element){
		var block = $(element).parent().find($('.custom_error'));
		block.empty();
		var unique = true;
		var class_name = '';
		if(element.hasClass('corporate_shareholders') || element.hasClass('individual_shareholders')){
			class_name = '.corporate_shareholders, .individual_shareholders';
		}else if(element.hasClass('corporate_directors') || element.hasClass('individual_directors')){
			class_name = '.corporate_directors, .individual_directors';
		}else if(element.hasClass('individual_secretaries')){
			class_name = '.individual_secretaries'
		}
		if(window.is_corporate_page) {
			$('.individual_shareholders').each(function () {
				if (!$(this).hasClass('on_focus') && element.val() && $(this).val() && element.val() == $(this).val()) {
					unique = false;
					return false;
				}
			});
		}else if(window.is_contact_person_page){
			$('.names').each(function () {
				if (!$(this).hasClass('on_focus') && element.val() && $(this).val() && element.val() == $(this).val()) {
					unique = false;
					return false;
				}
			});
		}else if(class_name) {
			$(class_name).each(function () {
				if (!$(this).hasClass('on_focus') && element.val() && $(this).val() && element.val() == $(this).val()) {
					unique = false;
					return false;
				}
			});
		}
		if(!unique){
			block.text('Names must be unique');
			$(element).val('');
			$(element).parent().parent().parent().find('.emails').val('');
			$(element).parent().parent().parent().find('.phone_numbers').val('');
		}
		$(element).removeClass('on_focus');
	}

	function pad(n){return n<10 ? '0'+n : n}


	// Functions by INTERVAL


	function get_spent_time(){
		var spent_time = $('#header_spent_time').text();
		var days =  parseInt(spent_time.split(':')[0].match(/\d+/));
		var hours = parseInt(spent_time.split(':')[1]);
		var minutes = parseInt(spent_time.split(':')[2]);
		var seconds = parseInt(spent_time.split(':')[3]);
		var now = new Date();
		var currentTime = new Date(now.getFullYear(),now.getMonth(),days+1,hours,minutes,seconds+1,0);
		var added_time = currentTime.getDate()-1+' days: '+pad(currentTime.getHours())+':'+pad(currentTime.getMinutes())+':'+pad(currentTime.getSeconds())
		$('#header_spent_time').text(added_time);
		$('.task_spent_time').text(added_time);
	}

	function get_new_notifiations(){
 		$.ajax({
            dataType: "html",
            type: "POST",
            evalScripts: true,
            url: "/notifications/get_new_notifications/",
            data: ({
				last_id: window.note_last_id,
				csrfmiddlewaretoken: window.csrf_token
			}),
            success: function (data){
				if(data != "false"){
					data = JSON.parse(data);
					var total_count = parseInt(window.notifications_count) + data['notifications'].length;
					window.notifications_count = total_count;
					$("#notifications_count").html('Total '+total_count);
					if(data['notifications'].length){
						$('#empty_notifications').hide();
						if($('#not_read_notifications_count').length){
							$('#not_read_notifications_count').text(parseInt($('#not_read_notifications_count').text())+data['notifications'].length);
						}else{
							$('#not_read_notifications').html('<span class="tbl_stl centered_tbl"><span class="valign" id="not_read_notifications_count">'+data['notifications'].length+'</span></span>');
						}
					}
					// change last_id
					window.note_last_id = data['last_id'];
					data = data['notifications'];

					for(var i=0; i<data.length; i++){
						var new_date = new Date(data[i]['created']);
						var notification_id = data[i]['id'];
						var created = pad(new_date.getDate())+' '+new_date.toLocaleString('en-us', { month: 'long' })+' '+new_date.getFullYear()+' '+pad(new_date.getHours())+':'+pad(new_date.getMinutes());
						var name = del_underscore(data[i]['name']);

						// update header notifications content
						$('#header_notifications').prepend(
							"<div class='new_note note_item'>"+
								"<a href='/notifications/"+notification_id+"'>"+
									"<div class='clearAfter'>"+
										"<span class='block mb5'>"+name+"</span>"+
									"</div>"+
									"<time><i class='icon-calendar'></i> "+created+"</time>"+
								"</a>" +
							"</div>");

						// if on index page then update also index content
						if(window.is_index_page){
							$('#notifications').prepend(
								"<li class='new_note'>"+
									"<span class='block mb5'>"+name+"</span>"+
									"<time><i class='icon-calendar'></i> "+created+"</time>"+
								"</li>");
						}
					}
				}
            }
        });
	}

	function get_new_tasks(){
		$.ajax({
			dataType: "html",
			type: "POST",
			evalScripts: true,
			url: "/tasks/get_new_tasks/",
			data: ({
				last_id: window.task_last_id,
				csrfmiddlewaretoken: window.csrf_token
			}),
			success: function (data){
				if(data != "false"){
					data = JSON.parse(data);
					var total_count = parseInt(window.tasks_count) + data['tasks'].length;
					window.tasks_count = total_count;
					$("#tasks_count").html('Total '+total_count);
					if(data['tasks'].length){
						$('#empty_task').hide();
						if($('#unfinished_tasks_count').length){
							$('#unfinished_tasks_count').text(parseInt($('#unfinished_tasks_count').text())+data['tasks'].length);
						}else{
							$('#unfinished_tasks').html('<span class="tbl_stl centered_tbl"><span class="valign" id="unfinished_tasks_count">'+data['tasks'].length+'</span></span>');
						}
					}

					// change last_id
					window.task_last_id = data['last_id'];
					data = data['tasks'];


					for (var i = 0; i < data.length; i++) {
						var name = del_underscore(data[i]['name']);
						var task_id = data[i]['id'];
						var new_date = new Date(data[i]['created']);
						var exp_new_date = new Date(data[i]['expire_date']);
						var created = pad(new_date.getDate()) + ' ' + new_date.toLocaleString('en-us', {month: 'long'}) + ' ' + new_date.getFullYear() + ' ' + pad(new_date.getHours()) + ':' + pad(new_date.getMinutes());
						var expire_date = pad(exp_new_date.getDate()) + ' ' + exp_new_date.toLocaleString('en-us', {month: 'long'}) + ' ' + exp_new_date.getFullYear() + ' ' + pad(exp_new_date.getHours()) + ':' + pad(exp_new_date.getMinutes());

						// update header tasks content
						$('#header_tasks').prepend(
							"<div class='note_item new_note'>" +
							"<a href='/tasks/" + task_id + "'>" +
							"<div class='clearAfter'>" +
							"<span class='block mb5'>" + name + "</span>" +
							"</div>" +
							"<time><i class='icon-calendar'></i> " + created + "</time>" +
							"</a>" +
							"</div>"

						);

						// Set Tasks for each type of user (employee or company)
						if(window.is_employee_page) {
							$('#events').prepend(
								"<li class='toDo_item'>" +
								"<div class='clearAfter mb10'>" +
								"<i class='icon-clock pullLeft hasTooltip'>" +
								"<span class='tooltip_holder'>" +
								"<span class='tooltip_text'>Pending Item</span></span></i>" +
								"<a href='/tasks/" + task_id + "' class='textBtn pullLeft'>" + name + "</a>" +
								"<time class='pullRight taskDeadline' title='deadline'><i class='icon-calendar'></i> <span>" + expire_date + "</span></time>" +
								"</div>" +
								"<tme class='taskCreated'>Created: <span>" + created + "</span></time>" +
								"<span><input type='submit' task_id=" + data[i]['id'] + " class='btn btnPrime sizeXS start_task' value='Start'/></span>" +
								"</li>"
							);
						} else if(window.is_index_page) {
							$('#tasks').prepend(
								"<li>" +
								"<div class='clearAfter mb5'>" +
								"<a href='/tasks/"+task_id+"' class='textBtn pullLeft'><strong>" + name + "</strong></a>" +
								"<time class='pullRight taskDeadline'><i class='icon-calendar'></i> <span>" + expire_date + "</span></time>" +
								"</div>" +
								"<time class='taskCreated'>Created: <span>" + created + "</span></time>" +
								"</li>"
							);
						}
					}
				}
			}
		});
	}

	function get_new_messages(){
		$.ajax({
			dataType: "html",
			type: "POST",
			evalScripts: true,
			url: "/messages/get_new_messages/",
			data: ({
				last_message_id: window.last_message_id,
				csrfmiddlewaretoken: window.csrf_token
			}),
			success: function (data){
				if(data != "false"){
					var get_data = JSON.parse(data);
					window.last_message_id = get_data['last_message_id'];
					var unread_count = 0;
					data = get_data['threads'];
					if(data.length) {
						$('#empty_message').hide();
					}
					for (var i = 0; i < data.length; i++) {
						var message = data[i]['last_message'].substring(0,50);
						var thread_id = data[i]['id'];
						var to_user_id = data[i]['to_user_id']
						var new_date = new Date(data[i]['modified']);
						var created = pad(new_date.getDate()) + ' ' + new_date.toLocaleString('en-us', {month: 'long'}) + ' ' + new_date.getFullYear() + ' ' + pad(new_date.getHours()) + ':' + pad(new_date.getMinutes()) + ':' + pad(new_date.getSeconds());

						// update header messages content
						if($('.message_item_'+thread_id).length){
							$('.message_item_'+thread_id).addClass('new_note');
							$('.message_item_'+thread_id).find('.thread_link').attr('href', '/messages/'+data[i]['id']);
							$('.message_item_'+thread_id).find('.header_message').text(message);
							$('.message_item_'+thread_id).find('.new_message').attr('thread', thread_id);
							$('.message_item_'+thread_id).find('.new_message').attr('to_user', to_user_id);
							$('.message_item_'+thread_id).find('.modified_'+thread_id).html("<i class='icon-calendar'></i> "+created);
						}else{
							var new_message = $("[class^=message_item_]").first().clone();
							new_message.removeClass().addClass('message_item_'+thread_id+' new_note');
							new_message.find('.thread_link').attr('href', '/messages/'+data[i]['id']);
							new_message.find('.header_message').text(message);
							new_message.find('.new_message').attr('thread', thread_id);
							new_message.find('.new_message').attr('to_user', to_user_id);
							new_message.find('.modified_'+thread_id).html("<i class='icon-calendar'></i> "+created);
							new_message.prependTo('#header_messages');
						}
						unread_count++;

						//// update messages list content
						if($('.message_list_item_'+thread_id).length){
							$('.message_list_item_'+thread_id).addClass('new_note');
							$('.message_list_item_'+thread_id).find('.thread_link').attr('href', '/messages/'+data[i]['id']);
							$('.message_list_item_'+thread_id).find('.new_message_item').text(message);
							$('.message_list_item_'+thread_id).find('.new_message').attr('thread', thread_id);
							$('.message_list_item_'+thread_id).find('.new_message').attr('to_user', to_user_id);
							$('.message_list_item_'+thread_id).find('.modified_'+thread_id).html("<i class='icon-calendar'></i> "+created);
						}else{
							var new_list_message = $("[class^=message_list_item_]").first().clone();
							new_list_message.removeClass().addClass('message_list_item_'+thread_id+' new_note');
							new_list_message.find('.thread_link').attr('href', '/messages/'+data[i]['id']);
							new_list_message.find('.new_message_item').text(message);
							new_list_message.find('.new_message').attr('thread', thread_id);
							new_list_message.find('.new_message').attr('to_user', to_user_id);
							new_list_message.find('.modified_'+thread_id).html("<i class='icon-calendar'></i> "+created);

							// for company index.html
							new_list_message.prependTo('#messages_list');

							// for threads_list.html
							$('#messages_row').after(new_list_message)
						}

						// for threads_messages.html
						var new_list_message = $('.each_message').first().clone();
						new_list_message.find('.created').text(created);
						new_list_message.find('.message').removeClass('self_message').addClass('to_message').text(message);
						new_list_message.prependTo('#messages_list');
					}
					if(unread_count){
						if(!$('#not_read_messages_count').length){
						$('#not_read_messages').html('<span class="tbl_stl centered_tbl"><span class="valign" id="not_read_messages_count">'+unread_count+'</span></span>')
						}else{
							$('#not_read_messages_count').text(parseInt($('#not_read_messages').text())+unread_count);
						}
					}
				}
			}
		});
	}

	if(window.is_logged_in) {
		window.setInterval(function () {
			get_spent_time();
		}, 1000);

		get_new_notifiations();
		window.setInterval(function () {
			get_new_notifiations();
		}, 30000);

		get_new_tasks();
		window.setInterval(function () {
			get_new_tasks();
		}, 35000);

		window.setInterval(function () {
			get_new_messages();
		}, 3000);
	}



	$(".customScroll").mCustomScrollbar({
		scrollbarPosition: "outside"
	});
	// SCRIPT FOR UI

	// floatlabel
	//$('input.floatlabel').floatlabel();


	// customScroll

	// icheck
	//$('input').iCheck({
	//	labelHover: false,
	//	cursor: true
	//});

	// magnific popup
	$('.popupBtn').on('click', function () {
		var src = $(this).attr('href');
		$.magnificPopup.open({
			items: {
			  src: src
			},
			type: 'inline'
  		});
	});


	// input tooltip
	$('.hasTooltip').focus(function(event) {
		var activeEl = $(this);
		var ttipText = activeEl.data('ttip')
		var ttipHtml = '<div class="inputTTip">' + ttipText + '</div>';
		activeEl.after(ttipHtml)
	});
	$('.hasTooltip').blur(function(event) {
		var activeEl = $(this);
		activeEl.next('.inputTTip').remove();
	});

}); // end of document ready


// Global functions
function del_underscore(name){
	String.prototype.capitalizeFirstLetter = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
	var names = name.split('_');
	var result = ''
	for (var i=0;i<names.length;i++){
		result += names[i].capitalizeFirstLetter() + " ";
	}
	return result;
}
