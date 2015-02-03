'use strict';

var AddressBook = angular.module('AddressBook', []);

AddressBook.controller('AddressBook', ['$scope', '$filter', '$http', 'LocalStorage', function ($scope, $filter, $http, LocalStorage) {
    $scope.EditIndex = -1;
    
    $scope.GlobalServers = [];
    $http.get('models/GlobalAddressBook.json').success(function(data) {
        $scope.GlobalServers = data;
    });

    $scope.MyServers = LocalStorage.GetMyServers();
    
    $scope.Settings = LocalStorage.GetSettings();
    
    // Load the "Add new entry" form and clear it
    $scope.Add = function() {
        $scope.EditIndex = -1;

        $('#pnlDescription').removeClass('has-error');
        $('#pnlHostname').removeClass('has-error');
        $('#pnlPort').removeClass('has-error');
        $('#txtDescription').val('');
        $('#txtHostname').val('');
        $('#txtPort').val('');
        $('#cboConnectionType').val('telnet');
        $('#cboEmulation').val('ansi-bbs');
        $('#chkProxy').prop('checked', true);
        
        $('#AddEdit').modal();
    };
    
    // Connect to the requested server
    $scope.Connect = function(index) {
        var Entry = $scope.MyServers[index];
        
        var Proxy = '';
        if (Entry.Proxy) {
            var HostPorts = $scope.Settings.ProxyServer.split(':');
            Proxy += '&Proxy=' + HostPorts[0];
            Proxy += '&ProxyPort=' + HostPorts[1];
            Proxy += '&ProxyPortSecure=' + HostPorts[2];
        }
        
        window.open('http://embed.ftelnet.ca/?Hostname=' + Entry.Hostname + '&Port=' + Entry.Port.toString() + Proxy + '&AutoConnect=true&ConnectionType=' + Entry.ConnectionType + '&Emulation=' + Entry.Emulation + '&TopButtons=true&VirtualKeyboard=on');
    };
    
    $scope.Delete = function(index) {
        var Entry = $scope.MyServers[index];        
        if (confirm('Really delete "' + Entry.Description + '"?')) { // TODO Use a model with yes/no instead of confirm()?
            $scope.MyServers.splice(index, 1);
            LocalStorage.SetMyServers($scope.MyServers);
        }
    };
    
    $scope.Edit = function(index) {
        $scope.EditIndex = index;

        var Entry = $scope.MyServers[index];
        
        $('#pnlDescription').removeClass('has-error');
        $('#pnlHostname').removeClass('has-error');
        $('#pnlPort').removeClass('has-error');
        $('#txtDescription').val(Entry.Description);
        $('#txtHostname').val(Entry.Hostname);
        $('#txtPort').val(Entry.Port.toString());
        $('#cboConnectionType').val(Entry.ConnectionType);
        $('#cboEmulation').val(Entry.Emulation);
        $('#chkProxy').prop('checked', Entry.Proxy);

        $('#AddEdit').modal();    
    };
    
    $scope.Export = function() {
        var Data = {
            'MyServers': $scope.MyServers,
            'Settings': $scope.Settings
        };

        try {
            var DataBlob = new Blob([angular.toJson(Data)], {type: 'text/json;charset=utf-8'});
            saveAs(DataBlob, 'my.ftelnet.ca.json');
        } catch (ex) {
            alert('Sorry, your browser doesn\'t support exporting');
        }
    };
    
    $scope.Import = function() {
        $('#fuImport').click();
    };
    
    $scope.ImportFileSelected = function(elm) {
        try {
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = function(event) {
                try {
                    var Data = JSON.parse(event.target.result);
                    
                    $scope.MyServers = Data.MyServers;
                    $scope.MyServers = $filter('orderBy')($scope.MyServers, 'Description', false);
                    LocalStorage.SetMyServers($scope.MyServers);
                    
                    $scope.Settings = Data.Settings;
                    LocalStorage.SetSettings($scope.Settings);

                    $scope.$apply();
                } catch (ex) {
                    alert('Sorry, your browser doesn\'t support importing');
                }
            };

            // Read in the file as text
            reader.readAsText(elm.files[0]);
        } catch (ex) {
            alert('Sorry, your browser doesn\'t support importing');
        }
    };

    $scope.Save = function() {
        // Clean up text boxes
        $('#txtDescription').val($.trim($('#txtDescription').val()));
        $('#txtHostname').val($.trim($('#txtHostname').val()));
        $('#txtPort').val($.trim($('#txtPort').val()));
        
        // Validate
        var ErrorCount = 0;
        $('#pnlDescription').removeClass('has-error');
        $('#pnlHostname').removeClass('has-error');
        $('#pnlPort').removeClass('has-error');
        if ($('#txtDescription').val() == '') {
            $('#pnlDescription').addClass('has-error');
            ErrorCount += 1;
        }
        if ($('#txtHostname').val() == '') {
            $('#pnlHostname').addClass('has-error');
            ErrorCount += 1;
        }
        if ($('#txtPort').val() == '') {
            $('#pnlPort').addClass('has-error');
            ErrorCount += 1;
        } else {
            var Port = parseInt($('#txtPort').val(), 10);
            if (isNaN(Port) || (Port < 1) || (Port > 65535)) {
                $('#pnlPort').addClass('has-error');
                ErrorCount += 1;
            }
        }
        if (ErrorCount > 0) {
            return;
        }

        // Build the entry
        var Entry = {
            'ConnectionType': $('#cboConnectionType').val(),
            'Description': $('#txtDescription').val(),
            'Emulation': $('#cboEmulation').val(),
            'Hostname': $('#txtHostname').val(),
            'Port': parseInt($('#txtPort').val()),
            'Proxy': $('#chkProxy').is(':checked')
        }
       
        // Store the entry
        if ($scope.EditIndex != -1) {
            $scope.MyServers.splice($scope.EditIndex, 1);
        }
        $scope.MyServers.push(Entry);

        // Sort and persist
        $scope.MyServers = $filter('orderBy')($scope.MyServers, 'Description', false);
        LocalStorage.SetMyServers($scope.MyServers);
        
        $('#AddEdit').modal('hide');
    };

}]);