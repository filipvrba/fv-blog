import 'mailjet', 'node-mailjet'

MJ = mailjet.api_connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

export default async def handler(req, res)
  unless req.method == 'POST'
    return res.status(405).json({ error: 'Pouze POST požadavky jsou povoleny.' })
  end

  emails      = req.body.emails
  template_id = req.body.template_id

  if !emails || !Array.isArray(emails) || emails.length == 0
    return res.status(400).json({ error: 'Chybí seznam e-mailů.' })
  end

  begin
    messages = emails.map() do |email|
      from_email = process.env.FROM_EMAIL || nil

      unless from_email
        return res.status(400).json({ error: 'Chybí hlavní e-mail.' })
      end

      have_variables = email.variables && Object.keys(email.variables).length > 0

      {
        From: { Email: from_email },
        To: [{ Email: email.to }],
        TemplateID: template_id,
        TemplateLanguage: have_variables,
        Variables: email.variables,
      }
    end

    request = MJ.post('send', {'version': 'v3.1'})
      .request({ Messages: messages })
    result  = await request

    res.status(200).json({ message: 'E-maily byly odeslány!', result: result.body })
  rescue => error
    res.status(500).json({ error: 'Chyba při odesílání e-mailů',
      details: error.message })
  end
end