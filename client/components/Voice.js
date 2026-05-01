"use client";
import axios from "axios";

export default function Voice() {
  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    let chunks = [];

    recorder.ondataavailable = e => chunks.push(e.data);

    recorder.onstop = async () => {
      const blob = new Blob(chunks);
      const form = new FormData();
      form.append("audio", blob);

      const res = await axios.post("http://localhost:5000/api/voice", form, {
        responseType: "blob"
      });

      const audio = new Audio(URL.createObjectURL(res.data));
      audio.play();
    };

    recorder.start();
    setTimeout(() => recorder.stop(), 4000);
  };

  return <button onClick={start}>🎤 Talk</button>;
}