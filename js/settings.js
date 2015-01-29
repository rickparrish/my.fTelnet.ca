$(document).ready(function () {
    if (localStorage['ProxyServer']) {
        $('#cboProxyServer').val(localStorage['ProxyServer']);
    } else {
        $('#cboProxyServer').val('us-ga:1123:11235');
        localStorage['ProxyServer'] = $('#cboProxyServer').val();
    }
});

$('#cboProxyServer').change(function () {
    localStorage['ProxyServer'] = $('#cboProxyServer').val();
});