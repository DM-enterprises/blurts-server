/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import CreditCardIllustration from "../images/high-risk-data-breach-credit-card.svg";
import BankAccountIllustration from "../images/high-risk-data-breach-bank-account.svg";
import pinIllustration from "../images/high-risk-data-breach-pin.svg";
import SocialSecurityNumberIllustration from "../images/high-risk-data-breach-ssn.svg";
import NoBreachesIllustration from "../images/high-risk-breaches-none.svg";
import { useL10n } from "../../../../../../../hooks/l10n";

type HighRiskBreachContentProps = {
  typeOfBreach: string;
  locale: string;
};

export const HighRiskBreachContent = (props: HighRiskBreachContentProps) => {
  const l10n = useL10n();
  let title, description, recommendations, illustration;
  // TODO: Expose email list & count here https://mozilla-hub.atlassian.net/browse/MNTOR-2112
  const emailsMonitored = ["email1@gmail.com", "email2@gmail.com"]; // mocked
  const emailsFormatter = new Intl.ListFormat(props.locale, {
    style: "long",
    type: "conjunction",
  });

  const CreditCardRecommendationSteps = (
    <ol>
      <li>{l10n.getString("high-risk-breach-credit-card-step-one")}</li>
      <li>{l10n.getString("high-risk-breach-credit-card-step-two")}</li>
      <li>{l10n.getString("high-risk-breach-credit-card-step-three")}</li>
    </ol>
  );

  const BankAccountRecommendationSteps = (
    <ol>
      <li>{l10n.getString("high-risk-breach-bank-account-step-one")}</li>
      <li>{l10n.getString("high-risk-breach-bank-account-step-two")}</li>
      <li>{l10n.getString("high-risk-breach-bank-account-step-three")}</li>
    </ol>
  );

  const stepOneSSNLink =
    "https://consumer.ftc.gov/articles/what-know-about-credit-freezes-fraud-alerts";
  const stepTwoSSNLink = "https://www.annualcreditreport.com/index.action";

  const SocialSecurityNumberRecommendationSteps = (
    <ol>
      {/* TOOD: Add question mark modal explaining the SSN breach resolution - MNTOR-2127 */}
      <li>
        {l10n.getFragment("high-risk-breach-social-security-step-one", {
          elems: {
            link_to_info: (
              <a
                href={stepOneSSNLink}
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
          },
        })}
      </li>
      <li>
        {l10n.getFragment("high-risk-breach-social-security-step-two", {
          elems: {
            link_to_info: (
              <a
                href={stepTwoSSNLink}
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
          },
        })}
      </li>
    </ol>
  );

  const pinRecommendationSteps = (
    <ol>
      <li>{l10n.getString("high-risk-breach-pin-step-one")}</li>
      <li>{l10n.getString("high-risk-breach-pin-step-two")}</li>
      <li>{l10n.getString("high-risk-breach-pin-step-three")}</li>
    </ol>
  );

  switch (props.typeOfBreach) {
    case "creditCard":
      title = l10n.getString("high-risk-breach-credit-card-title");
      description = (
        <p>{l10n.getString("high-risk-breach-credit-card-description")}</p>
      );
      recommendations = {
        title: l10n.getString("high-risk-breach-heading"),
        subtitle: l10n.getString("high-risk-breach-subheading"),
        steps: CreditCardRecommendationSteps,
      };
      illustration = CreditCardIllustration;
      break;
    case "ssnBreaches":
      title = l10n.getString("high-risk-breach-social-security-title");
      description = (
        <p>{l10n.getString("high-risk-breach-social-security-description")}</p>
      );
      recommendations = {
        title: l10n.getString("high-risk-breach-heading"),
        subtitle: l10n.getString("high-risk-breach-subheading"),
        steps: SocialSecurityNumberRecommendationSteps,
      };
      illustration = SocialSecurityNumberIllustration;
      break;
    case "bankAccount":
      title = l10n.getString("high-risk-breach-bank-account-title");
      description = (
        <p>{l10n.getString("high-risk-breach-bank-account-description")}</p>
      );
      recommendations = {
        title: l10n.getString("high-risk-breach-heading"),
        subtitle: l10n.getString("high-risk-breach-subheading"),
        steps: BankAccountRecommendationSteps,
      };
      illustration = BankAccountIllustration;
      break;
    case "pin":
      title = l10n.getString("high-risk-breach-pin-title");
      description = <p>{l10n.getString("high-risk-breach-pin-description")}</p>;
      recommendations = {
        title: l10n.getString("high-risk-breach-heading"),
        subtitle: l10n.getString("high-risk-breach-subheading"),
        steps: pinRecommendationSteps,
      };
      illustration = pinIllustration;
      break;
    default:
      title = l10n.getString("high-risk-breach-none-title");
      description = (
        <>
          <p>
            {l10n.getString("high-risk-breach-none-description", {
              // TODO: Expose email list & count here https://mozilla-hub.atlassian.net/browse/MNTOR-2112
              email_list: emailsFormatter.format(emailsMonitored),
            })}
          </p>
          <p>
            {l10n.getString("high-risk-breach-none-sub-description-part-one")}
          </p>
          <ul>
            <li>
              {l10n.getString("high-risk-breach-none-sub-description-ssn")}
            </li>
            <li>
              {l10n.getString(
                "high-risk-breach-none-sub-description-bank-account"
              )}
            </li>
            <li>
              {l10n.getString(
                "high-risk-breach-none-sub-description-cc-number"
              )}
            </li>
            <li>
              {l10n.getString("high-risk-breach-none-sub-description-pin")}
            </li>
          </ul>
        </>
      );
      illustration = NoBreachesIllustration;
      break;
  }

  return {
    title,
    description,
    recommendations,
    illustration,
  };
};
