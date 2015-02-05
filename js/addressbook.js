var EditIndex = -1;

$(document).ready(function () {
    LoadMyServers();
});

$('#fuImport').change(function (event) {
    try {
        var reader = new FileReader();
        
        // Closure to capture the file information.
        reader.onload = function(event) {
            try {
                var Data = JSON.parse(event.target.result);
                SetMyServers(Data.MyServers);
                SetSettings(Data.Settings);
                LoadMyServers();
            } catch (ex) {
                alert('Sorry, your browser doesn\'t support importing');
            }
        };
        
        // Read in the file as text
        reader.readAsText(event.target.files[0]);
    } catch (ex) {
        alert('Sorry, your browser doesn\'t support importing');
    }
});

$('#hlAddEntry').click(function () {
    InitializeAddEditForm(-1);
});

$('#hlExportEntries').click(function () {
    var Data = {
        'MyServers': GetMyServers(),
        'Settings': GetSettings()
    };

    $(this).attr({
        'download': 'my.ftelnet.ca.json',
        'href': 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(Data)),
        'target': '_blank'
    });
});

$('#hlImportEntries').click(function () {
    $('#fuImport').click();
});

$('#hlSaveEntry').click(function () {
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
    var MyServers = GetMyServers();
    if (EditIndex == -1) {
        MyServers.push(Entry);
    } else {
        MyServers[EditIndex] = Entry;
    }
    SetMyServers(MyServers);

    // Reload the table    
    LoadMyServers();

    $('#AddEdit').modal('hide');
});

$('#tblMyServers').on('click', 'a.Delete', function () {
    var MyServers = GetMyServers();
    var Entry = MyServers[$(this).data('index')];
    
    if (confirm('Really delete "' + Entry.Description + '"?')) { // TODO Use a modal with yes/no instead of confirm()?
        MyServers.splice($(this).data('index'), 1);
        SetMyServers(MyServers);
        LoadMyServers();
    }
});

$('#tblMyServers').on('click', 'a.Edit', function () {
    InitializeAddEditForm($(this).data('index'));
});

function InitializeAddEditForm(index) {
    // Common init
    EditIndex = index;
    $('#pnlDescription').removeClass('has-error');
    $('#pnlHostname').removeClass('has-error');
    $('#pnlPort').removeClass('has-error');

    // Add/Edit specific init
    if (index == -1) {
        $('#txtDescription').val('');
        $('#txtHostname').val('');
        $('#txtPort').val('');
        $('#cboConnectionType').val('telnet');
        $('#cboEmulation').val('ansi-bbs');
        $('#chkProxy').prop('checked', true);
    } else {
        var Entry = GetMyServers()[index];
        $('#txtDescription').val(Entry.Description);
        $('#txtHostname').val(Entry.Hostname);
        $('#txtPort').val(Entry.Port.toString());
        $('#cboConnectionType').val(Entry.ConnectionType);
        $('#cboEmulation').val(Entry.Emulation);
        $('#chkProxy').prop('checked', Entry.Proxy);
    }

    // Show modal
    $('#AddEdit').modal();
}

function LoadMyServers() {
    var MyServers = GetMyServers();
    
    $('#tblMyServers tbody tr').remove();
    if (MyServers.length > 0) {
        for (var i = 0; i < MyServers.length; i++) {
            var Proxy = '';
            if (MyServers[i].Proxy) {
                var HostPorts = GetSettings().ProxyServer.split(':');
                Proxy += '&Proxy=' + HostPorts[0];
                Proxy += '&ProxyPort=' + HostPorts[1];
                Proxy += '&ProxyPortSecure=' + HostPorts[2];
            }
            var Url = 'http://embed.ftelnet.ca/?Hostname=' + MyServers[i].Hostname + '&Port=' + MyServers[i].Port.toString() + Proxy + '&AutoConnect=true&ConnectionType=' + MyServers[i].ConnectionType + '&Emulation=' + MyServers[i].Emulation + '&TopButtons=true&VirtualKeyboard=on';

            var NewRow = '<tr>';
            NewRow += ' <td>';
            NewRow += '  <a href="' + Url + '" target="_blank">' + MyServers[i].Description + '</a>';
            NewRow += '  <a href="#" data-index="' + i + '" class="Delete btn btn-xs btn-danger pull-right"><span class="glyphicon glyphicon-remove"></span> Delete</a>';
            NewRow += '  <a href="#" data-index="' + i + '" class="Edit btn btn-xs btn-primary pull-right"><span class="glyphicon glyphicon-pencil"></span> Edit</a>';
            NewRow += ' </td>';
            NewRow += '</tr>';
            $('#tblMyServers tbody').append(NewRow);
        }
    } else {
        var NewRow = '<tr><td align="center">You have no address book entries.  Why not add one?</td></tr>';
        $('#tblMyServers tbody').append(NewRow);
    }    
}