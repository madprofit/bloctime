(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
blocTime = angular.module('BlocTime', ['ui.router', 'firebase']);

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
    'WORK_SESSION': 1500,
    'BREAK_SESSION': 5
});

blocTime.controller('Home.controller', ['$scope', '$interval', 'MY_TIMERS', '$firebaseArray', function($scope, $interval, MY_TIMERS, $firebaseArray) {
   $scope.text = "   START   ";
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
            $scope.text = "Break";
        } else {
            $scope.counter = MY_TIMERS.WORK_SESSION;
            $scope.text = "   Work   ";
        }
        } else {
        $scope.timerSet = $interval($scope.countdown, 1000);
        $scope.text = "   Reset   "; 
    
    }
    };

    $scope.setBreak = function() {
        $scope.onBreak = true;
        $scope.counter = MY_TIMERS.BREAK_SESSION;
        $scope.text = "Break"; // this again?
    }
    $scope.setWorkSession = function() {
        $scope.onBreak = false;
        $scope.counter = MY_TIMERS.WORK_SESSION;
        $scope.text = "    Work    ";
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

    var ref = new Firebase("https://bloctimer.firebaseio.com");
    $scope.tasks = $firebaseArray(ref);

    $scope.addTask = function() {
        $scope.tasks.$add({name: $scope.task});
        $scope.task = "";
    }

    $scope.deleteTasks = function() {
        var arrayLength = $scope.tasks.length;
        for (var i = 0; i < arrayLength; i++) {
            var item = $scope.tasks[i];
            $scope.tasks.$remove(item);
        }
    }
}]);

blocTime.filter('timecode', function() {
    return function(seconds) {
        seconds = Number.parseFloat(seconds); //Number function?
            if(Number.isNaN(seconds)) {
                return '00:00';
            }
            var wholeSeconds = Math.floor(seconds);
            var minutes = Math.floor(wholeSeconds / 60);
            remainingSeconds = wholeSeconds % 60;
            var output = minutes + ':';
            if (remainingSeconds < 10) {
                output += '0';
            }
            output += remainingSeconds;
            return output;
    }
});
},{}]},{},[1]);