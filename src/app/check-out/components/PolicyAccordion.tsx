"use client";

export default function PolicyAccordion({
  policies,
  toggleDetail,
  errors,
  RequiredPolicies,
}: {
  policies: any[];
  toggleDetail: (index: number) => void;
  errors: { requiredPolicies?: string };
  RequiredPolicies: {
    value: boolean;
    setValue: (val: boolean) => void;
  };
}) {
  return (
    <div className="order-item mb65 course-page-section">
      <div className="section-title-2 headline text-left float-left">
        <h2>
          Required <span>Policies</span>
        </h2>
      </div>

      <div className="section-title-2 headline text-left float-right">
        <h2>
          Accept all <span>Policies</span> <span className="required">*</span>
          <input
            type="checkbox"
            name="course-policy"
            className="myinput large ml-3"
            style={{ transform: "scale(2.2)" }}
            checked={!!RequiredPolicies.value}
            onChange={(e) => RequiredPolicies.setValue(e.target.checked)}
          />
        </h2>
        {errors?.requiredPolicies && (
          <small className="text-danger text-sm">{errors.requiredPolicies}</small>
        )}
      </div>

      <div className="course-list-view table-responsive">
        <table className="table">
          <thead>
            <tr className="list-head">
              <th></th>
              <th>Policy</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr key={index} onClick={() => toggleDetail(index)}>
                <td style={{ width: "10%" }}>
                  <i
                    className={`fas ${
                      policy.displayDetails ? "fa-minus" : "fa-plus"
                    }`}
                    style={{ fontSize: "x-large", cursor: "pointer" }}
                  />
                </td>
                <td style={{ width: "25%" }}>
                  <div className="course-list-img-text">
                    <div className="course-list-text">
                      <h3>{policy.name}</h3>
                    </div>
                  </div>
                </td>
                <td className="dlt-price relative-position text-left text-sm">
                  {policy.displayDetails && (
                    <p dangerouslySetInnerHTML={{ __html: policy.detail }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
