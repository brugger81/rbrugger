/*
 * List Filter helper
 * Class : HelperListFilter
 * Copyright(c) 2010,  Cedric Dugas & w.illi.am/
 * MIT Licence
 * Description: Sort class selector based on select options
 */
 
var HelperListFilter = function(extendOptions) {
	var HelperListFilter = this; // keep scope
	var options = {
		"container"		:".operatorList", 
		"sorting"		:".operators", 
		"defaultValue"	:"all",
		"sorter" 		:['#filter','#city']
	}
	if(extendOptions !== undefined) $.extend(true, options, extendOptions);	// Extend options
	
	function init(){
		$.each(options.filter, function(index, value){
			propagatefilterEvents(value)
		})
	}
	function propagatefilterEvents(caller) {
		$(caller).bind("change", function(){	return HelperListFilter.Sort(this)	})
	}
  	HelperListFilter.Sort = function(caller) {
		var filters = HelperListFilter.GetSortingCondition(options);
		var jQfiltering = $(options.container).find(options.sorting);
		var getSorted = [];
		
		jQfiltering.each(function() {	// Each element is being filtered
			var beingSorted = this;
			var add = true;
			$.each(filters, function(index, checkClass){
				if(checkClass == "all") return;	
			 	if(!$(beingSorted).hasClass(checkClass)) add = false; 
			})
			if(add == true) getSorted.push(beingSorted);	// if match all filters, add element
			add = true;
		})
		HelperListFilter.Animate(getSorted, options);
		
		return false;
  	}
	$(document).ready(function() {
	 	init();
	})
};
	HelperListFilter.prototype.Animate =  function(caller, options) {	// Animate sorted elements
	  		var callerSize = $(options.container).find(options.sorting).not(caller).size();
	  		lastExecuted = 0;
	  		$(caller).slideDown(300);
	  		
	  		$(options.container).find(options.sorting).not(caller).slideUp(300, function(){
	  			$(this).css("display", "none")
	  			lastExecuted +=1
	  			if(lastExecuted == callerSize) $(document).trigger("listFiltered");
	  		});
	  		if(callerSize == 0) $(document).trigger("listFiltered");	// All animated? trigger custom event
	  	}
	HelperListFilter.prototype.GetSortingCondition =  function(options) {	// get sorting values from selected options
		var filters = [];
		$.each(options.filter, function(index, value){
			var getSorting = $(value).find("option:selected").val();
			filters.push(getSorting);
		})
		return filters;
	}
	

