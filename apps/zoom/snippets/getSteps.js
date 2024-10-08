const steps = [
  // {
  //   selector: '[data-tour="searchbar"]',
  //   content: <p>Use the Search Bar to find lessons, documents and articles</p>,
  // },
  // {
  //   selector: '[data-tour="home"]',
  //   content: <p>Use the Logo to navigate back to your dashboard</p>,
  // },
  {
    selector: '[data-tour="notifications"]',
    content: <p>Check for new notifications here</p>,
  },
  {
    selector: '[data-tour="events"]',
    content: <p>This is where you can find all the events</p>,
  },
  {
    selector: '[data-tour="options"]',
    content: <p>Find dark mode and logout options here</p>,
  },
  {
    selector: '[data-tour="dashboard"]',
    content: <p>View your news feed, reports, progress and results here</p>,
  },
  {
    selector: '[data-tour="profile"]',
    content: <p>Use this to update personal information</p>,
  },
  {
    selector: '[data-tour="inmail"]',
    content: <p>Here you can find all your emails</p>,
  },
  {
    selector: '[data-tour="lessons"]',
    content: <p>Learning starts here</p>,
  },
  {
    selector: '[data-tour="noted"]',
    content: <p>You will find all your saved notes here</p>,
  },
]
export default steps
