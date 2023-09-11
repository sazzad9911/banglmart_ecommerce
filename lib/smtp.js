import nodemailer from "nodemailer";

const smtp = nodemailer.createTransport({
  host: "smtp.elasticemail.com",
  port: 2525,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "banglamartecommerceltd@gmail.com",
    pass: "5F21C9A67C7B77D19D5D66E1140C2334E8C4",
  },
});

export default smtp