/*!
* 	jQuery Magic Tabs
* 	https://github.com/lukesnowden/magic-tabs
* 	Copyright 2014 Luke Snowden
* 	Released under the MIT license:
* 	http://www.opensource.org/licenses/mit-license.php
*/

( function ( $ ) {

	$.fn.magicTabs = function (opts)
	{

		var opts = $.extend({

			/**
			 * the selector for the accordion header tab
			 * @type {String}
			 */

			headingTag : 'h2',

			/**
			 * [bodyClass description]
			 * @type {String}
			 */

			bodyClass : 'body',

			/**
			 * [headClass description]
			 * @type {String}
			 */

			headClass : 'head',

			/**
			 * [activeClass description]
			 * @type {String}
			 */

			activeClass : 'active'

		}, opts);

		/**
		 * [magic description]
		 * @param  {[type]} elm   [description]
		 * @param  {[type]} index [description]
		 * @return {[type]}       [description]
		 */

		var magic = function( elm, index ) {

			/**
			 * [jq description]
			 * @type {[type]}
			 */

			var jq = $( elm );

			/**
			 * [sections description]
			 * @type {Array}
			 */

			var sections = [];

			/**
			 * [accordion description]
			 * @type {[type]}
			 */

			var tabs;

			/**
			 * [createdEvent description]
			 * @param  {[type]} e [description]
			 * @return {[type]}   [description]
			 */

			var createdEvent = function() {
				var magicEvent = $.Event( 'created.magic-tabs' );
				magicEvent.tabs = tabs;
				jq.trigger( magicEvent );
			}

			/**
			 * [splitContent description]
			 * @return {[type]} [description]
			 */

			var splitContent = function() {

				sections = [];

				tabs = $('<div class="magic-tabs"></div>');

				$( '> ' + opts.headingTag, jq ).each( function() {

					/**
					 * [heading description]
					 * @type {[type]}
					 */

					var heading = $(this);

					/**
					 * [contentElms description]
					 * @type {Array}
					 */

					var contentElms = [];

					/**
					 * [stop description]
					 * @type {Boolean}
					 */

					var stop = false;

					/**
					 * [description]
					 * @return {[type]} [description]
					 */

					heading.nextAll().each( function(){

						var contentElm = $(this);

						if( ! stop && contentElm[0].tagName.toLowerCase() !== opts.headingTag )
							contentElms.push( contentElm.clone() );
						else
							stop = true;

					});

					sections.push({
						heading : heading.clone(),
						content : contentElms
					});

				});

			};

			/**
			 * [generateAccordion description]
			 * @return {[type]} [description]
			 */

			var generateTabs = function() {

				/**
				 * [tabHeaders description]
				 * @type {[type]}
				 */

				var tabHeaders = $('<ul></ul>').addClass( 'magic-tabs-tabs' );

				/**
				 * [tabContents description]
				 * @type {[type]}
				 */

				var tabContents = $('<ul></ul>').addClass( 'magic-tabs-contents' );

				for( var i in sections ) {

					/**
					 * [head description]
					 * @type {[type]}
					 */

					var head = sections[i].heading;

					tabHeaders.append( $('<li></li>').addClass( opts.headClass ).html( head.html() ) );

					/**
					 * [body description]
					 * @type {[type]}
					 */

					var body = $('<li></li>').addClass( opts.bodyClass );

					for( var n in sections[i].content ) {
						sections[i].content[n].appendTo( body );
					}

					body.appendTo( tabContents );

				}

				tabs.append( tabHeaders );
				tabs.append( tabContents );

				tabs.insertAfter( jq );
				$( '.' + opts.bodyClass, tabs ).not(':eq(0)').hide();
				$( '.' + opts.bodyClass, tabs ).eq(0).addClass( opts.activeClass );
				$( '.' + opts.headClass, tabs ).eq(0).addClass( opts.activeClass );
				jq.hide();
				createdEvent();

			};

			/**
			 * [bindEvents description]
			 * @return {[type]} [description]
			 */

			var bindEvents = function() {

				$( '.' + opts.headClass, tabs ).unbind( 'click.magic-tabs' ).bind( 'click.magic-tabs', function(e) {

					e.preventDefault();

					/**
					 * [head description]
					 * @type {[type]}
					 */

					var head = $(this);

					/**
					 * [closedEvent description]
					 * @param  {[type]} e [description]
					 * @return {[type]}   [description]
					 */

					var closedEvent = function(e){
						var magicEvent = $.Event( 'closed.magic-tabs' );
						magicEvent.head = $(this).prev();
						magicEvent.body = $(this);
						magicEvent.index = $(this).index();
						jq.trigger( magicEvent );
					};

					/**
					 * [openedEvent description]
					 * @param  {[type]} e [description]
					 * @return {[type]}   [description]
					 */

					var openedEvent = function(e){
						var magicEvent = $.Event( 'opened.magic-tabs' );
						magicEvent.head = head;
						magicEvent.body = $(this);
						magicEvent.index = $(this).index();
						jq.trigger( magicEvent );
					};

					/**
					 * [open description]
					 * @type {[type]}
					 */

					var open = $( '.' + opts.bodyClass + ':visible', tabs );

					/**
					 * [toOpen description]
					 * @type {[type]}
					 */

					var toOpen = $( '.' + opts.bodyClass, tabs ).eq( head.index() );

					$( '.' + opts.headClass + '.' + opts.activeClass, tabs ).removeClass( opts.activeClass );
					$( '.' + opts.bodyClass + '.' + opts.activeClass, tabs ).removeClass( opts.activeClass );
					head.addClass( opts.activeClass );
					toOpen.addClass( opts.activeClass );

					if( open.get(0) !== toOpen.get(0) ) {
						toOpen.show( 0, openedEvent );
						open.hide( 0, closedEvent );
					}

				});

			}

			/**
			 * [unbind description]
			 * @return {[type]} [description]
			 */

			this.unbind = function() {
				if( ! jq.is( ':visible' ) ) {
					tabs.remove();
					jq.show();
				}
			};

			/**
			 * [rebind description]
			 * @return {[type]} [description]
			 */

			this.rebind = function() {
				if( jq.is( ':visible' ) ) {
					splitContent();
					generateTabs();
					bindEvents();
				}
			};

			/**
			 * [object description]
			 * @return {[type]} [description]
			 */

			this.object = function() {
				return {
					tabs : tabs,
					sections : sections
				};
			};

			/**
			 * [addTab description]
			 * @param {Function} callback [description]
			 */

			this.addTab = function( callback ) {

				/**
				 * [data description]
				 * @type {Object}
				 */

				var data = { head : '', contents : '' };

				new callback( data );

				jq.append( $('<' + opts.headingTag + '></' + opts.headingTag + '>').html( data.head ) );

				$( '<div>' + data.contents + '</div>' ).children().each( function(){
					$(this).appendTo( jq );
				});

				this.unbind();
				this.rebind();
			};

			splitContent();
			generateTabs();
			bindEvents();

			// may want to add some public methods at some point...
			jq.data( 'magic-tabs', this );

		};

		/**
		 * [description]
		 * @param  {[type]} i [description]
		 * @return {[type]}   [description]
		 */

		return $(this).each( function ( i )
		{
			new magic( this, i );
		});


	};
})( jQuery );