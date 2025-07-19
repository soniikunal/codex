"use client";
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
export default function ScheduleSelector({
  membershipDetail,
  schedule,
  onToggle,
  errors,
}: {
  membershipDetail: MembershipDetail;
  schedule: any[];
  onToggle: (index: number) => void;
  errors: { schedule?: string };
}) {
  const maxSelectable = parseInt(membershipDetail.numberOfDaysInWeek || "0");
  const selectedCount = schedule.filter((item) => item.selected).length;

  return (
    <div className="order-item mb65 course-page-section">
      <div className="section-title-2 headline text-left">
        <h2>
          Schedule <span className="required">*</span>
        </h2>
        {errors.schedule ? (
          <small className="text-danger text-sm">{errors.schedule}</small>
        ) : (
          <p className="text-sm text-gray-500">
            Please select exactly {maxSelectable} schedule
            {maxSelectable > 1 ? "s" : ""}.
          </p>
        )}
      </div>

      <div className="course-list-view table-responsive">
        <table className="table">
          <thead>
            <tr className="list-head">
              <th></th>
              <th>Week days</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => {
              const isChecked = item.selected;
              const isDisabled = !isChecked && selectedCount >= maxSelectable;

              return (
                <tr key={index}>
                  <td>
                    <label className="main">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={item.disabled || isDisabled}
                        onChange={() => onToggle(index)}
                        className="myinput large"
                      />
                      <span className="checkbox-container"></span>
                    </label>
                  </td>
                  <td>
                    <div className="course-list-img-text">
                      <div className="course-list-text">
                        <h3>{item.weekDay}</h3>
                      </div>
                    </div>
                  </td>
                  <td className="dlt-price relative-position text-left">
                    {item.time.map((time: any, tIdx: number) => (
                      <p key={tIdx}>
                        {time.from} - {time.to}
                      </p>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
