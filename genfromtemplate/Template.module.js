/**
 * @author Карачевцев Ю.Ю.
 */
define('js!SBIS3.ProjectManagement.${name}',
   [
      'js!SBIS3.CONTROLS.CompoundControl',
      'tmpl!SBIS3.ProjectManagement.${name}', 
	  
      'css!SBIS3.ProjectManagement.${name}'
      
   ], function (CompoundControl, dotTplFn) {
     
      /**
       * SBIS3.ProjectManagement.${name}
       * @class SBIS3.ProjectManagement.${name}
       * @control
       */
      var moduleClass = CompoundControl.extend({
         _dotTplFn: dotTplFn,
         $protected: {
            _options: {
               
            }
         },         

         init: function () {
            moduleClass.superclass.init.call(this);
         }
      });

      return moduleClass;
   });