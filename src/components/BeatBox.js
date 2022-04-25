
const commonClass =
    "p-4 mr-1 rounded-sm outline-none focus:outline-none rounded-sm outline-none focus:outline-none ";
const bgColorActive="bg-zinc-600 "

function BeatBox({
    step,
    stepIndex,
    tickCount,
    channelIndex,
    changeBeat,
    channelColor,
}) {

    const bgColor=stepIndex%4===0?"bg-zinc-700 ":"bg-zinc-800 "

    return (
        <button
            key={stepIndex}
            onClick={() => changeBeat(channelIndex, stepIndex)}
            onContextMenu={(e) => {
                e.preventDefault();
                changeBeat(channelIndex, stepIndex);
            }}
            onFocus={(e)=>{
                e.currentTarget.blur()
            }}
            className={
                step.velocity
                    ? tickCount - 1 === stepIndex
                        ? commonClass + "bg-"+channelColor+"-500"
                        : commonClass + "bg-" + channelColor + "-600 hover:bg-"+channelColor+"-500"
                    : tickCount - 1 === stepIndex
                        ? commonClass + bgColorActive +"hover:bg-zinc-600"
                        : commonClass +bgColor+ "hover:bg-zinc-700"
            }
        ></button>
    );
}

export default BeatBox;

// {
//     step.velocity
//         ? tickCount - 1 === stepIndex
//             ? "p-5 bg-" +
//             beatColors[Math.floor(stepIndex / 4)] +
//             "-400 mx-1 outline-hidden border-none rounded-sm outline-none focus:outline-none box-shadow-custom"
//             : "p-5 bg-" +
//             beatColors[Math.floor(stepIndex / 4)] +
//             "-400 mx-1 outline-hidden border-none rounded-sm outline-none focus:outline-none"
//         : tickCount - 1 === stepIndex
//             ? "p-5 bg-" +
//             beatColors[Math.floor(stepIndex / 4)] +
//             "-600 hover:bg-" +
//             beatColors[Math.floor(stepIndex / 4)] +
//             "-600 mx-1 outline-hidden outline-none rounded-sm border-none focus:outline-none box-shadow-custom"
//             : "p-5 bg-" +
//             beatColors[Math.floor(stepIndex / 4)] +
//             "-600 hover:bg-" +
//             beatColors[Math.floor(stepIndex / 4)] +
//             "-600 mx-1 outline-hidden outline-none rounded-sm border-none focus:outline-none"
// }
