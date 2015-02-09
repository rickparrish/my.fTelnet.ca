$(document).ready(function () {
    LoadProxyServers();
});

$('#cboProxyServer').change(function () {
    var Settings = GetSettings();
    Settings.ProxyServer = $(this).val();
    SetSettings(Settings);
});

function LoadProxyServers() {
    $.getJSON("//proxy.ftelnet.ca/proxyservers.json", function(data) {
        data.sort(function (a, b) {
            var aName = a.Country.toLowerCase() + a.City.toLowerCase();
            var bName = b.Country.toLowerCase() + b.City.toLowerCase(); 
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0)); 
        });

        for (var i = 0; i < data.length; i++) {
            $('#cboProxyServer').append('<option value="' + data[i].Hostname + ':' + data[i].WsPort + ':' + data[i].WssPort + '">' + data[i].Country + ' (' + data[i].City + ')</option>');
        }
        
        var Settings = GetSettings();
        $('#cboProxyServer').val(Settings.ProxyServer);
    });
}