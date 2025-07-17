"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CourseSummary from "./components/CourseSummary";
import MembershipOptions from "./components/MembershipOptions";
import ScheduleSelector from "./components/ScheduleSelector";
import PolicyAccordion from "./components/PolicyAccordion";
import FamilyForm from "./components/FamilyForm";
import StudentForm from "./components/StudentForm";
import PaymentSection from "./components/PaymentSection";
import OrderSummary from "./components/OrderSummary";
import Breadcrumb from "./components/Breadcrumb";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  familySchema,
  studentSchema,
  enrollmentSchema,
} from "@/lib/validationSchemas";
import { ZodError } from "zod";
const stripePromise = loadStripe(
  "pk_test_51PiTE3DyOlvchsV4d0obJwhA5ltpajCzS65cckJhn5dHUhuCd4Q72rBrP68nLzv52IG3OewQYpiHRMT4fvhp7mlC00iGxKwdJw"
);
type MembershipDetail = {
  _id: string;
  billingPeriodMonth: string;
  cost: string;
  name: string;
  numberOfDaysInWeek: string;
  stripePriceId: string;
  type: string;
  unit: string;
};

interface FormErrors {
  // Family Info Fields
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;

  // Student Info Fields
  firstName?: string;
  lastName?: string;
  dob?: string;

  // General Fields
  selectedMembership?: string;
  requiredPolicies?: string;

