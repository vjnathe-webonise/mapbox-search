'use strict';
(function(context) {
    // Class for geocoder operations
    var NOT_FOUND = 404;
    function Geocoder() {
        L.mapbox.accessToken = /* VALID MAPBOX ACCESS TOKEN REQUIRED*/
        this.geocoderControl = L.mapbox.geocoder('mapbox.places');
    }

    var filterResult = function(callback, e, result) {
        if(!result || (e && e.status === NOT_FOUND)) {
            callback([]);
            return;
        }
        callback(result.results ? result.results.features : result.features);
    };

    Geocoder.prototype.searchByText = function(searchText, callback) {
        if(!searchText || !callback) {
            console.warn('no searchText or no callback provided for map search operation');
            if(callback) {
                callback([]);
            }
            return;
        }
        this.geocoderControl.query(searchText, filterResult.bind(this, callback));
    };

    Geocoder.prototype.searchByLocation = function(center, callback) {
        if(!center || !callback) {
            console.warn('no location or no callback provided for map search operation');
            if(callback) {
                callback([]);
            }
            return;
        }
        this.geocoderControl.reverseQuery(center, filterResult.bind(this,callback));
    };
    var geocoderSearch = new Geocoder();
    context.mapSearch = context.mapSearch || {
        searchByText: geocoderSearch.searchByText.bind(geocoderSearch),
        searchByLocation: geocoderSearch.searchByLocation.bind(geocoderSearch)
    };
})(this);
