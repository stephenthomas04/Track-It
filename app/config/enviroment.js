var environments = {
  staging: {
    FIREBASE_API_KEY: "AIzaSyBk0WzBazFzwoZmMA7jPo0ANJsTKSfNXT0",
    FIREBASE_AUTH_DOMAIN: "track-it-31a75.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://blabla.firebaseio.com/",
    FIREBASE_PROJECT_ID: "track-it-31a75",
    FIREBASE_STORAGE_BUCKET: "track-it-31a75.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "82014681783",
    GOOGLE_CLOUD_VISION_API_KEY: "AIzaSyAUy5bayf3jGPrsLQNAWgXuRrPFpHJ6NoE",
  },
  production: {
    // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
  },
};
function getReleaseChannel() {
  let releaseChannel = Expo.Constants.manifest.releaseChannel;
  if (releaseChannel === undefined) {
    return "staging";
  } else if (releaseChannel === "staging") {
    return "staging";
  } else {
    return "staging";
  }
}
function getEnvironment(env) {
  console.log("Release Channel: ", getReleaseChannel());
  return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;