  // Optional: Any other dynamic errors you may want to allow
  [key: string]: string | undefined;
}
function EnrollmentForm() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [course, setCourse] = useState<any>(null);
  const [membershipOptions, setMembershipOptions] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedMembership, setSelectedMembership] =
    useState<MembershipDetail>();
  const [scheduleUpdated, setScheduleUpdated] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [requiredPolicies, setRequiredPolicies] = useState(false);
  const [familyInfo, setFamilyInfo] = useState<any>({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [studentInfo, setStudentInfo] = useState<any>({
    firstName: "",
    lastName: "",
    dob: "",
  });
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const pk = urlParams.get("prog") || "";
        const sk = urlParams.get("course") || "";

        const res = await axiosInstance.post("/program/coursedetail", {
          pk,
          programCode: sk,
        });
        const courseData = res.data;
        setCourse(res.data);
        const updatedSchedule: SetStateAction<any[]> = [];
        Object.entries(courseData.schedule).forEach(([day, times]: any) => {
          if (times.length > 0) {
            updatedSchedule.push({
              weekDay: day,
              time: times,
              selected: false,
              disabled: false,
            });
          }
        });
        setScheduleUpdated(updatedSchedule);
        setMembershipOptions(courseData.memberships);

        setPolicies([
          {
            name: "Contract",
            detail: `This registration is a legal contract. The contract will be between you and us. In this contract, "we" (using the first person) or "C0deEX" (using the third person) means the particular legal entity that owns and operates the "C0deEX" location at which you are registering for the coding and robotics sessions..`,
          },
          {
            name: "Payments & Fees",
            detail:
              "1. All summer sessions are paid in full at time of registration. <br>2. Recurring monthly membership is paid 1 month in advance and the first month payment is paid at time of registration. <br>3. By signing this waiver you authorize C0deEX to charge your credit/debit card at the time of registration. We accept Cash, Check, Visa, MasterCard, Amex, Discover. <br>4. Prices are subject to change. Registration is accepted on a space available basis. <br>5. Late fees will be applied to payments not received on the day payment is due. A $10 late fee will be applied if payment not received by the 5th Monday of Session. A $25 late fee will be applied if payment not received by the 7th Monday of Session.",
          },
          {
            name: "Cancellation Policies",
            detail:
              "All cancellations need to be notified by email. If you cancel your enrollment after 5th of a month, you will be charged for that month.",
          },
          {
            name: "Missed Lessons",
            detail:
              "1. For missed sessions you might be offered an alternate class depending on class availability which will be at the discretion of the center manager. <br>2. No Adjustment will be made to membership fee for any missed lesson.",
          },
          {
            name: "Confidentiality",
            detail:
              "1. Parents/Guardians are kindly asked to wait in the lobby and not disrupt any sessions in progress. <br>2. Questions/concerns should be directed to the center director in person or via. email. We will be happy to set up an appointment to discuss any concerns you may have. <br>3. Instructors may provide feedback and can discuss concerns with the center director who will reach out to parents as needed. <br>4. If you would like to set up a meeting to discuss your child's progress, send us an email and will set up an appointment.",
          },
          {
            name: "Student Drop-off Pick-up",
            detail:
              "1. Students of elementary schools age must be walked into the center and picked up inside the center. If, for any age, you do not give consent for your child to leave the center unescorted, you must inform your child to wait in the lobby. Children must not go out through the main door to wait or play in the parking lot until you or your appropriate guardian comes in to pick them up. <br>2. Instructors may ask students to wait in the lobby for pickup. Students will also be allowed to take a bathroom break or get water unattended. If you know that there is a chance your child might leave by the main door, you must stay in the lobby during the time your child is attending the session.",
          },
          {
            name: "Snow Day/Weather-Related Closings",
            detail:
              "If the local school district for your C0deEX center is closed due to snow or other inclement weather conditions that make travel unsafe, C0deEX will also be closed. For Weekends, the decisions to close will be made at least 2 hrs. before the center is due to open. Closings will be posted on our FB page and an email will be sent to all scheduled families. In the event of such closings, we will work with you to arrange a makeup session at your earliest convenience.",
          },
        ]);
      } catch (err) {
        console.error("Error loading program details or memberships:", err);
      }
    };

    fetchData(); // call the async function
  }, []);

  const handleMembershipSelect = (index: number) => {
    debugger;
    setSelectedIndex(index);
    const selected = membershipOptions[index];
    setSelectedMembership(selected);
    setScheduleUpdated((prev) =>
      prev.map((item) => ({ ...item, selected: false, disabled: false }))
    );
  };

  const handleScheduleToggle = (index: number) => {
    const updated = [...scheduleUpdated];
    updated[index].selected = !updated[index].selected;
    setScheduleUpdated(updated);
  };

  const handlePolicyToggle = (index: number) => {
    const updated = [...policies];
    updated[index].displayDetails = !updated[index].displayDetails;
    setPolicies(updated);
  };

  const updateFamilyInfo = (field: string, value: string) => {
    setFamilyInfo({ ...familyInfo, [field]: value });
  };

  const updateStudentInfo = (field: string, value: string) => {
    setStudentInfo({ ...studentInfo, [field]: value });
  };

  const calculateProRatedAmount = () => {
    if (
      !selectedMembership?.cost ||
      selectedMembership?.type?.toLowerCase() === "workshop"
    )
      return Number(selectedMembership?.cost || 0);
    const daily =
      Number(selectedMembership.cost) /
      (Number(selectedMembership.billingPeriodMonth) * 30);
    const today = new Date();
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysLeft = Math.ceil(
      (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.ceil(daily * daysLeft);
  };

  const handleSubmit = async () => {
    debugger;
    try {
      setFormErrors({});
      enrollmentSchema.parse({ selectedMembership, requiredPolicies });
      familySchema.parse(familyInfo);
      studentSchema.parse(studentInfo);
    } catch (err) {
      debugger;
      if (err instanceof ZodError) {
        const errorMap: Record<string, string> = {};
        err.issues.forEach((issue) => {
          const key = issue.path.join("."); // e.g., "email"
          errorMap[key] = issue.message;
        });
        setFormErrors(errorMap);
        return;
      }
    }
    if (!stripe || !elements || !requiredPolicies || !selectedMembership)
      return;

    const cardElement = elements.getElement("card");
    if (!cardElement) return;

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      setPaymentError(error.message || "Stripe error");
      return;
    }

    const formData = {
      courseName: course?.courseName,
      membership: {
        membershipId: selectedMembership._id,
        ...selectedMembership,
      },
      schedule: scheduleUpdated.filter((i) => i.selected),
      paymentInfo: token,
      familyInfo,
      studentInfo,
      signupFee: 25,
      proRatedAmount: calculateProRatedAmount(),
    };

    try {
      await axiosInstance.post("/enrollment", formData);
      alert("Enrollment Successful");
      setTimeout(() => {
        router.push("/");
      }, 100);
    } catch (err) {
      alert("Submission failed");
    }
  };

  return (
    <>
      <Breadcrumb />
      <section id="checkout" className="checkout-section">
        <div className="container">
          <CourseSummary course={course} />
          <MembershipOptions
            options={membershipOptions}
            selectedIndex={selectedIndex}
            onSelect={handleMembershipSelect}
          />
          {selectedMembership?.cost && (
            <ScheduleSelector
              membershipDetail={selectedMembership}
              schedule={scheduleUpdated}
              onToggle={handleScheduleToggle}
            />
          )}
          <PolicyAccordion
            policies={policies}
            toggleDetail={handlePolicyToggle}
            errors={formErrors}
            RequiredPolicies={{
              value: requiredPolicies,
              setValue: setRequiredPolicies,
            }}
          />

          <div className="row">
            <div className="col-md-6">
              <FamilyForm familyInfo={familyInfo} onChange={updateFamilyInfo} />
            </div>
            <div className="col-md-6">
              <StudentForm
                studentInfo={studentInfo}
                onChange={updateStudentInfo}
              />
            </div>
          </div>

          <PaymentSection error={paymentError} />
          {selectedMembership?.cost && (
            <OrderSummary
              selectedMembership={selectedMembership}
              signupFee={25}
              proRatedAmount={calculateProRatedAmount()}
            />
          )}

          <div
            className="genius-btn gradient-bg text-center text-uppercase bold-font"
            style={{ cursor: "pointer", color: "white" }}
          >
            <a onClick={handleSubmit}>Submit</a>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Page() {
  return (
    <Elements stripe={stripePromise}>
      <EnrollmentForm />
    </Elements>
  );
}
