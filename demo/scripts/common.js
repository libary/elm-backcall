var Store, app1, app2, app3, app4, app5, app6, backCallInfo, backCallKey, node1, node2, node3, node4, node5, node6, periodId, periodKey, ref, ref1, ref2, regionId, regionKey, serviceId, serviceKey, store, tariffId, tariffKey;

Store = (function() {
  function Store() {}

  Store.prototype.setItem = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    if (this.onItemChanged != null) {
      this.onItemChanged(key, value);
    }
  };

  Store.prototype.getItem = function(key) {
    var value;
    value = localStorage.getItem(key);
    if (value != null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  };

  Store.prototype.removeItem = function(key) {
    localStorage.removeItem(key);
  };

  Store.prototype.clear = function() {
    localStorage.clear();
  };

  Store.prototype.onItemChanged = function(key, value) {};

  return Store;

})();

store = new Store();

node1 = document.getElementById('choose_region');

if (node1 != null) {
  regionKey = 'region';
  regionId = store.getItem(regionKey);
  app1 = Elm.ChooseRegion.embed(node1, {
    chosen: regionId,
    case_: typeof case_ !== "undefined" && case_ !== null ? case_ : null
  });
  app1.ports.saveRegion.subscribe(function(id) {
    store.setItem(regionKey, id);
  });
}

node2 = document.getElementById('choose_service');

if (node2 != null) {
  serviceKey = 'service';
  serviceId = store.getItem(serviceKey);
  app2 = Elm.ChooseService.embed(node2, {
    chosen: serviceId
  });
  app2.ports.saveService.subscribe(function(id) {
    store.setItem(serviceKey, id);
  });
}

node3 = document.getElementById('choose_period');

if (node3 != null) {
  periodKey = 'period';
  periodId = store.getItem(periodKey);
  app3 = Elm.ChoosePeriod.embed(node3, {
    chosen: periodId
  });
  app3.ports.savePeriod.subscribe(function(id) {
    store.setItem(periodKey, id);
  });
}

node4 = document.getElementById('choose_tariff');

if (node4 != null) {
  regionKey = 'region';
  regionId = store.getItem(regionKey);
  serviceKey = 'service';
  serviceId = store.getItem(serviceKey);
  periodKey = 'period';
  periodId = store.getItem(periodKey);
  tariffKey = 'tariff';
  tariffId = store.getItem(tariffKey);
  app4 = Elm.ChooseTariff.embed(node4, {
    chosen: tariffId,
    regionId: regionId,
    serviceId: serviceId,
    periodId: periodId
  });
  app4.ports.saveTariff.subscribe(function(id) {
    store.setItem(tariffKey, id);
  });
}

node5 = document.getElementById('watch_sites');

if (node5 != null) {
  regionKey = 'region';
  regionId = store.getItem(regionKey);
  serviceKey = 'service';
  serviceId = store.getItem(serviceKey);
  app5 = Elm.WatchSites.embed(node5, {
    regionId: regionId,
    serviceId: serviceId
  });
  app5.ports.ready.subscribe(function() {
    $('ul.tabs').tabs({
      swipeable: false
    });
  });
}

node6 = document.getElementById('back_call');

if (node6 != null) {
  backCallKey = 'backCall';
  backCallInfo = store.getItem(backCallKey);
  app6 = Elm.BackCall.embed(node6, {
    name: (ref = backCallInfo != null ? backCallInfo[0] : void 0) != null ? ref : null,
    phone: (ref1 = backCallInfo != null ? backCallInfo[1] : void 0) != null ? ref1 : null,
    comment: (ref2 = backCallInfo != null ? backCallInfo[2] : void 0) != null ? ref2 : null
  });
  app6.ports.save.subscribe(function(data) {
    store.setItem(backCallKey, data);
  });
}

$(function() {
  $('.button-collapse').sideNav();
  $('ul.tabs').tabs();
  $("a[href^='#'][href!='#']").click(function(e) {
    $('html, body').animate({
      scrollTop: $("div[data-name='" + $(this).attr("href") + "']").offset().top
    }, 1000);
    e.preventDefault();
  });
});
