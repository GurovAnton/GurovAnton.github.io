

$(function () {
	$.support.cors = true;
	var date;
	var api = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&valcode=USD&json";
	date = new Date();
	console.log(date);
	


var request = $.ajax({
    url: api,
 
    // The name of the callback parameter, as specified by the YQL service
  
 
    // Tell jQuery we're expecting JSONP
    dataType: "json",
 
    // Tell YQL what we want and that we want JSON

 
    // Work with the response
    success: function( response ) {
        console.log( response ); // server response
    }
});
	 

  });
      
	    
