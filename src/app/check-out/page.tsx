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

  schedule?: string;
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

        setPolicies(courseData.policies);
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
      // Validate schedule selection
      if (selectedMembership) {
        const maxSelectable = parseInt(
          selectedMembership.numberOfDaysInWeek || "0"
        );
        const selectedCount = scheduleUpdated.filter(
          (item) => item.selected
        ).length;

        if (selectedCount < maxSelectable) {
          setFormErrors((prev) => ({
            ...prev,
            schedule: `Please select exactly ${maxSelectable} schedule${
              maxSelectable > 1 ? "s" : ""
            }.`,
          }));
          return;
        }
      }

      familySchema.parse(familyInfo);
      studentSchema.parse(studentInfo);
    } catch (err) {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

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
            errors={formErrors}
          />
          {selectedMembership?.cost && (
            <ScheduleSelector
              membershipDetail={selectedMembership}
              schedule={scheduleUpdated}
              onToggle={handleScheduleToggle}
              errors={formErrors}
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
              <FamilyForm
                familyInfo={familyInfo}
                onChange={updateFamilyInfo}
                errors={formErrors}
              />
            </div>
            <div className="col-md-6">
              <StudentForm
                studentInfo={studentInfo}
                onChange={updateStudentInfo}
                errors={formErrors}
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
