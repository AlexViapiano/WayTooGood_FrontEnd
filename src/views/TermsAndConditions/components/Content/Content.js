import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useMediaQuery, colors, Typography, GridList, GridListTile } from '@material-ui/core'
import { useTranslation } from 'next-i18next'

const useStyles = makeStyles(theme => ({
  root: {},
  section: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  image: {
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
  },
  displayLineBreak: {
    whiteSpace: 'pre-line',
  },
}))

const Content = props => {
  const { className, ...rest } = props
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className={classes.section}>
        <Typography component="p" variant="h5" color="textPrimary" align="left">
          Waytoogood and its subsidiaries and affiliates (“Waytoogood” “we,” or “us”), require that
          all visitors to this Web site as well as any other publicly available version of this site
          or co- branded sites operated by Waytoogood (the “Site”) adhere to the following terms and
          conditions of use (these “Terms”) and to comply with all applicable laws and regulations.
          If you do not agree to these Terms, you are not authorized to use the Site. BY ACCESSING
          AND USING THE SITE, YOU AGREE TO BE BOUND BY THESE TERMS.
          <br></br>
          <br></br>
          1. CHANGES TO THESE TERMS AND THE SITE
          <br></br>
          <br></br>
          We may change these Terms at any time, and all such changes are effective immediately upon
          notice, which we may give by any means, including, but not limited to, by posting a
          revised version of these Terms or other notice on the Site. In certain instances, the Site
          may need to send notifications of changes to the email address you’ve provided. You should
          view these Terms often to stay informed of changes that may affect you. Your use of the
          Site constitutes your continuing agreement to be bound by these Terms, as they are amended
          from time to time. We expressly reserve the right to make any changes that we deem
          appropriate from time to time to the Site or to any information, text, data, databases,
          graphics, images, sound recordings, video materials, audio clips, logos, software,
          features, services, and other materials within the Site (all such materials, and any
          compilation, collection, or arrangement thereof, the “Content”).
          <br></br>
          <br></br> LICENSE TO ACCESS AND USE
          <br></br>
          <br></br>o As a condition of using this Site, you represent and agree that you are at
          least 18 years of age and have the authority to make a binding legal obligation. 
          <br></br>
          <br></br>o You may access and use this Site only for your personal use.  Any other access
          to or use of the Site or the Content constitutes a violation of these Terms and may
          violate applicable copyright, trademark, or other laws. We make no representation that the
          Site or Content is appropriate or available for use in locations other than the United
          States. If you choose to access this Site from locations other than in the United States,
          you do so at your own initiative, at your own risk, and are responsible for complying with
          applicable local laws.  
          <br></br>
          <br></br>o WAYTOOGOODIS NOT A MEDICAL ORGANIZATION. THE CONTENT MADE AVAILABLE ON THE SITE
          INCLUDES HEALTH- OR NUTRITION-RELATED INFORMATION THAT IS FOR INFORMATIONAL AND
          EDUCATIONAL PURPOSES ONLY. SUCH CONTENT DOES NOT COVER ALL DISEASES, AILMENTS, PHYSICAL
          CONDITIONS OR THEIR TREATMENT, AND IS NOT INTENDED TO BE A SUBSTITUTE FOR PROFESSIONAL
          MEDICAL ADVICE, DIAGNOSIS OR TREATMENT. ALWAYS SEEK THE ADVICE OF YOUR PHYSICIAN OR OTHER
          QUALIFIED HEALTH PROVIDER WITH ANY QUESTIONS YOU MAY HAVE REGARDING A MEDICAL CONDITION.
          WAYTOOGOODDOES NOT RECOMMEND SELF-MANAGEMENT OF ONE’S HEALTH CARE. RELIANCE ON ANY OF THE
          CONTENT MADE AVAILABLE ON THE SITE IS SOLELY AT YOUR OWN RISK. SHOULD YOU HAVE ANY HEALTH
          CARE–RELATED QUESTIONS, PLEASE CALL OR SEE YOUR PHYSICIAN OR OTHER HEALTH CARE PROVIDER
          PROMPTLY. YOU SHOULD NEVER DISREGARD MEDICAL ADVICE OR DELAY SEEKING IT BECAUSE OF
          SOMETHING YOU HAVE READ ON THE SITE. IF YOU THINK YOU MAY HAVE A MEDICAL EMERGENCY, CALL
          YOUR DOCTOR OR 911 IMMEDIATELY.
          <br></br>
          <br></br>o You may not access, use, or copy any portion of the Site or of the Content
          through the use of bots, spiders, scrapers, web crawlers, indexing agents, or other
          automated devices or mechanisms.  The only exceptions to this policy are if you are a
          recognizable and reputable search engine for the purpose of indexing and ranking our site
          for ranking information for inclusion in search results and for paid and unpaid marketing
          efforts, or if you have expressed permission in writing from Way Too Good. You agree not
          to remove or modify any copyright notice or trademark legend, author attribution, or other
          notice placed on or contained within any of the Content. Except as expressly authorized by
          us in writing, in no event will you reproduce, redistribute, duplicate, copy, sell,
          resell, or exploit for any commercial purpose any portion of the Site or the Content or
          any access to or use of the Site or the Content.
          <br></br>
          <br></br>o  You represent and agree that all information that you provide to us in
          connection with your access to and use of the Site is true, accurate, and complete to the
          best of your knowledge and belief.
          <br></br>
          <br></br> PRIVACY POLICY Information that you provide to us or that we collect about you
          through your access to and use of the Site is subject to our Privacy Policy, the terms of
          which are hereby incorporated by reference into these Terms. We encourage you to read and
          become familiar with our Privacy Policy.
          <br></br>
          <br></br> INTELLECTUAL PROPERTY
          <br></br>
          <br></br>
          You understand and agree that we own, or (where applicable) we have licensed from third
          parties, all right, title, and interest in and to the Site and all of the Content. You
          acknowledge and agree that the Content constitutes valuable proprietary information that
          is protected by applicable intellectual property and other proprietary rights, laws, and
          treaties of the United States and other countries, and that you acquire no ownership
          interest by accessing or using the Site or the Content. Such intellectual property and
          proprietary rights may include, but are not limited to, copyrights, trademarks and service
          marks, trade dress, and trade secrets, and all such rights are the property of WayTooGood
          or its licensors and content providers.
          <br></br>
          <br></br>
          4.1 Software: Please note that all software programming, including without limitation all
          HTML and other code contained in this Site (collectively, “Software”), is owned by Way Too
          Good, and/or its Licensors and is protected by copyright laws and other intellectual
          property laws, as well as international treaty provisions. Unauthorized access to,
          reproduction, redistribution, publication, display or other use of the Software is
          expressly prohibited by law and may result in severe civil and/or criminal penalties.
          Violators will be prosecuted to the maximum extent possible.<br></br>
          <br></br> COPYRIGHT POLICY
          <br></br>
          <br></br>
          If you believe in good faith that any Content has been used in a way that constitutes
          copyright infringement, you may forward the following to us at WayTooGood at
          support@waytoogood.com  (i) your contact information, including your name, address,
          telephone number, and email address; (ii) identification and description of each
          copyrighted work that you claim has been infringed; (iii) the exact URL or location of the
          material that you claim is infringing; (iv) a statement by you that you have a good faith
          belief that the disputed use is not authorized by the copyright owner, its agent, or the
          law; (v) an electronic or physical signature of the person authorized to act on behalf of
          the owner of the copyright interest; and (vi) a statement by you, made under penalty of
          perjury, that the information in your notice is accurate and that you are the copyright
          owner or are authorized to act on behalf of the copyright owners.
          <br></br>
          <br></br> TERMINATION OF ACCESS
          <br></br>
          <br></br>o WayTooGood reserves the right, in its sole discretion, to terminate your access
          to all or part of the Site, without notice or liability, for any reason, including, but
          not limited to: (a) the unauthorized use of any username or password; or (b) the breach of
          any agreement between you and Way Too Good, including, without limitation, these Terms.
          Following any such termination of access, you will continue to be bound hereunder to the
          fullest extent applicable.
          <br></br>
          <br></br>o Upon being notified that your access is terminated, you must destroy any
          materials you have obtained from the Site. You may not access the Site after your access
          is terminated without our written approval. After terminating your access, WayTooGood will
          retain all rights, including all intellectual property rights, proprietary rights, and
          licenses retained in these Terms, and the limitations upon your use and treatment of
          Content will remain in full force.
          <br></br>
          <br></br> USER CONDUCT<br></br>
          <br></br>
          In connection with your access and use of the Site and that of any person authorized by
          you to access and use the Site, you are responsible for complying with all applicable
          laws, regulations, and policies of all relevant jurisdictions, including all applicable
          local rules regarding online conduct. Not in limitation of the previous sentence, in
          connection with your use of the Site, you may not cause or permit any person to do any of
          the following:  use the Site or Content for any unlawful purpose;
          <br></br>
          <br></br>o use the Site to post or transmit any material that contains any viruses, Trojan
          horses, worms, time bombs, cancelbots, malware, adware, or other computer programming
          routines that may damage, interfere with, surreptitiously intercept, or expropriate any
          system, data, or personal information;
          <br></br>
          <br></br>o impose an unreasonably or disproportionately large load on the Site or
          otherwise interfere with or inhibit any other user of this Site from using or enjoying the
          Site;
          <br></br>
          <br></br>o use the Site to post or transmit any unlawful, fraudulent, libelous,
          defamatory, obscene, pornographic, profane, threatening, abusive, hateful, offensive,
          harassing, or otherwise objectionable information of any kind; o use the Site to post or
          transmit any information which is invasive of another’s privacy or publicity rights or
          that otherwise violates or infringes in any way upon the rights of others; and<br></br>
          <br></br>o use the Site to post or transmit any advertisements, solicitations, chain
          letters, pyramid schemes, investment opportunities or schemes, or other unsolicited
          commercial communication.
          <br></br>
          <br></br> TERMS OF SALE; DESCRIPTION OF SERVICES<br></br>
          <br></br>
          We make various services available on this Site including, but not limited to offering
          multiple products on behalf of certain third party vendors (“Vendor(s)”) through the
          WayTooGood marketplace. The products available on the Site are provided by the
          participating Vendors. WayTooGood facilitates the sales, and in some cases the shipping,
          of the products, but does not directly produce the products made available on the Site.
          The participating Vendor is solely responsible for production of the products made
          available through the WayTooGood marketplace. As such, the applicable Vendor is fully
          responsible for all products it provides to you, and for any and all injuries, illnesses,
          damages, claims, liabilities and costs (“Liabilities”) it may cause you to suffer,
          directly or indirectly, in full or in part, whether related to the products provided
          through the Way Too Good marketplace or not. You knowingly waive and release Way Too Good
          and its subsidiaries, Affiliates, partners, members, managers, officers, directors,
          employees and agents from any Liabilities arising from or related to any act or omission
          of a Vendor in connection with your use of the Site or any of the products provided by its
          participating Vendors.<br></br>
          <br></br>
          The products and subscriptions offered through the Way Too Good marketplace and the Terms
          and Conditions associated with these products and subscriptions may vary slightly due to
          various state and federal regulations. Additionally, specific offers may contain certain
          disclaimers, rules, fine print, or terms of use or sale (collectively the “Additional
          Terms”) that are in addition to these Terms of Use. Said Additional Terms are incorporated
          by reference into these Terms of Use and, in the event of a conflict, the Additional Terms
          shall control. PLEASE READ ALL DISCLAIMERS, RULES, OR TERMS OF USE OR SALE CAREFULLY
          BEFORE PURCHASING ANY PRODUCT ON THE SITE. By purchasing, viewing, accepting, using or
          attempting to use any of the products and subscriptions offered through the WayTooGood
          marketplace you agree to these Terms of Use and any and all Additional Terms.<br></br>
          <br></br> SUBMISSIONS<br></br>
          <br></br>o By disclosing or offering any information to us, including reviews, comments,
          computer files, documents, graphics, suggestions, ideas, or other information (each, a
          “Submission”), either through your use of the Site or otherwise, you authorize WayTooGood
          to make such copies thereof as we deem necessary, including to facilitate the posting and
          storage of the Submission on the Site. By making a Submission, you automatically grant,
          and you represent and warrant that you have the right to grant, to WayTooGood an
          irrevocable, perpetual, non-exclusive, transferable, royalty-free, worldwide license to
          use, copy, publicly perform, publicly display, reformat, translate, excerpt (in whole or
          in part) and distribute such Submission for any purpose, commercial, advertising, or
          otherwise, on or in connection with the Site or the promotion thereof, to prepare
          derivative works of, or incorporate into other works, such Submission, and to grant and
          authorize sublicenses of the foregoing.<br></br>
          <br></br>o By making a Submission, you represent that you have all requisite rights to,
          and are authorized to disclose, all of the information contained in the Submission. You
          are fully responsible for any Submission you make and for the legality, reliability,
          appropriateness, and originality thereof.<br></br>
          <br></br>o WayTooGood and our agents have the right, but not the obligation, at our sole
          discretion to remove any content from any Submission that, in our judgment, does not
          comply with these Terms and any other rules of user conduct for our Site, or is otherwise
          harmful, objectionable, or inaccurate. WayTooGood is not responsible, however, for any
          failure or delay in removing such Submissions. You hereby consent to such removal and
          waive any claim against us arising out of such removal of such Submissions. Furthermore,
          we neither endorse nor assume any liability for the contents of any user Submissions. Any
          opinions, advice, ratings, discussions, comments, and/or other messages or postings of any
          kind made by you or any other user, are those of the respective author(s) or
          distributor(s) and not of Way Too Good.
          <br></br>
          <br></br> SECURITY<br></br>
          <br></br>
          WayTooGood takes such commercially reasonable measures as it deems appropriate to secure
          and protect information transmitted to and from the Site. Nevertheless, we cannot and do
          not guarantee that any such transmissions are or will be totally secure. You are
          responsible for maintaining the confidentiality of any information about you, including
          any username and any password used in connection with your use of the Site.  You agree to
          notify WayTooGood immediately if you discover loss or access to such information by
          another party not under your control and supervision. WayTooGoodwill not be liable for any
          loss or damage arising from the unauthorized use of your username or password.<br></br>
          <br></br>
          1. HYPERLINKS<br></br>
          <br></br>
          1. This Site may include hyperlinks to other websites which are not maintained by
          WayTooGood. We are not responsible for the content of such external websites and we make
          no representations whatsoever concerning the content or accuracy of, opinions expressed
          in, or other links provided by such websites. The inclusion of any hyperlink to external
          websites does not imply endorsement by WayTooGood of those websites or any products or
          services referred to therein. The terms of service and privacy policies applicable to
          external websites may be different from those applicable to our Site. If you decide to
          access any external website through a link within our Site, you do so entirely at your own
          risk, and Way Too Good will have no liability for any loss or damage arising from your
          access or use of any external website. Since WayTooGood is not responsible for the
          availability of these websites, or their contents, you should direct any concerns
          regarding an external website to the administrator of that website. You agree that you
          will bring no suit or claim against us arising from or based upon any such use of external
          websites. Hyperlinks to other websites that are provided on the Site are not intended to
          imply that: (a) we are affiliated or associated with any external website; or (b) any
          linked site is authorized to use any of our trademarks, trade names, logos, or copyrights.
          <br></br>
          <br></br>
          2. Images of the WayTooGood logo can only be used to link to the Site; any other use of
          the WayTooGood logo can only be made with our express written permission. If you operate a
          website and wish to link to the Site via logo or text link you must link to the Site’s
          home page unless permission otherwise has been granted in writing by WayTooGood, Inc. by
          submitting a request to support@waytoogood.com. By linking to the Site, you agree that you
          will not misrepresent your relationship with us or present false or misleading impressions
          about us. No hyperlinks to the Site may be used in a manner that implies or suggests that
          WayTooGood approves or endorses you, your website, or your goods and services. We will
          have no responsibility or liability for any content appearing on your website. No
          hyperlink may appear on any page on your website or within any context containing content
          or materials that may be interpreted as libelous, obscene, or criminal, or which
          infringes, otherwise violates, or advocates the infringement or other violation of, any
          third party rights.<br></br>
          <br></br>
          3. We reserve the right, at any time and in our sole discretion, to request that you
          remove from your website all hyperlinks or any particular hyperlink to the Site. We may at
          any time, in our sole discretion, with or without cause, withdraw the permission granted
          herein to use the WayTooGood logo and your right to link to any pages on the Site. Upon
          our request, you agree to immediately remove all hyperlinks to the Site and to cease using
          the WayTooGood logo for linking purposes. Thereafter, your posting of any future
          hyperlinks to the Site will require our express written permission.
          <br></br>
          <br></br>
          2. USE OF TRADEMARKS Except for the limited permission to use the WayTooGood logo as set
          forth in these Terms, you may not, without our express written permission, use any of
          WayTooGood trademarks or service marks for any other purpose.<br></br>
          <br></br>
          1. DISCLAIMER<br></br>
          <br></br>
          The use of this SITE is at your and its sole risk. ACCORDINGLY, THE SITE AND THE CONTENT
          ARE PROVIDED “AS IS” AND “AS AVAILABLE,” WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS
          OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, AND ALL SUCH WARRANTIES ARE
          EXPRESSLY DISCLAIMED AND EXCLUDED, TO THE FULLEST EXTENT PERMITTED BY LAW. SPECIFICALLY,
          WAYTOOGOOD AND ITS AFFILIATES AND CONTENT-PROVIDERS DO NOT WARRANT THAT: (a) THE USE OF
          THIS SITE OR ANY THIRD PARTY WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE; (b) THE USE OF
          THIS SITE OR ANY SUCH THIRD PARTY WEBSITE WILL ALLOW YOU TO OBTAIN ANY PARTICULAR RESULTS
          WHATSOEVER; (c) THE CONTENT OR ANY INFORMATION, SERVICE OR MERCHANDISE PROVIDED THROUGH
          THIS SITE OR ANY THIRD PARTY WEBSITE ARE OR WILL BE ACCURATE, CURRENT, COMPLETE, RELIABLE,
          OR OF ANY PARTICULAR VALUE OR QUALITY; (d) ANY DEFECTS IN THE SITE OR IN THE CONTENT WILL
          BE CORRECTED; OR (e) THE SITE AND THE CONTENT ARE FREE OF VIRUSES OR OTHER DISABLING
          DEVICES OR HARMFUL COMPONENTS.
          <br></br>
          <br></br>
          THE SITE AND ITS CONTENT ARE PROVIDED FOR GENERAL INFORMATION ONLY AND SHOULD NOT BE
          RELIED UPON OR USED AS THE BASIS FOR MAKING SIGNIFICANT DECISIONS WITHOUT CONSULTING
          PRIMARY OR MORE ACCURATE, MORE COMPLETE OR MORE TIMELY SOURCES OF INFORMATION, INCLUDING,
          BUT NOT LIMITED TO, INFORMATION PROVIDED ON THE PRODUCT MANUFACTURER SITE OR MEDICAL
          ADVICE FROM A QUALIFIED MEDICAL PROFESSIONAL. ANY RELIANCE UPON THE SITE AND ITS CONTENT
          SHALL BE AT YOUR OWN RISK. WAYTOOGOOD DOES NOT WARRANT THAT THE SITE, ITS SERVERS OR
          E-MAIL SENT FROM WAYTOOGOOD ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. WHILE
          WAYTOOGOODUSES ALL REASONABLE EFFORTS TO CORRECT ANY ERRORS OR OMISSIONS WITHIN THE SITE
          AS SOON AS PRACTICABLE ONCE THEY HAVE BEEN BROUGHT TO WAYTOOGOOD’S ATTENTION,
          WAYTOOGOODDOES NOT WARRANT THAT THE INFORMATION ON THE SITE ITSELF WILL BE FREE FROM
          ERRORS OR OMISSIONS.<br></br>
          <br></br>
          1. LIMITATION OF LIABILITY<br></br>
          <br></br>
          1. In no event will WayTooGood, its contractors, suppliers, content-providers, and other
          similar entities, and the officers, directors, employees, representatives, and agents of
          each of the foregoing (collectively, our “Representatives”), be liable to you or any third
          party for any losses or damages, alleged under any legal theory, arising out of or in
          connection with: (a) your use of, or reliance on, the Site or the Content; (b) our
          performance of or failure to perform our obligations in connection with these Terms; (c)
          the defamatory, offensive, or illegal conduct of other users of the Site or of third
          parties; or (d) your purchase or use of any goods or services provided by third parties.
          <br></br>
          <br></br>
          2. Under no circumstances will WayTooGood or our Representatives be liable to you or any
          third party for any indirect, consequential, incidental, punitive, special, or similar
          damages or costs (including, but not limited to, lost profits or data, loss of goodwill,
          loss of or damage to property, loss of use, business interruption, and claims of third
          parties) arising out of or in connection with these Terms or the use of the Site or the
          Content, or the transmission of information to or from the Site over the Internet, even if
          we were advised, knew, or should have known of the possibility of such damages or costs.
          In a jurisdiction that does not allow the exclusion or limitation of liability for certain
          damages, the liability of WayTooGood and the Representatives will be limited in accordance
          with these Terms to the extent permitted by law.<br></br>
          <br></br>
          3. Without limiting any of the foregoing, if WayTooGood or any of the Representatives is
          found liable to you or to any third party as a result of any claims or other matters
          arising under or in connection with these Terms, the Site, or your use of the Site, the
          maximum liability for all such claims and other matters will not exceed $100 in any
          calendar year.
          <br></br>
          <br></br>
          2. INDEMNIFICATION<br></br>
          <br></br>
          You agree to defend, indemnify and hold harmless WayTooGood, and our officers, directors,
          employees, representatives, and agents, from and against all claims, demands, suits, or
          other proceedings, and all resulting loss, damage, liability, cost, and expense (including
          reasonable attorneys’ fees), arising out of: (a) content, data, or information that you
          submit, post to, or transmit through the Site; (b) your access to and use of the Content,
          the Site, and other materials, products, and services available on or through the Site and
          WayTooGood; (c) your violation of these Terms; (d) your violation of any rights of any
          third party; (e) your website; and (f) any unauthorized use of a username, password, or
          account number. We reserve, and you grant to us, the right to assume the exclusive defense
          and control of any matter subject to indemnification by you hereunder.
          <br></br>
          <br></br>
          You are solely responsible for your interactions with Vendors and other users of the Site.
          To the extent permitted under applicable laws, you hereby release WayTooGood from any and
          all claims or liability related to any product, subscription, or service of a Vendor, any
          action or inaction by Vendor, including Vendor’s failure to comply with applicable law
          and/or failure to abide by these Terms, and any conduct or speech, whether online or
          offline, of any other user.<br></br>
          <br></br>
          1. JURISDICTION<br></br>
          <br></br>
          These Terms will be construed and enforced in accordance with the laws of the Province of
          Quebec. You submit to personal jurisdiction in Illinois, and any cause of action arising
          under these Terms or otherwise involving this Site will be brought exclusively in a court
          in Montreal, Quebec.<br></br>
          <br></br>
          1. WAIVER OF JURY TRIAL<br></br>
          <br></br>
          YOU HEREBY KNOWINGLY AND VOLUNTARILY WAIVE THE RIGHT TO A JURY TRIAL IN ANY ACTIONS,
          SUITS, OR PROCEEDINGS ARISING OUT OF OR RELATING TO THESE TERMS AND THE MATTERS
          CONTEMPLATED HEREBY.<br></br>
          <br></br>
          1. MISCELLANEOUS<br></br>
          <br></br>
          1. These Terms and the Privacy Policy (as each may be revised and amended from time to
          time according to their respective terms) collectively constitute the entire agreement
          with respect to your access to and use of the Site and the Content.<br></br>
          <br></br>
          2. Our electronically or otherwise properly stored copy of these Terms will be deemed to
          be the true, complete, valid, authentic, and enforceable copy, and you agree that you will
          not contest the admissibility or enforceability of our copy of these Terms in connection
          with any action or proceeding arising out of or relating to these Terms.<br></br>
          <br></br>
          3. Any provisions of these Terms that are reasonably inferable to have been intended to
          survive termination (including, but not limited to, any provisions regarding limitation of
          our liability or indemnification) will continue in effect beyond any such termination of
          access to this Site.<br></br>
          <br></br>
          4. These Terms do not confer any rights, remedies, or benefits upon any person other than
          you.<br></br>
          <br></br>
          5. We may assign our rights and duties under these Terms at any time to any third party
          without notice. You may not assign these Terms without our prior written consent.<br></br>
          <br></br>
          6. Our waiver of any breach of these Terms will not be a waiver of any preceding or
          subsequent breach thereof.<br></br>
          <br></br>
          7. If any provision of these Terms is held to be invalid or unenforceable, that provision
          will be stricken and will not affect the validity and enforceability of any remaining
          provisions.<br></br>
          <br></br>
          8. Possible evidence of use of the Site for illegal purposes will be provided to law
          enforcement authorities.<br></br>
          <br></br>
          9. Discontinuation of use of this Site is your sole right and remedy for any
          dissatisfaction with the Site or any of the Content.<br></br>
          <br></br>
          2. OTHER AGREEMENTS<br></br>
          <br></br>
          If you have entered into a separate written agreement with WayTooGood with respect to your
          use of the Site or any Content, that agreement will supersede these Terms to the extent
          they are in conflict.<br></br>
          <br></br>
          4. Your Account with WayTooGood<br></br>
          <br></br>
          You’ll need to create an account with WayTooGood to use some of our Services. Here are a
          few rules about accounts with WayTooGood:
          <br></br>
          <br></br>
          A. You must be 18 years or older to use our Services. Minors under 18 and at least 13
          years of age are only permitted to use our Services through an account owned by a parent
          or legal guardian with their appropriate permission and under their direct supervision.
          Children under 13 years are not permitted to use WayTooGood or the Services. You are
          responsible for any and all account activity conducted by a minor on your account, and
          there may be commercial products or services available that you may want to consider to
          limit a minor&#39;s access to material online. B. Be honest with us. Provide accurate
          information about yourself. It’s prohibited to use false information or impersonate
          another person or company through your account. C. Choose an appropriate name. If you
          decide to not have your full name serve as the name associated with your account, you may
          not use language that is offensive, vulgar, infringes someone’s intellectual property
          rights, or otherwise violates the Terms. D. You&#39;re responsible for your
          account. You’re solely responsible for any activity on your account. If you’re sharing an
          account with other people, then the person whose financial information is on the account
          will ultimately be responsible for all activity. If you’re registering as a business
          entity, you personally guarantee that you have the authority to agree to the Terms on
          behalf of the business. Also, your accounts are not transferable. E. Protect your
          password. As we mentioned above, you’re solely responsible for any activity on your
          account, so it’s important to keep your account password secure.  F. Let&#39;s be clear
          about our relationship. These Terms don&#39;t create any agency, partnership, joint
          venture, employment, or franchisee relationship between you and WayTooGood.
          <br></br>
          <br></br>
          5. Your Content<br></br>
          <br></br>
          Content that you post using our Services is your content (so let’s refer to it as “Your
          Content”). We don’t make any claim to it, which includes anything you post using our
          Services (like shop names, profile pictures, listing photos, listing descriptions,
          reviews, comments, videos, usernames, etc.). A. Responsibility for Your Content. You
          understand that you are solely responsible for Your Content. You represent that you have
          all necessary rights to Your Content and that you’re not infringing or violating any third
          party’s rights by posting it. B. Permission to Use Your Content. By posting Your Content
          through our Services, you grant WayTooGood a license to use it. We don’t claim any
          ownership to Your Content, but we have your permission to use it to help WayTooGood
          function and grow. That way, we won’t infringe any rights you have in Your Content and we
          can help promote it. . For example, you acknowledge and agree WayTooGood may offer you or
          WayTooGood buyers promotions on the Site, from time to time, that may relate to your
          listings C. Rights You Grant WayTooGood. (Here’s the legalese version of the last
          section). By posting Your Content, you grant WayTooGood a non-exclusive, worldwide,
          royalty-free, irrevocable, sub-licensable, perpetual license to use, display, edit,
          modify, reproduce, distribute, store, and prepare derivative works of Your Content. This
          allows us to provide the Services and to promote WayTooGood, your WayTooGood shop, or the
          Services in general, in any formats and through any channels, including across any
          WayTooGood Services, our partners, or third-party website or advertising medium. You agree
          not to assert any moral rights or rights of publicity against us for using Your Content.
          You also recognise our legitimate interest in using it, in accordance with the scope of
          this license, to the extent Your Content contains any personal information. That sounds
          like a lot, but it’s necessary for us to keep WayTooGood going. Consider these examples:
          if you upload a photo or video of a listing on your WayTooGood shop, we have permission to
          display it to buyers, and we can resize or enhance it so it looks good to a buyer using
          our mobile app; if you post a description in English, we can translate it into French so a
          buyer in Paris can learn the story behind your item; and if you post a beautiful photo or
          video of your latest handmade necklace, we can feature it - often along with your shop
          name and shop picture - on our homepage, in one of our blogs or even on a billboard to
          help promote your business and WayTooGood’s.
          <br></br>
          <br></br>
          6. Your Use of Our Services<br></br>
          <br></br>
          License to Use Our Services. We grant you a limited, non-exclusive, non-transferable, and
          revocable license to use our Services - subject to the Terms and the following
          restrictions in particular: A. Don’t Use Our Services to Break the Law. You agree that you
          will not violate any laws in connection with your use of the Services. This includes any
          local, state, federal, and international laws that may apply to you. For example, it’s
          your responsibility to obtain any permits or licences that your shop requires, and to meet
          applicable legal requirements in applicable jurisdiction(s). This includes the sale and
          delivery of your items, such as age verification upon delivery, where required by law. You
          may not sell anything that violates any laws; you must comply with our Sanctions Policy,
          and you may not engage in fraud (including false claims or infringement notices), theft,
          anti- competitive conduct, threatening conduct, or any other unlawful acts or crimes
          against WayTooGood, another WayTooGood user, or a third party. B.. C. Don’t Steal Our
          Stuff. You agree not to crawl, scrape, or spider any page of the Services or to reverse
          engineer or attempt to obtain the source code of the Services. D. Don’t Try to Harm Our
          Systems. You agree not to interfere with or try to disrupt our Services, for example by
          distributing a virus or other harmful computer code. F. Share Your Ideas. We love your
          suggestions and ideas! They can help us improve your experience and our Services. Any
          unsolicited ideas or other materials you submit to WayTooGood (not including Your Content
          or items you sell through our Services) are considered non-confidential and
          non-proprietary to you. You grant us a non-exclusive, worldwide, royalty-free,
          irrevocable, sub-licensable, perpetual license to use and publish those ideas and
          materials for any purpose, without compensation to you.
          <br></br>
          <br></br>
          7. Termination<br></br>
          <br></br>
          Termination By You. We&#39;d hate to see you go, but you may terminate your account with
          WayTooGood at any time from your account settings. You can find more information in this
          Help article. Terminating your account will not affect the availability of some of Your
          Content that you posted through the Services prior to termination. Oh, and you’ll still
          have to pay any outstanding bills. Termination By WayTooGood. We may terminate or suspend
          your account (and any accounts WayTooGood determines are related to your account) and your
          access to the Services should we have reason to believe you, your Content, or your use of
          the Services violate our Terms. If we do so, it’s important to understand that you don’t
          have a contractual or legal right to continue to use our Services, for example, to sell or
          buy on our websites or mobile apps. Generally, WayTooGood will notify you that your
          account has been terminated or suspended, unless you’ve repeatedly violated our Terms or
          we have legal or regulatory reasons preventing us from notifying you. If you or WayTooGood
          terminate your account, you may lose any information associated with your account,
          including Your Content.
          <br></br>
          <br></br>
          We May Discontinue the Services WayTooGood reserves the right to change, suspend, or
          discontinue any of the Services for you, any or all users, at any time, for any reason,
          including those laid out in WayTooGood’s policies under these Terms of Use. We will not be
          liable to you for the effect that any changes to the Services may have on you, including
          your income or your ability to generate revenue through the Services. Survival. The Terms
          will remain in effect even after your access to the Service is terminated, or your use of
          the Service ends.
          <br></br>
          <br></br>
          8. Warranties and Limitation of Liability (or the Things You Can’t Sue Us For)<br></br>
          <br></br>
          Items You Purchase. You understand that WayTooGood does not manufacture, store, or inspect
          any of the items sold through our Services. We provide the venue; the items in our
          marketplaces are produced, listed, and sold directly by independent sellers, so WayTooGood
          can&#39;t and does not make any warranties about their quality, safety, or even their
          legality. Any legal claim related to an item you purchase must be brought directly against
          the seller of the item. You release WayTooGood from any claims related to items sold
          through our Services, including for defective items, misrepresentations by sellers, or
          items that caused physical injury (like product liability claims). Content You Access. You
          may come across materials that you find offensive or inappropriate while using our
          Services. We make no representations concerning any content posted by users through the
          Services. WayTooGood is not responsible for the accuracy, copyright compliance, legality,
          or decency of content posted by users that you accessed through the Services. You release
          us from all liability relating to that content. People You Interact With. You can use the
          Services to interact with other individuals, either online or in person. However, you
          understand that we do not screen users of our Services, and you release us from all
          liability relating to your interactions with other users. Please be careful and exercise
          caution and good judgment in all interactions with others, especially if you are meeting
          someone in person.  Third-Party Services. Our Services may contain links to third-party
          websites or services that we don’t own or control (for example, links to Facebook, Twitter
          and Pinterest). You may also need to use a third party’s product or service in order to
          use some of our Services (like a compatible mobile device to use our mobile apps). When
          you access these third-party services, you do so at your own risk. The third parties may
          require you to accept their own terms of use. WayTooGood is not a party to those
          agreements; they are solely between you and the third party. Gift Cards and
          Promotions. You acknowledge that WayTooGood does not make any warranties with respect to
          your Gift Card balance and is not responsible for any unauthorised access to, or
          alteration, theft, or destruction of a Gift Card or Gift Card code that results from any
          action by you or a third party. You also acknowledge that we may suspend or prohibit use
          of your Gift Card if your Gift Card or Gift Card code has been reported lost or stolen, or
          if we believe your Gift Card balance is being used suspiciously, fraudulently, or in an
          otherwise unauthorised manner. If your Gift Card code stops working, your only remedy is
          for us to issue you a replacement Gift Card code. By participating in a special offer or
          promotion, you agree that you may not later claim that the rules of that special offer or
          promotion were ambiguous.
          <br></br>
          <br></br>
          9. Indemnification (or What Happens If You Get Us Sued)<br></br>
          <br></br>
          We hope this never happens, but if WayTooGood gets sued because of something that you did,
          you agree to defend and indemnify us. That means you’ll defend WayTooGood (including any
          of our employees) and hold us harmless from any legal claim or demand (including
          reasonable lawyer’s fees) that arises from your actions, your use (or misuse) of our
          Services, your breach of the Terms, or you or your account’s infringement of someone
          else’s rights.
          <br></br>
          <br></br>
          We reserve the right to handle our legal defense however we see fit, even if you are
          indemnifying us, in which case you agree to cooperate with us so we can execute our
          strategy.
          <br></br>
          <br></br>
          10. Disputes with Other Users<br></br>
          <br></br>
          If you find yourself in a dispute with another user of WayTooGood’s Services or a third
          party, we encourage you to contact the other party and try to resolve the dispute
          amicably.<br></br>
          <br></br>
          Case System. Buyers and sellers who are unable to resolve a dispute related to a
          transaction on our websites or mobile apps may participate in our case system. You can
          find details about the case system in this Help article. WayTooGood will attempt to help
          you resolve disputes in good faith and based solely on our interpretation of our policies,
          in our sole discretion; we will not make judgments regarding legal issues or claims.
          WayTooGood has no obligation to resolve any disputes. Release of WayTooGood. You release
          WayTooGood from any claims, demands, and damages arising out of disputes with other users
          or parties.
          <br></br>
          <br></br>
          11. Disputes with WayTooGood<br></br>
          <br></br>
          If you’re upset with us, let us know, and hopefully we can resolve your issue. But if we
          can’t, then these rules will govern any legal dispute involving our Services: A. Governing
          Law. The Terms are governed by the laws of the Province of Quebec without regard to its
          conflict of laws rules, and the laws of Canada. These laws will apply no matter where in
          the world you live, but if you live outside of the Canada, you may be entitled to the
          protection of the mandatory consumer protection provisions of your local consumer
          protection law. B. Arbitration. You and WayTooGood agree that any dispute or claim arising
          from or relating to the Terms shall be finally settled by final and binding arbitration,
          using the English language, administered by the American Arbitration Association (the
          “AAA”) under its Consumer Arbitration Rules (the &quot;AAA Rules&quot;) then in effect
          (those rules are deemed to be incorporated by reference into this section, and as of the
          date of these Terms you can find the AAA Rules here), unless otherwise required by law.
          **Arbitration, including threshold questions of arbitrability of the dispute, will be
          handled by a sole arbitrator in accordance with those rules. Judgment on the arbitration
          award may be entered in any court that has jurisdiction.
          <br></br>
          <br></br>
          12. Changes to the Terms<br></br>
          <br></br>
          We may update these Terms from time to time. If we believe that the changes are material,
          we’ll definitely let you know by posting the changes through the Services and/or sending
          you an email or message about the changes. That way you can decide whether you want to
          continue using the Services. Changes will be effective upon the posting of the changes
          unless otherwise specified. You are responsible for reviewing and becoming familiar with
          any changes. Your use of the Services following the changes constitutes your acceptance of
          the updated Terms.
          <br></br>
          <br></br>
          Billing and Payments<br></br>
          <br></br>
          All information that you provide to register with WayTooGood including your credit card
          information is subject to WayTooGood ‘s Privacy Policy. The price of the Services and/or
          goods is payable in full before delivery. We accept the following credit cards at this
          time: Visa, MasterCard, Discover, or American Express. You will automatically be charged
          each month for your ongoing subscription. For your convenience and continuous subscription
          benefits as a member, if your payment method reaches its expiration date and you do not
          edit your credit card information or cancel your account, you authorize us to continue
          billing that credit card on file including extending the expiration date until we are
          notified by you or the credit card company that the account is no longer valid. We
          encourage you to constantly update your payment method information or cancel your account
          should you wish to discontinue your monthly purchase of Products.
          <br></br>
          <br></br>
          We use a third party payment service in lieu of directly processing your credit card
          information. By submitting your credit card information, you grant WayTooGood the right to
          store and process your information with the third party payment service, which it may
          change from time to time; you agree that WayTooGood will not be responsible for any
          failures of the third party to adequately protect such information. All financial matters
          regarding your information are subject to the conditions of the third party payment
          service provider’s terms of service; the current versions is attached as a link at
          https://stripe.com/terms. You acknowledge that we may change the third party payment
          service and move your information to other service providers that encrypt your information
          using secure socket layer technology (SSL) or other comparable security technology.
          <br></br>
          <br></br>
          Shipping and Risk of Loss<br></br>
          <br></br>
          Unless otherwise indicated at the time of your purchase, shipping and handling fees are
          included with your order. Shipping dates and/or arrival times are only estimates. For
          loss/damage claims, you must notify WayTooGood within 30 days of the date of your purchase
          if you believe all or part of your order is missing or damaged. Replacement of Products
          and credits to your account for shipped merchandise claimed as not received are subject to
          our investigation, which may include postal-service notification. We will adjust your
          account at our discretion. Repeated claims of undelivered merchandise may result in the
          cancellation of your membership.<br></br>
          <br></br>
          Returns and Exchanges<br></br>
          <br></br>
          If a Product is defective or if something is missing or damaged, you may return it and we
          will send you a new item or credit your account. To request a refund, please contact us at
          When returning Products, it is your responsibility to take reasonable care to see that the
          Products are not damaged in transit and are received by us at our address as displayed on
          the postage label. Please note, credits resulting from the monthly charge are only
          available up to 30 days past the date of the charge. Refunds are provided at the sole
          discretion of waytoogood.<br></br>
          <br></br>
          Subscriptions
          <br></br> <br></br>
          If you have an active subscription at the end of the month, we ship your box in the
          following the month. We usually ship the subscription boxes after the first week of the
          following month and the expected arrival date depends on your location. Once your
          subscription box has shipped you'll receive an email with tracking so you can follow its
          movement!
          <br></br> <br></br>
          BY SUBSCRIBING YOU AGREE TO PAY THE MONTHLY SUBSCRIPTION FEE FOR THE PRODUCTS THAT ARE
          SUPPLIED EACH MONTH.
          <br></br> <br></br>
          Subscription (Cancellation)
          <br></br> <br></br>
          You can cancel your subscriptions anytime in Account Settings > Subscription > Manage
          Subscriptions. Your plan will be canceled, but will still available until the end of your
          billing period. If you change your mind, you can renew your subscription. We do not offer
          refunds on boxes that have already been shipped.
          <br></br>
          <br></br>
          Subscription (Promotions)
          <br></br> <br></br>
          Currently, we are only honouring 1 promotional box per account and address. Also, although
          subscriptions can be cancelled at anytime, if you cancelled in the first free month before
          we even ship out the boxes, we won't be shipping you a box.
          <br></br>
          <br></br>
          Subscription (Allergens)
          <br></br> <br></br>
          We understand your concerns about potential allergens in the foods you eat. However, we
          cannot guarantee that any of our products are safe to consume for people with specific
          allergies. If there is a risk to allergic consumers due to the presence of a major
          allergen in a product, it's of the responsibility of the product creators to declare its
          presence on the description of that product.
        </Typography>
      </div>
    </div>
  )
}

export default Content
