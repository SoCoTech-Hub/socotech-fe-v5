import { createHmac } from "crypto";
import { NextResponse } from "next/server";
import axios from "axios";

const ZOOM_API_KEY = process.env.ZOOM_API_KEY!;
const ZOOM_API_SECRET = process.env.ZOOM_API_SECRET!;
const ZOOM_SDK_KEY = process.env.ZOOM_SDK_KEY!;

export async function POST(request: Request) {
  //TODO: get user data here
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json(
  //     { success: false, error: "Unauthorized" },
  //     { status: 401 },
  //   );
  // }
  const session = { user: { email: "", name: "" } };

  const { action, ...data } = await request.json();

  try {
    switch (action) {
      case "schedule":
        const scheduledMeeting = await scheduleMeeting(
          data,
          session.user.email,
        );
        return NextResponse.json({
          success: true,
          meetingId: scheduledMeeting.id,
        });
      case "join":
        const joinUrl = await getJoinUrl(
          data.meetingId,
          session.user.name,
          session.user.email,
        );
        return NextResponse.json({ success: true, joinUrl });
      default:
        return NextResponse.json(
          { success: false, error: "Invalid action" },
          { status: 400 },
        );
    }
  } catch (error: any) {
    console.error("Zoom API error:", error.response?.data || error.message);
    return NextResponse.json(
      { success: false, error: "An error occurred" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  //TODO: get user data here
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json(
  //     { success: false, error: "Unauthorized" },
  //     { status: 401 },
  //   );
  // }
  const session = { user: { email: "", name: "" } };

  const { searchParams } = new URL(request.url);
  const meetingId = searchParams.get("meetingId");

  if (!meetingId) {
    return NextResponse.json(
      { success: false, error: "Missing meetingId" },
      { status: 400 },
    );
  }

  try {
    const signature = generateSignature(meetingId, session.user.name);
    return NextResponse.json({
      success: true,
      signature,
      sdkKey: ZOOM_SDK_KEY,
      userName: session.user.name,
      userEmail: session.user.email,
    });
  } catch (error) {
    console.error("Error generating meeting configuration:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred" },
      { status: 500 },
    );
  }
}

async function scheduleMeeting(data: any, userEmail: string) {
  const token = await getZoomAccessToken();
  const response = await axios.post(
    "https://api.zoom.us/v2/users/me/meetings",
    {
      topic: data.topic,
      type: 2, // Scheduled meeting
      start_time: `${data.date}T${data.time}:00`,
      duration: parseInt(data.duration),
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        mute_upon_entry: true,
        watermark: false,
        use_pmi: false,
        approval_type: 2,
        audio: "both",
        auto_recording: "none",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "Zoom-api-Jwt-Request",
        "content-type": "application/json",
      },
    },
  );
  return response.data;
}

async function getJoinUrl(
  meetingId: string,
  userName: string,
  userEmail: string,
) {
  const token = await getZoomAccessToken();
  const response = await axios.get(
    `https://api.zoom.us/v2/meetings/${meetingId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "Zoom-api-Jwt-Request",
      },
    },
  );
  return `${response.data.join_url}?name=${encodeURIComponent(userName)}&email=${encodeURIComponent(userEmail)}`;
}

async function getZoomAccessToken() {
  const response = await axios.post("https://zoom.us/oauth/token", null, {
    params: {
      grant_type: "account_credentials",
      account_id: process.env.ZOOM_ACCOUNT_ID,
    },
    auth: {
      username: ZOOM_API_KEY,
      password: ZOOM_API_SECRET,
    },
  });
  return response.data.access_token;
}

function generateSignature(meetingNumber: string, userName: string) {
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(
    ZOOM_SDK_KEY + meetingNumber + timestamp + userName,
  ).toString("base64");
  const hash = createHmac("sha256", ZOOM_API_SECRET)
    .update(msg)
    .digest("base64");
  const signature = Buffer.from(
    `${ZOOM_SDK_KEY}.${meetingNumber}.${timestamp}.${userName}.${hash}`,
  ).toString("base64");
  return signature;
}
