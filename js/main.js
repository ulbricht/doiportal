//ulbricht@gfz-potsdam.de this file is a modified version of the main.js from the reuters example (ajax-solr)

var Manager;


(function ($) {

  $(function () {
    Manager = new AjaxSolr.Manager({
      proxyUrl: 'http://pmd.gfz-potsdam.de/portal/proxy/proxy.php'
    });

    Manager.addWidget(new AjaxSolr.ResultWidget({
      id: 'result',
      target: '#docs'
    }));

    var fields = [ 'category', 'classification','subject' ];
    for (var i = 0, l = fields.length; i < l; i++) {
      Manager.addWidget(new AjaxSolr.TagcloudWidget({
        id: fields[i],
        target: '#' + fields[i],
        field: fields[i]
      }));
    }

    Manager.addWidget(new AjaxSolr.SpatialWidget({
      id: 'spatial',
      target: '#spatial',
      field: 'geo',
      searchmap: '#searchmap',
      openmap: '#openmap'
    }));

    Manager.addWidget(new AjaxSolr.DatacenterWidget({
      id: 'datacentre_facet',
      target: '#datacentre_facet',
      field: 'datacentre_facet'
    }));
    Manager.addWidget(new AjaxSolr.CurrentSearchWidget({
      id: 'currentsearch',
      target: '#selection'
    }));
    Manager.addWidget(new AjaxSolr.AutocompleteWidget({
      id: 'text',
      target: '#search',
      fields:  [ 'category', 'classification', 'subject', 'author_facet', 'contributor_facet']
    }));

    Manager.init();
    Manager.store.addByValue('q', '*:*');
    
    var tokens;
    var re=/[?&]?([^=]+)=([^&]*)/g;
    var q={};
    //set URL parameters
    while (tokens = re.exec(document.location.search)){
            Manager.store.addByValue(decodeURIComponent(tokens[1]), decodeURIComponent(tokens[2]));
    }

    var params = {
      facet: true,
      'facet.field':  [ 'category', 'classification', 'subject', 'datacentre_facet'],
      'facet.limit': 20,
      'rows':10,
      'facet.mincount': 1,
      'fq': '-type:text',
      'json.nl': 'map',
	'fl' : 'title,description,doi,geo,creator',
       'sort': 'minted desc'
    };
    for (var name in params) {
      Manager.store.addByValue(name, params[name]);
    }
    Manager.doRequest();

  });

  $.fn.showIf = function (condition) {
    if (condition) {
      return this.show();
    }
    else {
      return this.hide();
    }
  }

})(jQuery);
