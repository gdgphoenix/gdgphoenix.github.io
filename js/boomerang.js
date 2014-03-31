var boomerang = angular.module('gdgBoomerang', ['ngSanitize','ui.bootstrap'])
    .config(function($routeProvider) {
         $routeProvider.
             when("/",  {templateUrl:'views/home.html', controller:"HomeControl"}).
             when("/about",  {templateUrl:'views/about.html', controller:"AboutControl"}).
             when("/news", {templateUrl:'views/news.html', controller:"NewsControl"}).
             when("/events", {templateUrl:'views/events.html', controller:"EventsControl"}).
             when("/photos", {templateUrl:'views/photos.html', controller:"PhotosControl"}).
             when("/admin", {templateUrl:'views/admin.html', controller:"AdminControl"}).
             otherwise({ redirectTo: '/' });
    });

boomerang.filter('newlines', function () {
  return function(text) {
    return text.replace(/\n\n/g, '<p>');
  };
});

boomerang.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

boomerang.factory('Config',function(){
    return {
        //modify these
        'name'          : 'GDG Phoenix',
        'id'            : '107371179007921028529',
        'google_api'    : 'AIzaSyC9TwDWo427Kn-E37qorq70lOEzJTiqzZk',
        'pwa_id'        : '--5846413253595166705', //picasa web album id, must belong to google+ id above
        'cover' : {
            title : 'GDG Phoenix',
                subtitle : 'The Phoenix Chapter of the Google Developer Groups',
                button : {
                    text : 'Join Us',
                    url : 'https://plus.google.com/+Gdgphoenix/'
                }
        }
    };
});

boomerang.controller('AdminControl', function($scope, Config) {
    $scope.links = [

    {
        'title':'GDG Phoenix Corporate',
        'link':'https://developers.google.com/groups/chapter/107371179007921028529/',
        'desc':'Says we are active or not, keep track of "conferences" here and put in the number of attendees.'
    },
    {
        'title':'GDG Events Statistic Lookup',
        'link':'https://script.google.com/macros/s/AKfycbxhUrO0-2JUBpw60pc8JYt77PMESyex4b6-JNvopbTboV2JIaSL/exec',
        'desc':'User Made tool to look at stats from "conferences" as seen on GDG Phoenix Corporate.'
    },
    {
        'title':'GDG Wisdom',
        'link':'https://sites.google.com/site/gdgwisdom/',
        'desc':'Dan Franc site for culling GDG wisdom using the #wisdom tag'
    },

    {
        'title':'Organizer Tools',
        'link':'https://support.google.com/developergroups/topic/2951701?hl=en&ref_topic=2847283',
        'desc':'The basics of managing GDG pages, chapter requirements, etc.'
    },

    {
        'title':'GDG[x] Github',
        'link':'https://github.com/gdg-x',
        'desc':'Source for this site and the GDG site before it was bludgeoned by Sheldon. We use "gdg-x.github.io" for this site and "devfest-template" for the DevFest site.'
    },


    {
        'title':'Shared Google Drive Folder from Mike',
        'link':'https://drive.google.com/?tab=mo&authuser=0#folders/0B13HdJ3KMDaueGRMWktRWm9fMkU',
        'desc':'Has Logos, Partner/Sponsor letter examples, etc.'
    },

    {
        'title':'PHX Android Meetup page',
        'link':'http://www.meetup.com/PHX-Android/',
        'desc':'All Android related GDG events are co-listed with the PHX Android Meetup'
    },

    {
        'title':'GDG Phoenix Google+ Page',
        'link':'https://plus.google.com/+Gdgphoenix/',
        'desc':'GDG Phoenix Page where we post events and invite people to events.'
    },

    {
        'title':'Facebook',
        'link':'https://www.facebook.com/GDGPhoenix',
        'desc':'GDG Phoenix on Facebook'
    },

    {
        'title':'Twitter',
        'link':'https://twitter.com/gdgphoenix',
        'desc':'GDG Phoenix on Twitter'
    },

    {
        'title':'The old GTUG site',
        'link':'http://phoenix.gtugs.org/',
        'desc':''
    },



    ];
    
$scope.calendars = [
    {
        'title':'nextplex Phoenix',
        'link':'http://nextplex.com/phoenix-az/calendar',
        'desc':'The default tech calendar nowadays. Need to add everything here. @w33ble (Joe Fleming) is the main contact and gets events approved.'
    },
    {
        'title':'AZGroups',
        'link':'http://events.azgroups.com/',
        'desc':'The old calendar that used to have it all.'
    },
    {
        'title':'Co+Hoots',
        'link':'http://www.cohoots.com/events/',
        'desc':'For some reason we\'re not listed here. Michael!!!! Or Jess Roth <jess@cohoots.com>'
    },




    ];

    $scope.chapter_name = Config.name;
    $scope.google_plus_link = 'https://plus.google.com/' + Config.id;
    $scope.isNavCollapsed = true;
});


boomerang.controller('MainControl', function($scope, Config) {
    $scope.chapter_name = Config.name;
    $scope.google_plus_link = 'https://plus.google.com/' + Config.id;
    $scope.isNavCollapsed = true;
});

