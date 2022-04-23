import { useEffect, useState } from "react";

var timer;
const songData = {
    name: "Kygo - Happy Now",
    channels: [
        {
            sound: "kick",
            volume: 1,
            steps: new Array(16).fill({ velocity: 0 }),
        },
        {
            sound: "snare",
            volume: 1,
            steps: new Array(16).fill({ velocity: 0 }),
        },
        {
            sound: "high_hat",
            volume: 1,
            steps: new Array(16).fill({ velocity: 0 }),
        },
    ],
    tempo: 60,
};

function Sound() {
    const [tickCount, settickCount] = useState(0);
    const [beats, setbeats] = useState(0);
    const [bars, setbars] = useState(0);
    const [sixteenths, setsixteenths] = useState(0);
    const [tickInterval, settickInterval] = useState(0);
    const [song, setsong] = useState(songData);

    useEffect(() => {
        findTickInterval();

        return () => { };
    }, [song]);

    useEffect(() => {
        setbars(Math.floor(tickCount / 16) + 1);
        setbeats((Math.floor(tickCount / 4) % 4) + 1);
        setsixteenths((tickCount % 4) + 1);
        return () => { };
    }, [tickCount]);

    useEffect(() => {
        if (bars > 4) {
            settickCount(0);
        }
        return () => { };
    }, [bars]);

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

    function play() {
        if (!timer) {
            timer = setInterval(increaseTickCount, tickInterval);
        }
        function increaseTickCount() {
            settickCount((prev) => prev + 1);
        }
    }

    function stop() {
        clearInterval(timer);
        timer = undefined;
    }

    function increaseBPM() {
        setsong((prev) => ({ ...prev, tempo: prev.tempo + 5 }));
    }

    function decreaseBPM() {
        setsong((prev) => ({ ...prev, tempo: prev.tempo - 5 }));
    }

    function changeBeat(cIndex, sIndex) {
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
        songTemp.channels.push(songData.channels[0]);
        console.log(songTemp);
        setsong((prev) => ({ ...prev, channels: songTemp.channels }));
    }

    function deleteChannel(cIndex) {
        let songTemp = song;
        songTemp.channels = songTemp.channels.filter((channel, i) =>
            i !== cIndex ? channel : null
        );
        setsong((prev) => ({ ...prev, channels: songTemp.channels }));
    }
    return (
        <div>
            <Display />
            <p>
                <span onClick={increaseBPM}>+</span>{" "}
                <span onClick={decreaseBPM}>-</span>
            </p>
            <h3>{song.name}</h3>
            <button onClick={play}>Play</button>
            <button onClick={stop}>Stop</button>
            <div className="my-4 mx-3">
                {song.channels.map((channel, channelIndex) => (
                    <div key={channelIndex} className="flex items-center mb-3">
                        <div className="w-32 flex mr-4 bg-orange-500 rounded-lg">
                            <h4 className="py-2 px-4">{channel.sound}</h4>
                            <button onClick={() => deleteChannel(channelIndex)}>x</button>
                        </div>
                        <div>
                            {channel.steps.map((step, stepIndex) => (
                                <button
                                    onClick={() => changeBeat(channelIndex, stepIndex)}
                                    className={
                                        step.velocity
                                            ? "px-3 py-2 bg-red-500 mx-1 outline-hidden border-none"
                                            : "px-3 py-2 bg-red-700 mx-1 outline-hidden border-none"
                                    }
                                >
                                    {channelIndex} {step.velocity}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={addChannel}>+</button>
            </div>
        </div>
    );
}

export default Sound;
