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
        } catch {
            // Ignore
        }
        
        Response.Redirect("/#/500");
    }
</script>
