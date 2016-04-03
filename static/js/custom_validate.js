$(document).ready(function(){

    $("#first_step").validate({
        rules: {
            name_1:{
                required: true
            },
            name_2:{
                required: true
            },
            name_3:{
                required: true
            },
            activity_description:{
                required: true
            },
            share_capital:{
                required: true
            },
            abbreviation:{
                requiredAbbreviation: true
            },
            nominee_shareholder:{
                requiredYesNo: true
            },
            offshore_company:{
                requiredYesNo: true
            },
            company_secretary:{
                requiredYesNo: true
            },
            other_address:{
                required: function(){
                     return ($("#other_address_checkbox").is(':checked')) ? true : false;
                }
            },
            other_capital:{
                required: function(){
                     return ($("#other_capital_checkbox").is(':checked')) ? true : false;
                }
            },
            registered_address:{
                required: function(){
                     return (!$("#other_address_checkbox").is(':checked') && !$("#id_registered_address").is(':checked')) ? true : false;
                }
            },
            default_capital:{
                required: function(){
                    return (!$("#other_capital_checkbox").is(':checked') && !$("#id_default_capital").is(':checked')) ? true : false;
                }
            },
            "corporate_shareholders[]":{
                required: true
            },
            "individual_shareholders[]":{
                required: true
            },
            "individual_directors[]":{
                required: true
            },
            "individual_secretaries[]":{
                required: true
            }
        },
        messages: {
            registered_address:'You must set at least one address',
            default_capital:'You must set at least one capital'
        },
        errorClass: "help-inline",
        errorElement: "span"
    });

    $("#third_step").validate({
        rules: {

        },
        messages: {

        },
        errorClass: "help-inline",
        errorElement: "span"
    });

    $("#fourth_step").validate({
        rules: {
            source_business:{
                required: true
            },
            expected_turnover:{
                required: true
            },
            expected_expenses:{
                required: true
            },
            "principal_description":{
                required: true
            },
            assets_details:{
                required: function(){
                     return ($("#id_is_holding").is(':checked')) ? true : false;
                }
            },
            countries:{
                required: true
            }
        },
        messages: {

        },
        errorClass: "help-inline",
        errorElement: "span"
    });

    $("#ind_partner").validate({
        rules: {
            website_link:{
                required: true,
                url: true
            },
            linkedin_link:{
                required: true,
                url: true
            },
            email:{
                required: true,
                email: true
            },
            phone_number:{
                required: true,
                customPhone: true
            },
            passport_copy:{
                accept: "png|jpg|pdf",
                fileSize: 20 * 1024 * 1024
            },
            address_proof:{
                accept: "png|jpg|pdf|doc|docx",
                fileSize: 20 * 1024 * 1024
            },
            bank_reference:{
                accept: "png|jpg|pdf|doc|docx",
                fileSize: 20 * 1024 * 1024
            },
            cv_details:{
                accept: "doc|docx|pdf",
                fileSize: 20 * 1024 * 1024
            },
            police_conduct:{
                accept: "png|jpg|doc|docx|pdf",
                fileSize: 20 * 1024 * 1024
            },
            shareholding_percent:{
                required: true,
                number: true,
                remote: {
                    url: "/companies/check_shareholder_percent/",
                    type: "post",
                    data: {
                        csrfmiddlewaretoken: window.csrf_token,
                        company_id: window.company_id,
                        partner_id: window.partner_id
                    }
                }
            }
        },
        messages: {
            passport_copy:{
                accept: 'Please enter a value with a valid extension (jpg, pdf)'
            },
            address_proof:{
                accept: 'Please enter a value with a valid extension (jpg, pdf)'
            },
            bank_reference:{
                accept: 'Please enter a value with a valid extension (jpg, pdf)'
            },
            cv_details:{
                accept: 'Please enter a value with a valid extension (doc, docx, pdf)'
            },
            police_conduct:{
                accept: 'Please enter a value with a valid extension (jpg, doc, docx, pdf)'
            },
            shareholding_percent:{
                remote: 'Sum of shareholding\'s percent of company must be 100%'
            }
        },
        errorClass: "help-inline",
        errorElement: "span"
    });
    $("#ind_partner input[type='text']").each(function () {
        if($(this).attr('not_required'))
            return ;
        $(this).rules("add", {
            required: true
        });
    });

    $("#cor_partner").validate({
        rules: {
            shareholding_percent:{
                required: true,
                remote: {
                    url: "/companies/check_shareholder_percent/",
                    type: "post",
                    data: {
                        csrfmiddlewaretoken: window.csrf_token,
                        company_id: window.company_id,
                        partner_id: window.partner_id
                    }
                }
            }
        },
        messages: {
            shareholding_percent:{
                remote: 'Sum of shareholding\'s percent of company must be 100%'
            }
        },
        errorClass: "help-inline",
        errorElement: "span"
    });
    $("#cor_partner input").each(function () {
        $(this).rules("add", {
            required: true
        });
    });

    $("#create_task").validate({
        rules: {
            name:{
                required: true
            },
            type:{
                required: true
            },
            status:{
                required: true
            },
            company_id:{
                required: true
            },
            expire_date:{
                required: true
            },
            notify_day: {
                maxlength: 3
            }
        },
        messages: {

        },
        errorClass: "help-inline",
        errorElement: "span"
    });

    $("#two_checkout").validate({
        rules: {
            card_holder_name:{
                required: true
            },
            address:{
                required: true
            },
            city:{
                required: true
            },
            state:{
                required: true
            },
            zip_code:{
                required: true
            },
            country:{
                required: true
            },
            email:{
                email: true,
                required: true
            },
            phone_number:{
                customPhone: true,
                required: true
            }
        },
        messages: {

        },
        errorClass: "help-inline",
        errorElement: "span"
    });

    $("#accept_invoice").validate({
        rules: {
            price:{
                required: true
            },
            until_date:{
                required: true
            },
            send_email:{
                required: true,
                email: true
            }
        },
        messages: {

        },
        errorClass: "help-inline",
        errorElement: "span"
    });

    $("#audit_first_step").validate({
        rules: {
            name:{
                required: true,
            },
            registration_number:{
                required: true,
            },
            registration_date:{
                required: true,
            },
            registration_address:{
                required: true,
            },
            authorised_shares:{
                required: true,
            },
            issued_shares:{
                required: true,
            },
            trading_activity:{
                required: true,
            },
            lombard_bank:{
                at_last_one_banker_required: true,
            }
        },
        messages: {

        },
        errorClass: "help-inline",
        errorElement: "span"
    });

    $("#audit_second_step").validate({
        rules: {
            auditor_name:{
                required: true
            },
            auditor_address:{
                required: true
            },
            auditor_status:{
                required: true
            },
            current_year_for_audit:{
                required: true
            },
            previous_year_for_audit:{
                required: true
            },
            start_date:{
                required: true
            },
            reviewed_by:{
                required: true
            },
            review_date:{
                required: true
            },
        },
        messages: {

        },
        errorClass: "help-inline",
        errorElement: "span"
    });

    $("#audit_third_step").validate({
        rules: {
            tax_amount_paid:{
                required: true
            },
            tax_amount_payable:{
                required: true
            },
        },
        messages: {

        },
        errorClass: "help-inline",
        errorElement: "span"
    });

    // Custom validates

    jQuery.validator.addMethod("requiredAbbreviation", function(value, element, params) {
        var selectedValue = $('input:radio[name=' + element.name + ']:checked').val();
        return  (selectedValue == 'ltd' || selectedValue == 'limited');
    }, "You must select the required option.");

    jQuery.validator.addMethod("requiredYesNo", function(value, element, params) {
        var selectedValue = $('input:radio[name=' + element.name + ']:checked').val();
        return  (selectedValue == '0' || selectedValue == '1');
    }, "You must select the required option.");

    jQuery.validator.addMethod("customPhone", function(value, element, params) {
        return this.optional(element) || /^[0-9 \+\-\(\)]+$/i.test(value);
    }, jQuery.validator.format("Please enter a valid phone number"));

    jQuery.validator.addMethod("fileSize", function(value, element, param) {
      return this.optional(element) || (element.files[0].size <= param);
    }, jQuery.validator.format("Max size of file is 20 Mb"));

    jQuery.validator.addMethod("at_last_one_banker_required", function(value, element, param) {
        return $("#id_bov_bank").is(":checked") || $("#id_nemea_bank").is(":checked") ||
            $("#id_hsbc_bank").is(":checked") || $("#id_sata_bank").is(":checked") ||
            $("#id_aps_bank").is(":checked")  || $("#id_lombard_bank").is(":checked");
    }, jQuery.validator.format("<br>Please select at least one banker."));

});