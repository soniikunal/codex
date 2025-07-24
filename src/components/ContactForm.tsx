"use client";

import { useRef, useState } from "react";
import axios from "@/lib/axios";
// import ReCAPTCHA from "react-google-recaptcha";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(10, "Phone must be 10 digits")
    .regex(/^\d+$/, "Phone must contain only digits"),
  email: z.string().email("Invalid email"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().min(1, "Message is required"),
});

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
  const [error, setError] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

  const submitForm = async () => {
    setError("");
    setCaptchaError(false);
    setSuccess(false);
    setFormErrors({});

    // if (!validateFields()) {
    //   setError("Make sure to complete all the required fields.");
    //   return;
    // }

    // const recaptchaToken = await recaptchaRef.current?.getValue();

    // if (!recaptchaToken) {
    //   setCaptchaError(true);
    //   return;
    // }
    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      const errorMap: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errorMap[field] = issue.message;
      });
      setFormErrors(errorMap);
      return;
    }

    setProcessing(true);

    try {
      await axios.post("/contact", formData);
      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", course: "", message: "" });
    } catch (err) {
      setError((err as Error).message);
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
          <div className="mb-3">
            <div className="contact-info">
              <input
                name="name"
                type="text"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            {formErrors.name && (
              <div className="text-danger">{formErrors.name}</div>
            )}
          </div>
          <div className="mb-3">
            <div className="contact-info">
              <input
                name="phone"
                type="text"
                inputMode="numeric"
                maxLength={10}
                placeholder="Your Number"
                value={formData.phone}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  setFormData((prev) => ({ ...prev, phone: onlyDigits }));
                }}
              />
            </div>
            {formErrors.phone && (
              <div className="text-danger">{formErrors.phone}</div>
            )}
          </div>
          <div className="mb-3">
            <div className="contact-info">
              <input
                name="email"
                type="email"
                required
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {formErrors.email && (
              <div className="text-danger">{formErrors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <div className="contact-info">
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
            {formErrors.course && (
              <div className="text-danger">{formErrors.course}</div>
            )}
          </div>
          <div className="mb-3">
            <div className="contact-info">
              <textarea
                name="message"
                placeholder="Message *"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            {formErrors.message && (
              <div className="text-danger">{formErrors.message}</div>
            )}
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
                  Please wait..
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
              <div>{error}</div>
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
