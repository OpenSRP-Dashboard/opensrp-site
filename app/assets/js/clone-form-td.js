
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
          '</br></br></br>'+		
          '<div class="col-sm-6 col-md-6"><lable>Start Form Name:</label><input class="form-control ng-pristine ng-untouched ng-valid" type="text" name="startFormName'+newNum+'[]" /></div>'+
          '<div class="col-sm-6 col-md-6"><lable>End Form Name:</label><input class="form-control ng-pristine ng-untouched ng-valid" type="text" name="endFormName'+newNum+'[]" />'+
          '<a href="#" class="ruleDelete" id="ruleDel'+newNum+'"> Delete</a></div>'+
          '<label>Defination</label>'+
          '<div id="defination_space_'+newNum+'"></div>'+
          '<div style="clear:both;padding-top:25px;"></div>'+        
          '<input type="button"  onclick="def(this.id)" class="btn btn-primary btnRule" id="btnRule_'+newNum+'" value="add defination">'+
        '</div>'
        ); 
    });

	
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

function def(idName){
  
  var id = idName.split("_")[1];		       		     
		$("#defination_space_"+id).append('<div class="defination'+id+'" style="border:1px solid #e8eaeb;background:#ecf0f1;margin-right:5px;;margin-bottom:20px"><div class="col-sm-6 col-md-6"><label> Name:</label><input class="form-control ng-pristine ng-untouched ng-valid" type="text" name="name'+id+'[]"/></div>'+
            '<div class="col-sm-6 col-md-6"><label>Value:</label> <input class="form-control ng-pristine ng-untouched ng-valid" type="text" name="value'+id+'[]"/></div><a href="#" class="delete" id="def'+id+'"> Delete</a> </div>'
		);
}
