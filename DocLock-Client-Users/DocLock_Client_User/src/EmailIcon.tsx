import { FaPaperPlane } from "react-icons/fa"; // אייקון שליחת מייל

const EmailIcon = () => {
  const handleEmailClick = () => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=doclock.secure@gmail.com&su=פנייה למנהל המערכת`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <button className="email-icon" onClick={handleEmailClick}>
      <FaPaperPlane className="email-icon-arrow" />
    </button>
  );
};

export default EmailIcon;
