import {  channelColors, howl} from '../services/sound-service';
import BeatBox from './BeatBox';

function Channel({channel,channelIndex,tickCount,changeBeat,deleteChannel }) {

    return (
        <div key={channelIndex} className="flex items-center mb-1">
            <div
                className={
                    "w-16 items-center flex mr-2 bg-" +
                    channelColors[channel.sound] +
                    "-600 rounded-lg cursor-pointer"
                }
                onClick={()=>{
                    howl.play(channel.sound)
                }}
            >
                <span className='text-xs pl-2'>{channelIndex+1}</span>
                <h4 className="py-1 pl-1 pr-12 font-bold">{String(channel.sound).slice(0,2)}</h4>
                {/* <div>
                    <button onClick={() => deleteChannel(channelIndex)}>x</button>
                </div> */}
            </div>
            <div>
                {channel.steps.map((step, stepIndex) => (
                    <BeatBox key={stepIndex} step={step} channelColor={channelColors[channel.sound]} stepIndex={stepIndex} channelIndex={channelIndex} changeBeat={changeBeat} tickCount={tickCount}  />
                ))}
            </div>
        </div>
    );
}

export default Channel;
