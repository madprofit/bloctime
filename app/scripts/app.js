blocTime = angular.module('BlocTime', ['ui.router']);

blocTime.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider.state('home', {
    url: '/',
    controller: 'Home.controller',
    templateUrl: '/templates/home.html'
  });
}]);

blocTime.controller('Home.controller', ['$scope', '$interval', function($scope, $interval) {
   $scope.text = "START";
   $scope.counter = 25 * 60;
   $scope.timerSet = null;
   console.log("test");

   $scope.countdown = function() {
    $scope.counter--;
   };

   $scope.timerToggle = function() {
    if($scope.timerSet != null) {
        // everything that should happen when the timer is stopped
        // text should change back to start
        // the counter should stop
        // the counter should reset
        $interval.cancel($scope.timerSet);
        $scope.text = "START";
        $scope.counter = 25 * 60;
        $scope.timerSet = null;

    } else {
        // everything that should happen when timer is started
        // start the countdown
        // change the text to stop
        $scope.timerSet = $interval($scope.countdown, 1000);
        $scope.text = "RESET";
    }
        // if to tell me that work session is over
        // START My 5min break
        // change text to work
        // ngShow
        // ngHide
        // add constant of state's instance
        function fiveMin($timerSet, $counter) {
            $in
        }
   };

}]);


