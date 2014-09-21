angular.module("square34.app", [])

.factory("CombinationIterator", [
    "$window",
    function($window) {
        return $window.CombinationIterator;
    }
])

.controller("Square34Controller", [
    "$scope",
    "CombinationIterator",
    function($scope, CombinationIterator) {
        function compareNumbers(a, b) {
            return a - b;
        }

        function compareArrays(a, b) {
            var n;

            for (var i=0; i<a.length; i++) {
                if ((n=a[i] - b[i]) !== 0) {
                    return n;
                }
            }

            return 0;
        }

        function transposePattern(pattern) {
            pattern.forEach(function(value, index){
                pattern[index] = 4*(value%4) + Math.floor(value/4);
            });
            pattern.sort(compareNumbers);
        }

        function mirrorPattern(pattern) {
            pattern.forEach(function(value, index){
                pattern[index] = 3 - value%4 + 4*Math.floor(value/4);
            });
            pattern.sort(compareNumbers);
        }

        function buildStructure(pattern) {
            var structures = [], patternAnchor = pattern[0];

            for (var i=0; i<4; i++) {
                transposePattern(pattern);
                structures.push([
                    pattern[1] - pattern[0],
                    pattern[2] - pattern[1],
                    pattern[3] - pattern[2],
                    patternAnchor
                ]);

                mirrorPattern(pattern);
                structures.push([
                    pattern[1] - pattern[0],
                    pattern[2] - pattern[1],
                    pattern[3] - pattern[2],
                    patternAnchor
                ]);
            }

            structures.sort(compareArrays);

            return {
                pattern: pattern,
                structure: structures[0]
            };
        }

        function compareStructures(a, b) {
            return compareArrays(a.structure, b.structure);
        }

        // The magic square
        $scope.square = [
            16,  3,   2,   13,
            5,   10,  11,  8,
            9,   6,   7,   12,
            4,   15,  14,  1
        ];

        // Builds all the combinations that add to 34
        $scope.combinations = [];
        var iterator = new CombinationIterator(16, 4), combination;
        while (iterator.hasNext()) {
            combination = iterator.getNext();
            if ($scope.square[combination[0]] +
                $scope.square[combination[1]] +
                $scope.square[combination[2]] +
                $scope.square[combination[3]] === 34) {

                $scope.combinations.push(buildStructure(combination));
            }
        }
        $scope.combinations.sort(compareStructures);
        $scope.combinations.forEach(function (value, index) {
            $scope.combinations[index] = value.pattern;
        });

        $scope.selectCombination = function(combinationId) {
            $scope.currentCombination = $scope.combinations[$scope.currentCombinationId = combinationId];
        }

        $scope.selectNextCombination = function() {
            $scope.selectCombination(
                ($scope.currentCombinationId + 1) % $scope.combinations.length
            );
        }

        $scope.selectPreviousCombination = function() {
            $scope.selectCombination(
                ($scope.currentCombinationId - 1 + $scope.combinations.length) % $scope.combinations.length
            );
        }

        $scope.selectCombination(0);
        $scope.modalVisible = false;
    }
]);
