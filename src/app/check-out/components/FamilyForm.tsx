"use client";

export default function FamilyForm({
  familyInfo,
  onChange,
  errors,
}: {
  familyInfo: {
    name?: string;
    address?: string;
    zip?: string;
    state?: string;
    email?: string;
    city?: string;
  };
  onChange: (field: string, value: string) => void;
  errors: {
    name?: string;
    address?: string;
    zip?: string;
    state?: string;
    email?: string;
    city?: string;
  };
}) {
  return (
    <div className="order-payment">
      <div className="section-title-2 headline text-left">
        <h2>
          <span>Family</span> Information
        </h2>
      </div>
      <div className="payment-method">
        <div className="payment-info">
          <label htmlFor="family-name">
            Name <span className="required">*</span>
          </label>
          <input
            id="family-name"
            type="text"
            className="form-control"
            value={familyInfo.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
          {errors?.name && (
            <small className="text-danger text-sm">{errors.name}</small>
          )}
        </div>
        <div className="payment-info">
          <label htmlFor="family-email">
            Email <span className="required">*</span>
          </label>
          <input
            id="family-email"
            type="text"
            className="form-control"
            value={familyInfo.email}
            onChange={(e) => onChange("email", e.target.value)}
          />{" "}
          {errors?.email && (
            <small className="text-danger text-sm">{errors.email}</small>
          )}
        </div>
        <div className="payment-info">
          <label htmlFor="family-address">
            Home Address <span className="required">*</span>
          </label>
          <input
            id="family-address"
            type="text"
            className="form-control"
            value={familyInfo.address}
            onChange={(e) => onChange("address", e.target.value)}
          />{" "}
          {errors?.address && (
            <small className="text-danger text-sm">{errors.address}</small>
          )}
        </div>
        <div className="payment-info">
          <label htmlFor="family-city">
            City <span className="required">*</span>
          </label>
          <input
            id="family-city"
            type="text"
            className="form-control"
            value={familyInfo.city}
            onChange={(e) => onChange("city", e.target.value)}
          />{" "}
          {errors?.city && (
            <small className="text-danger text-sm">{errors.city}</small>
          )}
        </div>
        <div className="payment-info">
          <label htmlFor="family-state">
            State <span className="required">*</span>
          </label>
          <input
            id="family-state"
            type="text"
            className="form-control"
            value={familyInfo.state}
            onChange={(e) => onChange("state", e.target.value)}
          />{" "}
          {errors?.state && (
            <small className="text-danger text-sm">{errors.state}</small>
          )}
        </div>
        <div className="payment-info">
          <label htmlFor="family-zip">
            Zip <span className="required">*</span>
          </label>
          <input
            id="family-zip"
            type="text"
            className="form-control"
            value={familyInfo.zip}
            onChange={(e) => onChange("zip", e.target.value)}
          />{" "}
          {errors?.zip && (
            <small className="text-danger text-sm">{errors.zip}</small>
          )}
        </div>
      </div>
    </div>
  );
}
