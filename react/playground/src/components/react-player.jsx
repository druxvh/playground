import ReactPlayer from "react-player/youtube";

// playing with react player
function ReactVideoPlayer() {
  return (
    <div>
      <ReactPlayer
        url="https://youtu.be/RXXZcQfzZbk?si=YFGjPuOevGKTuPTo"
        controls
        playing
        muted
        // onPlay={()=>alert("vfideo played")}
      />
    </div>
  );
}

export default ReactVideoPlayer;
