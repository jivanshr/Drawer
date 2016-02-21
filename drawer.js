

+function ($) {
  'use strict';

  // DRAWER CLASS DEFINITION
  // ======================

  var Drawer = function (element, options) {
    this.options             = options
    this.$body               = $(document).children(".drawer-wrapper")
    this.$element            = $(element)
  }

  Drawer.DEFAULTS = {
    show: true
  }

  Drawer.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.drawer', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true 

    this.$element.on('click.dismiss.bs.drawer', '[data-dismiss="drawer"]', $.proxy(this.hide, this))


    console.log(this);
    console.log(e);


    //if (_relatedTarget).hasClass(".btn")) {

        $("body").wrapInner('<div class="drawer-wrapper" />')

        $(".drawer-wrapper").css( { marginLeft :this.$element.outerWidth() } )

        $(".drawer:visible").removeClass('visible')

        this.$element.addClass('visible')

        var x = _relatedTarget.closest(".drawer.visible");
        
        console.log(x)
  //}





  }

  Drawer.prototype.hide = function (e) {

    e = $.Event('hide.bs.drawer')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

     this.isShown = false  //for next time clicking 
    
     $(".drawer-wrapper").css( { marginLeft :0} )

    this.$element.removeClass('visible')

     setTimeout(function() {

    $(".drawer-wrapper").contents().unwrap();


     }, 1200);




  }

  // DRAWER PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.drawer')
      var options = $.extend({}, Drawer.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.drawer', (data = new Drawer(this, options)))
      //if (typeof option == 'string') data[option](_relatedTarget)
      if (options.show) data.show(_relatedTarget)

    })
  }

  var old = $.fn.drawer

  $.fn.drawer             = Plugin
  $.fn.drawer.Constructor = Drawer


  // DRAWER DATA-API
  // ==============

  $(document).on('click.bs.drawer.data-api', '[data-toggle="drawer"]', function (e) {
    var $this   = $(this)
    var href = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.drawer') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    Plugin.call($target, option, this)
  })

}(jQuery);
