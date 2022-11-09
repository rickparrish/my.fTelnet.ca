$(document).ready(function () {
    LoadProxyServers();
});

$('#cboProxyServer').change(function () {
    var Settings = GetSettings();
    Settings.ProxyServer = $(this).val();
    SetSettings(Settings);
});

function LoadProxyServers() {
    var cbo = $('#cboProxyServer');

    $.getJSON('//embed-v2.ftelnet.ca/proxy-servers.json', function(data) {
        for (key in data) {
            // Only process if the server has a Hostname property.  Some are only CNAMEs that redirect to real servers, and we don't want to list those
            var server = data[key];
            if (server['Hostname']) {
                cbo.append('<option value="' + server['Hostname'] + ':' + server['WsPort'] + ':' + server['WssPort'] + '">' + server['Country'] + ' (' + server['City'] + ')</option>')
            }
        }

        var Settings = GetSettings();
        cbo.val(Settings.ProxyServer);
    });
}