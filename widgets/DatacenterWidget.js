//ulbricht@gfz-potsdam.de this file is a modified version of the FacetWidget.js from the reuters example (ajax-solr)

(function ($) {

AjaxSolr.DatacenterWidget = AjaxSolr.AbstractFacetWidget.extend({
  afterRequest: function () {
    if (this.manager.response.facet_counts.facet_fields[this.field] === undefined) {
      $(this.target).html('no items found in current selection');
      return;
    }

    var objectedItems = [];
    for (var facet in this.manager.response.facet_counts.facet_fields[this.field]) {
      objectedItems.push({ facet: facet, name: facet.substring(facet.indexOf("-")+2)});
    }
    objectedItems.sort(function (a, b) {
      return a.name < b.name ? -1 : 1;
    });

    $(this.target).empty();
    for (var i = 0, l = objectedItems.length; i < l; i++) {
      var facet = objectedItems[i].facet;
      var name = objectedItems[i].name;
      if (i<l-1){
        name=name+" | "
	}

      $(this.target).append(
        $('<a href="#" class="tagcloud_item">'+name+'</a>')
        .click(this.clickHandler(facet))
      );
    }
  }
});

})(jQuery);
