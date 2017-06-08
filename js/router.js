//router.js
define([
	'underscore',
	'backbone',
	'views/HolidaysView',
	'collections/Holidays'
], function(_, Backbone, HolidaysView, Holidays) {

	var initialize = function() {
		var appRouter = new AppRouter();
		Backbone.history.start();
	};

	var AppRouter = Backbone.Router.extend({
		routes: {
			'': 'default',
			'custom/:year/:month/:day': 'custom',
			'vacation': 'vacation',
			'graduation': 'graduation',
			'lastday':'lastday',
			'*notfound': 'notFound'
		},

		addToView: function(collection) {
			collection.fetch({
				success: function() {
					new HolidaysView({
						collection: collection
					}).render();
				}
			});
		},

		default: function() {
			var date = new Holidays({
				url: 'js/json/us_holidays.json'
			});
			this.addToView(date);
		},

		vacation: function() {
			var date = new Holidays({
				url: 'js/json/vacation.json'
			});
			this.addToView(date);
		},

		graduation: function() {
			var date = new Holidays({
				url: 'js/json/graduation.json'
			});
			this.addToView(date);
		},

		lastday: function() {
			var date = new Holidays({
				url: 'js/json/lastday.json'
			});
			this.addToView(date);
		},

		custom: function(year, month, day) {
			var date = new Holidays([{
				description: 'Custom',
				year: parseInt(year),
				month: parseInt(month),
				day: parseInt(day)
			}]);
            new HolidaysView({
                collection: date
            }).render();
		},

        notFound: function() {
            $('#holiday').html('<h1>404 - Page not found</h1>');
            $('#countdown').countdown('stop').html('');
            $('body').css('background-image', 'url("images/404.jpg")');
        }

	});

	return {
		initialize: initialize
	};

});
