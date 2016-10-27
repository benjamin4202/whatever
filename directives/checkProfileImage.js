app.directive('checkImage', function() {
    return {
      link: function(scope, element, attrs) {
         element.bind('error', function() {
            element.attr('src', '/img/default.png'); // set default image
         });
       }
   }
});