boomerang.controller('HomeControl', function( $scope, $http, $location, Config ) {
    $scope.loading = true;
    $scope.$parent.activeTab = "home";
    $scope.cover = Config.cover;
    $http.jsonp('https://www.googleapis.com/plus/v1/people/'+Config.id+'?callback=JSON_CALLBACK&fields=aboutMe%2Ccover%2Cimage%2CplusOneCount&key='+Config.google_api).
        success(function(data){
            console.log(data);
            $scope.desc = data.aboutMe;
            if(data.cover && data.cover.coverPhoto.url){
                $scope.cover.url = data.cover.coverPhoto.url;
            }
            $scope.loading = false;
        });
});

boomerang.controller('AboutControl', function( $scope, $http, $location, Config ) {
    $scope.loading = true;
    $scope.$parent.activeTab = "about";
    $scope.cover = Config.cover;
    $http.jsonp('https://www.googleapis.com/plus/v1/people/'+Config.id+'?callback=JSON_CALLBACK&fields=aboutMe%2Ccover%2Cimage%2CplusOneCount&key='+Config.google_api).
        success(function(data){
            console.log(data);
            $scope.desc = data.aboutMe;
            if(data.cover && data.cover.coverPhoto.url){
                $scope.cover.url = data.cover.coverPhoto.url;
            }
            $scope.loading = false;
        });
});

boomerang.controller("NewsControl", function($scope, $http, $timeout, Config) {
    $scope.loading = true;
    $scope.$parent.activeTab = "news";
    $http.
        jsonp('https://www.googleapis.com/plus/v1/people/' + Config.id + '/activities/public?callback=JSON_CALLBACK&maxResults=10&key=' + Config.google_api).
        success(function(response){
            var entries = [];
            for (var i = 0; i < response.items.length; i++) {
                var item = response.items[i];
                var actor = item.actor || {};
                var object = item.object || {};
                // Normalize tweet to a FriendFeed-like entry.
                var item_title = '<b>' + item.title + '</b>';

                var html = [item_title.replace(new RegExp('\n','g'), '<br />')];
                //html.push(' <b>Read More &raquo;</a>');

                var thumbnails = [];

                var attachments = object.attachments || [];
                for (var j = 0; j < attachments.length; j++) {
                    var attachment = attachments[j];
                    switch (attachment.objectType) {
                        case 'album':
                            break;//needs more work
                            var upper = attachment.thumbnails.length > 7 ? 7 : attachment.thumbnails.length;
                            html.push('<ul class="thumbnails">');
                            for(var k=1; k<upper; k++){
                                html.push('<li class="span2"><img src="' + attachment.thumbnails[k].image.url + '" /></li>');
                            }
                            html.push('</ul>');
                            break;
                        case 'photo':
                            thumbnails.push({
                                url: attachment.image.url,
                                link: attachment.fullImage.url
                            });
                            break;

                        case 'video':
                            thumbnails.push({
                                url: attachment.image.url,
                                link: attachment.url
                            });
                            break;

                        case 'article':
                            html.push('<div class="link-attachment"><a href="' +
                                attachment.url + '">' + attachment.displayName + '</a>');
                            if (attachment.content) {
                                html.push('<br>' + attachment.content + '');
                            }
                            html.push('</div>');
                            break;
                        case 'event':
                            console.log(attachment);
                            html.push('<b>' + attachment.displayName + '</b>');
                            html.push('<p>' + attachment.content.replace(new RegExp('\n','g'), '<br />') + '</p>');
                            break;
                        default :
                            console.log(attachment.objectType)
                    }
                }

                html = html.join('');

                var actor_image = actor.image.url;
                actor_image = actor_image.substr(0,actor_image.length-2)+'16';

                var entry = {
                    via: {
                        name: 'Google+',
                        url: item.url
                    },
                    body: html,
                    date: item.updated,
                    reshares: (object.resharers || {}).totalItems,
                    plusones: (object.plusoners || {}).totalItems,
                    comments: (object.replies || {}).totalItems,
                    thumbnails: thumbnails,
                    icon: actor_image
                };

                entries.push(entry);
            }
            $scope.news = entries;
            $timeout(function(){
                gapi.plusone.go();
            });
            $scope.loading = false;
        });

});

boomerang.controller("EventsControl", function( $scope, $http, Config ) {
    $scope.loading = true;
    $scope.$parent.activeTab = "events";

    $scope.events = {past:[] ,future:[]};
    $http.get("http://gdgfresno.com/gdgfeed.php?id="+Config.id).
        success(function(data){
            var now = new Date();
            for(var i=data.length-1;i>=0;i--){
                var start = new Date(data[i].start);

                data[i].start = start;
                data[i].end = new Date(data[i].end);

                if (start < now){
                    $scope.events.past.push(data[i]);
                } else {
                    $scope.events.future.push(data[i]);
                }
            }
            $scope.loading = false;
        });

});

boomerang.controller("PhotosControl", function( $scope, $http, Config ) {
    $scope.loading = true;
    $scope.$parent.activeTab = "photos";
    $scope.photos = [];

    var pwa = 'https://picasaweb.google.com/data/feed/api/user/'+Config.id+'/albumid/'+Config.pwa_id+'?access=public&alt=json-in-script&kind=photo&max-results=20&fields=entry(title,link/@href,summary,content/@src)&v=2.0&callback=JSON_CALLBACK';
    $http.jsonp(pwa).
        success(function(d){
            var p = d.feed.entry;
            for(var x in p){
                var photo = {
                    link : p[x].link[1].href,
                    src : p[x].content.src,
                    alt : p[x].title.$t,
                    title : p[x].summary.$t
                };
                $scope.photos.push(photo);
            }
            $scope.loading = false;
        });
});