const CRITERIA = [
  <>
    Obtain the registration form for <strong className="join-criteria__strong">N20,000 (Twenty Thousand Naira only), non-refundable</strong>.
  </>,
  <>
    Must have been <strong className="join-criteria__strong">born, lived, or schooled in Lagos Island</strong>.
  </>,
  <>
    Provide <strong className="join-criteria__strong">attestation / referral from at least one member of EB2M</strong> — the attestation / referral letter accompanies the registration form.
  </>,
  <>
    Must be of <strong className="join-criteria__strong">good financial standing</strong> and educated up to a minimum of <strong className="join-criteria__strong">secondary school level</strong>.
  </>,
  <>
    Must be a <strong className="join-criteria__strong">person of integrity and impeccable character</strong>.
  </>,
  <>
    Must be willing to <strong className="join-criteria__strong">abide by the vision and mission of the EB2M Association</strong>.
  </>,
  <>
    Applications are reviewed for eligibility by the <strong className="join-criteria__strong">EB2M Membership &amp; Welfare Committee</strong>.
  </>,
  <>
    A date will be fixed for <strong className="join-criteria__strong">interview — physical or virtual, as agreed by the Committee</strong> — and communicated to the applicant.
  </>,
  <>
    Upon satisfactory admission by <strong className="join-criteria__strong">¾ of the Membership &amp; Welfare Committee</strong>, pay the <strong className="join-criteria__strong">annual subscription fee of N200,000 (Two Hundred Thousand Naira only)</strong>.
  </>,
  <>
    Upon fulfilling all of the above, the new member is <strong className="join-criteria__strong">presented to all EB2M members at the General Meeting</strong> by the Chairman of the Membership &amp; Welfare Committee, or any other member of the Committee designated to do so in the Chairman&apos;s absence.
  </>,
];

export default function JoinCriteria() {
  return (
    <section className="join-criteria" aria-labelledby="join-criteria-title">
      <div className="join-criteria__inner">
        <div className="join-criteria__intro">
          <span className="join-criteria__eyebrow">Membership</span>
          <h1 id="join-criteria-title" className="join-criteria__title">
            Criteria for Membership
          </h1>
          <p className="join-criteria__copy">
            Membership of Eko Boys To Men is open to men with a verifiable Lagos
            Island connection who meet the standards below. Read each criterion
            carefully before applying.
          </p>
        </div>

        <ol className="join-criteria__list">
          {CRITERIA.map((criterion, index) => (
            <li key={index} className="join-criteria__item">
              <span className="join-criteria__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="join-criteria__text">{criterion}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
