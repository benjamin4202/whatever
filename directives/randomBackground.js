app.directive("randomBackgroundcolor", function () {
    return {
        restrict: 'EA',
        replace: false,
        link: function (scope, element, attr) {
            
            var aColors = ['#F8DC5F','#F26A3C', '#ED1848', '#AA206C'],
                color = aColors[Math.floor(Math.random() * aColors.length)]; 
            
            element.css('background-color', color);

        }
    }
});