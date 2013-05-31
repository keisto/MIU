$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	

$('#addItem').on('pageinit', function(){

		var myForm = $('#workoutForm');
			errorslist = $('#errorslist');
		    myForm.validate({
			invalidHandler: function(form, validator) {
				errorslist.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]').not('[generated]');
					//Testing : console.log(label.text());
					var legend = label.closest('fieldset').find('.ui-controlgroup-label');
					var fieldName = legend.length ? legend.text() : label.text();

					html += '<li>' + fieldName + '</li>';
					
				};
				$('#errors ul').html(html);
			},
			submitHandler: function() {
				var data = myForm.serializeArray();
				storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});


//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	var id       = Math.floor(Math.random()*1000000000);
	localStorage.setItem(id , JSON.stringify(data));
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};

