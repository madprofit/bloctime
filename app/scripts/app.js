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
    'WORK_SESSION': 10,
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
        if ($scope.onBreak) {
            $scope.calculateTimerPercentage(MY_TIMERS.BREAK_SESSION);
        } else {
            $scope.calculateTimerPercentage(MY_TIMERS.WORK_SESSION);
        }
   } else {
        $interval.cancel($scope.timerSet);
        $scope.timerSet = null;
        $scope.resetProgressBar();
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
        $scope.resetProgressBar();
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

    $scope.calculateTimerPercentage = function(selectedTimer) {
        var timerMax = selectedTimer;
        var timeRemaining = $scope.counter;
        var timePassed = timerMax - timeRemaining;
        var timerPercentage = (timePassed / timerMax) * 100;
        $scope.barPercentage = timerPercentage + "%";
        console.log($scope.barPercentage);
    }

    $scope.resetProgressBar = function() {
        $scope.barPercentage = "0%";
    }

    //link counter to progress bar width
    // Figure out total time in timer
    // Figure out how much time as passed
    // Calculate the percentage of how much time is passed

    // if there is no time left, reset progree bar
    // reset progres bar after clicking reset button
    // let progrees know that no time has been counted down

    // If we're on a break and the button is pressed, calculate the timer percentage based on the break timer.
    // Otherwise, calculate the percentage based on the work timer.

}]);

var progress = setInterval(function () {
    var $bar = $('.bar');

    if ($bar.width() >= 400) {
        clearInterval(progress);
        $('.progress').removeClass('active');
    } else {
        $bar.width($bar.width() + 40);
    }
    $bar.text($bar.width() / 4 + "%");
}, 800);