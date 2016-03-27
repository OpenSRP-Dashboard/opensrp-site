
$(function () {
    $('#btnAdd').click(function () {
        var num     = $('.clonedInput').length;// how many "duplicatable" input fields we currently have      
                 
		    var numOfRule = $('.clonedInput'); // // get how many rule have been created
        var newEntryCreateCondition ;
        console.log(numOfRule);
        for(var i=0;i<num;i++){
          var  newNum  ;// the numeric ID of the new input field being added 
          /**
          if delete a rule from middle & again want to create a rule then deleted number rule must be created
          unless number ordering missaligned.
          below loop ensure number ordering.
        */
          for(var j=0;j<num;j++){
            var entry = numOfRule[j].id;          
            var splitEntry = entry.split("rule");            
            if (splitEntry[1] == i+1) {
              newEntryCreateCondition = true;
              break;
            }else{             
              newEntryCreateCondition = false;
              continue;
            }
          }
          
          if (newEntryCreateCondition == true) {
            newNum  = new Number(num + 1);
          }else{            
            newNum= i + 1;
            break;
          }
        }      
        
        $("#rule").append('<div id="rule'+newNum+'" class="clonedInput">'+
          '<h3 id="reference'+newNum+'" name="reference" class="heading-reference">Rule #'+newNum+'</h3>'+		
          '<lable>Start Form Name:</label><input type="text" name="startFormName'+newNum+'[]" />'+
          '<lable>End Form Name:</label><input type="text" name="endFormName'+newNum+'[]" />'+
          '<a href="#" class="ruleDelete" id="ruleDel'+newNum+'"> Delete</a>'+
          '<p>Defination</p>'+
          '<div id="defination_space_'+newNum+'"></div>'+
          '<div style="clear:both;padding-top:25px;"></div>'+        
          '<input type="button" class="btnRule" id="btnRule_'+newNum+'" value="add defination">'+
        '</div>'
        ); 
    });

	$(document).on('click','.btnRule',function(){	    
		var id = $(this).attr('id').split("_")[1];		       		     
		$("#defination_space_"+id).append('<div class="defination'+id+'" style="border:1px solid #fff;margin-right:5px;;margin-bottom:20px"><label> Name:</label><input type="text" name="name'+id+'[]"/>'+
            '<label>Value:</label> <input type="text" name="value'+id+'[]"/><a href="#" class="delete" id="def'+id+'"> Delete</a> </div>'
			);
		
	})
});

$(document).ready(function () {	
    $(document.body).on("click",'.ruleDelete', function (event) {	
	event.preventDefault();
    console.log(this)
    $(this).parent().parent().parent('.clonedInput').remove();	
    });
	
});
///////****//
$(document).ready(function () {	
    $(document.body).on("click",'.delete', function (event) {	
    event.preventDefault();    
    var id= this.id.split("def");
    $(this).parent('.defination'+id[1]).remove();	
    });
	
});

