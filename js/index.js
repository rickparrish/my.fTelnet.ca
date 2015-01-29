var AddressBook = [];
var EditIndex = -1;

$(document).ready(function () {
    LoadAddressBook();
    UpdateAddressBookTable();
});

function AddEntry() {
    EditIndex = -1;

    $('#txtDescription').val('');
    $('#txtHostname').val('');
    $('#txtPort').val('');
    $('#cboConnectionType').val('telnet');
    $('#cboEmulation').val('ansi-bbs');
    $('#chkProxy').prop('checked', true);
    
    $('#AddEdit').modal();
}

function ConnectToMyAddressBookEntry(index) {
    var Entry = AddressBook[index];
    
    var Proxy = '';
    if (Entry.Proxy) {
        if (localStorage['ProxyServer']) {
            var HostPorts = localStorage['ProxyServer'].split(':');
            Proxy += '&Proxy=proxy-' + HostPorts[0] + '.ftelnet.ca';
            Proxy += '&ProxyPort=' + HostPorts[1];
            Proxy += '&ProxyPortSecure=' + HostPorts[2];
        } else {
            Proxy = '&Proxy=proxy-us-ga.ftelnet.ca&ProxyPort=1123&ProxyPortSecure=11235';
        }
    }
    
    window.open('http://embed.ftelnet.ca/?Hostname=' + Entry.Hostname + '&Port=' + Entry.Port.toString() + Proxy + '&AutoConnect=true&ConnectionType=' + Entry.ConnectionType + '&Emulation=' + Entry.Emulation + '&TopButtons=true&VirtualKeyboard=on');
}

function ConnectToGlobalAddressBookEntry(name) {
    switch (name) {
        case 'fTelnet':
            window.open('http://embed.ftelnet.ca/?Hostname=bbs.ftelnet.ca&Port=1123&AutoConnect=true&ConnectionType=telnet&Emulation=ansi-bbs&TopButtons=true&VirtualKeyboard=on');
            break;
        case 'LV-426':
            window.open('http://embed.ftelnet.ca/?Hostname=lv426bbs.homenet.org&Port=23&Proxy=proxy-us-ga.ftelnet.ca&ProxyPort=1123&ProxyPortSecure=11235&AutoConnect=true&ConnectionType=telnet&Emulation=c64&TopButtons=true&VirtualKeyboard=on');
            break;
        case 'Starwars':
            window.open('http://embed.ftelnet.ca/?Hostname=towel.blinkenlights.nl&Port=23&Proxy=proxy-us-ga.ftelnet.ca&ProxyPort=1123&ProxyPortSecure=11235&AutoConnect=true&ConnectionType=telnet&Emulation=ansi-bbs&TopButtons=false&VirtualKeyboard=off');
            break;
        case 'Vertrauen':
            window.open('http://embed.ftelnet.ca/?Hostname=vert.synchro.net&Port=23&Proxy=proxy-us-ga.ftelnet.ca&ProxyPort=1123&ProxyPortSecure=11235&AutoConnect=true&ConnectionType=telnet&Emulation=ansi-bbs&TopButtons=true&VirtualKeyboard=on');
            break;
    }
}

function DeleteEntry(index) {
    var Entry = AddressBook[index];
    if (confirm('Really delete ' + Entry.Description + '?')) { // TODO Use a model with yes/no instead of confirm()?
        AddressBook.splice(index, 1);
        localStorage['AddressBook'] = JSON.stringify(AddressBook);
        UpdateAddressBookTable();
    }
}

function EditEntry(index) {
    EditIndex = index;
    
    var Entry = AddressBook[index];

    $('#txtDescription').val(Entry.Description);
    $('#txtHostname').val(Entry.Hostname);
    $('#txtPort').val(Entry.Port.toString());
    $('#cboConnectionType').val(Entry.ConnectionType);
    $('#cboEmulation').val(Entry.Emulation);
    $('#chkProxy').prop('checked', Entry.Proxy);

    $('#AddEdit').modal();
}

function ExportEntries() {
    // TODO Combine settings and address book into a json string and save to file
}

function ImportEntries() {
    // TODO Read settings and address book from a json file
}

function LoadAddressBook() {
    if (localStorage['AddressBook']) {
        AddressBook = JSON.parse(localStorage['AddressBook']);
    } else {
        AddressBook.push({
            'ConnectionType': 'telnet',
            'Description': 'fTelnet / GameSrv Demo Server',
            'Emulation': 'ansi-bbs',
            'Hostname': 'bbs.ftelnet.ca',
            'Port': 1123,
            'Proxy': false
        });
        localStorage['AddressBook'] = JSON.stringify(AddressBook);
        UpdateAddressBookTable();
    }
}

function SaveEntry() {
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
    if (EditIndex === -1) {
        AddressBook.push(Entry);
    } else {
        AddressBook[EditIndex] = Entry;
    }

    // TODO Sort the address book
    localStorage['AddressBook'] = JSON.stringify(AddressBook);
    UpdateAddressBookTable();
    
    $('#AddEdit').modal('hide');
}

function UpdateAddressBookTable() {
    $('#tblMyAddressBook tbody tr').remove();
    if (AddressBook.length > 0) {
        for (var i = 0; i < AddressBook.length; i++) {
            var NewRow = '<tr>';
            NewRow += '  <td>';
            NewRow += '    <a href="#" onclick="ConnectToMyAddressBookEntry(' + i + ');">' + AddressBook[i].Description + '</a>';
            NewRow += '    <a href="#" onclick="DeleteEntry(' + i + ');" class="btn btn-xs btn-danger pull-right"><span class="glyphicon glyphicon-remove"></span> Delete</a>';
            NewRow += '    <a href="#" onclick="EditEntry(' + i + ');" class="btn btn-xs btn-primary pull-right"><span class="glyphicon glyphicon-pencil"></span> Edit</a>';
            NewRow += '  </td>';
            NewRow += '</tr>';
            $('#tblMyAddressBook tbody').append(NewRow);
        }
    } else {
        var NewRow = '<tr><td align="center">You have no address book entries</td></tr>';
        $('#tblMyAddressBook tbody').append(NewRow);
    }
}
