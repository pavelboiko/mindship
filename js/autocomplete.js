$(function() {
			function log( message ) {

				$('<div></div>').addClass('token-group').append( $('<span></span>').addClass('token').text(message ) ).append( $('<span></span>').addClass('remove-token-group') ).prependTo('.tokens');
//				$( "#log" ).scrollTop( 0 );
			}
			$( "#city" ).autocomplete({
				source: function( request, response ) {
					$.ajax({
						url: "http://ws.geonames.org/searchJSON",
						dataType: "jsonp",
						data: {
							featureClass: "P",
							style: "full",
							maxRows: 12,
							name_startsWith: request.term
						},
						success: function( data ) {
							response( $.map( data.geonames, function( item ) {
								return {
									label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
									value: ''
								}
							}));
						}
					});
				},
				minLength: 1,
				select: function( event, ui ) {
					log( ui.item ?
							"" + ui.item.label :
							"Nothing selected, input was " + this.value);
				},
				open: function() {
					$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top");
				},
				close: function() {
					$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
				}
			});
		});