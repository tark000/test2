'use strict';

/**
 * Lightbox directive
 */
angular.module('ui.fancybox', [])

  .value('uiFancyboxConfig', {
    helpers: {
      title: {
        type: 'inside'
      }
    },
    openEffect	: 'none',
		closeEffect	: 'none',
    fancyboxGroup: 'group'
  })
  .directive('uiFancybox', ['uiFancyboxConfig', function (uiFancyboxConfig) {

    return {
      link: function(scope, element, attrs) {

        //���������
        var opts = {};
        
        angular.extend(opts, uiFancyboxConfig);
        
        //��������� ��� (�� ��������)
        if (opts.fancyboxGroup) element.attr('data-fancybox-group', opts.fancyboxGroup);

        scope.$watch(attrs.oiFile, function (newVal, oldVal) {
          opts = angular.extend({}, uiFancyboxConfig, newVal);
        }, true);
            
        //����������� �������� � ��������
        element.fancybox(opts);

      }
    };
  }]);