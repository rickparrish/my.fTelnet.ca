var Settings = {
    'ProxyServer': 'us-ga:1123:11235'
};

$(document).ready(function () {
    if (localStorage['Settings']) {
        Settings = JSON.parse(localStorage['Settings']);
    }
    
    $('#cboProxyServer').val(Settings.ProxyServer);
});

$('#cboProxyServer').change(function () {
    Settings.ProxyServer = $('#cboProxyServer').val();
    localStorage['Settings'] = JSON.stringify(Settings);
});