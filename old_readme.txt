=== repod_jquery_suite

PURPOSE: Expand the features of the saguaro image board software entirely via jQquery. (with minor edits to the mainline core to ease production)
All jQuery scripts/whatever are developed for the latest version of jQuery at the time of publication but may cease working if needed functions are deprecated.

Not all extensions/whatever included are guaranteed to work in tandem, or at all, if ever.
Since the introduction of the thread auto-updater the way these process data changed severely.
Introducing suite settings also felt like breaking a million things too.

Although specifically tailored for saguaro, these can be adapted for other software as a base or reference point (honestly I don't care).
I will also not support forks, but will accept fixes and optimizations (excluding compression).

Report bugs here.
Alternatively, custom scripts or updated revisions to the officials may be submitted in a similar fashion. (Credits will remain untouched in file comments)

By utilizing this jQuery suite users forfeit their opinions that the 3DS is better than the Vita.

To create and integrate your own scripts into the suite please look at the repod_suite_settings.js / suite_settings.js file for instructions.
Before submitting custom scripts ensure they work with and without the thread updater (dynamic) and suite settings (management) loaded.

=== included official scripts (names may differ based on implementation)

repod_suite_settings.js
Allows the usage of jQuery suite features to be enabled and disabled at will client-side. Additionally,
by reading the documentation provided below, allows inspired developers to integrate with it.
If this script is not loaded along with the others they will assume their default on/off status. (listed below)

repod_image_expansion.js (default: on)
Expands images with their source inside their parent element up to certain dimensions.

repod_image_hover.js (default: on)
Displays the original image when hovering over its thumbnail.

repod_image_toolbar.js (default: on)
Appends a toolbar for image posts with links to resources.

repod_thread_updater.js (default: updater on, autoupdate off)
Attempts to update threads without reloading the page via jQuery and AJAX.
Interconnects with other repod_jquery_suite features which are called upon adding new content to the DOM.

repod_utility_quotes.js (default: hover on, inline off, backlinks on)
Replaces behaviour of quote links to add them to the current post inline as well as hovering over them.
Due to the nature of the core software cross-thread/board and quotes on index pages cannot be achieved
(without serious AJAX). Also adds backlinks with similar behaviours.

repod_force_post_wrap.js (default: off)
Forces long posts to only widen to 75% of the screen instead of 100%.

repod_infinite_scroll.js (default: on)
When browsing the index and having reached the bottom, loads the next page dynamically.

repod_thread_stats.js (default: on)
Shows thread statistics (number of replies, number of image replies out of all replies) above and below threads.

repod_quick_reply.js (default: quick reply on, persistent quick reply off)
Reply to posts quickly, because it's your time and you need to make the best of it.

=== libraries used

jQuery
jQuery UI
jQuery Form Plugin - http://jquery.malsup.com/form/

=== Suite Settings readme
	== Integrating your own scripts into the menu:
		1) See source of other things for basic structure.
		2) At the start of the script push an array formatted like below to repod.suite_settings.info
			{menu:{category:'',[read:],variable:'',label:'',hover:''}}
			{menu:{category:'',[read:],variable:'',label:'',hover:''},popup:{label:'',title:'',type:'',variable:'',placeholder:''}}
			-
			Example: (from image_hover)
			{menu:{category:'Images',read:this.config.enabled,variable:'repod_image_hover_enabled',label:'Image hover',hover:'Expand images on hover, limited to browser size'}}
			The "menu" key contains a sub-array with more named keys defining the item's visibility on the menu. All keys except "read" and "hover" are required to be a valid menu entry.
			- "menu"-specific keys: (anything not marked as optional is required to be accepted)
				The "category" key defines the name of the category to display the option under in the menu.
				The "variable" key is a string containing the variable the script is to read for a true/false value and is where the menu saves to.
				The "label" key defines the text shown next to the checkbox.
				The "hover" key defines the text shown in the tooltip presented when hovering over the label. This is optional.
				The "read" key specifies the enabled state to the menu.
					Useful only for object literals, such as those seen in included official scripts. If not using object literals, expose variables to the global namespace
					and the menu will read them from what is specified by the "variable" key. Hello World includes an object literal version to demonstrate.
			The "popup" key contains a sub-array with more named keys defining an extended options popup window. All keys except "placeholder" are required to be a valid popup window.
			- "popup"-specific keys: (anything not marked as optional is required to be accepted) (popups are optional and only required for advanced input that isn't a boolean)
				The "label" key defines the text shown next to the menu's label that opens the popup window. e.g.: [X] Custom CSS [Edit]
				The "title" key defines the text displayed as the popup window title.
				The "type" key defines the type of popup window to be rendered, affecting input. Read below for available types.
				The "variable" key is a string containing the variable that the input of the popup window should be written to. This is seperate from the "menu" key "variable".
					Read below for variations as different popup types utilize the "variable" key differently.
				The "placeholder" key is a string to be specified as the input's placeholder attribute, if supported. This is optional.		
		3) In your script make it so it detects the variable before responding to enable/disable behaviour. (again, see example scripts.)

	== Available popups: (variable is the destination cookie name unless otherwise stated)
		text: popup:{label:'',title:'',type:'text',variable:'',placeholder:''}
			Suited for accepting one short line of input.
		multitext: popup:{label:'',type:'multitext',title:'',variable:{prefix:'',data:['',...]}}
			Suited for accepting a finite, yet individual, amount of short lines of input. The "prefix" key is used to determine cookie names to save to.
			If the prefix is "test_", the first input box's value will save to a cookie named "test_0". An additional cookie is saved, in this example
			"test_amount", containing the number of entries saved. This is for ease-of-access when the total number is unknown outside of the script.
			The "data" key contains each input box's placeholder value.		
		textarea: popup:{label:'',title:'',type:'textarea',variable:'',placeholder:''}
			Suited for accepting multiple lines of input for a single result.
		info: popup:{label:'',title:'',type:'info',variable:''}
			Displays text or formatted HTML in a window. Not dynamic. The "variable" key is where the desired text or HTML is entered.
		function: popup:{label:'',title:'',type:'function',variable:'name_of_function'}
			Calls a desired function (with no arguments or callbacks). The "variable" key is where the desired function name goes.
		To create your own popup types search for "//BEGIN POPUP WINDOW STUFF" and read the comments.
	TO-DO:
		scalable/unlimited popups per menu entry
		multitextscale (for an undetermined amount of rows, require prefix then enumerate results)
			pseudocode: define prefix, when saving save to prefix_amount to keep track of total, write out as normal
						when reading read prefix_amount and enumerate. Or possibly save in an array.
	
	Warnings: (problems I ran into that should be dealt with before rolling out own scripts)
	 - When pushing function information to the thread updater script ensure it exists. (See relevant sources.)
	 - When pushing settings information to the settings script ensure it exists. (See relevant sources.)
	 - When checking if cookie support is available poll repod_jsuite_getCookie/repod_jsuite_setCookie functions which should be provided by the suite settings.
		- Alternatively handle cookie-related functions in your script but exclude settings support.
	 - Ensure timing works out. $(document).ready() is your friend and can tell your script that everything else is loaded and ready to execute.
	 
	 Hello World comes in two flavors: legacy and objects. Feel free to decice which one to utilize.
	 
=== Thread Updater
	== Integrating
		There is no longer legacy support for repod_suite_settings_pusher[]. Required function names should be pushed to repod.thread_updater.callme.

=== Infinite Scroll
	== Integrating
		There is no longer legacy support for repod_infinite_scroll_calls[]. Required function names should be pushed to repod.infinite_scroll.callme.