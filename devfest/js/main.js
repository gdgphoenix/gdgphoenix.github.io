var devfest = angular.module('DevFest',['ngSanitize']).
    config(function($routeProvider){
        $routeProvider.
            when('/', {
                "templateUrl" : "views/home.html",
                "controller" : "HomeControl"
            }).
            when('/news', {
                "templateUrl" : "views/news.html",
                "controller" : "NewsControl"
            }).
            when('/schedule', {
                "templateUrl" : "views/schedule.html",
                "controller" : "ScheduleControl"
            }).
            when('/speakers', {
                "templateUrl" : "views/speakers.html",
                "controller" : "SpeakersControl"
            });

    }).
    run(function($route, $timeout){
        angular.forEach(document.querySelectorAll('.active'), function(val){
            angular.element(val).removeClass('active');
        });
        $timeout(function(){
            try {
                switch($route.current.$$route.controller) {
                    case 'HomeControl':
                        angular.element(document.querySelector('.home-link')).addClass('active');
                        break;
                    case 'SpeakersControl':
                        angular.element(document.querySelector('.speakers-link')).addClass('active');
                        break;
                    case 'ScheduleControl':
                        angular.element(document.querySelector('.schedule-link')).addClass('active');
                        break;
                    case 'NewsControl':
                        angular.element(document.querySelector('.news-link')).addClass('active');
                        break;
                };
            }catch(e){

            }
        },100);
    });


devfest.directive('navbar',function($route){
    return function(scope,element,attrs){
        element.bind('click',function(){
            angular.forEach(document.querySelectorAll('.active'), function(val){
                angular.element(val).removeClass('active');
            });

            var el = document.getElementById('navbar-links');

            if(event.target.className == "navbar-toggle"){
                if( angular.element(el).hasClass('collapse') ){
                    angular.element(el).removeClass('collapse');
                    return false;
                }
            }

            angular.element(el).addClass('collapse');

            angular.element(event.target.parentElement).addClass('active');
        });
    }
});

devfest.controller('HomeControl', function($scope, Language){
    $scope.Language = Language;

});

devfest.controller('NavControl', function($scope, Language){
    $scope.Language = Language;

});

devfest.controller('NewsControl', function($scope, $http, Language){
    $scope.Language = Language;
    $http.
        jsonp('https://www.googleapis.com/plus/v1/activities?query=%23gdg+%23devfest+%23fresno&callback=JSON_CALLBACK&key=AIzaSyDssVSRzwj0vX4K3XsCVKJ-2LxCzXeiaNw').
        success(function(response){
            $scope.news = $scope.splitNews(response.items);
        });

    $scope.splitNews = function(list){
        var tmp = {
            0 : new Array(),
            1 : new Array(),
            2 : new Array()
        }, count = 0 ;
        angular.forEach(list,function(item){
            tmp[count%3].push(item);
            count++;
        })
        return tmp;
    }

});

devfest.controller('ScheduleControl', function($scope, $http, Language){
    $scope.Language = Language;
    $http.
        get('json/schedule.json').
        success(function(response){
            $scope.schedule = response;
            $http.
                get('json/speakers.json').
                success(function(response){
                    $scope.speakers = response;
                })
        });
});


devfest.controller('SpeakersControl', function($scope, $http, Language){
    $scope.Language = Language;
    $http.
        get('json/speakers.json').
        success(function(response){
            $scope.speakers = $scope.splitSpeakers(response)
        });

    $scope.splitSpeakers = function(list){
        var tmp = {
            0 : new Array(),
            1 : new Array(),
            2 : new Array()
        }, count = 0 ;
        angular.forEach(list,function(item){
            tmp[count%3].push(item);
            count++;
        })
        return tmp;
    }
});