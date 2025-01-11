import { JSX } from "react";

interface TourStep {
  selector: string;
  content: JSX.Element;
}

const steps: TourStep[] = [
  {
    selector: '[data-tour="notifications"]',
    content: (
      <p>
        When new lessons, events, tasks, or surveys are added, you'll get a
        notification here so you're always on top of your work!
      </p>
    ),
  },
  {
    selector: '[data-tour="options"]',
    content: (
      <p>
        You can use this button to log out, or view our terms of service,
        copyright, and privacy information.
      </p>
    ),
  },
  {
    selector: '[data-tour="dashboard"]',
    content: (
      <p>
        Get a quick overview of your progress and results when you click here.
        You can also add your own status updates here.
      </p>
    ),
  },
  {
    selector: '[data-tour="profile"]',
    content: (
      <p>
        If you need to update your profile with new information like updated
        contact details or your address, you can click here.
      </p>
    ),
  },
  {
    selector: '[data-tour="inmail"]',
    content: (
      <p>
        You can click here to read important information and updates
        communication from Topic.
      </p>
    ),
  },
  {
    selector: '[data-tour="blogs"]',
    content: <p>Read interesting articles, tips, and more here!</p>,
  },
  {
    selector: '[data-tour="lessons"]',
    content: (
      <p>
        Ready to start learning? Visit this section of the platform to get
        started with a lesson in the subject you want to study. A lesson will
        only be marked as complete if you spent enough time on it to go through
        all the material. Remember to complete the quiz after each lesson to
        test your knowledge too!
      </p>
    ),
  },
  {
    selector: '[data-tour="digilib"]',
    content: (
      <p>
        You can visit this section of the platform to download documents like
        past papers, memos, study guides, and more additional resources.
      </p>
    ),
  },
  {
    selector: '[data-tour="applications"]',
    content: (
      <p>
        You can visit this section of the platform to review undergraduate
        courses available at universities across South Africa.
      </p>
    ),
  },
  {
    selector: '[data-tour="bursaries"]',
    content: (
      <p>
        Here you can learn about the various bursaries available in South
        Africa.
      </p>
    ),
  },
  {
    selector: '[data-tour="shows"]',
    content: (
      <p>
        Click here to watch shows filmed and presented by Topic such as
        Schooled. We have more coming, so stay tuned!
      </p>
    ),
  },
  {
    selector: '[data-tour="whatsapp"]',
    content: (
      <p>
        If you need any technical or educational support, you can click on the
        WhatsApp button to reach us, and we will get back to you ASAP!
      </p>
    ),
  },
  {
    selector: '[data-tour="noted"]',
    content: (
      <p>
        Made notes during a lesson? View all of your previous notes in one place
        when you navigate to this section.
      </p>
    ),
  },
  {
    selector: '[data-tour="done"]',
    content: (
      <p>
        You have completed the tour. You can review the tour at any time you
        need by heading to the 'Profile' icon. Click anywhere to close this
        tour.
      </p>
    ),
  },
];

export default steps;
