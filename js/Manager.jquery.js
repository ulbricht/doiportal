//ulbricht@gfz-potsdam.de this file is a modified version of the Manager.jquery.js from ajax-solr

(function (callback) {
  if (typeof define === 'function' && define.amd) {
    define(['core/AbstractManager'], callback);
  }
  else {
    callback();
  }
}(function () {

/**
 * @see http://wiki.apache.org/solr/SolJSON#JSON_specific_parameters
 * @class Manager
 * @augments AjaxSolr.AbstractManager
 */
AjaxSolr.Manager = AjaxSolr.AbstractManager.extend(
  /** @lends AjaxSolr.Manager.prototype */
  {
  executeRequest: function (servlet, string, handler, errorHandler, disableJsonp) {
    var self = this,
        options = {dataType: 'json'};
    string = string || this.store.string();
    handler = handler || function (data) {
      self.handleResponse(data);
    };
    errorHandler = errorHandler || function (jqXHR, textStatus, errorThrown) {
      self.handleError(textStatus + ', ' + errorThrown);
    };
    if (this.proxyUrl) {
      options.url = this.proxyUrl;
      options.data = {query: string+'&fq=is_active:true&fq=has_metadata:true&fq=(*:* -type:text)'};
      options.type = 'POST';
    }
    else {
      options.url = this.solrUrl + servlet + '?' + string + '&wt=json&fq=is_active:true&fq=has_metadata:true' + (disableJsonp ? '' : '&json.wrf=?');
    }
    jQuery.ajax(options).done(handler).fail(errorHandler);
  }
});

}));