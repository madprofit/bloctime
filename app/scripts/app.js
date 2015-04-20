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

blocTime.constant('MY_TIMERS', {
    'WORK_SESSION': 3,
    'BREAK_SESSION': 5
});

blocTime.controller('Home.controller', ['$scope', '$interval', 'MY_TIMERS', function($scope, $interval, MY_TIMERS) {
   $scope.text = "START";
   // Set the counter to the work session time by default using the constant
   $scope.counter = MY_TIMERS.WORK_SESSION;
   $scope.timerSet = null;
   // Set the status to not being on a break by default
   $scope.onBreak = false;

    $scope.countdown = function() {
    if ($scope.counter != 0) {
        $scope.counter--;
   } else {
        $interval.cancel($scope.timerSet);
        $scope.timerSet = null;
        if ($scope.onBreak) {
            $scope.setWorkSession();
        } else {
            $scope.setBreak();
        }
   }
};

$scope.timerToggle = function() {
    if($scope.timerSet != null) {
        $interval.cancel($scope.timerSet);
        $scope.timerSet = null;
        if ($scope.onBreak) {
            $scope.counter = MY_TIMERS.BREAK_SESSION;
            $scope.text = "Start Break";
        } else {
            $scope.counter = MY_TIMERS.WORK_SESSION;
            $scope.text = "Work";
        }
        } else {
        $scope.timerSet = $interval($scope.countdown, 1000);
        $scope.text = "Reset"; // why this an not START?
    
    }
    };

    $scope.setBreak = function() {
        $scope.onBreak = true;
        $scope.counter = MY_TIMERS.BREAK_SESSION;
        $scope.text = "Start Break"; // this again?
    }
    $scope.setWorkSession = function() {
        $scope.onBreak = false;
        $scope.counter = MY_TIMERS.WORK_SESSION;
        $scope.text = "Work";
    }

}]);