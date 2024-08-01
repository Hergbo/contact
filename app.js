import { Resend } from "resend";

document.addEventListener("DOMContentLoaded", function () {
    // const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);
    const contactForm = document.querySelector("#contact-form");

    contactForm.addEventListener("submit", submitEmail);

    async function submitEmail(e) {
        e.preventDefault();

        try {
            validateForm();

            e.target.submit();

            // const formData = new FormData(contactForm);

            // const formDataObject = {};
            // formData.forEach((value, key) => {
            //     formDataObject[key] = value;
            // });

            // const jsonData = JSON.stringify(formDataObject);

            // await sendTelegramMessage(jsonData);
            // await resend.emails.send({
            //     from: "Eben <onboarding@resend.dev>",
            //     to: import.meta.env.VITE_MY_EMAIL_ADDRESS,
            //     subject: "Contact Form",
            //     text: jsonData,
            //     // headers: {
            //     //     "X-Entity-Ref-ID": "123456789",
            //     // },
            //     // tags: [
            //     //     {
            //     //         name: "category",
            //     //         value: "confirm_email",
            //     //     },
            //     // ],
            // });
        } catch (error) {
            console.log(error);
        }

        console.log(e);
    }

    function validateForm() {
        const contactFormData = new FormData(contactForm);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberRegex =
            /^(?:\+234|0)(702|701|70[1-9]|80[0-9]|90[0-9]|91[0-9]|81[0-9])\d{7,8}$/;

        if (String(contactFormData.get("first-name")).trim().length < 3) {
            throw new Error("Invalid First Name");
        }

        if (String(contactFormData.get("last-name")).trim().length < 3) {
            throw new Error("Invalid Last Name");
        }

        if (emailRegex.test(String(contactFormData.get("email")).trim()) == false) {
            throw new Error("Invalid Email Address");
        }

        if (phoneNumberRegex.test(String(contactFormData.get("phone-number"))) == false) {
            throw new Error("Invalid Phone Number");
        }
    }

    async function sendTelegramMessage(x) {
        const options = {
            method: "POST",
            mode: "cors",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                text: String(x),
                disable_web_page_preview: false,
                disable_notification: false,
                reply_to_message_id: null,
                chat_id: import.meta.env.VITE_TG_CHAT_ID,
            }),
        };

        fetch(
            `https://api.telegram.org/bot${import.meta.env.VITE_TG_BOT_TOKEN}/sendMessage`,
            options
        )
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
    }
});

// await resend.emails.send({
//   from: "Acme <onboarding@resend.dev>",
//   to: ["delivered@resend.dev"],
//   subject: "hello world",
//   text: "it works!",
//   attachments: [
//     {
//       filename: "invoice.pdf",
//       content: invoiceBuffer,
//     },
//   ],
//   headers: {
//     "X-Entity-Ref-ID": "123456789",
//   },
//   tags: [
//     {
//       name: "category",
//       value: "confirm_email",
//     },
//   ],
// });
