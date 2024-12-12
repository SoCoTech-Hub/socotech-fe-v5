import React from "react";
import { useRouter } from "next/router";
import { mainUrl } from "@/context/constants";

import { Button } from "@acme/ui/button";
import LogoOverlay from "@acme/ui/LogoOverlay/index";
import { SEO } from "@acme/ui/SeoHead/index";
//TODO: move to info
interface Seo {
  title: string;
  description: string;
}

const Payment: React.FC = () => {
  const router = useRouter();

  const seo: Seo = {
    title: "Topic - Payment Policy",
    description: `The Just Brands Africa (PTY) is committed to deal responsibly with
      your personal information. Just Brands Africa (PTY) provide you with
      this privacy notice in order for you to make an informed decision
      about whether you want to use our website or not and/ or provide
      your personal information. The use of the website is of your own
      volition and the provision of any personal information.`,
  };

  return (
    <>
      <SEO title={seo.title} description={seo.description} />
      <div className="desktop:p-4 laptop:p-4 mobile:p-1 bg-appBg desktop:h-full laptop:h-full mobile:h-full no-scrolly overflow-scroll">
        <LogoOverlay />
        <div className="bg-compBg desktop:mt-28 laptop:mt-20 mobile:mt-8 no-scrolly text-textColor desktop:p-4 laptop:p-4 mobile:p-1 rounded-lg drop-shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-xl font-bold">Payment Policy</div>
            <div>
              <Button
                title="Back"
                color="bg-themeColorMain text-black"
                onClickFunction={() => router.back()}
              />
            </div>
          </div>
          <p>
            Just Brands Africa (PTY) Ltd, Reg. 2013/228381/07, is the service
            provider of the services contemplated by this Payments Policy
            directly, and/or through its subsidiary SOCOTECH (PTY) Ltd, Reg.
            2020/724125/07, or contracted third-party affiliates on:{" "}
            <a href={`${mainUrl}`} target="_blank" rel="noopener noreferrer">
              {mainUrl}
            </a>{" "}
            <br />
          </p>
          <div className="py-3">
            <hr />
          </div>
          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Enrolment</h2>
            <p className="mb-4">
              Monthly supplementary education subscription fees must be paid in
              full for the month of use to reserve a learner’s seat for the said
              month.
            </p>
            <p className="mb-4">
              Topic Education reserves the right to revoke admission to a
              monthly supplementary education subscription without full payment,
              upon which a learner’s enrolment will be cancelled.
            </p>
            <p className="mb-4">
              Monthly supplementary education subscription fees funded by a
              third party on behalf of a learner must be accompanied by
              supporting documentation (e.g., official purchase order, proof of
              payment).
            </p>
            <p className="mb-4">
              Topic Education further reserves the right to withhold access to
              any monthly supplementary education subscription and/or a
              learner’s results and usage reports if full payment has not been
              received.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              Learner and Legal Guardian Responsibilities
            </h2>
            <p className="mb-4">
              Learners and their legal guardians must inform Topic Education of
              any change in personal and/or payment information as supplied on
              their billing information forms.
            </p>
            <p className="mb-4">
              Both learners and legal guardians confirm that they comply with
              and fully understand the admission requirements of a monthly
              supplementary education subscription upon subscribing.
            </p>
            <p className="mb-4">
              Learners and legal guardians confirm their willingness to
              subscribe for a monthly supplementary education subscription and
              accept all responsibilities for payment of relevant monthly
              supplementary education subscription fees unless payment is being
              made on behalf of the learner by a third party as mentioned above.
            </p>
            <p className="mb-4">
              Learners confirm that they understand that it is against Topic
              Education’s policy to commit any form of plagiarism (i.e.,
              publishing or putting the work or ideas of others forward as their
              own).
            </p>
            <p className="mb-4">
              Learners will abide by the general code of conduct for learners of
              Topic Education.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Payments</h2>
            <p className="mb-4">
              You will be able to make use of the following means of payment for
              any of the{" "}
              <a href={`${mainUrl}`} target="_blank" rel="noopener noreferrer">
                {mainUrl}
              </a>{" "}
              services:
            </p>
            <ul className="mb-4 list-inside list-disc">
              <li>Debit card</li>
              <li>Credit card</li>
            </ul>
            <p className="mb-4">
              Topic Education uses Payfast as a third-party payment provider and
              takes extensive steps to ensure that all transactions are secure.
              All transactions made through the website are encrypted. You
              acknowledge that transactions performed over the internet may be
              vulnerable to being intercepted. Topic Education will not be
              liable for any loss that you may suffer because of any
              interception.
            </p>
            <p className="mb-4">
              Where payment is made by credit/debit card,{" "}
              <a href={`${mainUrl}`} target="_blank" rel="noopener noreferrer">
                {mainUrl}
              </a>{" "}
              may require additional information to authorise and/or verify the
              validity of payment. In such cases, we are entitled to withhold
              delivery until the additional information is received by us and
              authorisation is obtained by us for the amounts. If we do not
              receive authorisation, your order for the services will be
              cancelled.
            </p>
            <p className="mb-4">
              You warrant that you are fully authorised to use the credit/debit
              card supplied for purposes of paying for the services. You also
              warrant that your credit/debit card has enough available funds to
              cover all the costs incurred because of the services used on the
              website.
            </p>
            <p className="mb-4">
              Topic Education reserves the right at any time and without giving
              you any advance notice to make changes to the prices of services
              and to correct any pricing errors that may inadvertently occur.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Cancellation</h2>
            <p className="mb-4">
              Topic Education reserves the right to refuse admission to a
              monthly supplementary education subscription, in which case
              learners will be informed accordingly and applicable fees will be
              refunded where required.
            </p>
            <p className="mb-4">
              Cancellations from learners are accepted via cancelling the
              subscription under the billing information tab.
            </p>
            <p className="mb-4">
              Learners who cancel outside the approved cancellation period will
              not be entitled to any refunds unless they are unable to attend
              because of reasons out of their control (e.g., hospitalisation) or
              where, at the sole discretion of Topic Education, it is rendered
              impossible for delegates to attend a course.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Privacy</h2>
            <p className="mb-4">
              Please refer to our Privacy Policy incorporated by reference
              (which means that it forms part of these Terms and Conditions).
            </p>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Disclaimer</h2>
            <p className="mb-4">
              The use of the website is entirely at your own risk and you assume
              full responsibility for any risk or loss resulting from use of the
              website or reliance on any information on the website.
            </p>
            <p className="mb-4">
              Whilst Topic Education takes reasonable measures to ensure that
              the content of the website is accurate and complete, Topic
              Education makes no representations or warranties, whether express
              or implied, as to the quality, timeliness, operation, integrity,
              availability or functionality of the website or as to the
              accuracy, completeness or reliability of any information on the
              website. If any such representations or warranties are made by
              Topic Education’s representatives, Topic Education shall not be
              bound thereby.
            </p>
            <p className="mb-4">
              Topic Education disclaims liability for any damage, loss, or
              expenses, whether direct, indirect, or consequential in nature,
              arising out of or in connection with your access to or use of the
              website and/or any content therein unless otherwise provided by
              law.
            </p>
            <p className="mb-4">
              Although the services sold from the website or Topic Education
              may, under certain specifically defined circumstances, be under
              warranty, the website itself and all information provided on the
              website is provided “as is” without warranty of any kind, either
              express or implied, including, but not limited to, the implied
              warranties of merchantability, fitness for a particular purpose,
              completeness, or non-infringement, as may be allowed in law.
            </p>
            <p className="mb-4">
              In addition to the disclaimers contained elsewhere in these Terms
              and Conditions, Topic Education also makes no warranty or
              representation, whether express or implied, that the information
              or files available on the website are free of viruses, spyware,
              malware, trojans, destructive materials, or any other data or code
              which is able to corrupt, destroy, compromise, disrupt, disable,
              harm, jeopardise, or otherwise impede in any manner the operation,
              stability, security functionality, or content of your computer
              system, computer network, hardware, or software in any way.
            </p>
            <p className="mb-4">
              You accept all risks associated with the existence of such
              viruses, destructive materials, or any other data or code which is
              able to corrupt, compromise, jeopardise, disrupt, disable, harm,
              or otherwise impede in any manner the operation or content of a
              computer system, computer network, any handset or mobile device,
              or your hardware or software, save where such risks arise due to
              the gross negligence or wilful misconduct of Topic Education, its
              employees, agents, or authorised representatives. Topic Education
              thus disclaims all liability for any damage, loss, or liability of
              any nature whatsoever arising out of or in connection with your
              access to or use of the website.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              Linking to Third-Party Websites
            </h2>
            <p className="mb-4">
              This website may contain links or references to other websites
              (“Other Websites”) which are outside of Topic Education’s control.
              These Terms and Conditions do not apply to those Other Websites
              and Topic Education is not responsible for the practices and/or
              privacy policies of those Other Websites or the “cookies” that
              those sites may use.
            </p>
            <p className="mb-4">
              Notwithstanding the fact that the website may refer to or provide
              links to Other Websites, your use of such Other Websites is
              entirely at your own risk and we are not responsible for any loss,
              expense, claim, or damage, whether direct, indirect, or
              consequential, arising from your use of such Other Websites or
              your reliance on any information contained thereon.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              Limitation of Liability
            </h2>
            <p className="mb-4">
              Topic Education cannot be held liable for any inaccurate
              information published on the website and/or any incorrect prices
              displayed on the website, save where such liability arises from
              the gross negligence or wilful misconduct of Topic Education, its
              employees, agents, or authorised representatives.
            </p>
            <p className="mb-4">
              To the extent permissible by law, Topic Education will not be
              liable for any direct, indirect, special, or consequential loss or
              damages howsoever arising out of your use of any of the Topic
              Education services.
            </p>
            <p className="mb-4">
              Topic Education will not be liable for any direct, indirect,
              special, or consequential loss or damages, however arising
              including but not limited to, your use of this website, activity
              on the website, and/or any linked Other Websites.
            </p>
            <p className="mb-4">
              You hereby indemnify Topic Education and hold it harmless against
              any loss or damage you or any third party may suffer because of
              your use of this website, any Other Website, and/or the Topic
              Education services.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              Governing Law and Jurisdiction
            </h2>
            <p className="mb-4">
              These Terms and Conditions and our relationship and/or any dispute
              arising from or in connection with these Terms and Conditions
              shall be governed and interpreted in accordance with the laws of
              the Republic of South Africa.
            </p>
            <p className="mb-4">
              Your continued use of the website will constitute your consent and
              submission to the jurisdiction of the South African courts
              regarding all proceedings, transactions, applications, or the like
              instituted by either party against the other, arising from any of
              these Terms and Conditions.
            </p>
            <p className="mb-4">
              In the event of any dispute arising between you and Topic
              Education, you hereby consent to the non-exclusive jurisdiction of
              the High Court of the Republic of South Africa notwithstanding
              that the quantum in the action or proceedings may otherwise fall
              below the monetary jurisdiction of that court.
            </p>
            <p className="mb-4">
              Nothing in the Terms and Conditions limits your right to approach
              any court, tribunal, or forum of competent jurisdiction in terms
              of the Consumer Protection Act.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">General</h2>
            <p className="mb-4">
              You may not cede, assign, or otherwise transfer your rights and
              obligations in terms of these Terms and Conditions to any third
              party.
            </p>
            <p className="mb-4">
              This policy will form part of Topic Education’s policy framework
              and any terms and conditions regulating the relationship between
              Topic Education and the consumer, the learner.
            </p>
            <p className="mb-4">
              Any failure on the part of you or Topic Education to enforce any
              right in terms hereof shall not constitute a waiver of that right.
            </p>
            <p className="mb-4">
              If any term or condition contained herein is declared invalid, the
              remaining terms and conditions will remain in full force and
              effect.
            </p>
            <p className="mb-4">
              No variation, addition, deletion, or agreed cancellation of the
              Terms and Conditions will be of any force or effect unless in
              writing and accepted by or on behalf of the parties hereto.
            </p>
            <p className="mb-4">
              If you need to obtain a sales record of your transaction to buy
              services through the Topic Education website, you can contact
              Topic Education within 30 days of the transaction.
            </p>
            <p className="mb-4">
              No indulgence, extension of time, relaxation, or latitude which
              any party (the “grantor”) may show grant or allow to the other
              (the “grantee”) shall constitute a waiver by the grantor of any of
              the grantor’s rights and the grantor shall not thereby be
              prejudiced or estopped from exercising any of its rights against
              the grantee which may have arisen in the past or which might arise
              in the future.
            </p>
            <p className="mb-4">
              These Terms and Conditions contain the whole agreement between you
              and Topic Education and no other warranty or undertaking is valid
              unless contained in this document between the parties.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
