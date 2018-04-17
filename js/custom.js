$(window).ready(function(){
	
	// Animation When Page is loaded
	$('.search-box h5').addClass('animated fadeInDownBig');
	setTimeout(function(){
		$('.search-box nav').css({visibility:'visible'}).addClass('animated zoomIn');
	}, 1000);
	
	// Hide Placeholder When Focus
	var actualPlaceHolder = 'What Do You Want To Read?',
        tempPlaceHolder = '';
	$('#search').on('focus', function(){   
		  
		$(this).attr('placeholder', '');
		
	});
	$('#search').on('blur', function(){
        tempPlaceHolder = $(this).val();
        
		if ($(this).val().length > 0) {
            
            $(this).attr('placeholder', tempPlaceHolder);
            
        } else {
            
            $(this).attr('placeholder', actualPlaceHolder);
            
        }
        
	});
	
//*********************************************************************************************
    
			/*
			***************************************************************************
			*** Wikipidia API Search using JSON with http://openweathermap.org/		***
			*** 																	***
			*** Powered By Abdelaziz Abdelioua - All Rights Are Reserved 2017, v0.5.0 *
			***************************************************************************
			*/ 
	
    // Declare Variables
	var searchField = $('#search'), // For the search value
        resultBox = $('#resultBox'), // For putting the results in the box
        data_request = '',
        data_response = '';
    
    searchField.on('keyup', function(e){
        
        if ($(window).height() < 601) {
            resultBox.slideDown(200);   
        }
        
            
            // get the value of the search field and assign it to data
            data_request = searchField.val();
            $.ajax({
               url: 'https://en.wikipedia.org/w/api.php?',
               data: {action: 'opensearch', search: data_request , namespace: 0, limit: 10, format: 'json', origin: '*'},
               success: function(results){
                   data_response = results;
                   if (searchField.val().length > 0) {
                       
                       if (data_response[1].length > 0) {
                           
                                resultBox.empty();
                                for (var i = 0; i < data_response[1].length; i++){

                                resultBox.append('<a href='+ data_response[3][i] +' target="_blank"><li>' 
                                                + data_response[1][i] 
                                                + '</li></a>');
                           
                                }
                           
                       } else {
                           
                           resultBox.empty();
                           resultBox.append('<p class="center">No Data Found</p>');
                           
                       }
                       
                       resultBox.slideDown(200);
                       
                   } else {
                       
                       resultBox.slideUp(200);
                       
                   }
               }
                
            });
        
        
    });
	
	
});