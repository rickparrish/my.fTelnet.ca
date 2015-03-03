<%@ Language=C# %>

<script runat="server" language="C#">
    protected void Page_Load(object sender, EventArgs e)
    {
        try {
            System.Net.Mail.MailMessage Msg = new System.Net.Mail.MailMessage("500@ftelnet.ca", "500@ftelnet.ca");
            Msg.Subject = "my.ftelnet.ca 500";
            Msg.Body = "500 on " + Request.Url.AbsoluteUri;
            if (Request.UrlReferrer != null) {
                Msg.Body += "\r\nUrlReferrer: " + Request.UrlReferrer.ToString();
            }
            if (!String.IsNullOrEmpty(Request.UserAgent)) {
                Msg.Body += "\r\nUserAgent: " + Request.UserAgent;
            }
            Msg.IsBodyHtml = false;

            System.Net.Mail.SmtpClient Smtp = new System.Net.Mail.SmtpClient("localhost");
            Smtp.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
            Smtp.Timeout = 10000;
            Smtp.Send(Msg);

            Response.StatusCode = 500;
        } catch {
            // Ignore
        }
    }
</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

    <title>My fTelnet</title>

    <link href="/css/bootstrap.Cyborg.min.css" rel="stylesheet"/>
    <link href="/css/site.css" rel="stylesheet"/>
</head>
<body>
    <!-- Fixed navbar -->
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/">My fTelnet</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><a href="/">Address Book</a></li>
                    <li><a href="/settings">Settings</a></li>
                    <li class="active"><a href="/help">Help</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/donate"><strong class="text-warning">Donate</strong></a></li>
                    <li><a href="/embed"><strong class="text-success">Embed</strong></a></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </div>

    <!-- Begin page content -->
    <div class="container">
        <div class="row">
            <div class="col-sm-10 col-md-8 col-lg-6">
                <div class="panel panel-danger">
                    <div class="panel-heading">
                        Error Five Hundred
                    </div>
                    <div class="panel-body">
                        Sorry, whatever you were looking for couldn't be loaded!<br />
                        Please try again in a few minutes, or try a different link from the menu above.
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div id="footer">
        <div class="container">
            <p class="text-muted">Copyright &copy; <a href="https://www.rickparrish.ca" target="_blank">Rick Parrish</a> of <a href="https://www.randm.ca" target="_blank">R&amp;M Software</a></p>
        </div>
    </div>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/js/jquery-1.11.2.min.js"><\/script>')</script>
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <script>$.fn.modal || document.write('<script src="/js/bootstrap.min.js"><\/script>')</script>

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-4602017-8', 'auto');
      ga('send', 'pageview');
    </script>
</body>
</html>
