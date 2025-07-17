"use client";

import { useRef, useState } from "react";
import axios from "@/lib/axios";
// import ReCAPTCHA from "react-google-recaptcha";

interface FormData {
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [processing, setProcessing] = useState(false);

  const siteKey = "6LfEb3UbAAAAALDm4xKAJH55nA0fx7QxKqFFM2hW";
  // const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.message.trim() &&
      formData.course.trim()
    );
  };

  const submitForm = async () => {
    setError(false);
    setCaptchaError(false);
    setSuccess(false);

    // const recaptchaToken = await recaptchaRef.current?.getValue();

    // if (!recaptchaToken) {
    //   setCaptchaError(true);
    //   return;
    // }

    if (!validateFields()) {
      setError(true);
      return;
    }

    setProcessing(true);

    try {
      await axios.post("/contact", formData);

      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", course: "", message: "" });
      // recaptchaRef.current?.reset();
    } catch (err) {
      console.error("Submission error", err);
      setError(true);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="register-content">
      <div className="register-fomr-title text-center">
        <h3 className="bold-font" style={{ color: "#000" }}>
          <span>Start Your</span> Success <span>Journey </span>
        </h3>
      </div>
      <div className="register-form-area">
        <form className="contact_form" onSubmit={(e) => e.preventDefault()}>
          <div className="contact-info mb-3">
            <input
              name="name"
              type="text"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="contact-info mb-3">
            <input
              name="phone"
              type="phone"
              placeholder="Your Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="contact-info mb-3">
            <input
              name="email"
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="contact-info mb-3">
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select Course *</option>
              <option value="Coding">Coding</option>
              <option value="Science">Science</option>
              <option value="Competitive Math">Competitive Math</option>
            </select>
          </div>
          <div className="contact-info mb-3">
            <textarea
              name="message"
              placeholder="Message *"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="nws-button text-uppercase text-center white text-capitalize mt-2">
            {/* <ReCAPTCHA sitekey={siteKey} ref={recaptchaRef} /> */}

            <button
              type="button"
              className="mt-2"
              onClick={submitForm}
              disabled={processing}
            >
              {processing ? (
                <>
                  Please wait..{" "}
                  <i className="fas fa-spinner fa-spin spinner"></i>
                </>
              ) : (
                "Let’s Connect"
              )}
            </button>
          </div>
        </form>

        {success && (
          <div className="terms-text mt25">
            <div className="mt-3 alert alert-success">
              <strong>Great!</strong>
              <div>Your message has been sent.</div>
            </div>
          </div>
        )}
        {error && (
          <div className="terms-text mt25">
            <div className="mt-3 alert alert-danger">
              <strong>Error!</strong>
              <div>Make sure to complete all the required fields.</div>
            </div>
          </div>
        )}
        {captchaError && (
          <div className="terms-text">
            <div className="alert alert-danger">
              <strong>Error!</strong>
              <div>Please complete the CAPTCHA.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
