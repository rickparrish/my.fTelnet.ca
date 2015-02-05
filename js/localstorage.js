function GetMyServers() {
    // Default to empty list
    var MyServers = [];
    
    // Load from local storage, if available
    if (localStorage['MyServers']) {
        MyServers = JSON.parse(localStorage['MyServers']);
    }
    
    return MyServers;
}

function SetMyServers(value) {
    value.sort(function (a, b) {
        var aName = a.Description.toLowerCase();
        var bName = b.Description.toLowerCase(); 
        return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0)); 
    });
    localStorage['MyServers'] = JSON.stringify(value);
}

function GetSettings() {
    // Default settings
    var Settings = {
        'ProxyServer': 'proxy-us-ga.ftelnet.ca:1123:11235'
    };
    
    // Load from local storage, if available
    if (localStorage['Settings']) {
        Settings = JSON.parse(localStorage['Settings']);

        // Old ProxyServer setting was only a piece of the domain, is 'us-ga:1123:11235' instead of 'proxy-us-ga.ftelnet.ca:1123:11235'
        if (Settings.ProxyServer.indexOf('.') == -1) {
            var HostPorts = Settings.ProxyServer.split(':');
            Settings.ProxyServer = 'proxy-' + HostPorts[0] + '.ftelnet.ca:' + HostPorts[1] + ':' + HostPorts[2];
            SetSettings(Settings);
        }
    }
    
    return Settings;
}

function SetSettings(value) {
    localStorage['Settings'] = JSON.stringify(value);
}