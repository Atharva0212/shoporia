import Mailjet from "node-mailjet";

export class EmailService {
    private static instance: EmailService;
    private mailjet;

    private readonly defaultSender = {
        email: "atharvagajakos92@gmail.com",
        name: "Atharva",
    };

    constructor() {
        this.mailjet = new Mailjet({
            apiKey: process.env.MAILJET_API_KEY,
            apiSecret: process.env.MAILJET_API_SECRET,
        });

    }

    public static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    public async sendEmail(to: string, subject: string, html: string): Promise<{ success: true } | { success: false, error: "Failed to send email." }> {
        try {
            await this.mailjet
                .post('send', { version: 'v3.1' })
                .request({
                    Messages: [
                        {
                            From: {
                                Email: this.defaultSender.email,
                                Name: this.defaultSender.name,
                            },
                            To: [
                                {
                                    Email: to,
                                }
                            ],
                            Subject: subject,
                            HTMLPart: html,
                        }
                    ]
                });

            return { success: true };
        } catch (err) {
            console.error("Mailjet error:", err);
            return { success: false, error: "Failed to send email." };
        }
    }
}
