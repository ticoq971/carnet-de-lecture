// Relais : redirige les fichiers de langue Tesseract (xxx.traineddata.gz) vers lang-xxx.wasm, seul format servi.
(function () {
  var f = self.fetch.bind(self);
  self.fetch = function (url, opts) {
    var u = String(url && url.url ? url.url : url);
    var m = u.match(/^(.*\/)([a-z_]+)\.traineddata(\.gz)?$/);
    if (m) u = m[1] + "lang-" + m[2] + ".wasm";
    return f(u, opts);
  };
})();
importScripts("worker.min.js");
