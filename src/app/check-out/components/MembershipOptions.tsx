"use client";

export default function MembershipOptions({
  options,
  selectedIndex,
  onSelect,
}: {
  options: any[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="order-item mb65 course-page-section">
      <div className="section-title-2 headline text-left">
        <h2>
          Membership <span>Options</span> <span className="required">*</span>
        </h2>
      </div>
      <div className="course-list-view table-responsive">
        <table className="table">
          <thead>
            <tr className="list-head">
              <th></th>
              <th>Membership Option</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {options.map((item, index) => (
              <tr key={index}>
                <td>
                  <label className="form-control-custom">
                    <input
                      type="radio"
                      name="membership"
                      checked={selectedIndex === index}
                      onChange={() => onSelect(index)}
                    />
                  </label>
                </td>
                <td>
                  <div className="course-list-img-text">
                    <div className="course-list-text">
                      <h3>
                        {item.name}
                        {item.type.toLowerCase() === "workshop" && (
                          <span className="ml-2 membershipType">Workshop</span>
                        )}
                      </h3>
                    </div>
                  </div>
                </td>
                <td className="dlt-price relative-position">
                  {item.unit}
                  {item.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
