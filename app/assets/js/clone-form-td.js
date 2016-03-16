
$(function () {
    $('#btnAdd').click(function () {
        var num     = $('.clonedInput').length, // how many "duplicatable" input fields we currently have
        newNum  = new Number(num + 1);     // the numeric ID of the new input field being added
		console.log(1222)
        $("#rule").append('<div id="entry'+newNum+'" class="clonedInput">'+
		'<h3 id="reference'+newNum+'" name="reference" class="heading-reference">Rule #'+newNum+'</h3>'+		
        '<lable>Start Form Name:</label><input type="text" name="startFormName[]" />'+
         '<lable>End Form Name:</label><input type="text" name="endFormName[]" />'+
         '<p>Defination</p>'+
		'<div id="defination_space_'+newNum+'"></div>'+
		'<div style="clear:both;padding-top:25px;"></div>'+        
		'<input type="button" class="btnRule" id="btnRule_'+newNum+'" value="add defination">'+
		'</div>'
		); 
   
    //
    });

	
	
	////////Table section //////////
	
	
	$(document).on('click','.btnRule',function(){	    
		var id = $(this).attr('id').split("_")[1];
		var chair_qty = $("#chair_qty_"+id).val();
        var type = $("#type"+id).val();        		     
		$("#defination_space_"+id).append('<div class="defination" style="border:1px solid #fff;margin-right:5px;;margin-bottom:20px"><lable> Name:</label><input type="text" name="name[]"/>'+
            '<lable>Value:</label> <input type="text" name="value[]"/><a href="#" class="delete" id="def'+id+'"> Delete</a> </div>'
			);
        
        
		
	})
});



$(document).ready(function () {	
    $(document.body).on("click",'.delete', function (event) {	
	event.preventDefault();
    console.log(this)
    $(this).parent().parent().parent('.defination').remove();	
    });
	
});

$(document).ready(function () {	
    $(document.body).on("click",'.submit', function (event) {	
	event.preventDefault();   
    var myForm = document.forms.rule_def;
    var myControls = myForm.elements['startFormName[]'];
    console.log(myControls.length)
    for (var i = 0; i < myControls.length; i++) {
        var aControl = myControls[i].value;
        console.log(aControl);
    }
    });
	
});