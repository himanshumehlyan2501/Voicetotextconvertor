import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { Button } from "react-bootstrap";


export default function Home() {
  const [data, setData] = useState("");
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const stopListening = () => SpeechRecognition.stopListening();

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const [isCopied, setCopied] = useClipboard(data);

  const handleCopyToClipboard = () => {
    if (transcript) {
      setData(transcript); // Update the data to be copied to the clipboard
      setCopied(true); // Copy to clipboard
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <div className="container p-2 " id="id">
        <br />
        <h2 className="alert alert-primary"
          style={{
            textAlign: "center",
            color: "blue",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            fontSize: "xxx-large",
          }}
        >
          Speech to Text Converter
        </h2>
        <br />
        <p
          className=" card container  p-3 text-light  bg-warning"
          style={{
            textAlign: "center",
            fontSize: "x-large",
            color: "GrayText",
          }}
        >
          A React hook that converts speech from the microphone to text and
          makes it available to your React component.
        </p>
        <div
          className="card p-4 text-primary"
          style={{
            height: "600px",
            width: "800px",
            marginLeft: "260px",
            border: "solid black 2px",
            fontSize: "20px",
          }}
          onClick={() => setData(transcript)}
        >
          {" "}
          {transcript}
        </div>

        <div className="p-4 d-grid  gap-4 d-flex mx-auto justify-content-center">
          <Button
            className="btn btn-info "
            onClick={handleCopyToClipboard}
            style={{ marginLeft: "150px", marginTop: "20px" }}
          >
            Copy{isCopied ? "Yes! 👍" : "Nope! 👎"}
          </Button>
          <Button className="btn btn-dark " onClick={startListening}>
            Start Listening
          </Button>
          <Button className="btn btn-danger " onClick={stopListening}>
            Stop Listening
          </Button>
          <br />
        </div>
      </div>
    </div>
  );
}
