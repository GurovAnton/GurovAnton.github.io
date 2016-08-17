


$(function () {

	var date;
	var api = "http://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&json";
	date = new Date();
	console.log(date);
	
 $.ajax({
            url: api,
   


            dataType: "json",
         
         

            success: function (res) {
                console.log("success");
               
                console.log( res);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
});



  });
      
	    
