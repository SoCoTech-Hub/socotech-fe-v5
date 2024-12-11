interface PageVisit {
  path: string;
  startTime: number;
  endTime?: number;
}

class NavigationTracker {
  private visits: PageVisit[] = [];
  private currentPath: string | null = null;
  private startTime: number | null = null;

  startTracking(path: string) {
    this.endTracking(); // End the current session if there's one active
    this.currentPath = path;
    this.startTime = Date.now();
    this.visits.push({ path, startTime: this.startTime });
  }

  endTracking() {
    if (this.currentPath && this.startTime) {
      const visit = this.visits.find(
        (v) => v.path === this.currentPath && !v.endTime,
      );
      if (visit) {
        visit.endTime = Date.now();
      }
    }
  }

  getVisits() {
    console.log(this.visits);
    return this.visits;
  }
  //TODO:send tracking to api
  // sendVisitsToServer() {
  //   // Replace with your API endpoint to save the visits
  //   fetch("/api/tracking", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(this.visits),
  //   }).catch(console.error);
  // }
}

export const tracker = new NavigationTracker();
