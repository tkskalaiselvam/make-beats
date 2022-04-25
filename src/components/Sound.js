import { useEffect, useState } from "react";
import { howl } from "../services/sound-service";
import Channel from "./Channel";
import { channelColors } from "../services/sound-service";

var timer;
var beatsCount = 32;
const songData = {
    name: "Kygo - Happy Now",
    channels: Object.keys(channelColors).map((key) => ({
        sound: key,
        volume: 1,
        steps: new Array(beatsCount).fill({ velocity: 0 }),
    })),
    tempo: 60,
};

function Sound() {
    const [tickCount, settickCount] = useState(0);
    const [beats, setbeats] = useState(0);
    const [bars, setbars] = useState(0);
    const [sixteenths, setsixteenths] = useState(0);
    const [tickInterval, settickInterval] = useState(0);
    const [song, setsong] = useState(songData);
    const [isPlaying, setisPlaying] = useState(false);

    useEffect(() => {
        findTickInterval();
        if (timer) {
            stop();
            play();
        }
        return () => { };
    }, [song]);

    useEffect(() => {
        setbars(Math.floor(tickCount / 16) + 1);
        setbeats((Math.floor(tickCount / 4) % 4) + 1);
        setsixteenths((tickCount % 4) + 1);
        if (tickCount) {
            playTick();
        }
        return () => { };
    }, [tickCount]);

    useEffect(() => {
        if (isPlaying) {
            playFunctionality();
        } else {
            stopFunctionality();
        }
    }, [isPlaying]);

    useEffect(() => {
        window.addEventListener("keypress", (e) => {
            if (e.keyCode === 32) {
                e.preventDefault();
                setisPlaying((prev) => !prev);
            }
        });
        return () => {
            window.removeEventListener("keypress", () => {
                console.log("key press removed");
            });
        };
    }, []);

    const Display = () => (
        <p>
            {bars}:{beats}:{sixteenths} {song.tempo}bpm {tickInterval}ms{" "}
            {Math.floor(tickCount / 4) + 1}
        </p>
    );

    function findTickInterval() {
        let beatsPerSecond = song.tempo / 60;
        let sixteenthsPerSecond = beatsPerSecond * 4;
        let tickInterval = 1000 / sixteenthsPerSecond;
        settickInterval(tickInterval);
    }

    function playStep(index) {
        // console.log({index,tickCount,bars});
        if (timer && song.channels[index].steps[tickCount - 1].velocity === 1) {
            howl.play(song.channels[index].sound);
        }
    }

    function playTick() {
        song.channels.forEach((item, i) => {
            playStep(i);
        });
    }
    function play() {
        setisPlaying(true);
    }
    function playFunctionality() {
        timer = setInterval(increaseTickCount, tickInterval);
        function increaseTickCount() {
            settickCount((prev) => (prev < beatsCount ? prev + 1 : 1));
        }
    }

    function stopFunctionality() {
        clearInterval(timer);
        timer = undefined;
        settickCount(0);
    }

    function stop() {
        setisPlaying(false);
    }

    function increaseBPM() {
        setsong((prev) => ({ ...prev, tempo: prev.tempo + 5 }));
    }

    function decreaseBPM() {
        setsong((prev) => ({ ...prev, tempo: prev.tempo - 5 }));
    }

    function changeTempo(e) {
        setsong((prev) => ({ ...prev, tempo: e.target.value }));
    }

    function changeBeat(cIndex, sIndex) {
        console.log();
        let songTemp = song;
        songTemp.channels = songTemp.channels.map((channel, channelIndex) => {
            if (channelIndex !== cIndex) return channel;
            return {
                ...channel,
                steps: channel.steps.map((step, i) =>
                    i === sIndex ? { velocity: step.velocity ? 0 : 1 } : step
                ),
            };
        });
        // songTemp.channels[cIndex].steps = songTemp.channels[cIndex].steps.map(
        //     (step, i) => (i === sIndex ? { velocity: step.velocity ? 0 : 1 } : step)
        // );
        setsong((prev) => ({ ...prev, channels: songTemp.channels }));
    }

    function addChannel() {
        let songTemp = song;
        songTemp.channels.push({
            sound: "snare",
            volume: 1,
            steps: new Array(16).fill({ velocity: 0 }),
        });
        setsong((prev) => ({ ...prev, channels: songTemp.channels }));
    }

    function deleteChannel(cIndex) {
        let songTemp = song;
        songTemp.channels = songTemp.channels.filter((channel, i) =>
            i !== cIndex ? channel : null
        );
        setsong((prev) => ({ ...prev, channels: songTemp.channels }));
    }

    function clearSong() {
        setsong(prev=>({...prev,channels: Object.keys(channelColors).map((key) => ({
            sound: key,
            volume: 1,
            steps: new Array(beatsCount).fill({ velocity: 0 }),
        }))}))
    }
    return (
        <div>
            <div className="flex justify-between items-center bg-zinc-700">
                <div className="flex">
                    <div>
                        <button
                            onClick={() => {
                                if (isPlaying) {
                                    stop();
                                } else {
                                    play();
                                }
                            }}
                            onFocus={(e) => {
                                e.currentTarget.blur();
                            }}
                            className="px-5 py-2 bg-white"
                            title={isPlaying ? "Stop" : "Play"}
                        >
                            {isPlaying ? (
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="currentColor"
                                        class="bi bi-stop-fill"
                                        viewBox="0 0 16 16"
                                        color="#111"
                                    >
                                        <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
                                    </svg>
                                </span>
                            ) : (
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        fill="currentColor"
                                        class="bi bi-play-fill"
                                        viewBox="0 0 16 16"
                                        color="#111"
                                    >
                                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                    </svg>
                                </span>
                            )}
                        </button>
                    </div>
                    <div className="flex pl-4  items-center bg-zinc-700">
                        <p className="font-bold text-sm mr-1">BPM:</p>
                        <input
                            className="py-1 w-12 bg-transparent outline-none focus:outline-none"
                            type="number"
                            name=""
                            id=""
                            value={song.tempo}
                            min={60}
                            max={150}
                            onChange={changeTempo}
                        />
                    </div>
                </div>

                <div>
                    <div className="px-4 cursor-pointer" onClick={clearSong}>Clear</div>
                </div>
            </div>
            <div className="my-4 mx-2">
                <div
                    className="bg-zinc-800 flex rounded-md mb-1 w-max"
                    style={{ marginLeft: "70px" }}
                >
                    {new Array(beatsCount).fill(0).map((item, i) => (
                        <div
                            key={i}
                            className="mr-1 text-sm flex justify-center items-center"
                            style={{
                                width: "32px",
                                height: "32px",
                                textAlign: "center",
                                color: i % 4 === 0 ? "#fff" : "#999",
                            }}
                        >
                            <span>{i + 1}</span>
                        </div>
                    ))}
                </div>
                {song.channels.map((channel, channelIndex) => (
                    <Channel
                        key={channelIndex}
                        channel={channel}
                        channelIndex={channelIndex}
                        tickCount={tickCount}
                        changeBeat={changeBeat}
                        deleteChannel={deleteChannel}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sound;
