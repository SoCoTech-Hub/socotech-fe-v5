import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { api } from "../api/api";
import { runQuery } from "../graphql";
import { FETCH_TIME_TRACKS } from "../graphql/knowledgeBase/getKnowledgeBaseTimeSpent";

interface TimeTracksProps {
  knowledgeBase: string;
  userId: string;
}

const TimeTracks = ({ knowledgeBase, userId }: TimeTracksProps) => {
  const router = useRouter();
  const startTimeRef = useRef<Date>(new Date());
  const timeSpentRef = useRef<number>(0);
  const timeTrackIdRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchTimeTracks = async () => {
      if (knowledgeBase) {
        const data = await runQuery<{
          timeTracks?: {
            id: string;
            timeSpent: string;
          }[];
        }>(FETCH_TIME_TRACKS, { knowledgeBase, userId });

        if (data.timeTracks && data.timeTracks.length > 0) {
          timeSpentRef.current = parseFloat(data.timeTracks[0].timeSpent) || 0;
          timeTrackIdRef.current = data.timeTracks[0].id;
        }
      }
    };

    fetchTimeTracks();
  }, [knowledgeBase, userId]);

  useEffect(() => {
    const handleRouteChange = async () => {
      await updateTimeSpent();
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      await updateTimeSpent();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const updateTimeSpent = async () => {
    const endTime = new Date();
    const elapsedTime =
      (endTime.getTime() - startTimeRef.current.getTime()) / 1000 / 60 +
      timeSpentRef.current;

    if (timeTrackIdRef.current) {
      await api.PUT(`/time-tracks/${timeTrackIdRef.current}`, {
        timeSpent: elapsedTime,
      });
    }

    startTimeRef.current = new Date(); // Reset the start time for the next session
  };

  return null;
};

export default TimeTracks;
