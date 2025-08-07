interface ContactData {
    name: string;
    email: string;
    message: string;
    subject?: string;
}
declare const contactMeTemplate: (data: ContactData) => {
    subject: string;
    text: string;
    html: string;
};
export default contactMeTemplate;
