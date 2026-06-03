(function () {
  function trimTrailingSlash(value) {
    return (value || '').replace(/\/$/, '');
  }

  window.apiUrl = function (path) {
    if (!path.startsWith('/')) path = '/' + path;
    return trimTrailingSlash(window.WOLAYO_API_BASE) + path;
  };

  window.sitePath = function (path) {
    if (!path.startsWith('/')) path = '/' + path;
    return path;
  };
})();
