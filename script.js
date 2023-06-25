(function() {
  angular
    .module('recipeFinder', [])
    .controller('ItemListController', ItemListController);

  ItemListController.$inject = ['$http', '$timeout'];

  function ItemListController($http, $timeout) {
    var vm = this;
    vm.items = null;
    
    $http.get('https://api.myjson.com/bins/15zprd').then(function(item) {
      vm.items = item.data
    })

    vm.index = 1;

    vm.prev = function() {
      if (vm.index === 1) {
        return false;
      } else {
        navigate();
        var indexChange = function() {
          vm.index--;
        }
      }
      $timeout(indexChange, 500);
    }
    vm.next = function() {
      if (vm.index === vm.items.length) {
        return false;
      } else {
        navigate();
        var indexChange = function() {
          vm.index++;
        }
      }
      $timeout(indexChange, 500);
    }
  }

  function navigate() {
    setTimeout(function() {
      $(".menu_item__inner").find("img, h2").css({
        'transform': 'translateX(-500px)',
        'opacity': '0',
        'transition': 'all cubic-bezier(0.600, -0.280, 0.735, 0.045) .5s'
      })
    });
    setTimeout(function() {
      $(".menu_item__inner").find("img, h2").css({
        'transform': 'translateX(0)',
        'opacity': '1',
        'transition': 'all ease-in-out .5s'
      });
    }, 1000);
    $(".menu_recipe__list").find("h2, ul").css({
      'transform': 'translateY(-25px)',
      'opacity': '0',
      'transition': 'all ease-in-out .5s'
    })
    setTimeout(function() {
      $(".menu_recipe__list").find("h2, ul").css({
        'transform': 'translateY(0)',
        'opacity': '1',
        'transition': 'all ease-in-out .5s'
      })
    }, 1000);
  }

})();