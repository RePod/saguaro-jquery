$(document).ready(function() {
	//RePod @ 100tontofu.tk
	//Allows a user to set a custom list of boards to be displayed at the top/bottom board listings.
	repod.custom_boardlist.init();
});

try { repod; } catch(a) { repod = {}; }
repod.custom_boardlist = {
	init: function() {
		this.config = {
			enabled: repod.suite_settings && !!repod_jsuite_getCookie("custom_boardlist_enabled") ? repod_jsuite_getCookie("custom_boardlist_enabled") === "true" : false
		}
		repod.suite_settings && repod.suite_settings.info.push({menu:{category:'Navigation',read:this.config.enabled,variable:'custom_boardlist_enabled',label:'Custom board list',hover:'Only show selected boards in top and bottom board lists'},popup:{label:'[Edit]',title:'Custom Board List',type:'text',variable:'custom_boardlist_defined',placeholder:'Example: a b c'}});
		this.update();
	},
	update: function() {
		if (this.config.enabled && repod_jsuite_getCookie("custom_boardlist_defined") !== null) {
			$(".boardlist").html(this.format());
		}
	},
	format: function(a) {
		//var original_list = $("span.boardlist:first").html();
		var c_bl_a = repod_jsuite_getCookie("custom_boardlist_defined").split(" "); $.each(c_bl_a,function(i,v) { c_bl_a[i] = "<a href='../"+v+"'>"+v+"</a>"; });
		c_bl_a = "["+c_bl_a.join(" / ")+"]";
		return c_bl_a;
	}
}